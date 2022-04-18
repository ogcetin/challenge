import React, {useEffect, useState} from 'react';
import CustomerAdd from './CustomerAdd';

import { FaEdit, FaTrashAlt } from "react-icons/fa";

const dummyData = [
    {customer_id: 1, name: "Sedka Plast"},
    {customer_id: 2, name: "Melantis"},
    {customer_id: 3, name: "Xhelenga"}
]

function Customer(props) {
    const [customerList, setCustomerList] = useState(dummyData);
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

    return (
        <div>
            <CustomerAdd updateCustomerList={(customerData) => updateCustomerList(customerData)} />
            { customerList && customerList.length < 1 && 
                <div>Görüntülenecek Müşteri Yok</div>
            }
            <div className="flex justify-center my-2 ">
                <table className="table-auto w-1/2 bg-slate-700 text-white p-2 rounded border-collapse border  border-slate-600">
                    <thead>
                        <tr>
                            <th className="border border-slate-500 bg-slate-400">Müşteri ID</th>
                            <th className="border border-slate-500 bg-slate-400">Müşteri Adı</th>
                            <th className="border border-slate-500 bg-slate-400"></th>
                            <th className="border border-slate-500 bg-slate-400"></th>
                        </tr>
                    </thead>
                    <tbody>
                    { customerList && customerList.length > 0 && 
                        customerList.map((customer, index) => {
                            return <tr key={customer.customer_id}>
                                <td className="text-center border border-slate-600 py-1">{customer.customer_id}</td>
                                <td className="text-center border border-slate-600 py-1">{customer.name}</td>
                                <td className="text-center border border-slate-600 py-1"><button className="text-sky-500 text-2xl"><FaEdit /></button></td>
                                <td className="text-center border border-slate-600 py-1"><button className="text-red-500 text-2xl"><FaTrashAlt /></button></td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Customer