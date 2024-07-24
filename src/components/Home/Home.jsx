import React from 'react';
import "./Home.css";
import Category from '../Category/Category';
import ImageSlider from './ImageSlider/ImageSlider';
import ItemContainer from '../ItemContainer/ItemContainer';
import ItemContainer2 from '../ItemContainer2/ItemContainer2';

function Home() {
    return (
        <div className='home'>
            <Category />
            <ImageSlider />
            <ItemContainer />
            <ItemContainer2 />
        </div>
    )
}

export default Home
