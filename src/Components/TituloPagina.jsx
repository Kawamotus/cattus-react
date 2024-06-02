import React from 'react'

export default function TituloPagina({titulo}) {
  return <>
    <div className="container w-100 d-flex flex-column justify-content-start">
          <h1 className="ms-4 m-3 titulos">{titulo}</h1>
    </div>
    <div style={{border: "2px solid #670000", width: "94%"}}></div>
</>
}
