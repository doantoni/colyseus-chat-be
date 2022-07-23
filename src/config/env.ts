import * as dotenv from 'dotenv';
import * as path from 'path';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === 'development' ? '.dev' : ''}`
  )
});

/**
 * Environment variables
 */
export const envVars = {
  nodeEnv: process.env.NODE_ENV || 'development',
  log: {
    level: process.env.LOG_LVL || 'debug',
    dir: process.env.LOG_FOLDER || 'logs/'
  }
};
