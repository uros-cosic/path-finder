import "./styles/Legend.css";
import "./styles/nodes.css";

import data from "../data/data.json";
import { useEffect } from "react";

function Legend(props) {
  const displayDescriptionText = (alg) => {
    /* Display algorithm description text based on currently selected algorithm. Show default text if there is no algorithm selected. */
    const descriptionTextEl = document.querySelector(".description-text");
    if (!alg) {
      descriptionTextEl.innerHTML = "Pick an Algorithm to Visualize It!";
      return;
    }
    for (let obj of data.algorithms) {
      let name = obj.name.toLowerCase();
      if (name === alg) {
        descriptionTextEl.innerHTML = `<p class="bold">${obj.name}</p>&nbsp;${obj.description}`;
        return;
      }
    }
  };

  useEffect(() => {
    /* Set new algorithm description every time algorithm changes */
    displayDescriptionText(props.algorithm);
  }, [props.algorithm]);

  return (
    <div className="Legend">
      <div className="nodes-legend">
        <ul className="nodes-legend-items">
          <li>
            <div className="start" />
            <p>Start Node</p>
          </li>
          <li>
            <div className="target" />
            <p>Target Node</p>
          </li>
          <li>
            <div className="unvisited" />
            <p>Unvisited Node</p>
          </li>
          <li>
            <div className="visited" />
            <p>Visited Node</p>
          </li>
          <li>
            <div className="wall" />
            <p>Wall Node</p>
          </li>
          <li>
            <div className="path" />
            <p>Path Node</p>
          </li>
        </ul>
      </div>
      <div className="description">
        <p className="description-text"></p>
      </div>
    </div>
  );
}

export default Legend;
