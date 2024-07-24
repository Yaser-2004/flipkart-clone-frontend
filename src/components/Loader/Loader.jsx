import React from 'react'
import "./Loader.css"
import { Spinner } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {TailSpin} from "react-loader-spinner";

function Loader() {
    return (
        <div className='loader'>
            <TailSpin
                visible={true}
                height="80"
                width="80"
                color="blue"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loader
