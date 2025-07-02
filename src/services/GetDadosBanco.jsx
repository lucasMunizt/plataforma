import { db } from "../data/Data"; // ajuste o caminho
import { collection, getDocs,query,orderBy ,startAt, endAt} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

export async function getDadosGarantia() {
  const dados = [];
  const querySnapshot = await getDocs(collection(db, "garantia"));
  querySnapshot.forEach((doc) => {
    dados.push({ id: doc.id, ...doc.data() });
  });
   
  return dados;
}

// mudar o local onde é salvo os dados do servico ou seja o local storage;

export async function getDadosOrdemServico() {
  const dados = [];
  const queryF = query(
    collection(db,"servico"),
      orderBy("os","desc")
  )
  
  const querySnapshot = await getDocs(queryF); 
  querySnapshot.forEach((doc) => {
    dados.push({ id: doc.id, ...doc.data() });
    
  });
  console.log("dados: ", dados.length);
 // localStorage.setItem("servico",JSON.stringify(dados))
  return dados;
}

// Função para buscar dados no banco de dados pelo nome;
export async function getDadosPesquisados(valor,colecao) {
    const dados = [];
    console.log("colecao", colecao);
    
    const queryF = query(
    collection(db, `${colecao}`),
    orderBy("nome"), // O campo precisa estar indexado no Firestore
    startAt(valor),
    endAt(valor + '\uf8ff') // Busca todos os nomes que começam com "valor"
  );
    const snapShot = await getDocs(queryF);
    snapShot.forEach((doc)=>{
      dados.push({id:doc.id,...doc.data()});
    });
    console.log("dados busca nome: " , dados);
    
    return dados;
}