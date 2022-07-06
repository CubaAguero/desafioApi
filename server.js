const express = require('express');
const app = express();
const routerProductos = express.Router()


const Container = require('./container')
let container1 = new Container("productos.txt")
//container1.createFile()

app.use('/api/productos', routerProductos)
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended: true}))
app.use('/api', express.static('public'))

routerProductos.get('/', async (req, res) => {
    let data = await container1.getAll()
    res.json(data)
})

routerProductos.get('/:id', async (req, res) => {
    let itemId = parseInt(req.params.id)
    const item = await container1.getById(itemId)
    res.json(item)
})

routerProductos.post('/guardar', async (req, res) => {
    let itemId = await container1.save(req.body.title, req.body.price, req.body.thumbnail)
    res.json(itemId)
})


routerProductos.put('/:id', async (req, res) => {
    let itemId = parseInt(req.params.id)
    const respuesta = await container1.put(itemId, req.body)
    res.json(respuesta)
})

routerProductos.delete('/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    const resultado = await container1.deleteById(id)
    res.json(resultado)
})


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error!', err => console.log(`Error en servidor ${err}`))




