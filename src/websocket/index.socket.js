//import { io } from '../../server.js'
import productManager from "../data/mongo/managers/productsManager.mongo.js";

async function socketCallback (socket) {

    console.log(`Cliente ${socket.id} connected.`)

    socket.emit('products', await productManager.read())
    //socket.emit('users', await usersManager.read())

    socket.on('createProduct', async (data) => {
        await productManager.create(data)
        socket.emit('products', await productsManager.read())
    })

    socket.on('register', async (data) => {
        await usersManager.create(data)
        socket.emit('users', await usersManager.read())
    })
}

export default socketCallback