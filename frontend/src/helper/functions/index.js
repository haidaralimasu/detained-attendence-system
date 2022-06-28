import axios from "axios";
import { API } from "../../config";
import { isAuthenticated } from "../auth";

export const getAllDays = async () => {
  try {
    const res = await axios.get(`${API}api/days/`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getDay = async (slug) => {
  try {
    const res = await axios.get(`${API}api/days/${slug}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getFeaturedDay = async () => {
  try {
    const res = await axios.get(`${API}api/days/featured`);
    console.log(res);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getStudents = async (slug) => {
  try {
    const res = await axios.get(`${API}api/student/get-attendences/${slug}`);
    return res.data.students;
  } catch (err) {
    return err;
  }
};

export const createAttendence = async (comment, slug) => {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt")).access}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(comment);
  try {
    const res = await axios.post(
      `http://localhost:8000/api/student/create-attendence/${slug}`,
      body,
      config
    );
    console.log(JSON.parse(localStorage.getItem("jwt")).access);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
