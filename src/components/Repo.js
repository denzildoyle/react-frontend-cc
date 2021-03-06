import React from "react";
import PropTypes from "prop-types";

import {timeAgo} from "../Utils";

import "./Repo.scss";

// Return template for rendering Repo component
export default function Repo(props) {
  return (
    <div className="repo">
      <div className="repo-avatar">
        <img src={props.avatar} alt={props.owner} />
      </div>
      <div className="repo-details">
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <div className="repo-info">
          <span className="label tag stars">Stars: {props.stars}</span>
          <span className="label tag issues">Issues: {props.issues}</span>
          <span className="label submitted-date">
            submitted {timeAgo(props.updateDate)} by <b>{props.owner}</b>
          </span>
        </div>
      </div>
    </div>
  );
}

// Type check the props passed to the Repo component
Repo.propTypes = {
  description: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
  issues: PropTypes.number,
  stars: PropTypes.number,
  owner: PropTypes.string,
  updateDate: PropTypes.string
};
