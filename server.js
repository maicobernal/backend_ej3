const express = require('express')
const app = express()
const {engine}= require('express-handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutDir: "/views/layouts",
  }))
 
app.set('view engine', 'hbs');
app.set('views', "./views");

const productos = require('./productos.js')

app.use(express.static('public'));
app.use ('/api/productos', productos)

app.get("/",(req, res) => {
    try {
        res.render('./construccion.hbs')
    } catch (err) {
        res.status(500).send('Error en el proceso GET :' + err)
    }
}) 

const port = 8080
const server = app.listen(port,()=>{
        console.log('Servidor corriendo en el puerto: ' + server.address().port)
    })

server.on('error', (error)=>{
    console.log(`Error en el servidor ${error}`)
})

