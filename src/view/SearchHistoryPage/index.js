
import React from "react";
import './search.css'
const SearchHistoryPage = ({ searchHistory }) => (
  <div className="container-S">
    <div className="row align-items-center text-center justify-content-center">
      <div className="col-md-4">
        <div className="search-history-page">
       <h1> <span className='span1'>S</span>earch <span className="span1">H</span>istory</h1>
          <ul>
            {searchHistory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default SearchHistoryPage;
