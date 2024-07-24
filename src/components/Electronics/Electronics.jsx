import ProductContainer from "../ProductContainer/ProductContainer"
import React from "react"

function Electronics() {
    return (
        <div style={{maxWidth: "1500px", marginLeft: "auto", marginRight: "auto"}}>
            <ProductContainer category="electronics" />
        </div>
    )
}

export default Electronics
