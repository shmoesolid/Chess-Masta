import React, { useState, useContext } from "react";
import Axios from "axios";
import "./style.css";

import UserContext from "../../context/userContext";

function UserForm()
{
    //const { userData, setUserData } = useContext(UserContext);
    const { userData } = useContext(UserContext);
    const [formData, setFormData] = useState({
        displayName: userData.user.displayName,
        blackOnBottom: userData.user.blackOnBottom,
        boardBlackColor: userData.user.boardBlackColor,
        boardWhiteColor: userData.user.boardWhiteColor,
        boardBorderColor: userData.user.boardBorderColor
    });

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
    
        // post data
        Axios.post("/api/users", formData, { withCredentials: true })
            .then(() => {
                window.location.reload(); // doing this until i solve user data being 1 step behind on board
                //setUserData({ user: result.data }); // must save twice to get effect
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
                        <label htmlFor="displayName">Display Name</label>
                        <input 
                            type="text" 
                            name="displayName" 
                            id="displayName" 
                            onChange={handleInputChange} 
                            value={formData.displayName} 
                        />
                        <label htmlFor="blackOnBottom">Black On Bottom <i>(if your color is black)</i></label>
                        <select
                            className="select-css"
                            name="blackOnBottom"
                            id="blackOnBottom"
                            onChange={handleInputChange}
                            value={formData.blackOnBottom}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                        <br />
                    </form>
                </div>
                <div className=" col-md-5">
                    <form className="form">
                        <label htmlFor="boardBlackColor">Board Dark Color</label>
                        <br />
                        <input
                            type="color"
                            name="boardBlackColor"
                            id="boardBlackColor"
                            onChange={handleInputChange}
                            value={formData.boardBlackColor}
                        />{" "}
                        <br />
                        <label htmlFor="boardWhiteColor">Board Light Color</label>
                        <br />
                        <input
                            type="color"
                            name="boardWhiteColor"
                            id="boardWhiteColor"
                            onChange={handleInputChange}
                            value={formData.boardWhiteColor}
                        />{" "}
                        <br />
                        <label htmlFor="boardBorderColor">Board Boarder Color</label>
                        <br />
                        <input
                            type="color"
                            name="boardBorderColor"
                            id="boardBorderColor"
                            onChange={handleInputChange}
                            value={formData.boardBorderColor}
                        />{" "}
                        <br />
                    </form>
                </div>
            </div>
            <div className="row">
                {" "}
                <button
                    className="btn btn-outline-dark start"
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default UserForm;