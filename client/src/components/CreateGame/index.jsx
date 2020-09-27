import React, { useState } from "react";
import Axios from "axios";

function CreateGame(props) 
{
    const [ formData, setFormData ] = useState();
    const [ passwordState, setPasswordState ] = useState({disabled:true});

    const handleInputChange = event => {

        const name = event.target.name;
        var value = event.target.value;

        // deal with locked checkbox/password field
        if (name === "locked") {
            value = event.target.checked;
            setPasswordState({disabled: !value});
        }
    
        setFormData( {
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        // post data
        Axios.post("/api/games/create", formData, { withCredentials: true })
            .then(
                result => {
                    console.log(result);
                    props.update(result.data._id);
                }
            )
            .catch( err => { if (err) console.log(err) });
    };

    return (
        <form>
            <input type="text" name="name" placeholder="Game name..." onChange={handleInputChange} />
            <br />
            <label htmlFor="hostColor">Your color:</label>
            <select name="hostColor" id="hostColor" onChange={handleInputChange}>
                <option value="0">White</option>
                <option value="1">Black</option>
            </select>
            <br />
            <label htmlFor="locked">Lock game</label>
            <input type="checkbox" name="locked" id="locked" onChange={handleInputChange} />
            <br />
            {/*have this disabled at start and toggle with checkbox*/}
            <input 
                type="password" 
                name="password" 
                placeholder="Password..." 
                autoComplete="current-password"
                onChange={handleInputChange} 
                disabled={passwordState.disabled} 
            />
            <br />
            <textarea name="notes" placeholder="Game notes..." onChange={handleInputChange}></textarea>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    );
}

export default CreateGame;
