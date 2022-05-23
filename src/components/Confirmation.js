import React, { useEffect } from 'react';

const staticTitle = {
    "delete": "Are You Sure ?"
}

// props { type: "information|delete", confirm: function, decline: function }
const Confirmation = (props) => {

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if(e.key == "Escape"){
                props.response(false);
            }
        });
    }, []);


    return <div className={
        props.display ?
        "absolute z-50 top-1/2 bg-black-transparent border-solid border-4 border-white left-1/3 p-5 rounded w-2/5" :
        "hidden"
        }>
        <div className="bg-white p-1 rounded font-bold text-center">
            {
                props.title.length > 0 ?
                <div>{props.title}</div> :
                <div>{staticTitle[props.type]}</div>
            }
        </div>
        <div className="flex mt-3">
            <div className="flex-1">
                <button className="rounded py-1 w-full bg-green-400 text-white font-bold"
                onClick={() => props.response(true)}>Ok</button>
            </div>
            {props.type !== "information" &&
                <div className="flex-1">
                    <button className="ml-2 py-1 rounded w-full bg-red-400 text-white font-bold"
                    onClick={() => props.response(false)}>Cancel</button>
                </div>
            }
        </div>
    </div>
};


export default Confirmation;