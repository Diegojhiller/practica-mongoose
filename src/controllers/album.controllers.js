import Album from '../models/album.models.js';
import Artist from '../models/artist.models.js';

//  para crear un nuevo álbum
const createAlbum = async (req, res) => {
  try {
    const { title, artistId } = req.body;
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: 'Artista no encontrado.' });
    }
    const newAlbum = new Album({
      title,
      artist: artistId,
    });

    const savedAlbum = await newAlbum.save();

    res.status(201).json({
      message: 'Álbum creado exitosamente',
      album: savedAlbum,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear el álbum',
      error: error.message,
    });
  }
};

const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate('artist');

    if (!albums || albums.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron álbumes.',
      });
    }

    res.status(200).json({
      message: 'Álbumes obtenidos exitosamente',
      count: albums.length,
      albums,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los álbumes',
      error: error.message,
    });
  }
};

const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;

    const album = await Album.findById(id).populate('artist');

    if (!album) {
      return res.status(404).json({
        message: 'Álbum no encontrado.',
      });
    }

    res.status(200).json({
      message: 'Álbum obtenido exitosamente',
      album,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener el álbum',
      error: error.message,
    });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artistId } = req.body;
    if (artistId) {
      const artist = await Artist.findById(artistId);
      if (!artist) {
        return res.status(404).json({ message: 'Artista no encontrado.' });
      }
    }

    const updatedAlbum = await Album.findByIdAndUpdate(
      id,
      { title, artist: artistId },
      { new: true }
    );
    if (!updatedAlbum) {
      return res.status(404).json({
        message: 'Álbum no encontrado.',
      });
    }
    res.status(200).json({
      message: 'Álbum actualizado exitosamente',
      album: updatedAlbum,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar el álbum',
      error: error.message,
    });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAlbum = await Album.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!deletedAlbum) {
      return res.status(404).json({
        message: 'Álbum no encontrado.',
      });
    }

    const songIds = deletedAlbum.songs;

    await Song.updateMany(
      { _id: { $in: songIds } },
      { isActive: false }
    );

    res.status(200).json({
      message: 'Álbum y canciones asociadas eliminados lógicamente de forma exitosa',
      album: deletedAlbum,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar el álbum',
      error: error.message,
    });
  }
};

export {
  createAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
};