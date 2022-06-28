import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { getFeaturedDay as getAllDays } from "../../helper/functions";
import Card from "../../components/Card";

const Days = () => {
  const [days, setDays] = useState([]);
  const [error, setError] = useState([]);
  const [search, setSearch] = useState("");

  const loadAllDays = () => {
    getAllDays()
      .then((data) => {
        if (data.error) {
          setError(error);
          console.log(error);
        } else {
          setDays(data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadAllDays();
  }, []);

  return (
    <div className="container">
      <h1></h1>
      {days.map((day, i) => {
        return (
          <div className="container" key={i}>
            <h1>Today</h1>
            <Card date={day.date_created} slug={day.slug} />
          </div>
        );
      })}
    </div>
  );
};

export default Days;
