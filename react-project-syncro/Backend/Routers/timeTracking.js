const express = require('express');
const router = express.Router();
const TimeTracking = require('../Modules/TimeTrackingSchema');
const { handleTimeTracking, handleUserLogout } = require('../Controller/timeTrackingController');


// Get time tracking data for a user
router.get('/time-tracking/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await TimeTracking.find({ userId }).sort({ date: 1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});



router.post('/time-tracking', handleTimeTracking);

router.post('/time-out', (req, res) => {
    console.log('Time-out route hit');
    handleUserLogout(req, res);
  });


module.exports = router;
