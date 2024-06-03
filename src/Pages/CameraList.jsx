import React from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import TituloPagina from '../Components/TituloPagina'

const CameraList = () => {
  document.title = "Cameras";


  return (
    <Container>
      <TituloPagina titulo="Câmeras" />
      <br />
      <Row style={{justifyContent: "center"}}>
        
        
            <Col>
            <div key="a" className="card-camera m-4 rounded-3 d-flex justify-content-center align-items-end" style={{ border: '2px solid rgba(0, 0, 0, 0.25)'}}>
              <img className="rounded" src="imgs/cameraCachorro.jpg" alt="Cachorro no petshop" style={{objectFit: "cover", height: "372px"}} />
              <div style={{ position: 'absolute', backgroundColor: '#ffffff', borderRadius: '25px', width: '15rem' }} className="mb-2 d-flex justify-content-end align-items-center">
                <h4 className="mt-2 mb-2">Área de Lazer</h4>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" className="h-100 me-1 d-flex align-items-center justify-content-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="2.3em" height="2.3em" viewBox="-1.5 -1.5 18 18" style={{ backgroundColor: '#670000', borderRadius: '100%' }}>
                    <path fill="#ffffff" d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414" />
                  </svg>
                </a>
              </div>
            </div>
            </Col>

            <Col>
            <div key="a" className="card-camera m-4 rounded-3 d-flex justify-content-center align-items-end" style={{ border: '2px solid rgba(0, 0, 0, 0.25)'}}>
              <img className="rounded" src="imgs/cameraCachorro.jpg" alt="Cachorro no petshop" style={{objectFit: "cover", height: "372px"}} />
              <div style={{ position: 'absolute', backgroundColor: '#ffffff', borderRadius: '25px', width: '15rem' }} className="mb-2 d-flex justify-content-end align-items-center">
                <h4 className="mt-2 mb-2">Área de Lazer</h4>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" className="h-100 me-1 d-flex align-items-center justify-content-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="2.3em" height="2.3em" viewBox="-1.5 -1.5 18 18" style={{ backgroundColor: '#670000', borderRadius: '100%' }}>
                    <path fill="#ffffff" d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414" />
                  </svg>
                </a>
              </div>
            </div>
            </Col>

 
        
      </Row>


    </Container>
  )
}

export default CameraList
