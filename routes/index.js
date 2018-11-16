var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Gas = mongoose.model('Gas');

router.get('/gas', function(req, res, next) {
  Gas.find(function(err, gas){
    if(err){ return next(err); }
    res.json(gas);
  });
});
router.post('/gas', function(req, res, next) {
    console.log(req.body);
  var gas = new Gas(req.body);
  gas.save(function(err, gas){
    if(err){ return next(err); }
    console.log(gas);
    res.json(gas);
  });
});
router.delete('/gas/:gas', function(req, res) {
  console.log("in Delete");
  req.gas.remove();
  res.sendStatus(200);
});

module.exports = router;


