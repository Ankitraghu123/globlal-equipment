const multer = require('multer');

// single storage engine: memory for both images & PDFs
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'PDFbrochure') {
    cb(file.mimetype === 'application/pdf' ? null : new Error('Invalid PDF'), true);
  } else if (file.fieldname === 'images') {
    cb(['image/jpeg','image/png'].includes(file.mimetype)
      ? null
      : new Error('Invalid image'),
      true
    );
  } else {
    cb(new Error('Unexpected field'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'PDFbrochure', maxCount: 1 }
]);
