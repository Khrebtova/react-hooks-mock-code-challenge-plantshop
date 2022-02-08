import React from "react";

function Search({onHandleSearch}) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={(e) => onHandleSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;
