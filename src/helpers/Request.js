import Session from "./Session";
const URL = 'http://127.0.0.1:8000/api/';

const Request = {}

Request.Login = async (route,data) => {
    const request = await fetch(URL + route + "/", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const response = await request.json();
    return response;
};

Request.Get = async (route) => {
    const token = Session.get("token");
    const request = await fetch(URL + route + "/", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });
    const response = await request.json();
    return response;
};

Request.Post = async (route, data) => {
    const token = Session.get("token");
    const request = await fetch(URL + route + "/", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
    });
    const response = await request.json();
    return response;
};

Request.Put = async (route, primary_id, data) => {
    const token = Session.get("token");
    const request = await fetch(URL + route + "/"+ primary_id + "/", {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
    });
    const response = await request.json();
    return response;
};

Request.Delete = async (route, primary_id) => {
    const token = Session.get("token");
    const request = await fetch(URL + route + "/" + primary_id + "/", {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    });
    if(request.status === 204) return true;
    else return false;
};


export default Request;