import React from 'react';
import "./ImageSlider.css";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";

function ImageSlider() {

    const images = [
        "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/3a0edbfa89f89763.jpg?q=20",
        "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/f0d00994e1c3cb28.jpg?q=20",
        "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/9384b37a848c5e60.jpg?q=20",
    ];

    const buttonStyle = {
        width: "30px",
        background: 'none',
        border: '0px'
    };
    
    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}><TfiArrowCircleLeft style={{fontSize: "xx-large", color: "white", width: "40px"}} /><path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z"/></button>,
        nextArrow: <button style={{ ...buttonStyle }}><TfiArrowCircleRight style={{fontSize: "xx-large", color: "white", paddingRight: "10px", width: "40px"}} /><path d="M512 256L270 42.6v138.2H0v150.6h270v138z"/></button>
    }

    return (
        <div className='image__slider'>
            <Slide {...properties}>
                <div className="each-slide-effect">
                    <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                    </div>
                </div>
                <div className="each-slide-effect">
                    <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                    </div>
                </div>
                <div className="each-slide-effect">
                    <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                    </div>
                </div>
            </Slide>

        </div>
    )
}

export default ImageSlider
