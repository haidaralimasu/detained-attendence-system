import moment from "moment";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Attendence, AttendenceForm } from "../../components";
import { getDay } from "../../helper/functions";

const DayDetails = () => {
  const [day, setDay] = useState({});
  const [error, setError] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    loadDay();
  }, []);

  const loadDay = () => {
    getDay(slug)
      .then((data) => {
        if (data.error) {
          setError(error);
          console.log(error);
        } else {
          setDay(data);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container my-4">
      <h6 class="display-6">{moment(day.date_created).format("dddd DD-MM")}</h6>

      <AttendenceForm slug={slug} />
      <Attendence slug={slug} />
    </div>
  );
};

export default DayDetails;
