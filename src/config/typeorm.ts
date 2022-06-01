import loadEnvs from './envs';
import { DataSource, DataSourceOptions } from 'typeorm';

loadEnvs();

let config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT) || 5432,
  username: process.env.TYPEORM_USERNAME || 'postgres',
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE || 'postgres',
  entities: [__dirname + '/../databases/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../databases/migrations/*.ts'],
  synchronize: true,
  logging: process.env.TYPEORM_LOGGING == 'true' ? true : false,
  metadataTableName: 'typeorm_metadata',
};

if (process.env.TYPEORM_SSL == 'true') {
  config = {
    ...config,
    ...{
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    },
  };
}

const TypeOrm = new DataSource(config as DataSourceOptions);

export default TypeOrm;
