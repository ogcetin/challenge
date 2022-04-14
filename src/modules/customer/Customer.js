import React, {useEffect, useState} from 'react';

const dummyData = [
    {customer_id: 1, name: "Sedka Plast"},
    {customer_id: 2, name: "Melantis"},
    {customer_id: 3, name: "Xhelenga"}
]

function Customer(props) {
    const [customerList, setCustomerList] = useState([]);
    useEffect(() => {
        fetchCustomerList()

    }, [props]);

    const fetchCustomerList = async () => {
        const response = await fetch("http://127.0.0.1:8000/customers/");
        const responseJson = await response.json();

        setCustomerList(responseJson)
    }

    return (
        <div>
            { customerList && customerList.length < 1 && 
                <div>Görüntülenecek Müşteri Yok</div>
            }
            <ul>
                { customerList && customerList.length > 0 && 
                    customerList.map((customer, index) => {
                        return <div key={customer.customer_id}>{customer.name}</div>
                    })
                }
            </ul>
        </div>
    )
}


export default Customer