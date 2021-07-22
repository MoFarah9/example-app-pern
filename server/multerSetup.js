const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const fileFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!'
    return cb(new Error('Only image files are allowed!'), false)
  }
  cb(null, true)
}

// 10 is the limit for number of uploaded files at once
// 'files' is the name of our file input field
module.exports.upload = multer({ storage, fileFilter }).array('files', 10)
