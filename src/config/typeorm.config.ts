import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root', // TODO: use `.env` for sensitive data
  database: 'taskmanagement',
  entities: [`${__dirname}/../**/*.entity.ts`],
  synchronize: true, // setting `true` not recommended in production
};
