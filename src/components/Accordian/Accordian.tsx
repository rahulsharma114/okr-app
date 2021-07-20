import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Accordian.css";

interface AccordianProps {
  title: string;
  children: any;
}

const Accordian = ({ title, children }: AccordianProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordian">
      <div className="accordianItem">
        <div className="accordianTitle" onClick={() => setIsActive(!isActive)}>
          <div className="accordianToggleIcon">{isActive ? "-" : "+"}</div>
          <div>{title}</div>
        </div>
        {isActive && <div className="accordianContent">{children}</div>}
      </div>
    </div>
  );
};

Accordian.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

export default Accordian;
