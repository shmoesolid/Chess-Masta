import React, { useEffect, useState } from "react";

function ShanePiece()
{
    var [ pieceState, setPieceState ] = useState({

    });

    return (
        <> 
            <img src='assets/img/"
                + node.p.color.toLowerCase() 
                + node.p.type.toLowerCase()
                +".gif' alt='' style='position:absolute;top:"+yDisp+"px;left:"+xDisp+"px;z-index:10' />

            <img 
                src={'assets/img/'} 
                alt={''}
                style={{
                    position:'absolute',
                    top:'',
                    left:'',
                    zIndex:''
                }} 
            />
        </>
    );
}

export default ShanePiece;