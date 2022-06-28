import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { getAllDays } from "../../helper/functions";
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

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filterDays = days.filter((day) =>
    day.title.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    loadAllDays();
  }, []);

  return (
    <div className="container">
      <div className="container">
        <h1>History</h1>

        <div class="form-group">
          <input
            onChange={handleChange}
            placeholder="search day"
            class="form-control"
          />
        </div>
      </div>
      {filterDays.map((day, i) => {
        return (
          <div className="container" key={i}>
            <Card date={day.date_created} slug={day.slug} />
          </div>
        );
      })}
    </div>
  );
};

export default Days;
