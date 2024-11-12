// backend/routes/apiRoutes.js
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import login from '../controllers/auth.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         username: admin123
 *         password: adminpassword
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

router.get('/example', authMiddleware, (req, res) => {
  res.send('GET request to the example route');
});

router.post('/example', authMiddleware, (req, res) => {
  res.send('POST request to the example route');
});

// Export the router
export default router;