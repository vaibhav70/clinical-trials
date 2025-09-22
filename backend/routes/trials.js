const express = require('express');
const router = express.Router();
const Trial = require('../models/Trial');
const passport = require('passport');

// create a trial
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const trialData = { ...req.body, user: req.user._id };
        const trial = new Trial(trialData);
        await trial.save();
        res.json(trial);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// get all trials for the authenticated user
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const trials = await Trial.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.json(trials)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// update a trial (only if it belongs to the authenticated user)
router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const trial = await Trial.findOne({ _id: req.params.id, user: req.user._id });
        if (!trial) {
            return res.status(404).json({ message: 'Trial not found or access denied' });
        }
        
        const updatedTrial = await Trial.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(updatedTrial);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// delete a trial (only if it belongs to the authenticated user)
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const trial = await Trial.findOne({ _id: req.params.id, user: req.user._id });
        if (!trial) {
            return res.status(404).json({ message: 'Trial not found or access denied' });
        }
        
        await Trial.findByIdAndDelete(req.params.id);
        res.json({ message: 'trial deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router