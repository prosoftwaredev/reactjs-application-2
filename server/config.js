const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/knack_image',
  port: process.env.PORT || 8000,
  secretKey: 'rhettsmitttoken'
};

export default config;
