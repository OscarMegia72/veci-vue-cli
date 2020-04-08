var express = require('express');
var router = express.Router();
var GetNoticia = require('rss-get')

/* GET users listing. */
//===========================
//cache del servicio
//===========================
const moment = require('moment')
const redis = require('redis')
//const client = redis.createClient();
//-------------------
// let redisMiddleware = (ttl)=>{
//     return (req, res, next) => {
//         if(process.env.CACHING==0){
//           next()
//         }else{
//           let key = "__DUST_CACHING__" + req.originalUrl || req.url;
//           client.get(key, function(err, reply){
//             if(reply){
//                 let tempJson=JSON.parse(reply)
//                 res.json(tempJson);
//             }else{
//                 console.info(`$REDIS NO KEY, SAVE TTL ${ttl}`)
//                 res.sendResponse = res.send;
//                 res.send = (body) => {
//                   let firmaFecha = JSON.parse(body)
//                   firmaFecha['cache']= moment().format('YYYY.MM.DD - HH:mm:ss')
//                   firmaFecha['validez']= moment().add(ttl,'seconds').format('YYYY.MM.DD - HH:mm:ss')
//                     client.set(key, JSON.stringify(firmaFecha));
//                     client.expire(key,ttl)
//                     res.sendResponse(body);
//                 }
//                 next();
//             }
//           });
//         }
      
//     }
// }
// http://{{url}}/rss/rest?tipo=[feed-radios, feed-noticias]
router.get('/rest', async (req, res, next)=> {
  let tipo= req.query.tipo
  let contenido = require('../core/'+tipo)
    try{
      
     
      let gnoticia = new GetNoticia()
      let {resumen,listaFeed }=await gnoticia.getNoticia(contenido,tipo)
      //let data=await gnoticia.getResumenPrensa()
      res.json({error:false,data:resumen});

    }catch(e){
      console.error(`rest${e}`)
      res.json({error:true,data:e.message})
    }  
})
router.get('/', async (req, res, next)=> {

  let tipo= req.query.tipo
  let contenido = require('../core/'+tipo)
  try{

    let gnoticia = new GetNoticia() 
    let {resumen,listaFeed }= await gnoticia.getNoticia(contenido,tipo)
    res.render('noticias', { "data":resumen,"listaFeed":listaFeed, "tipo":tipo });

  }catch(e){
    console.error(`index ${e}`)
    res.json({error:true,data:e.message})
  }  
})

module.exports = router;