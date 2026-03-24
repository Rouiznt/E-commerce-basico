
import React, { useEffect, useState } from "react";
import { ProductCard } from "./componentes/ProductCard";
import { CategoryFilter } from "./componentes/CategoryFilter";

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categoria, setCategoria] = useState("all");
  const [soloDescuento, setSoloDescuento] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("");

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

  // Buscador
  const productosFiltrados = productos
    .filter((p) => categoria === "all" || p.category === categoria)
    .filter((p) => !soloDescuento || p.discountPercentage > 0)
    .filter((p) =>
      p.title.toLowerCase().includes(busqueda.toLowerCase())
    );

  // orden
  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    if (orden === "precio-asc") return a.price - b.price;
    if (orden === "precio-desc") return b.price - a.price;
    if (orden === "rating") return b.rating - a.rating;
    return 0;
  });

  const categorias = ["all", ...new Set(productos.map(p => p.category))];

  return (
    <div>
      <h1>Productos</h1>

      {/* Barra de busqueda*/}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/*  Filtro por categoría  */}
      <CategoryFilter
        categorias={categorias}
        setCategoria={setCategoria}
      />

      {/* Filtros por descuento */}
      <label>
        <input
          type="checkbox"
          checked={soloDescuento}
          onChange={(e) => setSoloDescuento(e.target.checked)}
        />
        Mostrar solo productos con descuento
      </label>

      {/* Filtro por precio de mayor a menor */}
      <select onChange={(e) => setOrden(e.target.value)}>
        <option value="">Sin ordenar</option>
        <option value="precio-asc">Precio: menor a mayor</option>
        <option value="precio-desc">Precio: mayor a menor</option>
        <option value="rating">Mejor valorados</option>
      </select>

      {/*  */}
      <div className="productos">
        {productosOrdenados.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

export default App;