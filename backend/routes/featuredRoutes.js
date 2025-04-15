const express = require('express');
const router = express.Router();
const FeaturedCard = require('../models/FeaturedCard');

/**
 * @swagger
 * /api/featured/{id}:
 *   get:
 *     summary: Get a single featured card by ID
 *     tags: [Featured]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the featured card
 *     responses:
 *       200:
 *         description: Featured card found
 *       404:
 *         description: Featured card not found
 */
router.get('/:id', async (req, res) => {
  try {
    const card = await FeaturedCard.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


/**
 * @swagger
 * /api/featured:
 *   post:
 *     summary: Add a new featured card
 *     tags: [Featured]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Discover the most popular places
 *               subtitle:
 *                 type: string
 *                  example:Explore Now
 *               imageUrl:
 *                 type: string
 *                  example:https://yourimageurl.com/popular.jpg
 *     responses:
 *       201:
 *         description: Featured card created
 */
router.post('/', async (req, res) => {
    const { title, subtitle, imageUrl } = req.body;
    try {
      const card = new FeaturedCard({
        title,
        subtitle,
        imageUrl
      }
      );
      await card.save();
      res.status(201).json(card);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

module.exports = router;
