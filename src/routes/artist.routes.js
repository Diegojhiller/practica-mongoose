import { Router } from 'express';
import {
  createArtist,
  getArtists,
  getArtistById,
  updateArtist, 
  deleteArtist,
} from '../controllers/artist.controllers.js';

const router = Router();

// Rutas CRUD para Artistas
router.post('/artists', createArtist);
router.get('/artists', getArtists);
router.get('/artists/:id', getArtistById);
router.put('/artists/:id', updateArtist);
router.delete('/artists/:id', deleteArtist); 

export default router;