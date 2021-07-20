import React, { useState, useEffect } from "react";
import ParentObj from "./components/ParentObjective/ParentObjective";
import { OkrObj } from "./utility/interface";
import "./App.css";

const App = () => {
  const [objectives, setObjectives] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getOKRs();
    // eslint-disable-next-line
  }, []);

  const getOKRs = () => {
    return fetch("https://okrcentral.github.io/sample-okrs/db.json", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) return response.json();
        setError(
          "Something went wrong while requesting for objectives! Try again later."
        );
      })
      .then((result) => {
        let trandformedData = transformData(result.data, "");
        setObjectives(trandformedData);
        setFilteredData(trandformedData);
        let filtersArr = [
          ...Array.from(
            new Set(result.data.map((item: OkrObj) => item.category))
          ),
        ];
        setFilters(filtersArr as any);
      })
      .catch((err) => setError("Something went wrong!"));
  };

  const transformData = (nodes: OkrObj[], parentId: string): any => {
    return nodes
      .filter((node) => node.parent_objective_id === parentId)
      .reduce(
        (tree: OkrObj[], node: OkrObj) => [
          ...tree,
          {
            ...node,
            children: transformData(nodes, node.id),
          },
        ],
        []
      );
  };

  const onSelectHandler = (category: string) => {
    console.log("chnaged", category);
    if (category === "none") {
      setFilteredData(objectives);
    } else {
      setFilteredData(
        objectives.filter((item: any) => item.category === category)
      );
    }
  };

  return error ? (
    <div>{error}</div>
  ) : (
    <div className="App">
      <div className="filterSelect">
        <div className="filterLabel">Filters: </div>
        <select
          name="filterSelect"
          onChange={(event) => onSelectHandler(event.target.value)}
        >
          <option selected value="none">
            None
          </option>
          {filters &&
            filters.map((item: string) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
      </div>
      <ol className="list">
        {filteredData &&
          filteredData.map((item: OkrObj) => (
            <li key={item.id}>
              <ParentObj key={item.id} node={item}></ParentObj>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default App;
