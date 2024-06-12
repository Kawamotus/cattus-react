export function responseStatus(status) {
    if(status == 400){
        throw new Error("Erro na requisição, tente novamente mais tarde!");
    }
    if(status == 401){
        throw new Error("Não autorizado!");
    }
    if(status == 403){
        throw new Error("Seu nível de acesso não permite essa ação, contate o administrador de sua empresa.");
    }

}