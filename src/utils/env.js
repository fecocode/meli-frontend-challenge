const dotenv = require('dotenv');
dotenv.config();

/**
 * @param {string} envVariable 
 * @return {*} 
 * 
 * Retorna el valor de la variable de entorno 
 * que pasamos como parámetro
 */

export const getEnv = envVariable => {
  return process.env[`${envVariable}`] || null;
};
