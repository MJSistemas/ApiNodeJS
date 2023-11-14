const express = require('express');
const app = express();
const morgan=require('morgan');
 
//Configuraciones
app.set('port', process.env.PORT || 3001);
app.set('json spaces', 2)
 
//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Alojados los archivos estaticos
app.use(express.static('./public'));


//Routes
app.use(require('./routes/index'));
app.use('/api/reports', require('./api/reports'));
app.use('/api/etiquetas', require('./api/etiquetas'));
app.use('/api/tickets', require('./api/tickets'));
 
//Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});