import Artist from '../models/artist.models.js';

// crear un nuevo artista
const createArtist = async (req, res) => {
  try {
    const { name } = req.body;
    const newArtist = new Artist({ name });
    const savedArtist = await newArtist.save();

    res.status(201).json({
      message: 'Artista creado exitosamente',
      artist: savedArtist,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Error: el artista ya existe. No pueden haber nombres duplicados.',
        error: error.message
      });
    }
    res.status(500).json({
      message: 'Error al crear el artista',
      error: error.message,
    });
  }
};

// obtener todos los artistas
const getArtists = async (req, res) => {
  try {
    // Buscar todos los documentos en la colección artists
    const artists = await Artist.find();

    // Si no se encuentra ningún artista enviar un mensaje 404
    if (!artists || artists.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron artistas.',
      });
    }
    // la lista de artistas con el código de estado 200 OK
    res.status(200).json({
      message: 'Artistas obtenidos exitosamente',
      count: artists.length,
      artists,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los artistas',
      error: error.message,
    });
  }
};

// Controlador para obtener un solo artista por su _id
const getArtistById = async (req, res) => {
  try {
    // Obtener el _id de los parámetros de la url
    const { id } = req.params;

    // Buscar un artista por su _id
    const artist = await Artist.findById(id);

    // Si no se encuentra el artista envia un mensaje 404
    if (!artist) {
      return res.status(404).json({
        message: 'Artista no encontrado.',
      });
    }

    // Envia el artista encontrado con el código de estado 200 OK
    res.status(200).json({
      message: 'Artista obtenido exitosamente',
      artist,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener el artista',
      error: error.message,
    });
  }
};

const updateArtist = async (req, res) => {
  try {
    // Obtener el _id de los parámetros de la url
    const { id } = req.params;
    // Obtener los datos a actualizar del cuerpo de la petición
    const { name } = req.body;

    // Validar que el nombre no esté vacío
    if (!name) {
      return res.status(400).json({
        message: 'El nombre del artista no puede estar vacío.',
      });
    }

    // Buscar y actualizar el artista.
    const updatedArtist = await Artist.findByIdAndUpdate(
      id,
      { name },
      { new: true }//devuleve el nombre actualizado
    );

    //  Si no se encuentra el artista envia un mensaje 404
    if (!updatedArtist) {
      return res.status(404).json({
        message: 'Artista no encontrado.',
      });
    }
    // Enviar la respuesta con el código de estado 200 OK
    res.status(200).json({
      message: 'Artista actualizado exitosamente',
      artist: updatedArtist,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Error: el nombre del artista ya existe.',
        error: error.message
      });
    }
    res.status(500).json({
      message: 'Error al actualizar el artista',
      error: error.message,
    });
  }
};

// para eliminar lógicamente un artista
const deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedArtist = await Artist.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!deletedArtist) {
      return res.status(404).json({
        message: 'Artista no encontrado.',
      });
    }

    res.status(200).json({
      message: 'Artista eliminado lógicamente de forma exitosa',
      artist: deletedArtist,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar el artista',
      error: error.message,
    });
  }
};

export {
  createArtist,
  getArtists,
  getArtistById,
  updateArtist, 
  deleteArtist,
};