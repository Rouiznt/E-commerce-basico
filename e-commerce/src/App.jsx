import React, { useEffect, useState } from "react";
import { ProductCard } from "./componentes/ProductCard";
import { CategoryFilter } from "./componentes/CategoryFilter";

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categoria, setCategoria] = useState("all");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los productos");
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

  if (loading) return <h2>Cargando</h2>;
  if (error) return <h2>{error}</h2>;


  const productosFiltrados =
    categoria === "all"
      ? productos
      : productos.filter((p) => p.category === categoria);

  const categorias = ["all", ...new Set(productos.map(p => p.category))];

  return (
    <div>
      <h1>Productos</h1>

      <CategoryFilter
        categorias={categorias}
        setCategoria={setCategoria}
      />

      <div className="productos">
        {productosFiltrados.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

export default App;