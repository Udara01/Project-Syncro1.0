const express = require('express');
const router = express.Router();

const registeredUser = require('../Modules/userSchema');
const bcrypt = require('bcrypt');



router.post('/', async(req,res) => {
  const { userEmail, userPassword } = req.body;

  try{
    const hashedPassword = await bcrypt.hash(userPassword, 10); // Hash password before storing
    const newRegisteredUser = new registeredUser({ userEmail, userPassword: hashedPassword });
    const savedUser = await newRegisteredUser.save();
    res.status(201).json(savedUser);

  }catch(err){
    res.status(400).send('Error: ' + err);
  }
})



module.exports = router;