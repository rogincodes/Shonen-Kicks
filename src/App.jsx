import { useState, useEffect } from "react";
import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import PageContent from "./components/PageContent";
import { SelectedShoeProvider } from "./context/SelectedShoeProvider";

function App() {
  const [shoes, setShoes] = useState([]);
  const [category, setCategory] = useState("NEW RELEASES");

  async function fetchShoes() {
    const response = await fetch("shoes.json");
    const data = await response.json();
    setShoes(data);
  }

  useEffect(() => {
    fetchShoes();
  }, []);

  return (
    <div className="App">
      <SelectedShoeProvider>
        <Header
          category={(selectedCategory) =>
            setCategory(selectedCategory.toUpperCase())
          }
        ></Header>
        <PageContent shoes={shoes} category={category}></PageContent>
      </SelectedShoeProvider>
    </div>
  );
}

export default App;
