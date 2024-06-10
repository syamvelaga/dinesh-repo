import React, { Component } from "react";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import { Navigate, useNavigate } from "react-router-dom";
import "./index.css";

function withRouter(Component) {
  return function (props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class Login extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
    showUsernamePassword: false,
    isLoading: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleUsernamePassword = () => {
    this.setState((prevState) => ({
      showUsernamePassword: !prevState.showUsernamePassword,
    }));
  };

  onSubmitSuccess = (jwtToken) => {
    const { navigate } = this.props;

    if (jwtToken) {
      Cookies.set("jwt_token", jwtToken, {
        expires: 30,
        path: "/",
      });
      navigate("/");
    }
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg, showUsernamePassword } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Navigate to="/" />;
    }
    return (
      <div className="bg-contianer">
        <form className="card-container" onSubmit={this.submitForm}>
          <div className="card-login">
            <div>
              <label htmlFor="UserNameId" className="userName">
                USERNAME
              </label>
              <br />
              <input
                type="text"
                id="PasswordId"
                className="userName-input"
                onChange={this.onChangeUsername}
              />
            </div>
            <br />
            <div>
              <label htmlFor="UserNameId" className="userName">
                PASSWORD
              </label>
              <br />
              <input
                type="password"
                id="PasswordId"
                className="password-input"
                onChange={this.onChangePassword}
              />
            </div>
          </div>
          <div>
            <button className="login-button">Login</button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </div>

          {showUsernamePassword ? (
            <div>
              <p>username: mosh</p>
              <p>password: DevMosh22</p>
            </div>
          ) : (
            <button
              className="show-username-password"
              onClick={this.handleUsernamePassword}
            >
              Show username and password
            </button>
          )}
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
