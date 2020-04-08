var express = require('express');
var router = express.Router();
const moment = require('moment')
const mockCompleto = require('../data/completo.js')
router.get('/?viajes', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/viajes/detalle/:id', async (req, res, next)=> {
    // let tipo= req.query.tipo
    // let contenido = require('../controllers/'+tipo)
    //return res.render('my_account/pages/travels/details',{data_travels:req.params.travelId});
    res.render('details',{data_travels:req.params.id});
    //res.render('details', { title: `Detalle ${req.params.id}` });
      try{
        // let gnoticia = new GetNoticia()
        // let {resumen,listaFeed }=await gnoticia.getNoticia(contenido,tipo)
        // //let data=await gnoticia.getResumenPrensa()
        // res.json({error:false,data:resumen});
      }catch(e){
        // console.error(`rest${e}`)
        // res.json({error:true,data:e.message})
      }  
});
router.get('/viajes/api/details/:id', async (req, res, next)=> {
  // let tipo= req.query.tipo
  // let contenido = require('../controllers/'+tipo)
  console.log("my-id",req.params.id)
  let details = mockCompleto.find(x=> x.generalDetails.bookingCode === req.params.id)
  if(details){
    res.json(details)
  }else{
    console.log("my-id","status 400",req.params.id)
    res.status(400).json({error:'no details for '+req.query});
  }
});
//  let url_api_call= `/viajes/api/details/${this.state.data_ssr.id}`
module.exports = router;