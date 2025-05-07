import { useState, useEffect } from "react";
import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import PageContent from "./components/PageContent";
import { SelectedShoeProvider } from "./context/SelectedShoeProvider";
import { CartItemsProvider } from "./context/CartItemsProvider";
import { UserProvider } from "./context/UserProvider";
import Footer from "./components/Footer";

function App() {
  const [shoes, setShoes] = useState([]);
  const [category, setCategory] = useState("NEW RELEASES");

  // Fetch shoes data from JSON file and set is in state
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
      {/* Allows the user to be accessed by any component within the provider */}
      <UserProvider>
        {/* Allows the selected shoe to be accessed by any component within the provider */}
        <SelectedShoeProvider>
          {/* Allows the cart items to be accessed by any component within the provider */}
          <CartItemsProvider>
            <Header
              shoes={shoes}
              category={(selectedCategory) =>
                setCategory(selectedCategory.toUpperCase())
              }
            ></Header>
            <PageContent shoes={shoes} category={category}></PageContent>
            <Footer></Footer>
          </CartItemsProvider>
        </SelectedShoeProvider>
      </UserProvider>
    </div>
  );
}

export default App;
