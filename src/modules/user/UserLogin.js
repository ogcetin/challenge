import React, { useState } from 'react';

function UserLogin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function sendLogin(e){
        e.preventDefault();
        props.changeLoginStatus(true);


        /*

        const request = await fetch("http://127.0.0.1:8000/users/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const response = request.json();
        console.log(response);
        */
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