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

  get config(){
    return this._config;
  }
  set config(config){
    if(config){
      this._config = config;
    }
  }

  /**
   * @param {object} config={}
   * @return {object}
   * 
   * Busca items en la API o BD que especifiquemos
   */

  async find(config={}){
    config = {...this._config, ...config};
    const uri = this._uriConstructor(null);

    return this._http.get(uri, config);
  }

  /**
   * 
   * @param {string} id
   * @param {object} config={}
   * @return {object}
   * 
   * Busca toda la información del item cuya id
   * coincide con lo que pasamos como parámetro
   */

  async findById(id, config={}){
    config = {...this._config, ...config};
    const uri = this._uriConstructor(id);
    
    return this._http.get(uri,config);
  }

  /**
   * @param {string} id=''
   * @return {string}
   * 
   * retorna la URL definitiva para la consulta
   */

  _uriConstructor(endpoint='') {
    let uri = `${this._baseUrl}`;
    
    if(endpoint) {
      uri += `/${endpoint}`;
    }
    return uri;
  }

}
