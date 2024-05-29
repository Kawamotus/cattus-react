const PetCard = () => {
  return <>
     <div className="cards-container h-100" style={{width: "80%"}}>
        <div className="card m-4 rounded-3" style={{border: "2px solid rgba(0, 0, 0, 0.25)"}}>
            <img className="card-img-top rounded-3 ms-2 mt-2 me-2" src="imgs/cachorro.jpg" alt="Imagem de capa do card" />
            <div className="card-body">
                <h3 className="card-title">Farofa</h3>
                <h5 className="card-text">Sexo: não binarie</h5>
                <a href="#" className="btn" style={{backgroundColor: "#a60303", color: "#ffffff"}}>
                    Dados 
                </a>
            </div>
        </div>
    </div> 
    </>
}

export default PetCard
