# Jonas Oliveira - Portfólio QA

Este é o repositório do meu portfólio pessoal, com foco nas minhas experiências como Analista de Qualidade (QA), automação de testes e infraestrutura.

## Tecnologias e Como Foi Feito

Este projeto foi construído tendo como prioridade performance, design moderno (Glassmorphism) e facilidade de manutenção. 

As tecnologias utilizadas foram:
*   **Vite**: Construção super rápida e servidor de desenvolvimento otimizado.
*   **HTML5 Semântico**: Estruturação acessível e otimizada.
*   **Vanilla CSS3 (Puro)**: Design construído do zero, sem uso de frameworks pesados (como Bootstrap ou Tailwind), garantindo total controle das animações, responsividade e propriedades avançadas de CSS (como `backdrop-filter`).
*   **Vanilla JavaScript**: Para interações leves como scroll suave (smooth scroll) e micro-interações (`IntersectionObserver` para o efeito *reveal*).

## Comandos Disponíveis

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

**1. Instalação**
Para instalar as dependências do projeto, execute:
```bash
npm install
```

**2. Servidor de Desenvolvimento Local**
Para abrir o projeto na sua máquina (usualmente em localhost:5173):
```bash
npm run dev
```

**3. Build de Produção**
Para gerar a versão empacotada e otimizada (minificada) para ser enviada a um servidor e rodar via Nginx/Coolify:
```bash
npm run build
```
*(Isso vai gerar a pasta `dist`)*

**4. Preview de Produção**
Para simular localmente como o servidor vai ler a sua pasta de build:
```bash
npm run preview
```

## Setup de Deploy (Coolify/Docker)

Este repositório contém um `Dockerfile` customizado e um `.dockerignore` projetados especificamente para deploys no Coolify. O Docker faz o build usando uma imagem `node:20-alpine` e serve s arquivos estáticos da pasta `dist` através de um servidor `nginx:alpine` na porta 80.
