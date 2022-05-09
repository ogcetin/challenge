import React, {useState ,useEffect} from 'react';
import Request from '../../helpers/Request';

function DataEdit(props) {
    const [customerID, setCustomerID] = useState(props.data.customer_id);
    const [name, setName] = useState(props.data.name);
    const [phone, setPhone] = useState(props.data.phone);
    const [email, setEmail] = useState(props.data.email);
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        getCustomerList();
    }, [props])
    
    const getCustomerList = async () => {
        const response = await Request.Get("customers");
        setCustomerList(response);
    }

    const sendForm = async (e) => {   
        e.preventDefault();
        const response = await Request.Put("datas", props.data.data_id, {
            customer_id: customerID,
            name, email, phone
        })

        props.completeEditing();
    }
    
    return <div className="w-1/2 mx-auto my-2 my-auto p-5 bg-white-transparent rounded">
        <form onSubmit={(e) => sendForm(e)}>
            <div className="p-2 rounded flex justify-center">
                <h1 className="text-2xl font-bold">Müşteri Düzenle</h1>
            </div>
            <div className="p-2 rounded flex flex-col">
                <h1 className="font-bold">Firma</h1>
                <div>
                    <select className="w-full p-3 bg-white text-black" value={customerID} onChange={(e) => setCustomerID(e.target.value)}>
                        <option value="0">Seçiniz</option>
                        { customerList && customerList.map((customer) => {
                            return <option key={customer.customer_id} value={customer.customer_id}>{customer.name}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="p-2 rounded flex flex-col">
                <h1 className="font-bold">Müşteri Adı</h1>
                <div><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-white text-black" /></div>
            </div>
            <div className="p-2 rounded flex flex-col">
                <h1 className="font-bold">Müşteri Telefon</h1>
                <div><input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 bg-white text-black" /></div>
            </div>
            <div className="p-2 rounded flex flex-col">
                <h1 className="font-bold">Müşteri E-Posta</h1>
                <div><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-white text-black" /></div>
            </div>
            <div className="p-2 rounded">
                <div><button type="submit" className="w-full p-3 bg-sky-500 text-white font-bold rounded">Güncelle</button></div>
            </div>
            <div className="p-2 rounded">
                <div>
                <button type="button" className="w-full p-3 bg-red-500 text-white font-bold rounded"
                    onClick={() => props.changeShowForm("add")}>İptal</button>
                </div>
            </div>
        </form>
    </div>
}

export default DataEdit