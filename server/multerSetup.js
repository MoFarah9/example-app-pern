const multer = require('multer')
const path = require('path')

// store to disk
const diskStorage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => cb(null, file.originalname),
})

// only accept images
const onlyImagesFilter = function (req, file, cb) {
  const mimes = ['image/png', 'image/jpg', 'image/jpeg']

  if (mimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
  }
}

// 10 is the limit for number of uploaded files at once
// 'files' is the name of our file input field
module.exports.upload = multer({
  storage: diskStorage,
  fileFilter: onlyImagesFilter,
}).array('files', 10)
