const { Router, request } = require('express');
const router = Router(); 

const express = require('express');
const cors = require('cors');

router.use(cors());
router.use(express.json());

const fs = require('fs');
const carbone = require('carbone');
const { normalize } = require('path');

const direccionresp = "http://apinode.sistemascelulosa.com:3001/tickets/";
//const direccionresp = "http://localhost:3001/etiquetaconversion/";

//Raiz
router.get('/', (req, res) => {    
  res.json(
      {
          "status": "API Tickets OK"
      }
  );
})

//Report Resumen de Carga
router.post('/ticketslima', (req, res) => {

  var data = req.body;

  var options = {
    convertTo : 'pdf' //can be docx, txt, ...
  };

  //Lee template de Balanza Lima y lo guarda en PDF
  carbone.render('./public/balanza_TicketLima.odt', data, options, function(err, result){
    if (err) return console.log(err);
    let nombre;
    nombre = Date.now() + '.pdf';
    fs.writeFileSync('./public/tickets/lima/' + nombre, result);

    //Envia el link para acceder al archivo por la web
    res.send('http://apinode.sistemascelulosa.com:3001/tickets/lima/' + nombre);
    //res.send('http://localhost:3001/tickets/lima/' + nombre);

  });

});

module.exports = router;