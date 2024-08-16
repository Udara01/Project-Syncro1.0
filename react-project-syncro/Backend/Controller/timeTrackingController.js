const TimeTracking = require('../Modules/TimeTrackingSchema');

exports.handleTimeTracking = async (req, res) => {
  const { userId } = req.body;

  try {
      const today = new Date().setHours(0, 0, 0, 0); // Start of today
      let timeTracking = await TimeTracking.findOne({ userId, date: today });

      if (timeTracking) {
          // If a session already exists for today, reset the sessionStart to now
          timeTracking.sessionStart = new Date();
      } else {
          // Create a new record if no session for today
          timeTracking = new TimeTracking({
              userId,
              date: today,
              sessionStart: new Date(),
              timeSpent: 0, // initialize with 0 seconds
          });
      }

      await timeTracking.save();
      res.status(200).json({ message: 'Time tracking updated successfully' });
  } catch (error) {
      console.error('Error handling time tracking:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.handleUserLogout = async (req, res) => {
  const { userId } = req.body; // Ensure userId is passed in the request body

  try {
      const today = new Date().setHours(0, 0, 0, 0); // Start of today
      const timeTracking = await TimeTracking.findOne({ userId, date: today });

      if (timeTracking && timeTracking.sessionStart) {
          // Set sessionEnd and calculate time spent in minutes
          timeTracking.sessionEnd = new Date();
          const timeSpent = (timeTracking.sessionEnd - timeTracking.sessionStart) / (1000 * 60);

          // Update time spent for the day
          timeTracking.timeSpent += timeSpent;
          await timeTracking.save();
      }

      res.status(200).json({ message: 'Logout time tracked successfully' });
  } catch (error) {
      console.error('Error handling user logout', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};
