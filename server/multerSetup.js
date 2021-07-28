const path = require('path')
const multer = require('multer')
const S3 = require('aws-sdk/clients/s3')
var multerS3 = require('multer-s3')

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
})

// store to S3
const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname })
  },
  key: function (req, file, cb) {
    cb(null, Date.now().toString() + '-' + file.originalname)
  },
})

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
  storage: s3Storage,
  fileFilter: onlyImagesFilter,
}).array('files', 10)
