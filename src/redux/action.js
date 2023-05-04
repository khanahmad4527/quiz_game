import { AUTH_USER, UPDATE_SCORE, GET_ALL_USER } from "./types";
import axios from "axios";

export const authUser =
  (name, questions, category, level) => async (dispatch) => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${level}&type=multiple`
      );

      for (let k = 0; k < response.data.results.length; k++) {
        let mcq = [
          ...response.data.results[k].incorrect_answers,
          response.data.results[k].correct_answer,
        ];

        for (let i = mcq.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [mcq[i], mcq[j]] = [mcq[j], mcq[i]];
        }

        response.data.results[k].mcq = mcq;
      }

      dispatch({
        type: AUTH_USER,
        payload: { data: response.data.results, name },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const addNewUser = (userData) => async (dispatch) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/dashboard`,
      userData
    );
  } catch (error) {
    console.log(error);
  }
};

export const getAllUser = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/dashboard`
    );
    dispatch({ type: GET_ALL_USER, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateScore = (data) => (dispatch) => {
  dispatch({ type: UPDATE_SCORE, payload: data });
};
