import React from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidenav ${isOpen ? 'open' : ''}`}>
        <button className="closebtn" onClick={toggleSidebar}>&times;</button>
        <a href="#home">Início</a>
        <a href="#services">Serviços</a>
        <a href="#about">Sobre</a>
        <a href="#contact">Contato</a>
      </div>
      <div id="main" className={isOpen ? 'shifted' : ''}>
        <button className="openbtn" onClick={toggleSidebar}>&#9776; Abrir Menu</button>
        <h2>Conteúdo Principal</h2>
        <p>Clique no ícone do menu para abrir o menu lateral.</p>
      </div>
    </>
  );
};

export default Sidebar;
