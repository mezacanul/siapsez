import React from 'react'

const InformacionPersonal = () => {
  return (
    <>
      <div className='row'>
        <div className='col-sm-12 col-md-6'>
          <p><b>CURP: </b><span>##################</span></p>
          <p><b>Sexo: </b><span>Masculino</span></p>
          <p><b>Estado civil: </b><span>Soltero</span></p>
        </div>
        <div className='col-sm-12 col-md-6'>
          <p><b>Estado: </b><span>Zacatecas</span></p>
          <p><b>Localidad: </b><span>UH Jose Maria Morelos</span></p>
          <p><b>Municipio: </b><span>Cuautitlan Izcalli</span></p>
          <p><b>Calle: </b><span>Juan de la Barrera</span></p>
          <p><b>Codigo Postal: </b><span>54780</span></p>
        </div>
      </div>
    </>
  )
}

export default InformacionPersonal