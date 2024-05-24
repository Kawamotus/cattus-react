import React from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import "../../public/style/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPaw, faPlus, faEye, faTriangleExclamation, faUserGroup, faVideo, faCubes, faChartLine, faMarker, faRightFromBracket, faBars, faTimes, faChevronDown, faGear } from '@fortawesome/free-solid-svg-icons';

import LogoutModal from './LogoutModal';

const Sidebar = () => {

  const userImg = "../public/imgs/logo-teste.png";
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
    setIsLogoutModalOpen(false);
    navigate("/login");
    setIsOpen(false);
  };



  if(Cookies.get("token")){
    return (
      <>
        <div className={`sidenav ${isOpen ? 'open' : ''}`}>
          <button className="closebtn" onClick={toggleSidebar}><FontAwesomeIcon icon={faTimes} /></button>
          <div className='user-img'>
            <img src={userImg} alt="Username" />
            <p>Nome do cabaço {/* Cookies.get("username") ?*/}</p>
          </div>
          
          <NavLink to="/">
            <FontAwesomeIcon icon={faHome} /> &nbsp; Início
          </NavLink>
          <a onClick={() => toggleSubmenu('animal')}>
            <FontAwesomeIcon icon={faPaw} />&nbsp; Animal <FontAwesomeIcon icon={faChevronDown} className="submenu-icon" />
          </a>
          {activeMenu === 'animal' && (
            <div className="submenu">
              <NavLink to="/animalRegister"><FontAwesomeIcon icon={faPlus} /> &nbsp;&nbsp;Cadastrar</NavLink>
              <NavLink to="/animalList"><FontAwesomeIcon icon={faEye} /> &nbsp;&nbsp;Listar</NavLink>
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
          <NavLink to="/activity">
            <FontAwesomeIcon icon={faChartLine} />&nbsp; Atividades
          </NavLink>
          <a onClick={() => toggleSubmenu('marcacoes')}>
            <FontAwesomeIcon icon={faMarker} />&nbsp; Marcações <FontAwesomeIcon icon={faChevronDown} className="submenu-icon" />
          </a>
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
          <button className="openbtn" onClick={toggleSidebar}><FontAwesomeIcon icon={faBars} /></button>
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
