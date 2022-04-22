import React, {useEffect, useState} from 'react';
import DataAdd from './DataAdd';
import DataEdit from './DataEdit';

import { FaEdit, FaTrashAlt } from "react-icons/fa";

const dummyData = [
    { data_id: "1", customer_id: "1", name: "Mahmut", phone: "05554443322", email: "mahmut@orhan.com" },
    { data_id: "2", customer_id: "1", name: "Mehmet", phone: "05324443322", email: "mehmet@ali.com" },
    { data_id: "3", customer_id: "2", name: "Ali", phone: "05424443322", email: "ali@atabak.com" },
    { data_id: "4", customer_id: "2", name: "Bekir", phone: "05054443322", email: "bekir@kayacan.com" }
];

const Data = () => {
    const [showForm, setShowForm] = useState("add");
    const [dataList, setDataList] = useState(dummyData);
    const [dataForEdit, setDataForEdit] = useState({});

    const updateDataList = (newData) => {
        setDataList([...dataList, newData]);
    }

    const startEditing = (dataID) => {
        let selectedData = dataList.filter((dataObj) => dataObj.data_id === dataID);
        setDataForEdit(selectedData[0])
        setShowForm("edit");
    }

    const completeEditing = (editedData) => {
        let dataListClone = dataList;
        let dataListUpdated = dataListClone.map(data => {
            if(data.data_id === editedData.data_id){
                data.name = editedData.name;
            }
            return data;
        });

        setDataList(dataListUpdated);
        setShowForm("add");
    }

    const completeDelete = (dataID) => {
        let dataListClone = dataList;
        let dataListUpdated = dataListClone.filter(data => data.data_id !== dataID);
        setDataList(dataListUpdated);
    }

    return (
        <div>
            {showForm === "add" && 
                <DataAdd updateDataList={(data) => updateDataList(data)} />
            }
            {showForm === "edit" && 
                <DataEdit data={dataForEdit} 
                    changeShowForm={(formName) => setShowForm(formName)}
                    completeEditing={(editedData) => completeEditing(editedData)}
                />
            }
            {dataList && dataList.length < 1 && 
                <div>Görüntülenecek Müşteri Yok</div>
            }
            <div className="flex justify-center my-2 ">
                <div className="w-1/2  rounded bg-white-transparent">
                    <table className="table-auto w-full border p-2 border-collapse border-slate-600">
                        <thead>
                            <tr>
                                <th className="border border-white bg-slate-50">Müşteri ID</th>
                                <th className="border border-white bg-slate-50">Firma ID</th>
                                <th className="border border-white bg-slate-50">Müşteri Adı</th>
                                <th className="border border-white bg-slate-50">Telefon</th>
                                <th className="border border-white bg-slate-50">E-Posta Adresi</th>
                                <th className="border border-white bg-slate-50" colSpan="2">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList && dataList.length > 0 &&
                                dataList.map((data, index) => {
                                    return <tr key={index}>
                                        <td className="text-center border border-white py-1">{data.data_id}</td>
                                        <td className="text-center border border-white py-1">{data.customer_id}</td>
                                        <td className="text-center border border-white py-1">{data.name}</td>
                                        <td className="text-center border border-white py-1">{data.phone}</td>
                                        <td className="text-center border border-white py-1">{data.email}</td>
                                        <td className="text-center border border-white py-1">
                                            <button className="text-sky-500 text-2xl"
                                                onClick={() => startEditing(data.data_id)}><FaEdit /></button>
                                        </td>
                                        <td className="text-center border border-white py-1">
                                        <button className="text-red-500 text-2xl"
                                            onClick={() => completeDelete(data.data_id)}><FaTrashAlt /></button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Data;