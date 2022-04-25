import React, { useState, useEffect} from 'react';
import { AUTH_LIST } from '../../helpers/StaticData';

function UserEdit(props) {
    const [customerList, setCustomerList] = useState([]);

    const [customerID, setCustomerID] = useState(props.data.customer_id);
    const [name, setName] = useState(props.data.name);
    const [email, setEmail] = useState(props.data.email);
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useState(props.data.auth);

    useEffect(() => {

        (async () => {
            const request = await fetch("http://127.0.0.1:8000/api/customers/");
            const response = await request.json();
            console.log("Customer List", response);
            setCustomerList(response);
        })();

    }, [props]);

    async function sendForm(e){
        e.preventDefault();
        const request = await fetch("http://127.0.0.1:8000/api/users/"+props.data.user_id+"/", {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customer_id: customerID,
                name, email, password, auth
            })
        });
        const response = await request.json();
        console.log("User Edit", response);
    }

    return (
        <div className="w-1/2 mx-auto my-2 my-auto p-5 bg-white-transparent rounded">
            <form onSubmit={(e) => sendForm(e)}>
                <div className="p-2 rounded flex justify-center">
                    <h1 className="text-2xl font-bold">Kullanıcı Güncelle</h1>
                </div>
                <div className="p-2 rounded flex flex-col">
                    <h1 className="font-bold">Firma</h1>
                    <div>
                        <select className="w-full p-3 bg-white text-black" value={customerID} onChange={(e) => setCustomerID(e.target.value)}>
                            { customerList && customerList.length > 0 && customerList.map((customer) => {
                                return <option key={customer.customer_id} value={customer.customer_id}>{customer.name}</option>
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
                        <select className="w-full p-3 bg-white text-black" value={auth} onChange={(e) => setAuth(e.target.value)}>
                            { AUTH_LIST && AUTH_LIST.length > 0 && AUTH_LIST.map((auth) => {
                                return <option key={auth.value} value={auth.value}>{auth.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="p-2 rounded">
                    <div><button type="submit" className="w-full p-3 bg-sky-500 text-white font-bold rounded">Güncelle</button></div>
                </div>
                <div className="p-2 rounded">
                    <div>
                    <button type="button" className="w-full p-3 bg-red-500 text-white font-bold rounded"
                        onClick={() => props.changeShowForm("add")}>İptal</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserEdit