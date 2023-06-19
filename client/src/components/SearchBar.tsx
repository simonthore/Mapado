import { useEffect } from "react";
import IState from "../interfaces/IState";

interface SearchbarProps {
  currentUrl: string;
  handleChange: any;
  state: IState;
}

export default function SearchBar({
  currentUrl,
  handleChange,
  state,
}: SearchbarProps) {
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
