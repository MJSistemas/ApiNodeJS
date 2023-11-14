const { Router, request } = require('express');
const router = Router();

const express = require('express');
const cors = require('cors');

router.use(cors());
router.use(express.json());

//Para guardar en PDF
const puppeteer = require('puppeteer');


const direccionresp = "http://apinode.sistemascelulosa.com:3001/etiquetaconversion/";
const direccionresppro = "http://apinode.sistemascelulosa.com:3001/etiquetaproduccion/";
//const direccionresp = "http://localhost:3001/etiquetaconversion/";

//Raiz
router.get('/', (req, res) => {
    res.json(
        {
            "status": "API Etiquetas OK"
        }
    );
  })

//Etiqueta Conversion
router.post('/etiquetaconversionmanual/:id', (req, res) => {

    console.log('DATA: ' + req.params.id);

    var llamaallink = 'http://intranetlima.sistemascelulosa.com/Conversion/ConversionEtiquetaManual.aspx?ID=' + req.params.id;

    console.log(llamaallink);



    (async () => {
      const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
      const page = await browser.newPage();

      await page.goto(llamaallink
        , {waitUntil: 'networkidle2'}
        );


      let nombre;
      nombre = Date.now() + '.pdf';

      await page.pdf({
        path: './public/etiquetaconversion/' + nombre,
        format: 'A4',
      });

      await browser.close();

      //Envia el link para acceder al archivo por la web
      res.send(direccionresp + nombre);

    })();


});

router.post('/etiquetaconversionmanualcatamarca/:id', (req, res) => {

  console.log('DATA: ' + req.params.id);

  var llamaallink = 'http://201.253.231.99/Conversion/ConversionEtiquetaManual.aspx?ID=' + req.params.id;

  console.log(llamaallink);



  (async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    await page.goto(llamaallink
      , {waitUntil: 'networkidle2'}
      );


    let nombre;
    nombre = Date.now() + '.pdf';

    await page.pdf({
      path: './public/etiquetaconversioncatamarca/' + nombre,
      format: 'A4',
    });

    await browser.close();

    //Envia el link para acceder al archivo por la web
    res.send('http://190.104.202.3/etiquetaconversioncatamarca/' + nombre);

  })();


});

//Etiqueta Produccion
router.post('/etiquetaproduccionjumbo/:id', (req, res) => {

  console.log('DATA: ' + req.params.id);

  var llamaallink = 'http://intranetlima.sistemascelulosa.com/bobinasjumbo/BobinasEtiquetaJumbo.aspx?ID=' + req.params.id;

  console.log(llamaallink);



  (async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    await page.goto(llamaallink
      , {waitUntil: 'networkidle2'}
      );


    let nombre;
    nombre = Date.now() + '.pdf';

    await page.pdf({
      path: './public/etiquetaproduccion/' + nombre,
      format: 'A4',

    });

    await browser.close();

    //Envia el link para acceder al archivo por la web
    res.send(direccionresppro + nombre);

  })();


});

module.exports = router;