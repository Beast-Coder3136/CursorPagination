import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Kitchen",
  "Sports",
  "Beauty",
  "Toys",
  "Automotive",
  "Health",
  "Grocery",
  "Furniture",
  "Jewelry",
  "Footwear",
  "Pet Supplies",
  "Office Supplies"
];

function App() {
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([])
  const [nextCursor,setNextCursor] = useState(null) ;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(" https://cursorpagination.onrender.com")
        const data = await res.json()
        console.log(data);
        setProducts(data.products)
        setNextCursor(data.nextCursor) ;
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchProducts();
  }, [])

  const handleCategroy = async()=>{
    try {
      const res = await fetch(` https://cursorpagination.onrender.com?category=${category}`)
      const data = await res.json() 
      setProducts(data.products)
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleLoadMore = async()=>{
    try {
      const res = await fetch(` https://cursorpagination.onrender.com?category=${category}&nextCursor=${nextCursor}`)
      const data = await res.json()
      console.log(data)
      let newProducts = [...products, ...data.products] ;
      console.log(newProducts)
      setProducts(newProducts)
      setNextCursor(data.nextCursor)
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <>
      <div className='flex flex-col gap-4 p-4 w-full h-screen ' >
        <div  >
          <h1 className='font-bold text-3xl text-center' >Browse 200000+ Products</h1>
          <div className='flex gap-4'>
            <select value={category}
              className='border cursor-pointer'
              onChange={(e) => setCategory(e.target.value)}

            >
              <option value="">Select a category</option>
              {
                categories.map((item, idx) => (
                  <option key={idx} value={item}>{item}</option>
                ))
              }
            </select>
            <button className='border rounded-lg px-4 cursor-pointer' 
            onClick={handleCategroy}
            >
              Select
            </button>
          </div>
        </div>
        <div className='flex flex-col m-8 bg-slate-100 p-4 gap-8'>
          <h1 className='font-bold text-2xl text-center'  >{category ? category : "Products"}</h1>
          {
            !products?.length ? <p className='font-bold text-center ' >Fetching Products...</p>
              :
              <div className='grid gap-4  overflow-y-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {
                  products?.map((product, idx) => (

                    <div className='flex flex-col gap-2 border-2 rounded-lg p-4' 
                    key={product?._id}
                    >
                      <p className='flex gap-2'>
                        <span className='font-semibold' >Name : </span>
                        <span> {product?.name} </span>
                      </p>
                      <p className='flex gap-2'>
                        <span className='font-semibold' >Category : </span>
                        <span> {product?.category} </span>
                      </p>
                      <p className='flex gap-2'>
                        <span className='font-semibold' >Price : </span>
                        <span> {product?.price} </span>
                      </p>

                    </div>
                  ))
                }
              </div>
          }
        </div>
        <div className='flex justify-center mb-4 '>
          <button className='border-2 px-4 font-semibold rounded-lg cursor-pointer py-2'
          onClick={handleLoadMore}
          > Load More </button>
        </div>
      </div>
    </>
  )
}

export default App
