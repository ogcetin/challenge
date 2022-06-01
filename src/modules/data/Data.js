import React, {useEffect, useState} from 'react';
import DataAdd from './DataAdd';
import DataEdit from './DataEdit';
import Confirmation from '../../components/Confirmation';

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

    const [deleteID, setDeleteID] = useState(0);
    const [displayDeleteModal, setDisplayDeleteModal]= useState(false);

    useEffect(() => {
        getDataList();
    }, [props]);

    const getDataList = async () => {
        const response  = await Request.Get("datas");

        const customersResponse = await Request.Get("customers");
        const edited = response.map(data => {

            const customersFiltered = customersResponse.filter(customer => customer.id === data.customer_id);
            data.customer_converted = customersFiltered[0]['name'];

            return data;
        })

        setDataList(edited);
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

    const responseDeleteModal = async (response) => {
        if(response){
            const response = await Request.Delete("datas", deleteID);
            getDataList();
        }
        setDisplayDeleteModal(false);
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
                    {dataList && dataList.length < 1 && <div className="text-center p-5">Görüntülenecek Data Yok</div>}
                    {dataList && dataList.length > 0 &&
                        <div className="flex justify-center my-2 ">
                        <div className="w-1/2  rounded bg-white-transparent">
                            <table className="table-auto w-full border p-2 border-collapse border-slate-600">
                                <thead>
                                    <tr>
                                        <th className="border border-white bg-slate-50">Müşteri ID</th>
                                        <th className="border border-white bg-slate-50">Firma</th>
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
                                                <td className="text-center border border-white py-1">{data.id}</td>
                                                <td className="text-center border border-white py-1">{data.customer_converted}</td>
                                                <td className="text-center border border-white py-1">{data.name}</td>
                                                <td className="text-center border border-white py-1">{data.phone}</td>
                                                <td className="text-center border border-white py-1">{data.email}</td>
                                                <td className="text-center border border-white py-1">
                                                    <button className="text-green-500 text-2xl"
                                                        onClick={() => displayActivity(data.id)}><FaRegListAlt /></button>
                                                </td>
                                                <td className="text-center border border-white py-1">
                                                    <button className="text-sky-500 text-2xl"
                                                        onClick={() => startEditing(data.id)}><FaEdit /></button>
                                                </td>
                                                <td className="text-center border border-white py-1">
                                                <button className="text-red-500 text-2xl"
                                                    onClick={() => {
                                                        setDeleteID(data.id)
                                                        setDisplayDeleteModal(true);
                                                    }}><FaTrashAlt /></button>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    }


                    <Confirmation
                        display={displayDeleteModal}
                        changeDisplay={(val) => setDisplayDeleteModal(val)}
                        type="delete"
                        title=""
                        response={(val)=> responseDeleteModal(val)}
                    />
                </div>
            }
        </div>
    );
};

export default Data;