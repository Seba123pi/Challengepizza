import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para recuperar pedidos del servidor.
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/pizzas');
        setPizzas(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
        setLoading(false);
      }
    };

    fetchOrders();
    fetchPizzas();
  }, []);

  const handlePizzaSelect = (pizza) => {
    setSelectedPizza(pizza);
  };

  const handleOrderSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/orders', selectedPizza);
      console.log('Order submitted successfully!');
      fetchOrders();
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#6b03d3' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Pizzeria </h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '0 0 45%', backgroundColor: '#c6a7ff', padding: '20px', borderRadius: '5px' }}>
          <h2 style={{ marginBottom: '10px', color: '#333' }}>Menú</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {pizzas.map((pizza) => (
                <li
                  key={pizza.name}
                  onClick={() => handlePizzaSelect(pizza)}
                  style={{
                    cursor: 'pointer',
                    padding: '10px',
                    marginBottom: '5px',
                    backgroundColor: selectedPizza === pizza ? '#1fc9d0' : 'transparent',
                    borderRadius: '3px',
                    transition: 'background-color 0.3s',
                  }}
                >
                  <strong>{pizza.name}</strong> - ${pizza.price}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ flex: '0 0 45%', backgroundColor: '#c6a7ff', padding: '20px', borderRadius: '5px' }}>
          {selectedPizza && (
            <div>
              <h2 style={{ marginBottom: '10px', color: '#333' }}>Pizza seleccionada:</h2>
              <p><strong>Name:</strong> {selectedPizza.name}</p>
              <p><strong>Precio:</strong> ${selectedPizza.price}</p>
              <button onClick={handleOrderSubmit} style={{ backgroundColor: '#007bff', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Enviar pedido</button>
            </div>
          )}
        </div>
      </div>
      <div>
        <h2 style={{ marginTop: '20px', marginBottom: '10px', color: '#333' }}>Historial de pedidos</h2>
        {orders.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {orders.map((order) => (
              <li key={order.id} style={{ marginBottom: '10px', backgroundColor: '#c6a7ff', padding: '10px', borderRadius: '3px' }}>
            
                <strong>Pizza:</strong> {order.name}<br />
                <strong>Precio:</strong> ${order.price}<br />
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders yet</p>
        )}
      </div>
    </div>
  );
};


export default App;
