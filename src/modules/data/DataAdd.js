import React, { useState, useEffect } from 'react';
import Request from '../../helpers/Request';

const DataAdd = (props) => {

    const [customerID, setCustomerID] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        getCustomerList();
    }, [props])

    const getCustomerList = async () => {
        const response = await Request.Get("customers");
        setCustomerList(response);
    }

    const sendForm = async (e) => {
        e.preventDefault();

        const response = await Request.Post("datas", {
            customer_id: customerID,
            name,
            phone,
            email
        });

        props.updateDataList();
    }

    return <div className="w-1/2 mx-auto my-2 my-auto p-5 bg-white-transparent rounded">
        <form onSubmit={(e) => sendForm(e)}>
            <div className="p-2 rounded flex justify-center">
                <h1 className="text-2xl font-bold">Yeni Müşteri Ekle</h1>
            </div>
            <div className="p-2 rounded flex flex-col">
                <h1 className="font-bold">Firma</h1>
                <div>
                    <select className="w-full p-3 bg-white text-black" onChange={(e) => setCustomerID(e.target.value)}>
                        <option value="0">Seçiniz</option>
                        { customerList && customerList.map((customer) => {
                            return <option key={customer.id} value={customer.id}>{customer.name}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="p-2 rounded flex flex-col">
                <h1 className="font-bold">Müşteri Adı</h1>
                <div><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-white text-black" /></div>
            </div>
            <div className="p-2 rounded flex flex-col">
                <h1 className="font-bold">Müşteri Telefon</h1>
                <div><input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 bg-white text-black" /></div>
            </div>
            <div className="p-2 rounded flex flex-col">
                <h1 className="font-bold">Müşteri E-Posta</h1>
                <div><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-white text-black" /></div>
            </div>
            <div className="p-2 rounded">
                <div><button type="submit" className="w-full p-3 bg-sky-500 text-white font-bold rounded">Kaydet</button></div>
            </div>
        </form>
    </div>
}

export default DataAdd;