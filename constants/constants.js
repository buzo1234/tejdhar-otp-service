require('dotenv').config();
module.exports = {
  allowedOrigins: ['http://0.0.0.0:5000/'],
  SERVER_PORT: process.env.PORT || 5000,
  SERVER_DB_URI:
    'mongodb+srv://abhigyan:abhigyan@cluster0.ozytl.mongodb.net/?retryWrites=true&w=majority',
  JWT_SECRET: 'thisIsASimpleTest',
  OTP_LENGTH: 6,
  OTP_CONFIG: {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  },
  MAIL_SETTINGS: {
    service: 'gmail',
    auth: {
      user: process.env.MAIL_EMAIL || 'karanbuzo@gmail.com',
      pass: process.env.MAIL_PASSWORD || 'czzyyednjgcroykk',
    },
  },
};
