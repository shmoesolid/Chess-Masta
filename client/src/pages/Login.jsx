import React from "react";
import "../css/ComponentStyles.css";

function Login() {
    return (
        <div>
            <div className="container">
                <div className="row space">
                </div>
                <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 col-md-offset-3">
                    <h2>Login</h2>
                    <br />
                    <form className="login">
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email
                        address:</label>
                        <br />
                        <input type="email" className="form-control" id="email-input" placeholder="Email" />
                    </div>
                    <br />
                    <div>
                        <label for="exampleInputPassword1">Password:</label>
                        <input type="password" className="form-control" id="password-input"
                        placeholder="Password" />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-nuno btn-sm">Login</button>
                    </form>
                    <br />
                </div>
                </div>
                <div className="col-md-3"></div>
                <div className="row space">
                </div>
                <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 col-md-offset-3">
                    <h2>New User? Create an Account.</h2>
                    <br />
                    <form className="login">
                    <div className="form-group">
                        <label for="name">Name:</label>
                        <br />
                        <input type="text" className="form-control" id="name-input" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email
                        address:</label>
                        <br />
                        <input type="email" className="form-control" id="email-input" placeholder="Email" />
                    </div>
                    <br />
                    <div>
                        <label for="exampleInputPassword1">Password:</label>
                        <input type="password" className="form-control" id="password-input"
                        placeholder="Password" />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-nuno btn-sm">Login</button>
                    </form>
                    <br />
                </div>
                </div>
                <div className="col-md-3"></div>
                
            </div>
            <div className="row">
            </div>
        </div>
    );
  }
  
  export default Login