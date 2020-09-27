import React from "react";
import { Link } from "react-router-dom";

function Content() {
  return (
    <div>
      <div className="container content">
        <div className="row">
          <div className="col-sm-4 talk">
            <h1>Let's Play</h1>
            <h1>Chess</h1>
            <br />
            <h6 className="bold-four">
              Chess-Masta is an interactive multiplayer chess game powered by
              the CheSSsk(.js?) Library.
              <br />
              <br />
              Register for an account to start creating rooms and playing games.
            </h6>
            <br />
            <h6>
              <a className="btn btn-dark start start-two" href="/home">
                Get Started
              </a>
            </h6>
          </div>
          <div className="col-sm-8 showcase-img">
            {/* <div className="circle"></div> */}
          </div>
        </div>
      </div>

      <section class="features-icons bg-dark text-center det-ails">
        <div class="container">
          <div class="row">
            <div class="col-lg-4">
              <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div class="features-icons-icon d-flex  icon-bra-ails">
                  <i class="fas fa-user-shield m-auto text-primary icon-ails"></i>
                </div>
                <h5>Secure Sign-In</h5>
                <p class="lead mb-0">
                  This site uses JSON Web Token for user authentication and
                  bcrypt for password hashing.
                </p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div class="features-icons-icon d-flex  icon-bra-ails">
                  <i class="fas fa-people-arrows m-auto text-primary icon-ails"></i>
                </div>
                <h5>PvP Chess Games</h5>
                <p class="lead mb-0">
                  Chess games are server authoritative and can be
                  password-locked so you can limit who is allowed to join your
                  game.
                </p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                <div class="features-icons-icon d-flex  icon-bra-ails">
                  <i class="fas fa-chess m-auto text-primary icon-ails"></i>
                </div>
                <h5>CheSSsk Library</h5>
                <p class="lead mb-0">
                  CheSSsk was written by developer{" "}
                  <a href="https://github.com/shmoesolid">Shane Kholer</a> and
                  it runs all game logic for this site. Use it on your next project.
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
