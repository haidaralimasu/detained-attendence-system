import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Attendence } from "../";

const Card = (props) => {
  return (
    <div>
      <div class="card my-4">
        <div class="card-header">
          {moment(props.date).format("MMM DD, YYYY")}
        </div>
        <div class="card-body">
          <h5 class="card-title">
            {moment(props.date).format("dddd HH:mm:ss")}
          </h5>
          <Attendence
            style={{ marginTop: "20px", marginBottom: "20px" }}
            slug={props.slug}
          />

          <Link
            style={{ width: "100" }}
            to={`/days/${props.slug}`}
            class="btn btn-primary w-100"
          >
            Open
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
