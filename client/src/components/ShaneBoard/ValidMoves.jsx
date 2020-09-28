
import React, {useEffect} from "react";

function ValidMoves(props)
{
    useEffect(() => {}, [props.validMoves]);

    return (
        <>
            {/* possible moves */}
            {props.validMoves.map((item, index) => {
                var display = props.getCoords(item);
                return (
                    <img
                        key={"dot-" + index}
                        src={`assets/img/dot.png`}
                        alt={"possible-move"}
                        style={{
                            position: "absolute",
                            top: display.top,
                            left: display.left,
                            zIndex: 5,
                        }}
                    />
                );
            })}
        </>
    )
}

export default ValidMoves;