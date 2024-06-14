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
    Cookies.remove("token");
    Cookies.remove("id");
    Cookies.remove("company");
    Cookies.remove("name");
    Cookies.remove("picture");
    setIsLogoutModalOpen(false);
    navigate("/login");
    setIsOpen(false);
  };



  ////Arrumar icones (cor e tudo mais)


  if(Cookies.get("token")){
    return (
      <>
        <div className={`sidenav ${isOpen ? 'open' : ''}`}>
          <button className="closebtn" onClick={toggleSidebar}><FontAwesomeIcon icon={faTimes} /></button>
          <div className='user-img'>
            <img src={Cookies.get("picture")} alt="Username" /><br />
            <p><strong>{Cookies.get("name")}</strong></p>
          </div>
          
          <NavLink to="/">
            <FontAwesomeIcon icon={faHome} /> &nbsp; Início
          </NavLink>
          <a onClick={() => toggleSubmenu('animal')}>
            <FontAwesomeIcon icon={faPaw} />&nbsp; Animal <FontAwesomeIcon icon={faChevronDown} className="submenu-icon" />
          </a>
          {activeMenu === 'animal' && (
            <div className="submenu">
              <NavLink to="/petRegister"><FontAwesomeIcon icon={faPlus} /> &nbsp;&nbsp;Cadastrar</NavLink>
              <NavLink to="/petList"><FontAwesomeIcon icon={faEye} /> &nbsp;&nbsp;Listar</NavLink>
              <NavLink to="/alertAnimal"><FontAwesomeIcon icon={faTriangleExclamation} />&nbsp;&nbsp;Alerta</NavLink>
            </div>
          )}
          <NavLink to="/employees">
            <FontAwesomeIcon icon={faUserGroup} />&nbsp; Funcionários
          </NavLink>
          <NavLink to="/camera">
            <FontAwesomeIcon icon={faVideo} />&nbsp; Câmeras
          </NavLink>
          <NavLink to="/supplies">
            <FontAwesomeIcon icon={faCubes} />&nbsp; Mantimentos
          </NavLink>
          <NavLink to="/activities">
            <FontAwesomeIcon icon={faChartLine} />&nbsp; Atividades
          </NavLink>
          {/* <a onClick={() => toggleSubmenu('marcacoes')}>
            <FontAwesomeIcon icon={faMarker} />&nbsp; Marcações <FontAwesomeIcon icon={faChevronDown} className="submenu-icon" />
          </a> */}
          {activeMenu === 'marcacoes' && (
            <div className="submenu">
              <NavLink to="/markAnimal"><FontAwesomeIcon icon={faPaw} /> &nbsp;&nbsp;Animais</NavLink>
              <NavLink to="/markActivity"><FontAwesomeIcon icon={faChartLine} /> &nbsp;&nbsp;Atividades</NavLink>
              <NavLink to="/markSupplies"><FontAwesomeIcon icon={faCubes} />&nbsp;&nbsp;Mantimentos</NavLink>
            </div>
          )}
          <NavLink to="/config">
            <FontAwesomeIcon icon={faGear} />&nbsp; Configurações
          </NavLink>
          <a onClick={openLogoutModal}>
            <FontAwesomeIcon icon={faRightFromBracket} />&nbsp; Sair
          </a>
        </div>
        <div id="main" className={isOpen ? 'shifted' : ''}>
          <header className=" position-relative" style={{zIndex: "3", borderBottom: "2px solid rgba(0, 0, 0, 0.25)"}}>
            <nav className="navbar navbar-expand-lg d-flex flex-row align-items-center justify-content-between" style={{backgroundColor: "#670000"}}>
              <button className="openbtn" onClick={toggleSidebar}><FontAwesomeIcon icon={faBars} /></button>
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
