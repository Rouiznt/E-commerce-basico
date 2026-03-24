import React from "react";

export const CategoryFilter = ({ categorias, setCategoria }) => {
  return (
    <div>
      {categorias.map((cat) => (
        <button key={cat} onClick={() => setCategoria(cat)}>
          {cat === "all" ? "Todas" : cat}
        </button>
      ))}
    </div>
  );
};