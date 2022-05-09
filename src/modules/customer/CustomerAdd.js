import React, { useState } from 'react';
import Request from '../../helpers/Request';

const CustomerAdd = (props) => {

    const [name, setName] = useState("");

    const sendForm = async (e) => {   
        e.preventDefault();
        const response = await Request.Post("customers", {name});
        props.updateCustomerList();
        setName("");
    }
    
    return <div className="w-1/2 mx-auto my-2 my-auto p-5  bg-white-transparent rounded">
        <form onSubmit={(e) => sendForm(e)}>
            <div className="p-2 rounded flex justify-center">
                <h1 className="text-2xl font-bold">Yeni Firma Ekle</h1>
            </div>
            <div className="p-2 rounded flex flex-col">
                <h1 className="font-bold">Firma Adı</h1>
                <div><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-white text-black" /></div>
            </div>
            <div className="p-2 rounded">
                <div><button type="submit" className="w-full p-3 bg-sky-500 text-white font-bold rounded">Kaydet</button></div>
            </div>
        </form>
    </div>
}

export default CustomerAdd;