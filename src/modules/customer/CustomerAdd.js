import React, { useState } from 'react';

const CustomerAdd = (props) => {

    const [name, setName] = useState("");

    const sendForm = (e) => {   
        e.preventDefault();

        props.updateCustomerList({
            customer_id: (Math.floor(Math.random() * (100- 4) ) + 4),
            name
        });
        setName("");
    }
    
    return <div className="w-1/2 mx-auto my-2 my-auto p-5 bg-slate-700 text-white rounded">
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