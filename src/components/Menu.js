import React, { useState } from 'react';


const Menu = (props) => {
    const [menuActive, setMenuActive] = useState("password");

    const changeActiveMenu = (menuName) => {
        setMenuActive(menuName);
        props.changeMenu(menuName);
    }



    return <div className="flex flex-col justify-center w-full">
        <div className='py-5 h-20'>
            <h1 className="text-center font-bold text-2xl">Challenge CRM</h1>
        </div>
        <div className="h-3 bg-slate-800" />
        <div className="my-5">
            <nav className="">
                <ul className="text-center">
                    <li className="py-2">
                        <a href="#" onClick={() => changeActiveMenu("password")} className={(menuActive === "password")?"font-bold":""}>
                            Şifre İşlemleri
                        </a>
                    </li>
                    <li className="py-2">
                        <a href="#" onClick={() => changeActiveMenu("customer")} className={(menuActive === "customer")?"font-bold":""}>
                            Firma İşlemleri
                        </a>
                    </li>
                    <li className="py-2">
                        <a href="#" onClick={() => changeActiveMenu("data")} className={(menuActive === "data")?"font-bold":""}>
                            Müşteri İşlemleri
                        </a>
                    </li>
                    <li className="py-2">
                        <a href="#" onClick={() => changeActiveMenu("activity")} className={(menuActive === "activity")?"font-bold":""}>
                            Aktivite İşlemleri
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
};

export default Menu;