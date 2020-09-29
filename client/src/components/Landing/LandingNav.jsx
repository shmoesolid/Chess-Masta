import React from "react"

function Nav() {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light static-top header-a">
            <div className="container nav-container">
                <a className="navbar-brand brand" href="/"><img src="../chessmastalogo.png" alt="logo" id="navLogo" /></a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse alink" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <a className="btn btn-outline-dark start" href="/login">Login</a>
                    </ul>


                </div>


            </div>
        </nav>
    );
}

export default Nav;