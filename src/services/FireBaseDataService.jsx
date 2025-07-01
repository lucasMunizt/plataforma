import React from "react";
import { db } from "../Data/Data";
import {
  collection,
  addDoc,
  limit,
  query,
  getDocs,
  orderBy,
  doc,
  runTransaction,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import gerarPDF from "../pdf/OrdemServicoPdf";
import gerarPDFGarantia from "../pdf/GarantiaPdf";


//Post para agendamentos
export async function postToDatabase({ nome, endereco, aparelho, start, end }) {
  try {
    await addDoc(collection(db, "agendamentos"), {
      title: nome,
      endereco: endereco,
      desc: aparelho,
      start,
      end,
      color: "blue",
    });
    location.reload();
    alert("Agendamento salvo com sucesso!");
  } catch (e) {
    console.error("Erro ao salvar no banco de dados:", e);
  }
}
//post para garantias
export async function postToDatabaseGarantia(
  nome,
  os,
  aparelho,
  pecas,
  valor,
  data
) {
  try {
    await addDoc(collection(db, "garantia"), {
      nome: nome,
      os: os,
      aparelho: aparelho,
      pecas: pecas,
      valor: valor,
      data: data,
    });
    gerarPDFGarantia(os, nome, aparelho, pecas, valor, data);
    alert("deu certo")
  } catch (e) {
    console.log("errou: " + e);
  }
}

//função para salvar dados ordem serviços
export async function postToDatabaseServico(
  nome,
  telefone,
  endereco,
  bairro,
  aparelho,
  observacoes,
  valor,
  data,
  os
) {
  const contadorRef = doc(db, "controle", "contadorOS");
  try {
    const novaOS = await runTransaction(db, async (transaction) => {
      const contadorDoc = await transaction.get(contadorRef);

      if (!contadorDoc.exists()) {
        throw "Documento contadorOS não existe!";
      }

      const ultimaOS = contadorDoc.data().ultimaOS || 0;
      const novaOS = ultimaOS + 1;

      // Atualiza o contador
      transaction.update(contadorRef, { ultimaOS: novaOS });
      await addDoc(collection(db, "servico"), {
        nome: nome,
        telefone: telefone,
        endereco: endereco,
        bairro: bairro,
        aparelho: aparelho,
        observacoes: observacoes,
        valor: valor,
        data: data,
        os: novaOS,
      });
      gerarPDF(
        novaOS,
        nome,
        telefone,
        endereco,
        bairro,
        aparelho,
        observacoes,
        valor,
        data
      );
      console.log("Data:", data);
    });
    alert("deu certo ", novaOS, "\n", "data:", data);
    console.log("Data:", data);
    //console.log("novaos", novaOS);
    return novaOS;
    //window.location.reload();
  } catch (e) {
    console.log("errou: " + e);
  }
}

export async function deleteDocumento(colecao, id) {
  try {
    const docRef = doc(db, colecao, id);
    await deleteDoc(docRef);
    alert("Documento deletado com sucesso!");
    window.location.reload();
  } catch (error) {
    console.error("Erro ao deletar o documento:", error);
    alert("Erro ao deletar o documento. Verifique o console.");
  }
}

// post serviços campo header
export async function SalvarServicoDataBase(nome,endereco,aparelho,start,end){
  try{
  await postToDatabase({
    nome,
    endereco,
    aparelho,
    start:start,
    end: end,
  });

  }catch (error){
    console.error("erro ao salvar no banco de dados: "+ error);
  }

}

export async function DeletarEventoModal(id){
  try{
    await deleteDoc(doc(db,"agendamentos",id));
       location.reload();
       alert("Evento deletado com sucesso!");
      return {success: true}

  }catch (error) {
    console.error("erro ao deletar no banco de dados: "+ error);
    return {success: false}
  }

}