import React from 'react';
import PropTypes from "prop-types";

const ProductList = (props) => {
    const product = props.productProps;

    return (
        <>
            <li className="list-group-item"><b>Email: </b> {product.email}<br/><b>Password: </b> {product.password}</li>
        </>
    );
};

export default ProductList;
ProductList.propTypes = {
    productProps: PropTypes.object.isRequired,
  };