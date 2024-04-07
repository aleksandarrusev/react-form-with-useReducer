import { validateEmail, validateLength } from "../utils/validation.util";

export const initialState = {
  email: {
    value: "",
    isValid: false,
    isTouched: false,
  },
  password: {
    value: "",
    isValid: false,
    isTouched: null,
  },
  shouldSubscribe: {
    value: false,
    isValid: true,
    isTouched: null,
  },
};

export const actionTypes = {
  UPDATE_EMAIL: "UPDATE_EMAIL",
  UPDATE_PASSWORD: "UPDATE_PASSWORD",
  UPDATE_SHOULD_SUBSCRIBE: "UPDATE_SHOULD_SUBSCRIBE",
  RESET_FORM: "RESET_FORM",
};

export const registerFormReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.UPDATE_EMAIL: {
      const isValid = validateLength(payload, 8) && validateEmail(payload);
      let { isTouched } = state.email;
      // Set isTouched to true once the characters count exceed 3
      if (!state.email.isTouched) {
        if (state.email.value.length >= 3) {
          isTouched = true;
        }
      }

      return {
        ...state,
        email: {
          value: action.payload,
          isTouched,
          isValid,
        },
      };
    }
    case actionTypes.UPDATE_PASSWORD: {
      const isValid = validateLength(payload, 5);

      let { isTouched } = state.email;
      // Set isTouched to true once the characters count exceed 3
      if (!state.password.isTouched) {
        if (state.password.value.length >= 3) {
          isTouched = true;
        }
      }

      return {
        ...state,
        password: {
          value: payload,
          isTouched,
          isValid,
        },
      };
    }
    case actionTypes.UPDATE_SHOULD_SUBSCRIBE: {
      return {
        ...state,
        shouldSubscribe: {
          value: action.payload,
        },
      };
    }
    case actionTypes.RESET_FORM:
      return initialState;
  }
  throw Error("Unknown action: " + action.type);
};
