import { Router } from 'express';
import {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} from '../controllers/profile.controllers.js';

const router = Router();

// Rutas CRUD para Perfiles
router.post('/profiles', createProfile);
router.get('/profiles', getProfiles);
router.get('/profiles/:id', getProfileById);
router.put('/profiles/:id', updateProfile);
router.delete('/profiles/:id', deleteProfile);

export default router;