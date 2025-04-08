import { useState, useEffect } from "react";
import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import PageContent from "./components/PageContent";

function App() {
  const [shoes, setShoes] = useState([]);
  const [category, setCategory] = useState("NEW RELEASES");

  useEffect(() => {
    fetch("shoes.json")
      .then((response) => response.json())
      .then((data) => setShoes(data));
  }, []);

  return (
    <div className="App">
      <Header
        category={(selectedCategory) =>
          setCategory(selectedCategory.toUpperCase())
        }
      ></Header>
      <PageContent shoes={shoes} category={category}></PageContent>
    </div>
  );
}

export default App;
