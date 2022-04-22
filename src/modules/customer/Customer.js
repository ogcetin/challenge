import React, {useEffect, useState} from 'react';
import CustomerAdd from './CustomerAdd';
import CustomerEdit from './CustomerEdit';

import { FaEdit, FaTrashAlt } from "react-icons/fa";

const dummyData = [
    {customer_id: 1, name: "Sedka Plast"},
    {customer_id: 2, name: "Melantis"},
    {customer_id: 3, name: "Xhelenga"}
];

function Customer(props) {
    const [showForm, setShowForm] = useState("add");
    const [customerList, setCustomerList] = useState(dummyData);
    const [customerDataForEdit, setCustomerDataForEdit] = useState({});
    /*
    useEffect(() => {
        fetchCustomerList()

    }, [props]);

    const fetchCustomerList = async () => {
        const response = await fetch("http://127.0.0.1:8000/customers/");
        const responseJson = await response.json();

        setCustomerList(responseJson)
    }
    */

    const updateCustomerList = (newCustomer) => {
        setCustomerList([...customerList, newCustomer]);
    }

    const startEditing = (customerID) => {
        let selectedCustomerData = customerList.filter((customerObj) => customerObj.customer_id === customerID);
        setCustomerDataForEdit(selectedCustomerData[0])
        setShowForm("edit");
    }

    const completeEditing = (editedData) => {
        let customerListClone = customerList;
        let customerListUpdated = customerListClone.map(customer => {
            if(customer.customer_id === editedData.customer_id){
                customer.name = editedData.name;
            }
            return customer;
        });

        setCustomerList(customerListUpdated);
        setShowForm("add");
    }

    const completeDelete = (customerID) => {
        let customerListClone = customerList;
        let customerListUpdated = customerListClone.filter(customer => customer.customer_id !== customerID);
        setCustomerList(customerListUpdated);
    }

    return (
        <div>
            {showForm === "add" && 
                <CustomerAdd updateCustomerList={(customerData) => updateCustomerList(customerData)} />
            }
            {showForm === "edit" && 
                <CustomerEdit customerData={customerDataForEdit} 
                    changeShowForm={(formName) => setShowForm(formName)}
                    completeEditing={(editedData) => completeEditing(editedData)}
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
                                            onClick={() => completeDelete(customer.customer_id)}><FaTrashAlt /></button>
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


export default Customer