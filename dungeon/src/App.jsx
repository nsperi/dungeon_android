import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:8080/api/products")
      .then(res => {
        console.log(res.data); // Verifica los datos recibidos en la consola
        setProducts(res.data); // Actualiza el estado con los productos recibidos
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <main className='min-h-screen flex flex-col'>
      <NavBar />
      <h1 className='text-[20px]'>THE ANDROID'S DUNGEON</h1>
      <section className='flex-grow'>
        {products.length > 0 ? (
          <article className='bg-yellow-100 h-[250px] w-[400px] p-4 m-4'>
            <h3>{products[0].title}</h3>
            <p>{products[0].price}</p>
            <button className='bg-white p-2 m-2'>BUY</button>
          </article>
        ) : (
          <div>Loading products...</div>
        )}
      </section>
      <Footer />
    </main>
  );
}

export default App;
