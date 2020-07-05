import { getEnv } from './env';

/**
 * @param {string} resource
 * @return {string}
 * 
 * Crea la url para todo el recurso
 */

export function createUrl (resourceUrl='') {
  const baseUrl = getEnv('API_BASE_URL')
  return `${baseUrl}/${resourceUrl}`;
}


/**
 * @return {string}
 * 
 * Retorna la url base sobre la que se está trabajando.
 */

export function getBaseUrl () {
  return getEnv('API_BASE_URL');
}
