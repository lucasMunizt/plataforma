import React from 'react'
import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'
import { deleteDocumento } from '../../services/FireBaseDataService'
const Card = ({
    nome,
    os,
    aparelho,
    pecas,
    valor,
    data,
    id,
    tipo
}) => {

  const deletarElemento =  async() =>{
    deleteDocumento(tipo,id)
  }


   return (

    <CCard style={{ width: '18rem' }}>
      
      <CCardBody>
        <CCardTitle>{nome}</CCardTitle>
        
        <label style={{color:"black", fontWeight:600}}>Os: {" "+os}</label>
          <br />
        <label style={{color:"black", fontWeight:600}}>Aparelho: {" " + aparelho}</label>
        <br />
        <label style={{color:"black", fontWeight:600}}>Peças</label>
        
        <CCardText>
          {pecas}
        </CCardText>
        <CCardText>
          {data}
        </CCardText>
      
        <button style={
          {
            backgroundColor:"red", 
            color:"white", 
            width:"100%",
            border:"none",
            padding:"5px",
            borderRadius:"12px"
          }
          
        }
        onClick={deletarElemento}
        >
          Excluir
        </button>
      </CCardBody>
    </CCard>
  )
}

export default Card