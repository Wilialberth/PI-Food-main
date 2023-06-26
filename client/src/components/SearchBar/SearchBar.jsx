import { useState } from "react";
import style from "./SearchBar.module.css"

export default function SearchBar({ onSearch }) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
    setErrorMessage("");
  };

  const handleSearch = () => {
    if (name === "") {
      setErrorMessage("Por favor ingresar el nombre de la receta");
    } else {
      onSearch(name);
      setName("");
    }
  };

  return (
    <div>
      <input type="search" onChange={handleChange} value={name} className={style.input}/>
      <button onClick={handleSearch} className={style.search}>Search</button>
      {errorMessage && <p className={style.error}>{errorMessage}</p>}
    </div>
  );
}