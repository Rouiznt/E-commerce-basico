import React from "react";

export const ProductCard = ({ producto }) => {
  return (
    <div>
      <img src={producto.thumbnail} width="120" />
      <h3>{producto.title}</h3>
      <p>${producto.price}</p>
    </div>
  );
};