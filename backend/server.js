import express from 'express';
import cors from 'cors';
import usuariosRoutes from './controllers/usuarios.controller.js';
import favoritosRoutes from './controllers/favoritos.controller.js';
import historialRoutes from './controllers/historial.controller.js';
import calculosRoutes from './controllers/calculos.controller.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/favoritos', favoritosRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/calculos', calculosRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
