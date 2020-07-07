import express from 'express';

import controllers from '../controllers'
import { getEnv } from '../utils/env'

const {
  itemController:{searchItems,getItemById}
} = controllers

const router = express.Router();

router.get('/', async (req,res) => {
    const {search} = req.query;
    let response;
    try{
      response = await searchItems(search,getEnv('RESPONSE_MAX_LENGTH'));
    }catch(err){
      return res
        .status(500)
        .json({
          status: 500,
          message: 'meli API not available',
          error: 'api_not_available',
        })
    }

    res.json(response);
});

router.get('/:id', async (req,res) => {
  const {id} = req.params;
  
  let response;
  try{
    response = await getItemById(id);
  }catch(err){
    return res
        .status(500)
        .json({
          status: 500,
          message: 'meli API not available',
          error: 'api_not_available',
        })
  }
  res.json(response);
});

export default router
