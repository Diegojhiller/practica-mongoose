import Profile from '../models/profile.models.js';
import Artist from '../models/artist.models.js';

const createProfile = async (req, res) => {
  try {
    const { artistId, biography, socialMedia, website } = req.body;

    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: 'Artista no encontrado.' });
    }

    if (artist.profile) {
      return res.status(409).json({ message: 'El artista ya tiene un perfil.' });
    }

    const newProfile = new Profile({
      biography,
      socialMedia,
      website,
      artist: artistId,
    });
    const savedProfile = await newProfile.save();

    artist.profile = savedProfile._id;
    await artist.save();

    res.status(201).json({
      message: 'Perfil de artista creado exitosamente',
      profile: savedProfile,
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error al crear el perfil',
      error: error.message,
    });
  }
};

const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('artist');

    if (!profiles || profiles.length === 0) {
      return res.status(404).json({ message: 'No se encontraron perfiles.' });
    }

    res.status(200).json({
      message: 'Perfiles obtenidos exitosamente',
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los perfiles',
      error: error.message,
    });
  }
};

const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id).populate('artist');

    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }

    res.status(200).json({
      message: 'Perfil obtenido exitosamente',
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener el perfil',
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { biography, socialMedia, website } = req.body;

    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { biography, socialMedia, website },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }

    res.status(200).json({
      message: 'Perfil actualizado exitosamente',
      profile: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar el perfil',
      error: error.message,
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProfile = await Profile.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!deletedProfile) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }

    // Desvincular el perfil del artista
    await Artist.findByIdAndUpdate(
      deletedProfile.artist,
      { $unset: { profile: 1 } } // elimina el campo profile
    );

    res.status(200).json({
      message: 'Perfil eliminado lógicamente de forma exitosa',
      profile: deletedProfile,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar el perfil',
      error: error.message,
    });
  }
};

export {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
};