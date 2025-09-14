API REST con Node.js + Express + Mongoose

En este proyecto, se implementaron colecciones con propiedades embebidas y referenciadas para modelar una base de datos de música. El objetivo fue demostrar el uso de las diferentes relaciones que permite MongoDB, aprovechando la flexibilidad que ofrece Mongoose.

1. Relación 1:1 y N:M Referenciadas
Para las relaciones uno a uno (Artista a Perfil) y uno a muchos/muchos a muchos (Artista a Álbum, Álbum a Canción), se optó por un modelo referenciado. Esto significa que los documentos se guardan en colecciones separadas, y uno de ellos almacena el _id del otro. Esta elección se justificó por las siguientes razones:

Independencia de los datos: La información de un Perfil o un Álbum puede ser consultada de forma independiente. No siempre se necesita el perfil completo al obtener los datos de un artista, ni el álbum completo al obtener las canciones.

Flexibilidad y escalabilidad: Este enfoque evita que los documentos crezcan demasiado, lo que podría afectar el rendimiento.

Para implementar la relación, se utilizó el método populate de Mongoose, que permite reemplazar el _id de la referencia con el documento completo, facilitando el acceso a datos relacionados.

2. Propiedades Embebidas
Se eligió una propiedad embebida en la colección Canción (details). Esto se justifica porque los datos como la duración o el género de una canción son inherentemente parte de ella y carecen de significado fuera de ese contexto. Esta opción es eficiente para datos que se consultan y se modifican siempre junto con el documento principal.

Investigación y Aplicación de Operaciones Avanzadas
Además del CRUD básico, el proyecto implementó funcionalidades más complejas, investigando y aplicando soluciones robustas para el manejo de datos.

1. Eliminaciones lógicas y en cascada
Se prefirió la eliminación lógica sobre la física para preservar el historial de datos. En lugar de borrar un documento, se actualiza un campo isActive a false. Esto permite que los datos sigan existiendo en la base de datos para fines de auditoría o recuperación.

Se implementó la eliminación en cascada para mantener la consistencia en las relaciones. Por ejemplo, al "eliminar" lógicamente un Álbum, se buscaban todas las Canciones asociadas a él y también se marcaban como inactivas. Para lograrlo, se utilizó el método updateMany de Mongoose junto con el operador $in para actualizar múltiples documentos en una sola operación.

2. Manejo de relaciones muchos a muchos
Para la relación N:M entre Álbumes y Canciones, se creó un endpoint dedicado para la creación y vinculación de canciones. Este endpoint no solo crea el nuevo documento, sino que también actualiza los documentos de los álbumes a los que se asocia la canción. Para realizar esta vinculación, se utilizó el operador $push, que añade el _id de la nueva canción al array de canciones del álbum. Esto asegura que la relación se establezca de manera bidireccional, manteniendo la integridad de los datos.