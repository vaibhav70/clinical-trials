const mongoose = require('mongoose');

const TrialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    status: { type: String, enum: ['planned', 'ongoing', 'completed', 'terminated'], default: 'planned' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Trial', TrialSchema);