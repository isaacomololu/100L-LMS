import { SyncOptions } from 'sequelize';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { logger } from 'src/common';
import { config } from 'src/common/config';
// import * as models from './models';
import * as models from './models'

export class DatabaseProvider {
  public static readonly provide = 'SEQUELIZE';

  public static async useFactory() {
    const sequelizeOptions: SequelizeOptions = {
      dialect: 'postgres',
      logging: false,
      models: Object.values(models),
      dialectOptions: {
        ssl: config.DB_SSL && { rejectUnauthorized: false },
      },
      sync: { alter: true }
    };

    const syncOptions: SyncOptions = {
      force: config.EMPTY_DB,
      alter: { drop: false },
    };

    if (config.EMPTY_DB) logger.debug('Database cleared 🧹');

    return new Sequelize(config.DB_URL, sequelizeOptions)
      .sync(syncOptions)
      .then(async () => {
        for (const schema in models) await models[schema].sync(syncOptions);
        console.log('Models synced 🛢️');
      })
      .catch((error) => logger.error(error));
  }
}
