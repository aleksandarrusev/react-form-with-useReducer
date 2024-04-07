import "bootstrap/dist/css/bootstrap.css";
import {
  registerFormReducer,
  initialState,
  actionTypes,
} from "./reducer/registerFormReducer";
import { useReducer } from "react";

export default function App() {
  const [formState, dispatch] = useReducer(registerFormReducer, initialState);
  const addClassNameForValidity = (propertyName) => {
    if (formState[propertyName].isTouched && !formState[propertyName].isValid) {
      return "is-invalid"; // Add "is-invalid" class only if the field is touched and is NOT valid
    } else {
      if (
        formState[propertyName].isTouched &&
        formState[propertyName].isValid
      ) {
        return "is-valid"; // Add "is-valid" class only if the field is touched and IS valid
      }
      return "";
    }
  };
  const handleEmailChange = (value) =>
    dispatch({ type: actionTypes.UPDATE_EMAIL, payload: value });

  const handlePasswordChange = (value) =>
    dispatch({ type: actionTypes.UPDATE_PASSWORD, payload: value });

  const handleShouldSubscribeChange = () =>
    dispatch({
      type: actionTypes.UPDATE_SHOULD_SUBSCRIBE,
      payload: !formState.shouldSubscribe.value,
    });

  const handleFormReset = (e) => {
    e.preventDefault();
    dispatch({ type: actionTypes.RESET_FORM });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };
  return (
    <div className="d-flex mt-5 justify-content-center">
      <div className="card w-50">
        <div className="card-body">
          <form>
            <div className="has-validation mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${addClassNameForValidity("email")}`}
                id="exampleInputEmail1"
                value={formState.email.value}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              <div className="invalid-feedback">
                Make sure that you've entered a valid email and is at least 8
                characters long.
              </div>
            </div>
            <div className="has-validation mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control 
                ${addClassNameForValidity("password")}`}
                id="exampleInputPassword1"
                value={formState.password.value}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              <div className="invalid-feedback">
                The password should contain at least 5 characters.
              </div>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={() => handleShouldSubscribeChange()}
                checked={formState.shouldSubscribe.value}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Subscribe to emails
              </label>
            </div>
            <button
              className="btn btn-primary"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-outline-primary ms-3"
              onClick={(e) => handleFormReset(e)}
            >
              Reset form
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
