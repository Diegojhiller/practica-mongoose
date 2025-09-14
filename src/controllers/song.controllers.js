import Song from '../models/song.models.js';
import Album from '../models/album.models.js';

const createSong = async (req, res) => {
  try {
    const { title, details, albumIds } = req.body;
    if (!title || !details) {
      return res.status(400).json({ message: 'El título y las descripciones de la canción son obligatorios.' });
    }
    const newSong = new Song({
      title,
      details, 
      albums: albumIds,
    });

    const savedSong = await newSong.save();

    if (albumIds && albumIds.length > 0) {
      await Album.updateMany(
        { _id: { $in: albumIds } },
        { $push: { songs: savedSong._id } }
      );
    }

    res.status(201).json({
      message: 'Canción creada exitosamente',
      song: savedSong,
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error al crear la canción',
      error: error.message,
    });
  }
};

const getSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate('albums');

    if (!songs || songs.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron canciones.',
      });
    }

    res.status(200).json({
      message: 'Canciones obtenidas exitosamente',
      count: songs.length,
      songs,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener las canciones',
      error: error.message,
    });
  }
};

const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id).populate('albums');
    if (!song) {
      return res.status(404).json({
        message: 'Canción no encontrada.',
      });
    }

    res.status(200).json({
      message: 'Canción obtenida exitosamente',
      song,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener la canción',
      error: error.message,
    });
  }
};

const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, details, albumIds } = req.body;

    const updatedSong = await Song.findByIdAndUpdate(
      id,
      { title, details, albums: albumIds },
      { new: true }
    );

    if (!updatedSong) {
      return res.status(404).json({
        message: 'Canción no encontrada.',
      });
    }

    res.status(200).json({
      message: 'Canción actualizada exitosamente',
      song: updatedSong,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar la canción',
      error: error.message,
    });
  }
};

const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSong = await Song.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!deletedSong) {
      return res.status(404).json({
        message: 'Canción no encontrada.',
      });
    }

    res.status(200).json({
      message: 'Canción eliminada lógicamente de forma exitosa',
      song: deletedSong,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar la canción',
      error: error.message,
    });
  }
};

export {
  createSong,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
};