import React from 'react';
import { Link } from 'react-router-dom';
import "./Category.css"

function Category() {
    return (
        <div className='category__section'>
            <div className='categories'>
                <div className='electronics'>
                    <Link to="/electronics">
                        <img src="https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg" alt="" />
                        <p>Electronics</p>
                    </Link>
                </div>
                <div className='jewelery'>
                    <Link to="/jewelery">
                        <img src="https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg" alt="" />
                        <p>Jewelery</p>
                    </Link>
                </div>
                <div className='mens_clothing'>
                    <Link to="/men's clothing">
                        <img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" alt="" />
                        <p>Men's Clothing</p>
                    </Link>
                </div>
                <div className='womens_clothing'>
                    <Link to="/women's clothing">
                        <img src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg" alt="" />
                        <p>Women's Clothing</p>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Category;
