import React from "react";
import PropTypes from "prop-types";
import Accordian from "../Accordian/Accordian";
import { OkrObj } from "../../utility/interface";
import "./ParentObjective.css";

const ParentObj = ({ node }: any) => {
  return (
    <Accordian title={node.title}>
      <ol className="subList">
        {node.children &&
          node.children.map((subitem: OkrObj) => (
            <li key={subitem.id} className="subList_item">
              {subitem.title}
            </li>
          ))}
      </ol>
    </Accordian>
  );
};

ParentObj.propTypes = {
  node: PropTypes.object,
};

export default ParentObj;
