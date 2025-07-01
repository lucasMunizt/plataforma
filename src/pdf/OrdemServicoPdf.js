import img from '../assets/logobranco.jpg';
import jsPDF from 'jspdf';

const formatDate = (date) => {
    if (typeof date === 'string') {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }
    return date;
};

export default async function gerarPDF(id, nome, telefone, endereco, bairro, aparelho, observacao, valor, data) {
    const formattedDate = formatDate(data);
    console.log("data ", data);
    console.log("id ", id);
    
    const doc = new jsPDF();

    doc.setFont('helvetica');
    doc.setFontSize(12);
    doc.addImage(img, 'JPEG', 10, 10, 30, 30);

    doc.setFont('helvetica', 'bold');
    doc.text('REGISTRO DE ORDEM DE SERVIÇO', 60, 15);
    doc.text('CLV - ASSISTÊNCIA TÉCNICA EM ELETRODOMÉSTICOS', 60, 20);
    doc.text('TADEU BRITO TELES   CNPJ:40.034.260/0001-67', 60, 25);
    doc.text('RUA: DAMIÃO FERNANDES, 433 - PARQUELÂNDIA', 60, 30);
    doc.text('CEP: 60455-600 - FORTALEZA-CE', 60, 35);
    doc.text('TEL: (85)99994.8957/ (85)3214.6321', 60, 40);

    doc.text(`OS: ${Number(id) + 1}`, 10, 65);
    doc.text(`Nome: ${nome}`, 10, 75);
    doc.text(`Telefone: ${telefone}`, 10, 85);
    doc.text(`Endereço: ${endereco}`, 10, 95);
    doc.text(`Bairro: ${bairro}`, 10, 105);
    doc.text(`Modelo: ${aparelho}`, 10, 115);

    doc.text('Observações:', 10, 125);
    const observacoesList = observacao.split('\n');
    let yOffset = 135;
    observacoesList.forEach((obs, index) => {
        doc.text(`${index + 1}. ${obs}`, 10, yOffset + index * 10);
    });

    yOffset += observacoesList.length * 10 + 10;
    doc.text(`Valor: R$ ${valor}`, 10, yOffset);
    doc.text(`Data: ${formattedDate}`, 10, yOffset + 10);

    doc.save(`${nome}.pdf`);
}
