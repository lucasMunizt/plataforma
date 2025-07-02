import React, { useState } from "react";
import "./Garantia.css";
import Input from "../componentes/Input";
import Header from "../componentes/Header";
import { postToDatabaseGarantia } from "../services/FireBaseDataService";
const Garantia = () => {
  const [nome, setNome] = useState("");
  const [os, setOs] = useState(0);
  const [aparelho, setAparelho] = useState("");
  const [pecas, setPecas] = useState("");
  const [valor, setValor] = useState(0);
  const [data, setData] = useState();

  const ValoresCampos = (e) => {
    // e.preventDefault()
    console.log("opa");
    console.log("Nome:", nome);
    console.log("OS:", os);
    console.log("Aparelho:", aparelho);
    console.log("Peças:", pecas);
    console.log("Valor:", valor);
    console.log("Data:", data);
  };

  async function PostDataBase() {
    postToDatabaseGarantia(nome, os, aparelho, pecas, valor, data);
  }

  return (
    <div className="pai-garantia">
      <Header />
      <div className="campos-garantia">
        <div className="recibo">
          <h2>Garantia</h2>
        </div>
        <div className="formulario">
          <div className="val-extenso">
            <label>Os:</label>
            <Input
              type="number"
              placeholder="Os"
              id="os"
              onChange={(e) => {
                setOs(e.target.value);
              }}
            />
          </div>
          <div className="name">
            <label>Senhor(a):</label>
            <Input
              type="text"
              placeholder="nome"
              id="nome"
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />
          </div>

          <div className="aparelho">
            <label>Aparelho: </label>
            <Input
              type="text"
              placeholder="Referente a"
              id="aparelho"
              onChange={(e) => {
                setAparelho(e.target.value);
              }}
            />
          </div>

          <div className="valor">
            <label>Peças: </label>
            {/* <input type="text" placeholder="Valor" id="valor"> */}
            <textarea
              id="pecas"
              onChange={(e) => {
                setPecas(e.target.value);
              }}
            />
          </div>

          <div className="val-extenso">
            <label>Valor:</label>
            <Input
              type="number"
              placeholder="Valor"
              id="valor"
              onChange={(e) => {
                setValor(e.target.value);
              }}
            />
          </div>

          <div className="data-garantia">
            <label>Data:</label>
            <input
              type="date"
              id="data-garantia"
              onChange={(e) => {
                setData(e.target.value);
              }}
            />
          </div>
        </div>

        <button id="enviar" onClick={PostDataBase}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Garantia;
