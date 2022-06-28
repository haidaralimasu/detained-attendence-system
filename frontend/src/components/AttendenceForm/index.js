import React from "react";
import { createAttendence } from "../../helper/functions";
import { notifyError, notifySuccess } from "../../helper/notifications";
import { useNavigate } from "react-router-dom";

const AttendenceForm = ({ slug }) => {
  const router = useNavigate();

  const onSubmit = () => {
    createAttendence({ comment: "Present" }, slug)
      .then((data) => {
        console.log(data);
        window.location.reload(false);
        notifySuccess("Done");
      })
      .catch((error) => notifyError("Something went wrong"));
  };

  return (
    <div>
      <button className="btn btn-primary w-100 my-4" onClick={onSubmit}>
        Present
      </button>
    </div>
  );
};

export default AttendenceForm;
