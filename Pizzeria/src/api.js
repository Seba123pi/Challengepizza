const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors()); 

let orders = [];

// Cargar datos de pizzas desde el archivo JSON
const pizzasData = fs.readFileSync('example-pizzas.json');
const pizzas = JSON.parse(pizzasData);

// Endpoint para obtener la lista de pizzas
app.get('/api/pizzas', (req, res) => {
    // Cargar los datos de las pizzas desde el archivo JSON
    const pizzasData = fs.readFileSync('example-pizzas.json');
    const pizzas = JSON.parse(pizzasData);
    res.json(pizzas);
});


app.get('/api/orders', (req, res) => {
    res.json(orders);
});
// Endpoint para obtener los detalles de un pedido individual
app.get('/api/orders/:id', (req, res) => {
    const orderId = req.params.id;
    const order = orders.find(order => order.id === orderId);
    if (!order) {
        res.status(404).json({ error: 'Pedido no encontrado' });
    } else {
        res.json(order);
    }
});

// Endpoint para crear un nuevo pedido
app.post('/api/orders', (req, res) => {
    const newOrder = req.body;
    orders.push(newOrder);
    res.status(201).json(newOrder); // Devuelve el nuevo pedido creado
});


app.listen(PORT, () => {
    console.log(`Servidor API de pedidos escuchando en el puerto ${PORT}`);
});