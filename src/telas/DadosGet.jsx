import React, { useState } from 'react';
import './DadosGet.css';
//import Header from './componentes/header/Header';
import Header from '../componentes/header/Header'
import Card from '../componentes/card/Card';
import {Search} from 'lucide-react'
import { getDadosGarantia, getDadosOrdemServico,getDadosPesquisados } from '../services/GetDadosBanco';

const DadosGet = () => {
  const [dados, setDados] = useState([]);
  const [tipo, setTipo] = useState(""); 
  const [valorBusca,setValorBusca] = useState("");
  const [dadosOriginais, setDadosOriginais] = useState([]);
  const [dadosNaoEncontrados, setDadosNaoEncontrados] = useState();
 
  //função para carregar dados garantias ao clicar no botão
  const carregarGarantia = async () => {
      try {
        const dadosFirebase = await getDadosGarantia();
        if (dadosFirebase.length > 0) {
          setDados(dadosFirebase);
          setTipo("garantia");
        }else{
          setDadosNaoEncontrados(<p style={{color:"white",textAlign:"center", display:"flex",alignItems:"center",justifyContent:"center", backgroundColor:"red",width:"100%"}}>dados não encontrados</p>);
        }        
      } catch (error) { 
        console.error("erro ao carregar dados garantia ",error);
      }
  };

  //função para carregar dados ordem de serviços ao clicar no botão
  const carregarOrdemServico = async () => {
    const servicoSalvo = localStorage.getItem("servico");
    const dadosServico  =  JSON.parse(servicoSalvo)
   // console.log("ultimo id: ", dadosServico[0].os);
    try {
      const dadosFirebase = await getDadosOrdemServico();
      if (dadosFirebase.length > 0) {
        setDados(dadosFirebase);
        setTipo("servico"); 
        
      }else{
        setDadosNaoEncontrados(<p style={{color:"white",textAlign:"center", display:"flex",alignItems:"center",justifyContent:"center", backgroundColor:"red",width:"100%"}}>dados não encontrados</p>);
      }
    } catch (error) {
       console.error("erro ao carregar dados ordens de servicos ",error);
    }
  };

//função que faz a chamada para a busca por nome
 const BuscaDados = async () => {
  if (valorBusca.trim() === "") return;
  console.log("valorBusca", valorBusca);
  const dadosFirebase = await getDadosPesquisados(valorBusca,tipo);
  setDados(dadosFirebase);

  if (dadosFirebase.length === 0) {
    setDadosNaoEncontrados(<p style={{color:"white",textAlign:"center", display:"flex",alignItems:"center",justifyContent:"center", backgroundColor:"red",width:"100%"}}>dados não encontrados</p>);
  } else {
    setDadosNaoEncontrados("");
  }
};

  return (
    <div className='container-dados-pai'>
      <Header />
      <h4 id='nome-dados'>Dados {tipo}</h4>
      <div className="container-dados">
        <div className="busca-dados">
          <input type="text" id="campo-busca-dados" 
            onChange={(e)=>{setValorBusca(e.target.value)}}
            value={valorBusca}
            placeholder='Procure pelo nome ou Os'
            onKeyDown={
              (e) => {
                if (e.key === 'Enter') {
                  BuscaDados();
                }
              }}  
            />
            <button className='botao-busca' onClick={BuscaDados}> 
              <Search id='icone-busca'/>
            </button>

        </div> 
        <div className="opcoes-dados">
          <button
            className='botoes-dados'
            onClick={carregarGarantia}
          >
            Garantia
          </button>
          <button
            className='botoes-dados'
            onClick={carregarOrdemServico}
          >
            Ordem Serviços
          </button>
        </div>

        <div className="valores cards">
      {dados.length > 0 ? (
          dados.map((dado) => (
            <Card
              key={dado.id}
              os={dado.os}
              nome={dado.nome}
              pecas={dado.pecas}
              aparelho={dado.aparelho}
              valor={dado.valor}
              id={dado.id}
              tipo={tipo}
            />
          ))
        ) : (
          dadosNaoEncontrados
        )}
        </div>
      </div>
    </div>
  );
};

export default DadosGet;
