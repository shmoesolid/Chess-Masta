
import React, {useEffect} from "react";

function Pieces(props)
{
    useEffect(() => {}, [props.nodesState]);

    return (
        <>
            {/*pieces render*/}
            {props.nodesState.map((col, cIndex) => {
                return col.map((node, nIndex) => {
                    // returning something here so it shuts up about the stupid key
                    if (node === null || node.p === null)
                        return (
                            <div
                                style={{ position: "absolute" }}
                                key={"null-" + cIndex + nIndex}
                            ></div>
                        );

                    // setup our image
                    var c = node.p.color.toLowerCase();
                    var t = node.p.type.toLowerCase();
                    var display = props.getCoords(node);
                    return (
                        <img
                            key={"piece-" + cIndex + nIndex}
                            src={`assets/img/${c}${t}.gif`}
                            alt={c + t + " chess piece"}
                            style={{
                                position: "absolute",
                                top: display.top,
                                left: display.left,
                                zIndex: 10,
                                height: props.scale * 40, // scale times the height of piece which is known 40
                                width: props.scale * 40 // scale times the height of piece which is known 40
                            }}
                        />
                    );
                });
            })}
        </>
    )
}

export default Pieces;