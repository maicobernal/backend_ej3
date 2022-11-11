const express = require('express')
const moment = require('moment')
const Contenedor = require ('./carrito.js')

const app = express()
const port = process.env.PORT || 3000
const server = app.listen(port,()=>{
        console.log('Servidor corriendo en el puerto: ' + server.address().port)
    })

server.on('error', (error)=>{
    console.log(`Error en el servidor ${error}`)
})

app.get('/', (req, res)=>{
    res.send(hola)
})

const hola = `<h1>Bienvenido al escueto Mercado Virtual de Pulgas de elementos obsoletos informáticos</h1>\n
<p>Para ver los productos disponibles, haga click <a href=/productos>aquí</a></p>\n
<p><a href = "/productoRandom">Voy a tener suerte</a></p>\n
<p><a href = "/fyh">Quiero saber la hora</a></p>\n
<p><a href = "/visitas">Número de visitas</a></p>\n
`

let visitas = 0

let stock = new Contenedor('productos.txt');

 app.get('/productos', async (req, res)=> {
    const productos = await stock.getAll();
    res.send(productos)
    }
)

app.get('/productoRandom', async (req, res)=>{
    let producto = await stock.getRandom()    
    res.send(producto)
    }
)

app.get('/visitas', (req, res)=>{
    visitas++
    res.send(`La cantidad de visitas es ${visitas}`)
    }
)

app.get('/fyh', (req, res)=>{
    const fyh = moment().format('YYYY/MM/DD HH:mm:ss')
    res.send(`La hora actual es: ${fyh}`)
})

