import React, { useEffect, useState } from "react";
import { ProductCard } from "./componentes/ProductCard";
import { CategoryFilter } from "./componentes/CategoryFilter";

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categoria, setCategoria] = useState("all");
  const [soloDescuento, setSoloDescuento] = useState(false);

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

  if (loading) return <h2>Cargando productos...</h2>;
  if (error) return <h2>{error}</h2>;

  // filtros
  const productosFiltrados = productos
    .filter((p) => categoria === "all" || p.category === categoria)
    .filter((p) => !soloDescuento || p.discountPercentage > 0);

  // catgorias
  const categorias = ["all", ...new Set(productos.map(p => p.category))];

  return (
    <div>
      <h1>Productos</h1>

      {/* Filtro por categoría */}
      <CategoryFilter
        categorias={categorias}
        setCategoria={setCategoria}
      />

      {/* Filtro por descuento */}
      <label>
        <input
          type="checkbox"
          checked={soloDescuento}
          onChange={(e) => setSoloDescuento(e.target.checked)}
        />
        Mostrar solo productos con descuento
      </label>

      {/* Lista de productos */}
      <div className="productos">
        {productosFiltrados.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

export default App;