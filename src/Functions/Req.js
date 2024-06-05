const url = "http://localhost:8080";

export const getData = async (path, id, auth) => {
    const response = await fetch(url + path + id , {
        method: "GET",
        headers: {
            "authorization": auth
        }
    });

    if(response.status === 500){
        throw new Error("Sessao expirada, refaca o login para acessar!");
    }

    if (!response.ok) {
        throw new Error("Estamos enfrentando alguns problemas, tente novamente mais tarde");
    }

    const data = await response.json();
    
    return data.result;
}