const express = require('express');
const router = express.Router();
const PopularStay = require('../models/PopularStay');

/**
 * @swagger
 * /api/popular-stays/{id}:
 *   get:
 *     summary: Get a single popular stay by ID
 *     tags: [Popular]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the popular stay
 *     responses:
 *       200:
 *         description: Popular stay found
 *       404:
 *         description: Popular stay not found
 */
router.get('/:id', async (req, res) => {
  try {
    const stay = await PopularStay.findById(req.params.id);
    if (!stay) {
      return res.status(404).json({ message: 'Stay not found' });
    }
    res.json(stay);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




/**
 * @swagger
 * /api/popular-stays:
 *   post:
 *     summary: Add a new popular stay
 *     tags: [Popular]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: The Reefs
 *               rating:
 *                 type: number
 *                 example: 4.9
 *               imageUrl:
 *                 type: string
 *                 example: https://yourimageurl.com/reefs.jpg
 *     responses:
 *       201:
 *         description: Popular stay created
 */
router.post('/', async (req, res) => {
  try {
    const { name, rating, imageUrl } = req.body;

    const stay = new PopularStay({
      name,
      rating,
      imageUrl
    });

    await stay.save();
    res.status(201).json(stay);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
