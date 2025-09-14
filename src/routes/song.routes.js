import { Router } from 'express';
import {
  createSong,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
} from '../controllers/song.controllers.js';

const router = Router();

// Rutas CRUD para Canciones
router.post('/songs', createSong);
router.get('/songs', getSongs);
router.get('/songs/:id', getSongById);
router.put('/songs/:id', updateSong);
router.delete('/songs/:id', deleteSong);

export default router;