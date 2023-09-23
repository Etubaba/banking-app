import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  app: {
    environment:
      process.env.APP_ENV === 'production' ? 'production' : process.env.APP_ENV,
    port: parseInt(process.env.APP_PORT, 10) || 3010,
    host: 'localhost',
    name: process.env.APP_NAME || 'veegil-media',
    url: process.env.APP_URL,
    global_url_prefix: process.env.GLOBAL_URL_PREFIX || 'api/v1',
    full_url: `${process.env.APP_URL}/${process.env.GLOBAL_URL_PREFIX}`,
  },
  jwt: {
    access: {
      secret: process.env.JWT_SECRET,
      signInOptions: {
        expiresIn: process.env.JWT_ACCEESS_EXPIRES_IN,
      },
    },
    refresh: {
      secret: process.env.JWT_SECRET,
      signInOptions: {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      },
    },
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
    headers: process.env.CORS_HEADERS || '*',
  },
  paystack: {
    secretKey: process.env.PAYSTACK_SECRET_KEY,
    publicKey: process.env.PAYSTACK_PUBLIC_KEY,
  },
  payment: {
    verify_callback_url: process.env.VERIFY_CALLBACK_URL,
    paystack_verify_url: process.env.PAYSTACK_VERIFY_URL,
    Paystack_initialize_url: process.env.PAYSTACK_INITIALIZE_URL,
  },

  cloudinary: {
    api_secret: process.env.CLOUDINARY_API_SECRET,
    name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
  },
});
