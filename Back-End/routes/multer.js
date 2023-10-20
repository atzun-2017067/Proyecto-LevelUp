const multer = require('multer');



const storage = multer.memoryStorage(); // Almacenará el archivo en memoria

const upload = multer({ storage });



module.exports = upload;

