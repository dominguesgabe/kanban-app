import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: './database/database.sqlite',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false, //turn off in prod
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
