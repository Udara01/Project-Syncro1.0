/*const mongoose = require('mongoose');

const MilestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= this.startDate;
      },
      message: 'End date must be on or after the start date.',
    },
  },
  duration: {
    type: Number,
    default: function () {
      if (this.startDate && this.endDate) {
        return Math.round(
          (this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24)
        );
      }
      return 0;
    },
  },
  assignedTeam: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  progress: {
    type: Number,
    default: 0,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
});

module.exports = mongoose.model('Milestone', MilestoneSchema);
*/


const mongoose = require('mongoose');

const MilestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= this.startDate;
      },
      message: 'End date must be on or after the start date.',
    },
  },
  duration: {
    type: Number,
    default: function () {
      if (this.startDate && this.endDate) {
        return Math.round(
          (this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24)
        );
      }
      return 0;
    },
  },
  assignedTeam: {
    type: [String],
    required: true,
  },

  assignedTeamEmail: {
    type: [String],
    required: true,
  },
  
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  progress: {
    type: Number,
    default: 0,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
});

module.exports = mongoose.model('Milestone', MilestoneSchema);