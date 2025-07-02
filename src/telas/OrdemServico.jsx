import React, { useEffect, useState } from 'react';
import './OrdemServico.css';
import Input from '../componentes/Input.jsx';
import Header from '../componentes/Header.jsx';
import { postToDatabaseServico } from '../services/FireBaseDataService';
const OrdemServico = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [data, setData] = useState('');
  const [aparelho, setAparelho] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [valor, setValor] = useState('');

  //função que envia os dados coletados no formulario para o post no banco
  async function PostDataBase() {
    postToDatabaseServico(
      nome,
      telefone,
      endereco,
      bairro,
      aparelho,
      observacoes,
      valor,
      data
    )
  }
  
  return (
    <div className='pai'>
      <Header/>
      <div className="ordem-servico">
        <div className="nome-f">
          <h3>Ordem de Serviço</h3>
        </div>
        <div className="campos">
          <div className="name">
            <label>Nome:</label>
            <Input id='nome' placeholder='Nome' type='text' value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="telefone">
            <label>Telefone:</label>
            <Input id='telefone' placeholder='Coloque o numero' type='number' value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </div>
          <div className="endereco">
            <label>Endereço:</label>
            <Input id='endereco' placeholder='Coloque o Endereço' type='text' value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          </div>
          <div className="bairro">
            <label>Bairro:</label>
            <Input id='bairro' placeholder='Coloque o Bairro' type='text' value={bairro} onChange={(e) => setBairro(e.target.value)} />
          </div>
          <div className="date">
            <label>Data:</label>
            <Input id='data' type='date' value={data} onChange={(e) => setData(e.target.value)} />
          </div>
          <div className="aparelho">
            <label>Aparelho:</label>
            <Input id='aparelho' placeholder='Coloque o aparelho' type='text' value={aparelho} onChange={(e) => setAparelho(e.target.value)} />
          </div>
          <div className="observacoes">
            <label>Observações:</label>
            <textarea id="observacoes" style={{ width: '100%', height: '100px', color:'black' }} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
          </div>
          <div className="valor">
            <label>Valor:</label>
            <Input id='valor' type='number' value={valor} onChange={(e) => setValor(e.target.value)} />
          </div>
        </div>
        <button id='enviar' onClick={PostDataBase}>Enviar</button>
      </div>
    </div>
  );
};

export default OrdemServico;
