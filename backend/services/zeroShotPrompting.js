// File: backend/services/zeroShotPrompting.js

const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate curriculum with zero shot prompting.
 * @param {string} subject - Subject for the curriculum.
 * @param {string} learnerLevel - Level of learner (e.g. beginner, intermediate).
 * @returns {Promise<Object>} JSON curriculum.
 */
async function generateCurriculumZeroShot(subject, learnerLevel) {
  const prompt = `Generate a detailed curriculum for the subject "${subject}" tailored for ${learnerLevel} learners.
Include key concepts, lesson topics, and suggested activities. Provide output as a JSON array with fields: "week", "topic", "activities".`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseText = completion.choices[0].message.content;

    // Parse output to JSON safely
    try {
      const curriculum = JSON.parse(responseText);
      return curriculum;
    } catch (parseError) {
      // If parsing fails, return raw text for debugging
      console.warn('Failed to parse AI response as JSON:', responseText);
      throw new Error('Invalid JSON response from AI');
    }
  } catch (err) {
    console.error('Error calling OpenAI API:', err);
    throw new Error('AI generation error');
  }
}

module.exports = { generateCurriculumZeroShot };
