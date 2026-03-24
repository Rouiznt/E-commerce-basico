import React, { useEffect, useState } from "react";
import { ProductCard } from "./componentes/ProductCard";

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar los productos");
        }
        return res.json();
      })
      .then((data) => {
        setProductos(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Cargando productos</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Productos</h1>

      <div className="productos">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

export default App;