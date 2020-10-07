import React from "react";

function ExchangePicker(props)
{
    var piecesToPick = ["q", "r", "b", "n"];
    var color = props.color === 0 ? "w" : "b";

    return (
        <>
            {/* possible moves */}
            {piecesToPick.map((item, index) => {
                return (
                    <button
                        style={{
                            border: "1px solid black"
                        }}
                        onClick={() => props.exchangePawn(item.toUpperCase())}
                    >
                        <img
                            key={"pe-" + index}
                            src={`assets/img/${color+item}.gif`}
                            alt={color + item}
                            style={{
                                zIndex: 5,
                                height: props.scale * 40, // scale times the height of dot which is known 40
                                width: props.scale * 40 // scale times the height of dot which is known 40
                            }}
                        />
                    </button>
                );
            })}
        </>
    )
}

export default ExchangePicker;
