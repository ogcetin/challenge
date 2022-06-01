import React, {useState} from 'react';
import Request from '../../helpers/Request';

function CustomerEdit(props) {
    const [name, setName] = useState(props.customerData.name);

    const sendForm = async (e) => {
        e.preventDefault();
        const response = await Request.Put("customers", props.customerData.id, {name})
        props.completeEditing();
        setName("");
    }

    return <div className="w-1/2 mx-auto my-2 my-auto p-5 bg-white-transparent rounded">
        <form onSubmit={(e) => sendForm(e)}>
            <div className="p-2 rounded flex justify-center">
                <h1 className="text-2xl font-bold">Firma Düzenle</h1>
            </div>
            <div className="p-2 rounded flex flex-col">
                <h1 className="font-bold">Firma Adı</h1>
                <div><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-white text-black" /></div>
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

export default CustomerEdit