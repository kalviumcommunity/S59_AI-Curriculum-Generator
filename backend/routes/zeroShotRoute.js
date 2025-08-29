// File: backend/routes/zeroShotRoute.js

const express = require('express');
const router = express.Router();
const { generateCurriculumZeroShot } = require('../services/zeroShotPrompting');

router.post('/api/plan/zero-shot', async (req, res) => {
  const { subject, learnerLevel } = req.body;
  if (!subject || !learnerLevel) {
    return res.status(400).json({ error: 'Missing subject or learnerLevel' });
  }

  try {
    const curriculum = await generateCurriculumZeroShot(subject, learnerLevel);
    return res.json({ curriculum });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

module.exports = router;
