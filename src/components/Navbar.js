import { useState } from "react";
import "./styles/Navbar.css";

import data from "../data/data.json";

function Navbar(props) {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = () => {
    /* Toggles dropdown content visibility */
    setVisible(!visible);
  };

  const handleItemClick = (e) => {
    /* Set state algorithm to clicked item and hide dropdown content */
    let algName = e.target.innerText.toLowerCase().trim();
    setVisible(!visible);
    props.setAlgorithm(algName);
  };

  return (
    <div className="Navbar">
      <ul className="nav-items">
        <li>
          <a href="/" className="logo">
            Path Finder
          </a>
        </li>
        <li>
          <button className="dropdown alg-menu" onClick={handleMenuClick}>
            Algorithm V
          </button>
        </li>
        <div
          className="dropdown-content"
          style={{ display: visible ? "flex" : "none" }}
        >
          <ul className="dropdown-items">
            {data.algorithms.map((alg, idx) => (
              <li key={idx} onClick={handleItemClick}>
                {alg.name}
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
