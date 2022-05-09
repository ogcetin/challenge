import React, {useEffect, useState} from 'react';
import DataAdd from './DataAdd';
import DataEdit from './DataEdit';

import { FaEdit, FaTrashAlt, FaRegListAlt } from "react-icons/fa";
import Request from '../../helpers/Request';
import Activity from '../activity/Activity';

const Data = (props) => {
    // Activity Start
    const [selectedComponent, setSelectedComponent] = useState("data");
    const [selectedDataID, setSelectedDataID] = useState(0)
    // Activity End

    const [showForm, setShowForm] = useState("add");
    const [dataList, setDataList] = useState([]);
    const [dataForEdit, setDataForEdit] = useState({});

    useEffect(() => {
        getDataList();
    }, [props]);

    const getDataList = async () => {
        const response  = await Request.Get("datas");
        setDataList(response);
        setShowForm("add");
    };

    const updateDataList = () => {
        getDataList();
    }

    const startEditing = (dataID) => {
        let selectedData = dataList.filter((dataObj) => dataObj.data_id === dataID);
        setDataForEdit(selectedData[0]);
        setShowForm("edit");
    }

    const completeEditing = (editedData) => {
        getDataList();
    }

    const completeDelete = async (dataID) => {
        const response = await Request.Delete("datas", dataID);
        getDataList();
    }

    const displayActivity = async (dataID) => {
        setSelectedDataID(dataID);
        setSelectedComponent("activity");
    }

    return (
        <div>
            { selectedComponent == "activity" && 
                <Activity data_id={selectedDataID} />
            }

            { selectedComponent == "data" && 
                <div>
                    {showForm === "add" && 
                        <DataAdd updateDataList={() => updateDataList()} />
                    }
                    {showForm === "edit" && 
                        <DataEdit data={dataForEdit} 
                            changeShowForm={(formName) => setShowForm(formName)}
                            completeEditing={() => completeEditing()}
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
                                        <th className="border border-white bg-slate-50" colSpan="3">&nbsp;</th>
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
                                                    <button className="text-green-500 text-2xl"
                                                        onClick={() => displayActivity(data.data_id)}><FaRegListAlt /></button>
                                                </td>
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
            }
        </div>
    );
};

export default Data;