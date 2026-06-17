import express from 'express';
import bcrypt from 'bcryptjs';
import db from '../db.js';

const router = express.Router();

// POST /api/usuarios/registro
router.post('/registro', async (req, res) => {
    const { nombre, email, contrasena } = req.body;

    if (!nombre || !email || !contrasena)
        return res.json({ error: 'Todos los campos son obligatorios' });

    if (contrasena.length < 6)
        return res.json({ error: 'La contraseña debe tener al menos 6 caracteres' });

    try {
        const [rows] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (rows.length > 0)
            return res.json({ error: 'El correo ya está registrado' });

        const hash = await bcrypt.hash(contrasena, 10);
        await db.query(
            'INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)',
            [nombre, email, hash]
        );
        res.json({ mensaje: 'Usuario registrado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// POST /api/usuarios/login
router.post('/login', async (req, res) => {
    const { email, contrasena } = req.body;

    if (!email || !contrasena)
        return res.json({ error: 'Correo y contraseña son obligatorios' });

    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length === 0)
            return res.status(401).json({ error: 'Credenciales incorrectas' });

        const usuario = rows[0];
        const valido = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!valido)
            return res.status(401).json({ error: 'Credenciales incorrectas' });

        res.json({
            usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

export default router;
