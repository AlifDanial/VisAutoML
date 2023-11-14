import axios from "axios";
import Cookies from "js-cookie";
import { dummyData } from "./dummyData";
import { BACKEND_BASE_URL } from "../config/config.js";

export const reset = () => (dispatch, getState) => {
  dispatch({ type: "RESET" });
};

export const addNewModel = (name, type) => (dispatch, getState) => {
  dispatch({ type: "ADD_NEW_MODEL", payload: { name, type } });
};

export const addDataSet = (file) => (dispatch, getState) => {
  dispatch({ type: "ADD_FILE", payload: file.name });
};

export const getReview = (file) => (dispatch, getState) => {
  dispatch({ type: "LOADING" });
  const csrfToken = Cookies.get("csrftoken");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-CSRFToken": csrfToken,
    },
  };

  const formData = new FormData();
  formData.append("data_set", file);
  formData.append("model_name", getState().model.name);
  formData.append("algorithm_name", "AL");
  formData.append("overall_score", "0");
  formData.append(
    "model_type",
    getState().model.type === "Regression" ? "RG" : "CL"
  );


   axios
     .post(BACKEND_BASE_URL, formData, config)
     .then((res) => {
       dispatch({ type: "GET_REVIEW_SUCCESS", payload: res.data });
//         dispatch({ type: "GET_REVIEW_SUCCESS", payload: dummyData });
     })
     .catch((err) => {
       dispatch({ type: "GET_REVIEW_FAIL", payload: err.response.data });
     });
};

export const deleteModel = () => (dispatch, getState) => {
  dispatch({ type: "LOADING" });
  const id = getState().model.model.id;
  const csrfToken = Cookies.get("csrftoken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
  };
  axios
    .delete(`api/${id}/`, config)
    .then((res) => {
      dispatch({ type: "DELETE_MODEL_SUCCESS" });
    })
    .catch((err) => dispatch({ type: "DELETE_MODEL_FAIL" }));
};

export const saveDescription = (description) => (dispatch, getState) => {
  dispatch({ type: "LOADING" });
  const csrfToken = Cookies.get("csrftoken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
  };
  const descr = JSON.stringify({ description });
  const id = getState().model.description.id;
  axios
    .patch(BACKEND_BASE_URL+`description/${id}/`, descr, config)
    .then((res) => {
      dispatch({ type: "SAVE_DESCRIPTION_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const submitModel =
  ({ elements, auto, algo, unit, label0, label1, split }) =>
  (dispatch, getState) => {
    const model = getState().model.model.id;
    const id_column = elements["ID Column"][0]
      ? elements["ID Column"][0].content
      : "";
    const prediction_column = elements["Prediction Column"][0]
      ? elements["Prediction Column"][0].content
      : "";
    const not_to_use_columns = elements["Columns not to use"].map(
      (e) => e.content
    );
    const projectTitle = getState().model.name;
    const auto1 = auto ? 1 : 0;
    const description = getState().model.description.id;
    let data = "";
    dispatch({ type: "LOADING" });
    const csrfToken = Cookies.get("csrftoken");
    const config = {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    }
    }
    if (getState().model.type === "Regression") {
      data = JSON.stringify({
        model,
        id_column,
        prediction_column,
        not_to_use_columns,
        projectTitle,
        algo,
        auto: auto1,
        unit,
        description,
        split,
      });
    } else {
      data = JSON.stringify({
        model,
        id_column,
        prediction_column,
        not_to_use_columns,
        projectTitle,
        algo,
        auto,
        label0,
        label1,
        description,
        split,
      });
    }
    axios
    .post(BACKEND_BASE_URL+`flask/`, data, config)
    .then((res) => {
      dispatch({ type: "GET_REVIEW_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
  };
