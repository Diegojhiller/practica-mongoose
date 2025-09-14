import express from 'express';
import connectDB from './src/config/database.js';
import artistRoutes from './src/routes/artist.routes.js';
import albumRoutes from './src/routes/album.routes.js';
import songRoutes from './src/routes/song.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/api', artistRoutes);
app.use('/api', albumRoutes);
app.use('/api', songRoutes);

// app.get('/', (req, res) => {
//   res.send('¡Servidor funcionando!');
// });

app.listen(PORT, () => {
  console.log(` Servidor mongo escuchando en http://localhost:${PORT}`);
});