import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

//meter uma estrutura condicional com se estiver logado, direciona pra home, se nao, abre login
const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [erro, setErro] = React.useState()

    document.title = "Login";

    React.useEffect(() => {
        if(Cookies.get("token")){
            navigate("/");
        }
    })

    const logar = async (e) => {
        e.preventDefault();
        if(!email || !password){
            setErro("Insira todos os dados!");
        }
        let response = await fetch("http://localhost:8080/employee/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                employeeEmail: email,
                employeePassword: password
            })
        });

        response = await response.json()
        console.log(response);

        if(response.ok){ 
            Cookies.set("token", response.token);          
            navigate("/");
        }

    }

    


    //adicionar um autenticador de login que puxe informações (cookie?)
    const logado = false;

    if(!logado){
        return <>
        <div className="login-container">
            <div className="login-box">
                <img src="/imgs/logo-side-text.png" alt="Cattus" className="logo" />
                <form onSubmit={logar}>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="exemplo@exemplo.com" required/>
                    </div>
                <div className="input-group">
                    <label htmlFor="password">Senha:</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="*************"  required/>
                </div>
                {/* arrumar isso aqq */}
                {erro && <div>
                    <p style={{color: "red"}}>{erro}</p>
                    </div>}
                <div className="forget-password">
                    <Link to="/forgetPassword">
                        {/* colocar um modal aqq se der*/}
                        <p>Esqueci minha senha</p>
                    </Link>
                </div>
                <button type="submit" className="login-button">Entrar</button>
                </form>
            </div>
        </div>

    </>
    }

    else{
        return "";
    }
    
}

export default Login;
