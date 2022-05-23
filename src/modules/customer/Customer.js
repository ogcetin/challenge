import React, {useEffect, useState} from 'react';
import CustomerAdd from './CustomerAdd';
import CustomerEdit from './CustomerEdit';
import Confirmation from '../../components/Confirmation';

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Request from '../../helpers/Request';

function Customer(props) {
    const [showForm, setShowForm] = useState("add");
    const [customerList, setCustomerList] = useState([]);
    const [customerDataForEdit, setCustomerDataForEdit] = useState({});

    const [deleteID, setDeleteID] = useState(0);
    const [displayDeleteModal, setDisplayDeleteModal]= useState(false);

    useEffect(() => {
        getCustomerList()
    }, [props]);

    const getCustomerList = async () => {
        const response = await Request.Get("customers");
        setCustomerList(response);
        setShowForm("add");
    }

    const updateCustomerList = () => {
        getCustomerList();
    }

    const startEditing = (customerID) => {
        let selectedCustomerData = customerList.filter((customerObj) => customerObj.customer_id === customerID);
        setCustomerDataForEdit(selectedCustomerData[0])
        setShowForm("edit");
    }

    const completeEditing = () => {
        getCustomerList();
    }


    const responseDeleteModal = async (response) => {
        if(response){
            const response = await Request.Delete("customers", deleteID);
            getCustomerList();
        }
        setDisplayDeleteModal(false);
    }

    return (
        <div>
            {showForm === "add" &&
                <CustomerAdd updateCustomerList={() => updateCustomerList()} />
            }
            {showForm === "edit" &&
                <CustomerEdit customerData={customerDataForEdit}
                    changeShowForm={(formName) => setShowForm(formName)}
                    completeEditing={() => completeEditing()}
                />
            }

            { customerList && customerList.length < 1 &&
                <div>Görüntülenecek Firma Yok</div>
            }
            <div className="flex justify-center my-2 ">
                <div className="w-1/2  rounded bg-white-transparent">
                    <table className="table-auto p-2 w-full border-collapse border  border-slate-600">
                        <thead>
                            <tr>
                                <th className="border border-white bg-slate-50">Firma ID</th>
                                <th className="border border-white bg-slate-50">Firma Adı</th>
                                <th className="border border-white bg-slate-50"></th>
                                <th className="border border-white bg-slate-50"></th>
                            </tr>
                        </thead>
                        <tbody>
                        { customerList && customerList.length > 0 &&
                            customerList.map((customer, index) => {
                                return <tr key={customer.customer_id}>
                                    <td className="text-center border border-white py-1">{customer.customer_id}</td>
                                    <td className="text-center border border-white py-1">{customer.name}</td>
                                    <td className="text-center border border-white py-1">
                                        <button className="text-sky-500 text-2xl"
                                            onClick={() => startEditing(customer.customer_id)}><FaEdit /></button>
                                    </td>
                                    <td className="text-center border border-white py-1">
                                        <button className="text-red-500 text-2xl"
                                            onClick={() => {
                                                setDeleteID(customer.customer_id)
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
            <Confirmation
                display={displayDeleteModal}
                changeDisplay={(val) => setDisplayDeleteModal(val)}
                type="delete"
                title=""
                response={(val)=> responseDeleteModal(val)}
            />
        </div>
    )
}


export default Customer