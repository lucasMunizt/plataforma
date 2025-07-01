
import "./Header.css";
import { useState } from "react";
import moment from "moment";
import logoClv from '../../assets/logobranco-removebg-preview.png';
import {SalvarServicoDataBase} from "../../services/FireBaseDataService";
import {House,CirclePlus,Database,Rows4,ClipboardList} from 'lucide-react'
const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [aparelho, setAparelho] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const abrirMenu = (e) => {
    e.preventDefault();
    setMenuAberto(!menuAberto);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "nome-cliente") {
      setNome(value);
    } else if (id === "endereco-cliente") {
      setEndereco(value);
    } else if (id === "aparelho-cliente") {
      setAparelho(value);
    } else if (id === "start") {
      setStart(value);
    } else if (id === "end") {
      setEnd(value);
    }
  };
  const startFormatted = moment(start).toDate(); // Converte para objeto Date
  const endFormatted = moment(end).toDate(); // Converte para objeto Date

    async function SalvarServico() {
        SalvarServicoDataBase(
            nome,
            endereco,
            aparelho,
            startFormatted,
            endFormatted,
        )
        setMenuAberto(false);
       // document.window.reload();
    }

  return (
    <header className="header-pai">
      <div className="container-header-pai">
          <div className="logo-header">
              <img src={logoClv} alt="logo clv"/>
              <h4 id="tag-nome">Clv Assistência Técnica</h4>
          </div>
      <div className="lista-menu">
        <ul id="tag-header">
           <li id="tag-header-li">
            <a href="../dados" id="test-a">
               <Database color="white"/>
              Mostra Dados
            </a>
          </li>
          <li id="tag-header-li">
            <a href="/home" id="test-a">
             <House color="white"/>
              Inicio
            </a>
          </li>
          <li id="tag-header-li">
            <a href="../OrdemServico" id="test-a">
                <Rows4 color="white"/>
              OS
            </a>
          </li>
          <li id="tag-header-li">
            <a href="../Garantia" id="test-a">
                <ClipboardList color="white"/>
                    Garantia
            </a>
          </li>
          <li>
            <button onClick={abrirMenu} id="botao-menu" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"5px"}}>
            <CirclePlus color="white" />
              adicionar horário
            </button>
          </li>
        </ul>
      </div>
     
      <div className="main-container">
        {menuAberto && (

          <div className="client-info">
            <div className="client-name">
              <input
                type="text"
                id="nome-cliente"
                placeholder="Adicionar nome"
                onChange={handleInputChange}
              />
            </div>
            <div className="info-section">
              <input
                type="text"
                id="endereco-cliente"
                placeholder="Adicionar endereço"
                onChange={handleInputChange}
              />

              <input
                type="text"
                id="aparelho-cliente"
                placeholder="Adicionar Aparelho"
                onChange={handleInputChange}
              />

              <div className="datas">
                <input
                  type="datetime-local"
                  id="start"
                  onChange={handleInputChange}
                  style={{
                    textAlign: "center",
                    padding: "5px",
                  }}
                />

                <input
                  type="datetime-local"
                  id="end"
                  onChange={handleInputChange}
                  style={{
                    textAlign: "center",
                    padding: "5px",
                  }}
                />
              </div>
            </div>
            <div className="button-section">
              <button id="botao-salvar" onClick={SalvarServico}>
                Salvar
              </button>
            </div>
          </div>
        )}
        </div> 
      
      </div>
    </header>
  );
};

export default Header;
