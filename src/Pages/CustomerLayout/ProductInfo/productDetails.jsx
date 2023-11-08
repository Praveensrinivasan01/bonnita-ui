import React from 'react'
import { useParams } from "react-router-dom";
import ProductInfo from './ProductInfo';
import TabSection from './TabSection';
import Latest from './Latest';
import '../../../Styles/ProductDetailsPage/Product.css'
const ProductDetails = () => {
  const { id } = useParams();
  return (
    <>
    <ProductInfo/>
      <TabSection id={id} />
      <Latest />
    </>
  )
}

export default ProductDetails