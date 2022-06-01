import { config } from 'dotenv';
import path from 'path';

const loadEnvs = (file: string = '.env') =>
  config({
    path: path.join(file),
  });

export default loadEnvs;
