import React from "react";

function Login() {
    return (
        <div>
            <div className="container">
                <div id="space" className="row">
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
                    <p>New User? Create an account <a href="/signup">here.</a></p>
                </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
  }
  
  export default Login