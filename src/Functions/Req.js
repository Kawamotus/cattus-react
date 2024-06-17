import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const url = "http://localhost:8080";

export const getData = async (path, id) => {
    const response = await fetch(url + path + id , {
        method: "GET",
        headers: {
            "authorization": Cookies.get("token")
        }
    });

    if(response.status === 500){
        throw new Error("Erro interno, tente novamente mais tarde");
    }

    if (!response.ok) {
        throw new Error("Estamos enfrentando alguns problemas, tente novamente mais tarde");
    }

    const data = await response.json();
    
    return data.result;
}


export const postDataJSON = async (path, body, message) => {
    const response = await fetch(url+path, {
        method: "POST",
        headers: {
            'authorization': Cookies.get("token"),
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    if(data.ok){
        toast.success(message);
    }

}


export const postDataFormData = async (path, formData, message) => {
    const response = await fetch(url + path, {
        method: "POST",
        headers: {
            'authorization': Cookies.get("token")
        },
        body: formData
    });

    const data = await response.json();

    if(data.ok){
        toast.success(message);
    }

}


export const deleteData = async (path, id, message) => {
    const response = await fetch(url + path + id, {
        method: "DELETE",
        headers: {
            'authorization': Cookies.get("token")
        }
    });

    if(response.ok){
        toast.success(message);
        
    }

}


export const updateData = async (path, id, body, message) => {
    const response = await fetch(url+path+id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'authorization': Cookies.get("token")
      },
      body: JSON.stringify(body)
    });

    if(response.ok){
        toast.success(message)
    }
}


export const uploadImg = async (body) => {
    const response = await fetch(url + "/upload-image", {
        method: "POST",
        headers: {
            'authorization': Cookies.get("token")
        }, 
        body: body
    });

    const data = await response.json();

    return data;
}
