import { v2 } from 'cloudinary';
import config from '../../../configs';

const { cloudinary } = config();
export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: cloudinary.name,
      api_key: cloudinary.api_key,
      api_secret: cloudinary.api_secret,
    });
  },
};
