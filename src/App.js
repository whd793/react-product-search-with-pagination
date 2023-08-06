import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const total = 100;
  const end = currentPage * itemsPerPage;
  const start = end - itemsPerPage;

  const fetchdata = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=${total}`);
    const data = await res.json();
    setProducts(data.products);
  };

  // const slicedata = () => {
  //   if (products && products.length > 1) {
  //     products.slice(start, end);
  //   }
  // };

  useEffect(() => {
    fetchdata();
    console.log(products);
  }, [currentPage]);

  return (
    <div>
      <div className="product">
        {products &&
          products.slice(start, end).map((n) => {
            return (
              <div>
                <img className="product__image" src={n.thumbnail} />
                <span className="product__title">{n.title}</span>
              </div>
            );
          })}
      </div>
      <Pagination
        start={start}
        end={end}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={total}
      />
    </div>
  );
}

const Pagination = ({
  start,
  end,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  total
}) => {
  // let total = 1000;
  let pageButtons = [];

  for (let i = 0; i < Math.ceil(total / itemsPerPage); i++) {
    pageButtons.push(i + 1);
  }

  let leftwindow = currentPage - 3;
  let rightwindow = currentPage + 2;

  if (leftwindow < 1) {
    leftwindow = 0;
    rightwindow = itemsPerPage;
  }

  const handleClick = (i) => {
    pageButtons = [];
    if (i <= 1) {
      setCurrentPage(1);
    } else if (i > Math.ceil(total / itemsPerPage)) {
      setCurrentPage(Math.ceil(total / itemsPerPage));
    } else {
      setCurrentPage(i);
    }
  };

  // console.log(pageButtons);

  return (
    <div className="paginationbtn">
      <div
        className="btn"
        onClick={() => {
          handleClick(1);
        }}
      >
        {" "}
        First{" "}
      </div>
      <div
        className="btn"
        onClick={() => {
          handleClick(currentPage - 1);
        }}
      >
        {" "}
        Prev{" "}
      </div>
      {pageButtons.slice(leftwindow, rightwindow).map((n, i) => {
        return (
          <div
            className={currentPage == n ? "btn active" : "btn"}
            onClick={() => {
              handleClick(n);
            }}
          >
            {n}
          </div>
        );
      })}
      <div
        className="btn"
        onClick={() => {
          handleClick(currentPage + 1);
        }}
      >
        {" "}
        Next{" "}
      </div>
      <div
        className="btn"
        onClick={() => {
          handleClick(Math.ceil(total / itemsPerPage));
        }}
      >
        {" "}
        Last{" "}
      </div>
    </div>
  );
};
