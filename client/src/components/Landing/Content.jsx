import React from "react";

function Content() {
  return (
    <div className="whiteBg">
      <div className="container content">
        <div className="row">
          <div className="col-sm-4 talk">
            <h1>Let's Play</h1>
            <h1>Chess</h1>
            <br />
            <h6 className="bold-four">
              Chess-Masta is an interactive multiplayer chess game powered by
              the CheSSsk Library.
              <br />
              <br />
              Register for an account to start creating rooms and playing games.
            </h6>
            <br />
            <h6>
              <a className="btn btn-warning" href="/register">
                Register
              </a>
            </h6>
          </div>
          <div className="col-sm-8 showcase-img d-flex justify-content-center">
            {/* <div className="circle"></div> */}
          </div>
        </div>
      </div>

      <section className="features-icons bgDark text-center det-ails">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex  icon-bra-ails">
                  <i className="fas fa-user-shield m-auto greyIcon"></i>
                </div>
                <h5>Secure Sign-In</h5>
                <p className="lead mb-0">
                  This site uses JSON Web Token for user authentication and
                  bcrypt for password hashing.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex  icon-bra-ails">
                  <i className="fas fa-people-arrows m-auto greyIcon"></i>
                </div>
                <h5>PvP Chess Games</h5>
                <p className="lead mb-0">
                  Chess games are server authoritative and can be
                  password-locked so you can limit who is allowed to join your
                  game.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                <div className="features-icons-icon d-flex  icon-bra-ails">
                  <i className="fas fa-chess m-auto greyIcon"></i>
                </div>
                <h5>CheSSsk Library</h5>
                <p className="lead mb-0">
                  CheSSsk was written by developer{" "}
                  <a
                    href="https://github.com/shmoesolid"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Shane Koehler
                  </a>{" "}
                  and it runs all game logic for this site. Use it on your next
                  project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Content;
