import { useState, useEffect } from "react";
import "../styles.css";

export default function Pagination({ shoes, currentShoes }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const shoesPerPage = 10;

  const totalPages = Math.ceil(shoes.length / shoesPerPage);
  const indexOfLastShoe = currentPage * shoesPerPage;
  const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
  const currentItems = shoes.slice(indexOfFirstShoe, indexOfLastShoe);

  const showFirstPage = () => {
    if (totalPages >= 3 && currentPage >= 3) {
      setShowPrev(true);
    } else {
      setShowPrev(false);
    }
  };

  const showLastPage = () => {
    if (totalPages > 2 && currentPage < totalPages) {
      setShowNext(true);
    } else {
      setShowNext(false);
    }
  };

  const changePage = (choice) => {
    if (choice === "prev") {
      setCurrentPage(currentPage - 1);
    } else if (choice === "next") {
      setCurrentPage(currentPage + 1);
    } else if (choice === 2) {
      setCurrentPage(2);
    } else if (choice === 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(totalPages);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [totalPages]);

  useEffect(() => {
    currentShoes(currentItems);
    showFirstPage();
    showLastPage();
  }, [shoes, currentPage, totalPages]);

  return (
    <div className="pagination-wrap">
      {showPrev && (
        <div className="pagination-arrows">
          <button onClick={() => changePage("prev")}>
            <img src="icons/previous.png" alt="Previous" />
          </button>
          <button onClick={() => changePage(1)}>1</button>
          <span>...</span>
        </div>
      )}
      {currentPage === 2 && totalPages != 2 && (
        <div className="pagination-arrows">
          <button onClick={() => changePage("prev")}>
            <img src="icons/previous.png" alt="Previous" />
          </button>
        </div>
      )}
      <button
        className={`page-number ${
          currentPage === 1 || totalPages != 2 ? "active" : ""
        }`}
        onClick={() => changePage(totalPages === 2 ? 1 : currentPage)}
      >
        {totalPages === 2 ? 1 : currentPage}
      </button>
      {totalPages === 2 && (
        <button
          className={`page-number ${currentPage === 2 ? "active" : ""}`}
          onClick={() => changePage(2)}
        >
          2
        </button>
      )}
      {showNext && (
        <div className="pagination-arrows">
          <span>...</span>
          <button onClick={() => changePage(totalPages)}>{totalPages}</button>
          <button onClick={() => changePage("next")}>
            <img src="icons/next.png" alt="Next" />
          </button>
        </div>
      )}
    </div>
  );
}
