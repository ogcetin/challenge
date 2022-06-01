import React, { useEffect, useState } from 'react';
import Request from '../../helpers/Request';
import { AUTH_LIST } from '../../helpers/StaticData';

function UserAdd(props) {
    const [customerList, setCustomerList] = useState([]);

    const [customerID, setCustomerID] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useState("");

    useEffect(() => {

        (async () => {
            const response = await Request.Get("customers");
            console.log("Customer List", response);
            setCustomerList(response);
        })();

    }, [props]);

    async function sendForm(e){
        e.preventDefault();
        console.log("this is customerID", customerID)
        if(customerID === 0 || auth === 0){
            // TODO Do something useful
            console.error("where is your customer_id");
            return false;
        }
        const response = await Request.Post("users", {
            customer_id: customerID,
            name, email, password, auth
        });
        props.updateUserList();
    }

    return (
        <div className="w-1/2 mx-auto my-2 my-auto p-5 bg-white-transparent rounded">
            <form onSubmit={(e) => sendForm(e)}>
                <div className="p-2 rounded flex justify-center">
                    <h1 className="text-2xl font-bold">Yeni Kullanıcı Ekle</h1>
                </div>
                <div className="p-2 rounded flex flex-col">
                    <h1 className="font-bold">Firma</h1>
                    <div>
                        <select className="w-full p-3 bg-white text-black" onChange={(e) => setCustomerID(e.target.value)}>
                            <option value="0">Seçiniz</option>
                            { customerList && customerList.length > 0 && customerList.map((customer) => {
                                return <option key={customer.id} value={customer.id}>{customer.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="p-2 rounded flex flex-col">
                    <h1 className="font-bold">Kullanıcı İsmi</h1>
                    <div><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-white text-black" /></div>
                </div>
                <div className="p-2 rounded flex flex-col">
                    <h1 className="font-bold">E-Posta</h1>
                    <div><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-white text-black" /></div>
                </div>
                <div className="p-2 rounded flex flex-col">
                    <h1 className="font-bold">Şifre</h1>
                    <div><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 bg-white text-black" /></div>
                </div>
                <div className="p-2 rounded flex flex-col">
                    <h1 className="font-bold">Yetki</h1>
                    <div>
                        <select className="w-full p-3 bg-white text-black" onChange={(e) => setAuth(e.target.value)}>
                            <option value="0">Seçiniz</option>
                            { AUTH_LIST && AUTH_LIST.length > 0 && AUTH_LIST.map((auth) => {
                                return <option key={auth.value} value={auth.value}>{auth.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="p-2 rounded">
                    <div><button type="submit" className="w-full p-3 bg-sky-500 text-white font-bold rounded">Kaydet</button></div>
                </div>
            </form>
        </div>
    );
}

export default UserAdd;