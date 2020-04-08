var express = require('express');
var router = express.Router();
const moment = require('moment')
const mock_noticia = require('../data/mock.noticia')
var GetNoticia = require('../controllers/rss-get')
router.get('/', function(req, res, next) {
  res.render('index', { title:'index'});
});
router.get('/json', function(req, res, next) {
 res.json({server:'minimal-server', date: moment().format('hh:mm:ss')})
});
router.get('/noticia', function(req, res, next) {
  res.json(mock_noticia)
});
// http://{{url}}/rss/rest?tipo=[feed-radios, feed-noticias]
router.get('/rest', async (req, res, next)=> {
  //router.get('/rest', async (req, res, next)=> {
    let tipo= req.query.tipo
    let contenido = require('../controllers/'+tipo)
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

module.exports = router;
