
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
                            zIndex: 15,
                            opacity: 0.75,
                            height: props.scale * 40, // scale times the height of dot which is known 40
                            width: props.scale * 40 // scale times the height of dot which is known 40
                        }}
                    />
                );
            })}
        </>
    )
}

export default ValidMoves;