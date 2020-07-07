import entities from '../entities';

import { createUrl } from '../utils/uri';
import { getEnv } from '../utils/env';

import http_client from '../plugins/http-client';

const {$Item} = entities;

/**
 * 
 * @param {array} items
 * @return {array} 
 *  
 * Retorna un array de strings que contiene
 * las categorias de los items que pasamos
 * como parámetro.
 */

function getCategories(items){
  return items.map(item=>{
    return item.category_id;
  })
};

/**
 * @return {object}
 * 
 * retorna la información del autor.
 */

function getAuthorInfo(){
  return {
    name: getEnv('AUTHOR_NAME'),
    lastname: getEnv('AUTHOR_LASTNAME')
  }
}

/**
 * 
 * @param {string} currency 
 * @param {number} price
 * 
 * @return {object} 
 * 
 * Retorna un objecto con el formato especificado.
 * 
 */

function getPriceObject(currency, price){

  const amount = Math.trunc(price);
  const decimals = price - amount;

  return {
    currency,
    amount,
    decimals,
  }
}

/**
 * @param {string} search
 * @param {number} limit
 * @return {object}
 * 
 * Devuelve los primeros n (n=limit) resultados
 * de la búsqueda especificada en 'search'.
 */

async function searchItems(search,limit){

  /*-------------------------------------------------------------------/ 
    [Problema] - El endpoint de donde se obtienen los items,
    no es consistente con lo que se esperaría en la entidad "Item".

    [Solución] - Se me ocurre llamar por fuera de la abstracción de 
    la entidad al endpoint y exponer el método en los controladores.
  /-------------------------------------------------------------------*/

  const uri = createUrl('sites/MLA/search');
  
  const config = {
    params:{
      q: search,
      limit
    }
  }
  
  let items_raw;

  try{
    items_raw = await http_client.get(uri,config); 
  }catch(err){
    return err;
  }

  const items = await Promise.all(
    items_raw.data.results.map(async item => {
      
      // Extrae las propiedades que necesita
      const {
        id,
        title,
        shipping: {free_shipping},
        thumbnail,
        currency_id,
        price,
        condition
      } = item;

      // retorna el objeto formateado
      return{
        id,
        title,
        price: getPriceObject(currency_id, price),
        picture: thumbnail,
        condition,
        free_shipping,
      }
    })
  )


  return {
    author: getAuthorInfo(),
    categories: getCategories(items_raw.data.results),
    items
  }

};

/**
 * @param {string} id
 * @return {object}
 * 
 * Devuelve el item buscado con un
 * formato de response específico. 
 */

async function getItemById(id){
  
  let item_raw, item_description_raw;

  try{
    
    item_raw = $Item.findById(id);
    item_description_raw = $Item.findDescriptionById(id);

  }catch(err){
    return err
  }

  const itemConstructor = async function () {
    console.log(item_raw)
    const {
      data:{
        id,
        title,
        shipping: {free_shipping},
        thumbnail,
        currency_id,
        price,
        condition,
        sold_quantity
      }
    } = await item_raw

    const {
      data:{plain_text}
    } = await item_description_raw

    return{
      id,
      title,
      price: getPriceObject(currency_id, price),
      picture: thumbnail,
      condition,
      free_shipping,
      sold_quantity,
      description: plain_text
    }
  }

  return {
    author: getAuthorInfo(),
    item: await itemConstructor()
  }
};

export default {
  searchItems,
  getItemById
}
