import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /api/favoritos/get?usuario_id=1
router.get('/get', async (req, res) => {
    const { usuario_id } = req.query;
    try {
        const [rows] = await db.query(
            'SELECT * FROM favoritos WHERE usuario_id = ? ORDER BY agregado_en DESC',
            [usuario_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// POST /api/favoritos/add
router.post('/add', async (req, res) => {
    const { usuario_id, numero_atomico, simbolo, nombre_es } = req.body;
    try {
        await db.query(
            'INSERT IGNORE INTO favoritos (usuario_id, numero_atomico, simbolo, nombre_es) VALUES (?, ?, ?, ?)',
            [usuario_id, numero_atomico, simbolo, nombre_es]
        );
        res.json({ mensaje: 'Favorito agregado' });
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// DELETE /api/favoritos/delete
router.delete('/delete', async (req, res) => {
    const { usuario_id, numero_atomico } = req.body;
    try {
        await db.query(
            'DELETE FROM favoritos WHERE usuario_id = ? AND numero_atomico = ?',
            [usuario_id, numero_atomico]
        );
        res.json({ mensaje: 'Favorito eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

export default router;
