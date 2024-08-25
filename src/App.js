import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [products, setproducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();
    setproducts(data.products);
    pagesNumber(data.products.length / 10);
  };
  const [pagesArray, setPagesArray] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);

  function pagesNumber(length) {
    let arr = [];
    for (let index = 0; index < length; index++) {
      arr.push(index);
    }
    setPagesArray(arr);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function pageSelectHandler(page) {
    if (page > 10 || page < 1) {
      return;
    }
    setSelectedPage(page);
  }
  console.log(products);

  return (
    <div>
      <div className="products">
        {products
          .slice(selectedPage * 10 - 10, selectedPage * 10)
          .map((prod, i) => (
            <span className="product__single">
              <img src={prod.images[0]}></img>
              <span className="text">
                {prod.title}
                {i + 1}
              </span>
            </span>
          ))}
      </div>
      <div className="paginagtion">
        <span
          onClick={() => pageSelectHandler(selectedPage - 1)}
          className={selectedPage == 1 ? "disable" : ""}
        >
          ⬅️
        </span>
        {pagesArray.map((_, i) => (
          <span
            onClick={() => pageSelectHandler(i + 1)}
            className={i + 1 == selectedPage ? "paginagtion__selected" : ""}
          >
            {i + 1}
          </span>
        ))}
        <span
          className={selectedPage == 10 ? "disable" : ""}
          onClick={() => pageSelectHandler(selectedPage + 1)}
        >
          ➡️
        </span>
      </div>
    </div>
  );
}
