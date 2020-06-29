export class Entity {
  constructor(http, baseUrl, resource, config = {}){
    this._http = http;
    this._baseUrl = baseUrl;
    this._resource = resource;

    if (Object.keys(config).length){
      this._config = config;
    }
  }

  get http(){
    return this._http;
  }
  set http(http){
    if(http){
      this._http = http;
    }
  }

  get baseUrl(){
    return this._baseUrl;
  }
  set baseUrl(baseUrl){
    if(baseUrl){
      this._baseUrl = baseUrl;
    }
  }

  get resource(){
    return this._resource;
  }
  set resource(resource){
    if(resource){
      this._resource = resource;
    }
  }

  get config(){
    return this._config;
  }
  set config(config){
    if(config){
      this._config = config;
    }
  }

  /**
   * @param {object} filter
   * @param {object} config
   * @return {object}
   * 
   * Busca items en la API o BD que especifiquemos
   * de acuerdo a los filtros que le pasemos
   */

  /*async find(apiMethod=null,filter=null, config={}){

  }*/

  /**
   * @param {string} id
   * @param {object} filter
   * @param {object} config
   * @return {object}
   * 
   * Busca toda la información del item cuya id
   * coincide con lo que pasamos como parámetro
   */

  /*async findById(apiMethod=null,filter=null, config={}){
    
  }*/

}
