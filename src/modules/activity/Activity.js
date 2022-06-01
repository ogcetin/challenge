import React, { useState, useEffect } from 'react';
import Request from '../../helpers/Request';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Confirmation from '../../components/Confirmation';

import ActivityAdd from './ActivityAdd';
import ActivityEdit from './ActivityEdit';

const Activity = (props) => {
    const [activityList, setActivityList] = useState([]);
    const [showForm, setShowForm] = useState("add");

    const [activityForEdit, setActivityForEdit] = useState({});


    const [deleteID, setDeleteID] = useState(0);
    const [displayDeleteModal, setDisplayDeleteModal]= useState(false);

    useEffect(() => {
        getActivityList();
    }, [props]);


    const getActivityList = async () => {
        const response = await Request.Get("activitiesByDataID/"+props.data_id);
        const customersResponse = await Request.Get("customers");
        const datasResponse = await Request.Get("datas");
        const edited = response.map(activity => {
            const datasFiltered = datasResponse.filter(data => data.id == activity.data_id);
            activity.auth_converted = datasFiltered[0].name;

            const customersFiltered = customersResponse.filter(customer => customer.id === activity.customer_id);
            activity.customer_converted = customersFiltered[0]['name'];

            return activity;
        });
        setActivityList(edited);
    }


    const updateActivityList = () => {
        getActivityList();
    }

    const startEditing = (activityID) => {
        let selectedActivity = activityList.filter((activityObj) => activityObj.id === activityID);
        console.log("StartEditing", selectedActivity);
        setActivityForEdit(selectedActivity[0])
        setShowForm("edit");
    }

    const completeEditing = () => {
        getActivityList();
    }


    const responseDeleteModal = async (response) => {
        if(response){
            const response = await Request.Delete("activities", deleteID);
            getActivityList();
        }
        setDisplayDeleteModal(false);
    }

    return <div>Activity Component Data ID: {props.data_id}
        {showForm === "add" &&
            <ActivityAdd updateActivityList={() => updateActivityList()} />
        }
        {showForm === "edit" &&
            <ActivityEdit customerData={activityForEdit}
                changeShowForm={(formName) => setShowForm(formName)}
                completeEditing={() => completeEditing()}
            />
        }
        { activityList && activityList.length < 1 &&
            <div className="text-center p-5">Görüntülenecek Firma Yok</div>
        }
        {activityList && activityList.length > 0 &&
                <div className="flex justify-center my-2 ">
                <div className="w-1/2  rounded bg-white-transparent">
                    <table className="table-auto p-2 w-full border-collapse border  border-slate-600">
                        <thead>
                            <tr>
                                <th className="border border-white bg-slate-50">Aktivite ID</th>
                                <th className="border border-white bg-slate-50">Data Adı</th>
                                <th className="border border-white bg-slate-50"></th>
                                <th className="border border-white bg-slate-50"></th>
                            </tr>
                        </thead>
                        <tbody>
                        { activityList && activityList.length > 0 &&
                            activityList.map((activity, index) => {
                                return <tr key={activity.id}>
                                    <td className="text-center border border-white py-1">{activity.id}</td>
                                    <td className="text-center border border-white py-1">{activity.customer_converted}</td>
                                    <td className="text-center border border-white py-1">{activity.data_converted}</td>
                                    <td className="text-center border border-white py-1">
                                        <button className="text-sky-500 text-2xl"
                                            onClick={() => startEditing(activity.id)}><FaEdit /></button>
                                    </td>
                                    <td className="text-center border border-white py-1">
                                        <button className="text-red-500 text-2xl"
                                            onClick={() => {
                                                setDeleteID(activity.id)
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
};

export default Activity;