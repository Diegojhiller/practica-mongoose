import { Router } from 'express';
import {
  createAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum, 
  deleteAlbum,
} from '../controllers/album.controllers.js';

const router = Router();

// Rutas CRUD para Álbumes
router.post('/albums', createAlbum);
router.get('/albums', getAlbums);
router.get('/albums/:id', getAlbumById);
router.put('/albums/:id', updateAlbum);
router.delete('/albums/:id', deleteAlbum);

export default router;