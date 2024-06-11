import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'

function App(){

  const [products, setProducts] = useState([])
  useEffect [()=>{
    axios("https://localhost:8080/api/products")
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  },[]]

  return (
    <main className='min-h-screen flex flex-col'>
      <NavBar/>
      <h1 className='text-[20px]'>THE ANDROID'S DUNGEON</h1>
      <section className='flex-grow'>
        <article className='bg-yellow-100 h-[250px] w-[400px] p-4 m-4'>
          <h3>{products[0].title}</h3> {products[0].price}
          <button className='bg-white p-2 m-2'>BUY</button>
        </article>
      </section>
      <Footer/>
    </main>
  )
}
export default App
