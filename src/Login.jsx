import { Link } from "react-router-dom";

//meter uma estrutura condicional com se estiver logado, direciona pra home, se nao, abre login
const Login = () => {

    //adicionar um autenticador de login que puxe informações (cookie?)
    const logado = false;

    if(!logado){
        return <>
        <div className="login-container">
            <div className="login-box">
                <img src="/imgs/logo-side-text.png" alt="Cattus" className="logo" />
                <form>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required placeholder="examplo@exemplo.com" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" name="password" placeholder="*************" required />
                </div>
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
