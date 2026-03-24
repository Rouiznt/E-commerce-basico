import React from "react";

export const ProductCard = ({ producto }) => {
  const { title, price, discountPercentage, rating, thumbnail } = producto;

  const precioConDescuento = (
    price - (price * discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="card">
      <img src={thumbnail} alt={title} width="150" />

      <h3>{title}</h3>

      {/* Precio  */}
      <p style={{ textDecoration: "line-through" }}>
        ${price}
      </p>

      {/* Precio con descuento */}
      <p>
        ${precioConDescuento}
      </p>

      {/* Porcentaje */}
      <p>-{discountPercentage}%</p>

      {/* calificacion */}
      <p>⭐ {rating}</p>
    </div>
  );
};