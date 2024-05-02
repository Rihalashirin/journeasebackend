import multer from 'multer'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
  });
  
  export const upload = multer({ storage: storage,
    limits: {
        // Adjust these limits according to your requirements
        fileSize: 10 * 1024 * 1024, // Max file size in bytes (e.g., 10 MB)
        fieldSize: 10 * 1024 * 1024
      } });
  