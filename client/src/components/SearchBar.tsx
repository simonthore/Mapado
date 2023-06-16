import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function SearchBar({ currentUrl, handleChange, state }) {
  useEffect(() => {
    document.body.style.overflow = "auto";
  });

  return currentUrl === "/cities-list" ? (
    <>
      <div className="search-input">
        <form>
          <input
            value={state.query}
            onChange={handleChange}
            placeholder="Rechercher une ville..."
            type="search"
          ></input>
        </form>
      </div>
    </>
  ) : (
    <></>
  );
}
