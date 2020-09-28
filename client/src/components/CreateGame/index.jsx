import React, { useState } from "react";
import Axios from "axios";

function CreateGame(props) {
  const [formData, setFormData] = useState();
  const [passwordState, setPasswordState] = useState({ disabled: true });

  const handleInputChange = (event) => {
    const name = event.target.name;
    var value = event.target.value;

    // deal with locked checkbox/password field
    if (name === "locked") {
      value = event.target.checked;
      setPasswordState({ disabled: !value });
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // post data
    Axios.post("/api/games/create", formData, { withCredentials: true })
      .then((result) => {
        console.log(result);
        props.update(result.data._id);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-5">
          <form className="form">
            <label htmlFor="gameName">Game Name</label>
            <input type="text" name="name" onChange={handleInputChange} />
            <label htmlFor="hostColor">Your color</label>{" "}
            <select
              class="select-css"
              name="hostColor"
              id="hostColor"
              onChange={handleInputChange}
            >
              <option value="0">White</option>
              <option value="1">Black</option>
            </select>
            <br />
            <label htmlFor="gameNotes">Game Notes</label>
            <textarea name="notes" onChange={handleInputChange}></textarea>
            <br />
            <br />
          </form>
        </div>
        <div className=" col-md-5">
          <form className="form">
            {" "}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              disabled={passwordState.disabled}
            />
            <input
              type="checkbox"
              name="locked"
              id="locked"
              onChange={handleInputChange}
            />
            {"  "}
            <label htmlFor="locked">Lock game</label>
            <br />
            Locked games can only be accessed by another user if they have the
            password.
            <br />
            <br />
            {/*have this disabled at start and toggle with checkbox*/}
          </form>
        </div>
      </div>
      <div className="row">
        {" "}
        <button
          className="btn btn-outline-dark start"
          id="createGame"
          onClick={handleSubmit}
        >
          Create Game
        </button>
      </div>
    </div>
  );
}

export default CreateGame;
