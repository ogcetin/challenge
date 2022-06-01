import React, { useState } from 'react';
import Session from '../../helpers/Session';
import Request from '../../helpers/Request';

function UserLogin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function sendLogin(e){
        e.preventDefault();

        const response = await Request.Login("token", {
            email,
            password
        });

        if(response.access.length > 0){
            Session.set("token", response.access);
            props.changeLoginStatus(true);
        }
    }

    return <div className="w-1/2 mx-auto my-auto p-5">
        <form onSubmit={(e) => sendLogin(e)}>
            <div className="my-5 bg-gray-100 p-5 rounded flex justify-center">
                <h1 className="text-2xl font-bold">Giriş Formu</h1>
            </div>
            <div className="my-5 bg-gray-100 p-5 rounded flex flex-col">
                <h1 className="font-bold">E-Posta</h1>
                <div><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-white" /></div>
            </div>
            <div className="my-5 bg-gray-100 p-5 rounded flex flex-col">
                <h1 className="font-bold">Şifre</h1>
                <div><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 bg-white" /></div>
            </div>
            <div className="my-5 bg-gray-100 p-5 rounded">
                <div><button type="submit" className="w-full p-3 bg-sky-500 text-white font-bold rounded">Giriş Yap</button></div>
            </div>
        </form>
    </div>

};

export default UserLogin;