import React from 'react'
import { useState } from 'react';
import './Modal.css';
import {CircleX} from 'lucide-react';
import {DeletarEventoModal} from "../services/FireBaseDataService.jsx";
const Modal = ({
  nome,
  endereco,
  aparelho,
  onClose,
  idModal
}) => {

  const deletarEvento = async () =>{
    DeletarEventoModal(idModal);
  }
  
  return (
    <div>
        <div className="test-1">
          <div className="modal-plataforma">
                <button id='fechar-modal' onClick={onClose}><CircleX/></button>
                <div className="elementos">

                <h4 id='nome-modal'>nome: {nome}</h4>
                <h4 id='aparelho-modal'>aparelho:{aparelho} </h4>
                <h4 id='endereco-modal'>endereço:{endereco} </h4>
                </div>
                <div className="botoes-modal">
                  <button id='deletar-modal' onClick={deletarEvento}>Deletar</button>
                  <button id='editar-modal'>Editar</button>
                </div>

          </div>
        </div>

    </div>
  )
}

export default Modal