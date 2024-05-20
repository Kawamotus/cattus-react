//import React from 'react';

//meter uma estrutura condicional com se estiver logado, direciona pra home, se nao, abre login
const Login = () => {

    //adicionar um autenticador de login que puxe informações (cookie?)
    const logado = true;

    if(!logado){
        return <>

        <div className="login-container">
            <div className="login-box">
                <img src="logo.png" alt="Logo" className="logo" />
                <h2>Login</h2>
                <form>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" required />
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
