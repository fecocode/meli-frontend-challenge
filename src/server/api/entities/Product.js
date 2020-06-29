import { Entity } from './Entity'

const url = 'lalala';

export default class Product extends Entity {

  constructor(http,config = {}){
    super(http, url, 'product', config);
  }

}
