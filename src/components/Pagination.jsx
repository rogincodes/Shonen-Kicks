import { useState, useEffect } from "react";
import "../styles.css";

export default function Pagination({ shoes, currentShoes }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const shoesPerPage = 10; // Number of shoes to display per page
  // Calculate the total number of pages based on the number of shoes and shoes per page
  const totalPages = Math.ceil(shoes.length / shoesPerPage);
  const indexOfLastShoe = currentPage * shoesPerPage;
  const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
  const currentItems = shoes.slice(indexOfFirstShoe, indexOfLastShoe);

  // Function to show or hide the previous button based on the current page and the total pages
  const showFirstPage = () => {
    if (totalPages >= 3 && currentPage >= 3) {
      setShowPrev(true);
    } else {
      setShowPrev(false);
    }
  };

  // Function to show or hide the next button based on the current page and the total pages
  const showLastPage = () => {
    if (totalPages > 2 && currentPage < totalPages) {
      setShowNext(true);
    } else {
      setShowNext(false);
    }
  };

  // Function to change the current page based on the user's choice
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

  // Effect to update the current page to 1 when the total pages change
  // This ensures that the pagination resets to the first page when the number of shoes changes
  useEffect(() => {
    setCurrentPage(1);
  }, [totalPages]);

  // Effect to update the current shoes displayed and pagination buttons based on the current page
  useEffect(() => {
    currentShoes(currentItems);
    showFirstPage();
    showLastPage();
  }, [shoes, currentPage, totalPages]);

  return (
    <div className="pagination-wrap">
      {/* Display the previous button and the first page number if applicable */}
      {showPrev && (
        <div className="pagination-arrows">
          <button onClick={() => changePage("prev")}>
            <img src="icons/previous.png" alt="Previous" />
          </button>
          <button onClick={() => changePage(1)}>1</button>
          <span>...</span>
        </div>
      )}
      {/* Display next button if applicable */}
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
      {/* Display the next button and the last page number if applicable */}
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
