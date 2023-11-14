const { Router, request } = require('express');
const router = Router(); 

const express = require('express');
const cors = require('cors');

router.use(cors());
router.use(express.json());

const fs = require('fs');
const carbone = require('carbone');
const { normalize } = require('path');

//const direccionresp = "http://apinode.sistemascelulosa.com:3001/resumencarga/";
const direccionresp = "http://localhost:3001/etiquetaconversion/";

//Raiz
router.get('/', (req, res) => {    
  res.json(
      {
          "status": "API Reports OK"
      }
  );
})

//Report Resumen de Carga
router.post('/resumencarga', (req, res) => {

  var data = req.body;

  var options = {
    convertTo : 'pdf' //can be docx, txt, ...
  };

  //Lee template de Resumen de Carga y lo guarda en PDF
  carbone.render('./public/expedicion_ResumenDeCarga.odt', data, options, function(err, result){
    if (err) return console.log(err);
    let nombre;
    nombre = Date.now() + '.pdf';
    fs.writeFileSync('./public/resumencarga/' + nombre, result);

    //Envia el link para acceder al archivo por la web
    res.send('http://apinode.sistemascelulosa.com:3001/resumencarga/' + nombre);
    //res.send('http://localhost:3001/resumencarga/' + nombre);

  });

});

//Report Detalle de Carga
router.post('/detallecarga', (req, res) => {

  var data = req.body;

  var options = {
    convertTo : 'pdf' //can be docx, txt, ...
  };

  //Lee template de Resumen de Carga y lo guarda en PDF
  carbone.render('./public/expedicion_DetalleDeCarga.odt', data, options, function(err, result){
    if (err) return console.log(err);
    let nombre;
    nombre = Date.now() + '.pdf';
    fs.writeFileSync('./public/detallecarga/' + nombre, result);

    //Envia el link para acceder al archivo por la web
    //res.send('http://apinode.sistemascelulosa.com:3001/detallecarga/' + nombre);
    res.send('http://localhost:3001/detallecarga/' + nombre);

  });

});


module.exports = router;