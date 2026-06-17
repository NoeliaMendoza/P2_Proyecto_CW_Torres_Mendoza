import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /api/calculos/get?usuario_id=1
router.get('/get', async (req, res) => {
    const { usuario_id } = req.query;
    try {
        const [rows] = await db.query(
            'SELECT * FROM calculos WHERE usuario_id = ? ORDER BY fecha DESC LIMIT 50',
            [usuario_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// POST /api/calculos/add
router.post('/add', async (req, res) => {
    const { usuario_id, formula, masa_molar } = req.body;
    try {
        await db.query(
            'INSERT INTO calculos (usuario_id, formula, masa_molar) VALUES (?, ?, ?)',
            [usuario_id, formula, masa_molar]
        );
        res.json({ mensaje: 'Cálculo guardado' });
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

export default router;
