import http from '../plugins/http-client'

/**
 * @param {object} modules
 * @return {object}
 * 
 * crea un objeto para exportar todas las entidades
 * basadas en la lista que le pasamos como parámetro
 */

export function createEntities(modules) {
  const entities = {};
  Object.keys(modules).forEach((resource)=>{
    if(typeof modules[resource] === 'function'){
      entities[`$${resource}`] = new modules[resource](http)
    } else {
      throw new Error(`${resource} no contiene un módulo exportado.`)
    }
  })

  return entities
};

