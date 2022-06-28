import moment from "moment";
import React, { useState, useEffect } from "react";
import { getStudents } from "../../helper/functions";

const Attendence = (props) => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAllStudents();
  }, []);

  console.log(students);

  const loadAllStudents = () => {
    getStudents(props.slug)
      .then((data) => {
        if (data.error) {
          setError(error);
          console.log(error);
        } else {
          setStudents(data);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {students.map((student, i) => {
        return (
          <div key={i}>
            {student.is_present ? (
              <div class="alert alert-success" role="alert">
                <h6>Name: {student.user}</h6>
                <h6>Present: {student.is_present ? "Yes" : "No"}</h6>
                <h6>
                  Submitted at: {moment(student.date_created).format("HH:mm")}
                </h6>
              </div>
            ) : (
              <div class="alert alert-danger" role="alert">
                <h6>Name: {student.user}</h6>
                <h6>Present: {student.is_present ? "Yes" : "No"}</h6>
                <h6>
                  Submitted at: {moment(student.date_created).format("HH:mm")}
                </h6>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Attendence;
