import React, {useEffect, useState} from 'react'
//import axios from "axios"
import ItemCard from '../ItemCard/ItemCard';
import "./ProductContainer.css"
import axios from "axios"

function ProductContainer({category}) {
    const [productItems, setProductItems] = useState([]);

    async function fetchData() {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
            setProductItems(response.data);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {fetchData()}, [])

    return (
        <div className='items__div'>
            {productItems.map(item => {
                return <ItemCard key={item.id} id={item.id} title={item.title} price={item.price} description={item.description} category={item.category} image={item.image} rate={item.rating.rate} />;
            })}
        </div>
    )
}

export default ProductContainer
