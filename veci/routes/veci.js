var express = require('express');
var router = express.Router();
const moment = require('moment')
const mockCompleto = require('../data/completo.js')
function loggger(clave, valor){
  this.clave = clave;
  this.valor = valor;
}
router.get('/:viajes?', function(req, res, next) {
    res.render('index', { title: 'Veci-Express' });
});
router.get('/viajes/detalle/:id', async (req, res, next)=> {
  res.render('details',{data_travels:req.params.id});
    try{
    }catch(e){

    }  
});

router.get('/viajes/api/details/:id', async (req, res, next)=> {
  let klog =[]
  klog.push(new loggger("get:details",req.params.id))


  let details = mockCompleto.find(x=> x.generalDetails.bookingCode === req.params.id)
  if(details){
    
      klog.push(new loggger(req.params.id,details.generalDetails.title))
      klog.push(new loggger("fecha",details.generalDetails.departureDate))
      klog.push(new loggger("total",details.amounts.totalPrice.amount))
      klog.push(new loggger("estado",details.generalDetails.bookingStatus.description))
      console.table(klog)
    res.json(details)
  }else{
    console.log("my-id","status 400",req.params.id)
    res.status(400).json({error:'no details for '+req.query});
  }
});
module.exports = router;