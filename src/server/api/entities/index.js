import { createEntities } from '../utils/import-modules'

/**
 * Al momento que se crea una entidad,
 * es necesario importarla y pasarla en 
 * el objeto parámetro de createEntities()
 */

// Entidades
import Item from './Item';
// import NewEntitie from './NewEntitie'; 

export default createEntities({
  Item
  // NewEntitie
});
