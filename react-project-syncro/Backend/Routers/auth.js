//user registration, login and logout process routes control by in here

/*const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = 'your_jwt_secret';
const User = require('../Modules/UserSchema')

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ username, email, password });
        await user.save();

        const payload = { userId: user._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });
        res.json({ token,
            username: user.username,
            useremail: user.email
         });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ msg: 'This is a protected route' });
});

module.exports = router;*/
//above code is for the without email verification

const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../Modules/UserSchema');
const Verification = require('../Modules/VerificationSchema');
const router = express.Router();
require('dotenv').config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

//Registration Process
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ username, email, password });
        await user.save();

        const verificationCode = crypto.randomInt(100000, 999999).toString();

        await Verification.create({ userId: user._id, code: verificationCode });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            text: `Your verification code is ${verificationCode}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json({ msg: 'Verification code sent to email' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/verify', async (req, res) => {
    const { email, verificationCode } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const verification = await Verification.findOne({ userId: user._id, code: verificationCode });
        if (!verification) {
            return res.status(400).json({ msg: 'Invalid verification code' });
        }

        await Verification.deleteOne({ _id: verification._id });

        const payload = { userId: user._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });
        res.json({ token });
    } catch (err) {
        console.error('Verification error:', err.message);
        res.status(500).send('Server error');
    }
});


//Login Process
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error('Invalid credentials: User not found for email:', email);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.error('Invalid credentials: Password mismatch for email:', email);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

       res.cookie('token', token, { httpOnly: true });
        res.json({ token, username: user.username, useremail: user.email });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//Logout Process
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ msg: 'This is a protected route' });
});


//Password reset Process
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const verificationCode = crypto.randomInt(100000, 999999).toString();
        await Verification.create({ userId: user._id, code: verificationCode });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Verification Code',
            text: `Your verification code is ${verificationCode}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json({ msg: 'Verification code sent to email' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/verify-reset-code', async (req, res) => {
    const { email, code } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const verification = await Verification.findOne({ userId: user._id, code });
        if (!verification) {
            return res.status(400).json({ msg: 'Invalid verification code' });
        }

        await Verification.deleteOne({ _id: verification._id });
        res.status(200).json({ msg: 'Code verified' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/reset-password', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            console.error('User not found for email:', email);
            return res.status(400).json({ msg: 'User not found' });
        }

        // Set the new password
        user.password = password;
        await user.save();

        console.log('Password reset successfully for email:', email);
        res.status(200).json({ msg: 'Password reset successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
