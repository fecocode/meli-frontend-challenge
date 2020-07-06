import { Entity } from './Entity';
import { createUrl } from '../utils/uri';
import { getEnv } from '../utils/env'

const url = createUrl('items');
export default class Product extends Entity {

  constructor(http,config = {}){
    super(http, url, config);
  }

  /**
   * 
   * @param {string} endpoint=''
   * @param {object} config={}
   * @return {object}
   * 
   * Realiza la búsqueda de items en una url
   * externa a la del recurso que es declarado
   * en la entidad.
   */


  findInAnotherURL(endpoint='',config={}){
    config = {...this._config, ...config};
    const uri = `${getEnv('API_BASE_URL')}/${endpoint}`;
    return this._http.get(uri,config);
  }

  /**
   * 
   * @param {string} id
   * @param {object} config={}
   * @return {object}
   * 
   * Busca la descripcion del producto cuya id
   * coincide con lo que pasamos como parámetro
   */

  findDescriptionById(id='',config={}){
    config = {...this._config, ...config};
    const uri = this._uriConstructor(`${id}/description`);
    return this._http.get(uri,config);
  }

}
