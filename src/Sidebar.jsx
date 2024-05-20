import React from 'react';
import "../public/style/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPaw, faPlus, faEye, faTriangleExclamation, faUserGroup, faVideo, faCubes, faChartLine, faMarker, faRightFromBracket, faBars, faTimes, faChevronDown, faGear } from '@fortawesome/free-solid-svg-icons';

//const { pathname } = window.location;
const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <>
      <div className={`sidenav ${isOpen ? 'open' : ''}`}>
        <button className="closebtn" onClick={toggleSidebar}><FontAwesomeIcon icon={faTimes} /></button>
        <a href="#" className="active">
          <FontAwesomeIcon icon={faHome} /> &nbsp; Início
        </a>
        <a href="#animal" onClick={() => toggleSubmenu('animal')}>
          <FontAwesomeIcon icon={faPaw} />&nbsp; Animal <FontAwesomeIcon icon={faChevronDown} className="submenu-icon" />
        </a>
        {activeMenu === 'animal' && (
          <div className="submenu">
            <a href="#"><FontAwesomeIcon icon={faPlus} /> &nbsp;&nbsp;Cadastrar</a>
            <a href="#"><FontAwesomeIcon icon={faEye} /> &nbsp;&nbsp;Listar</a>
            <a href="#"><FontAwesomeIcon icon={faTriangleExclamation} />&nbsp;&nbsp;Alerta</a>
          </div>
        )}
        <a href="#">
          <FontAwesomeIcon icon={faUserGroup} />&nbsp; Funcionários
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faVideo} />&nbsp; Câmeras
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faCubes} />&nbsp; Mantimentos
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faChartLine} />&nbsp; Atividades
        </a>
        <a href="#marcacoes" onClick={() => toggleSubmenu('marcacoes')}>
          <FontAwesomeIcon icon={faMarker} />&nbsp; Marcações <FontAwesomeIcon icon={faChevronDown} className="submenu-icon" />
        </a>
        {activeMenu === 'marcacoes' && (
          <div className="submenu">
            <a href="#"><FontAwesomeIcon icon={faPaw} /> &nbsp;&nbsp;Animais</a>
            <a href="#"><FontAwesomeIcon icon={faChartLine} /> &nbsp;&nbsp;Atividades</a>
            <a href="#"><FontAwesomeIcon icon={faCubes} />&nbsp;&nbsp;Mantimentos</a>
          </div>
        )}
        <a href="#">
          <FontAwesomeIcon icon={faGear} />&nbsp; Configurações
        </a>
        <a href="#">
        <FontAwesomeIcon icon={faRightFromBracket} />&nbsp; Sair
        </a>
      </div>

      <div id="main" className={isOpen ? 'shifted' : ''}>
        <button className="openbtn" onClick={toggleSidebar}><FontAwesomeIcon icon={faBars} /></button>
      </div>
    </>
  );
};

export default Sidebar;
