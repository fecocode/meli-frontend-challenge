import { Entity } from './Entity';
import { createUrl, getBaseUrl } from '../utils/uri';

const url = createUrl('items');
export default class Product extends Entity {

  constructor(http,config = {}){
    super(http, url, config);
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
