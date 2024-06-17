import React from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPaw, faPlus, faEye, faTriangleExclamation, faUserGroup, faVideo, faCubes, faChartLine, faMarker, faRightFromBracket, faBars, faTimes, faChevronDown, faGear } from '@fortawesome/free-solid-svg-icons';

import LogoutModal from './LogoutModal';

const Sidebar = () => {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogoutConfirm = () => {
    Cookies.remove("acessLevel");
    Cookies.remove("companyName");
    Cookies.remove("token");
    Cookies.remove("id");
    Cookies.remove("company");
    Cookies.remove("name");
    Cookies.remove("picture");
    setIsLogoutModalOpen(false);
    navigate("/login");
    setIsOpen(false);
  };



  ////Arrumar  icones (cor e tudo mais)


  if(Cookies.get("token")){
    return (
      <>
        <div className={`sidenav ${isOpen ? 'open' : ''}`}>
          <button className="closebtn" onClick={toggleSidebar}><FontAwesomeIcon  icon={faTimes} /></button>
          <div className='user-img'>
            <img src={Cookies.get("picture")} alt="Username" /><br />
            <p><strong>{Cookies.get("name")}</strong></p>
            <p style={{textAlign: "center"}}><i>{Cookies.get("companyName")}</i></p>
          </div>
          
          <NavLink to="/" className="menu-item">
            <FontAwesomeIcon  icon={faHome} className="fa-icon" />  Início
          </NavLink>
          <a onClick={() => toggleSubmenu('animal')} className="menu-item" >
            <FontAwesomeIcon  icon={faPaw} className="fa-icon" /> Animal <FontAwesomeIcon  icon={faChevronDown} className="submenu-icon" />
          </a>
          {activeMenu === 'animal' && (
            <div className="submenu">
              <NavLink to="/petRegister" className="menu-item"><FontAwesomeIcon  icon={faPlus} className="fa-icon" /> Cadastrar</NavLink>
              <NavLink to="/petList" className="menu-item"><FontAwesomeIcon  icon={faEye} className="fa-icon" /> Listar</NavLink>
              <NavLink to="/petAlert" className="menu-item"><FontAwesomeIcon  icon={faTriangleExclamation} className="fa-icon" />Alerta</NavLink>
            </div>
          )}
          <NavLink to="/employees" className="menu-item">
            <FontAwesomeIcon  icon={faUserGroup} className="fa-icon" /> Funcionários
          </NavLink>
          <NavLink to="/camera" className="menu-item">
            <FontAwesomeIcon  icon={faVideo} className="fa-icon" /> Câmeras
          </NavLink>
          <NavLink to="/supplies" className="menu-item">
            <FontAwesomeIcon  icon={faCubes} className="fa-icon" /> Mantimentos
          </NavLink>
          <NavLink to="/activities" className="menu-item">
            <FontAwesomeIcon  icon={faChartLine} className="fa-icon" /> Atividades
          </NavLink>
          {/* <a onClick={() => toggleSubmenu('marcacoes')}>
            <FontAwesomeIcon  icon={faMarker} /> Marcações <FontAwesomeIcon  icon={faChevronDown} className="submenu-icon" />
          </a> */}
          {/* {activeMenu === 'marcacoes' && (
            <div className="submenu">
              <NavLink to="/markAnimal"><FontAwesomeIcon  icon={faPaw} /> Animais</NavLink>
              <NavLink to="/markActivity"><FontAwesomeIcon  icon={faChartLine} /> Atividades</NavLink>
              <NavLink to="/markSupplies"><FontAwesomeIcon  icon={faCubes} />Mantimentos</NavLink>
            </div>
          )} */}
          {/* <NavLink to="/config">
            <FontAwesomeIcon  icon={faGear} /> Configurações
          </NavLink> */}
          <a onClick={openLogoutModal} className="menu-item">
            <FontAwesomeIcon  icon={faRightFromBracket} className="fa-icon" /> Sair
          </a>
        </div>
        <div id="main" className={isOpen ? 'shifted' : ''}>
          <header className=" position-relative" style={{zIndex: "3", borderBottom: "2px solid rgba(0, 0, 0, 0.25)"}}>
            <nav className="navbar navbar-expand-lg d-flex flex-row align-items-center justify-content-between" style={{backgroundColor: "#670000"}}>
              <button className="openbtn" onClick={toggleSidebar}><FontAwesomeIcon  icon={faBars} /></button>
                <img className="m-2" src="/imgs/Texto_Logo_Branco.png" alt="CATTUS" style={{width: "auto", height: "30px"}} />
                <img src={Cookies.get("picture")} alt="" style={{width: "39px", borderRadius: "100%", marginRight: "10px"}}/>
                
            </nav>
          </header>
        </div>

        <LogoutModal 
          isOpen={isLogoutModalOpen} 
          onRequestClose={closeLogoutModal} 
          onConfirm={handleLogoutConfirm} 
      />
      </>
    );
  }
  else{
    return <Navigate to="/login" />
  }
  }
  


export default Sidebar;
