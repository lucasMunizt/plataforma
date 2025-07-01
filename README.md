
# Documentação do Projeto - Sistema de Gestão de Ordens de Serviço e Garantias

## Descrição
Este projeto tem como intuito acelerar e organizar ordem de serviços e garantias, oferecendo uma solução digital para gerenciamento de assistência técnica em eletrodomésticos.

## Tecnologias Principais

### Frontend
- **React (v18.3.1)**: Framework JavaScript principal para construção da interface
- **React DOM (v18.3.1)**: Renderização de componentes React no navegador
- **Vite (v6.0.5)**: Ferramenta de build e desenvolvimento

### Bibliotecas de UI/UX
- **Bootstrap (v5.3.3)**: Framework CSS para design responsivo
- **Bootstrap Icons (v1.11.3)**: Pacote de ícones
- **CoreUI React (v5.7.0)**: Componentes UI adicionais
- **Lucide React (v0.514.0)**: Biblioteca de ícones
- **React Big Calendar (v1.17.1)**: Componente de calendário
- **React Modal (v3.16.3)**: Componente para modais

### Utilitários
- **Firebase (v11.3.0)**: Backend as a Service para armazenamento e autenticação
- **jsPDF (v2.5.2)**: Geração de documentos PDF
- **Moment (v2.30.1)**: Manipulação de datas

### Desenvolvimento
- **ESLint (v9.17.0)**: Linter para JavaScript/React
- **Diversos plugins ESLint**: Para manter qualidade do código
- **TypeScript Definitions**: Suporte a tipagem para React

## Estrutura do Projeto

### Componentes Principais
1. **Header**:
    - Navegação principal
    - Formulário para adicionar novos horários
    - Menu de acesso rápido

2. **Geração de PDF de Garantia**:
    - Funcionalidade para criar documentos de garantia
    - Inclui informações como:
        - Dados do cliente
        - Detalhes do serviço
        - Peças utilizadas
        - Valores
        - Data

### Funcionalidades Principais
1. **Gestão de Ordens de Serviço**
2. **Controle de Garantias**
3. **Agendamento de Serviços**
4. **Geração de Documentação**
5. **Armazenamento de Dados**

## Configuração do Ambiente de Desenvolvimento

```bash
# Instalação de dependências
npm install

# Iniciar ambiente de desenvolvimento
npm run dev

# Build do projeto
npm run build

# Verificação de código
npm run lint
```