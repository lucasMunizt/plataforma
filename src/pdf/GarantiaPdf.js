import img from '../assets/logobranco.jpg';
import jsPDF from 'jspdf';

const formatDate = (date) => {
    if (typeof date === 'string' && date.includes('-')) {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }
    return date; // Caso seja inválido, retorna como está
};

/**
 * Gera o PDF da ordem de serviço
 * @param {object} params - Objeto com os dados necessários
 */
export default async function gerarPDFGarantia  ( os, nome, aparelho, pecas, valor, data )  {
    const formattedDate = formatDate(data);
    const doc = new jsPDF();

    // Fonte padrão
    doc.setFont("helvetica");
    doc.setFontSize(12);

    // Logo
    const imgX = 10, imgY = 10, imgWidth = 20, imgHeight = 20;
    doc.addImage(img, 'JPEG', imgX, imgY, imgWidth, imgHeight);

    // Cabeçalho
    doc.setFont("helvetica", "bold");
    doc.text("CLV - ASSISTÊNCIA TÉCNICA EM ELETRODOMÉSTICOS", 35, 10);
    doc.text("TADEU BRITO TELES CNPJ:40.034.250/0001-67", 35, 20);
    doc.text("GARANTIA DO SERVIÇO - 90 DIAS A CONTAR A PARTIR DA ENTREGA", 35, 30);

    // Informações do serviço
    doc.text(`OS: ${os}`, 10, 50);
    doc.text(`CLIENTE - ${nome}`, 10, 60);
    doc.text(`APARELHO: ${aparelho}`, 10, 70);

    // Peças
    doc.text("PEÇAS:", 10, 80);
    const pecasList = pecas ? pecas.split('\n') : [];
    let yOffset = 90;
    pecasList.forEach((peca, index) => {
        doc.text(`- ${peca}`, 10, yOffset + index * 10);
    });

    yOffset += pecasList.length * 10 + 10;
    doc.text(`VALOR R$: ${valor}`, 10, yOffset);
    doc.text(`DATA: ${formattedDate}`, 10, yOffset + 10);

    // Salvar
    doc.save(`${nome}.pdf`);
};
