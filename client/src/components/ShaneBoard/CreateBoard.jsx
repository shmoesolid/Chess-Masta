import React from "react";

function CreateBoard()
{
    function createBoard() {
        console.log("creating board");
        let table = [];
        for (let x = 0; x < 8; x++) {
            let children = [];
            for (let y = 0; y < 8; y++) 
                children.push(<td key={"row-" + y} />);
                
            table.push(<tr key={"col-" + x}>{children}</tr>);
        }
        return table;
    }

    return (
        <table id="t01">
            <tbody>{createBoard()}</tbody>
        </table>
    )
}

export default CreateBoard;