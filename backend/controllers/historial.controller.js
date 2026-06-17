import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /api/historial/get?usuario_id=1
router.get('/get', async (req, res) => {
    const { usuario_id } = req.query;
    try {
        const [rows] = await db.query(
            'SELECT * FROM historial WHERE usuario_id = ? ORDER BY fecha DESC LIMIT 100',
            [usuario_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// POST /api/historial/add
router.post('/add', async (req, res) => {
    const { usuario_id, numero_atomico, simbolo, nombre_es } = req.body;
    try {
        await db.query(
            'INSERT INTO historial (usuario_id, numero_atomico, simbolo, nombre_es) VALUES (?, ?, ?, ?)',
            [usuario_id, numero_atomico, simbolo, nombre_es]
        );
        res.json({ mensaje: 'Historial registrado' });
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

export default router;
