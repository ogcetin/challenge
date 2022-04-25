import React, {useEffect, useState} from 'react';
import UserAdd from './UserAdd';
import UserEdit from './UserEdit';
import { AUTH_LIST } from '../../helpers/StaticData';

import { FaEdit, FaTrashAlt } from "react-icons/fa";

const userDummyData = [
    {"user_id": 1, "customer_id": 1, "name": "Saimcan", "email": "saim@can.com", "password": "123qwe", "auth": "staff" },
    {"user_id": 2, "customer_id": 1, "name": "Bekir", "email": "bekir@ozum.com", "password": "123qwe", "auth": "staff" }
]

function User(props) {
    const [showForm, setShowForm] = useState("add");
    const [userList, setUserList] = useState([]);
    const [userForEdit, setUserForEdit] = useState({});

    useEffect(() => {
        (async () => {
            const request = await fetch("http://127.0.0.1:8000/api/users/");
            const response = await request.json();
            console.log("UserList", response);
            const edited = response.map(user => {
                const filtered = AUTH_LIST.filter(auth => auth.value == user.auth);
                user.auth = filtered[0].name
                return user;
            })
            setUserList(edited);

        })();
    }, [props]);

    const updateUserList = (newData) => {
        setUserList([...userList, newData]);
    }

    const startEditing = (userID) => {
        let selectedUser = userList.filter((userObj) => userObj.user_id === userID);
        console.log("StartEditing", selectedUser);
        setUserForEdit(selectedUser[0])
        setShowForm("edit");
    }

    const completeEditing = (editedUser) => {
        let userListClone = userList;
        let userListUpdated = userListClone.map(user => {
            if(user.user_id === editedUser.user_id){
                user.name = editedUser.name;
            }
            return user;
        });

        setUserList(userListUpdated);
        setShowForm("add");
    }

    const completeDelete = async (userID) => {
        const request = await fetch("http://127.0.0.1:8000/api/users/" + userID + "/", {"method": "DELETE"});
        if(request.status === 204){
            let userListClone = userList;
            let userListUpdated = userListClone.filter(user => user.user_id !== userID);
            setUserList(userListUpdated);
        }
    }

    return (
        <div>
            { showForm === "add" && 
                <UserAdd updateUserList={(data) => updateUserList(data)} />
            }
            {
                showForm === "edit" &&
                <UserEdit 
                    data={userForEdit} 
                    changeShowForm={(formName) => setShowForm(formName)}
                    completeEditing={(editedUser) => completeEditing(editedUser)}
                />
            }
            <div className="flex justify-center my-2 ">
                <div className="w-1/2  rounded bg-white-transparent">
                    <table className="table-auto w-full border p-2 border-collapse border-slate-600">
                        <thead>
                            <tr>
                                <th className="border border-white bg-slate-50">Müşteri ID</th>
                                <th className="border border-white bg-slate-50">Firma ID</th>
                                <th className="border border-white bg-slate-50">Müşteri Adı</th>
                                <th className="border border-white bg-slate-50">E-Posta Adresi</th>
                                <th className="border border-white bg-slate-50">Yetki</th>
                                <th className="border border-white bg-slate-50" colSpan="2">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList && userList.length > 0 &&
                                userList.map((user, index) => {
                                    return <tr key={index}>
                                        <td className="text-center border border-white py-1">{user.user_id}</td>
                                        <td className="text-center border border-white py-1">{user.customer_id}</td>
                                        <td className="text-center border border-white py-1">{user.name}</td>
                                        <td className="text-center border border-white py-1">{user.email}</td>
                                        <td className="text-center border border-white py-1">{user.auth}</td>
                                        <td className="text-center border border-white py-1">
                                            <button className="text-sky-500 text-2xl"
                                                onClick={() => startEditing(user.user_id)}><FaEdit /></button>
                                        </td>
                                        <td className="text-center border border-white py-1">
                                        <button className="text-red-500 text-2xl"
                                            onClick={() => completeDelete(user.user_id)}><FaTrashAlt /></button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default User;