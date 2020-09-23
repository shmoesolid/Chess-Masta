import React, { useContext, useState } from "react";
import UserContext from "../context/userContext";
import Axios from "axios";

function CreateGame() 
{
    const { userData } = useContext(UserContext);
    const [ formData, setFormData ] = useState();

    const handleInputChange = event => {
        let value = event.target.value;
        const name = event.target.name;
    
        setFormData( {
            ...formData,
            [name]: value
        });
      };

    const handleSubmit = (event) => {

        event.preventDefault();

        // post data
        Axios.post("/api/games/", formData, { withCredentials: true })
            .then(
                data => {
                    console.log(data);
                }
            )
            .catch( err => { if (err) console.log(err) });
    };

    return (
        <>
            <form>
                <input name="name" placeholder="Game name..." onChange={handleInputChange} />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </>
    );
}

export default CreateGame;
