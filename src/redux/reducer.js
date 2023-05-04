import { AUTH_USER, GET_ALL_USER, UPDATE_SCORE } from "./types";

const initState = {
  isAuth: false,
  questions: [],
  userAnsweredQuestions: {},
  userName: "",
  allUser: [],
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case AUTH_USER: {
      return {
        ...state,
        isAuth: true,
        userName: payload.name,
        questions: payload.data,
      };
    }

    case GET_ALL_USER: {
      return {
        ...state,
        allUser: payload,
      };
    }

    case UPDATE_SCORE: {
      return {
        ...state,
        userAnsweredQuestions: payload,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
