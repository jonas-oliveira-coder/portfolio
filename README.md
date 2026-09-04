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

## Deploy com Docker, GHCR e Coolify

O projeto já possui um `Dockerfile` multi-stage: o primeiro estágio gera o build do Vite com `node:20-alpine` e o segundo serve os arquivos estáticos com `nginx:alpine` na porta `80`.

O workflow [`.github/workflows/build-and-deploy.yml`](.github/workflows/build-and-deploy.yml) é executado em pushes nas branches `main` ou `master` e também pode ser iniciado manualmente. Ele:

1. Constrói a imagem usando a raiz deste repositório como contexto.
2. Publica no GitHub Container Registry (`ghcr.io`) com as tags `latest` e o SHA do commit.
3. Dispara o webhook do Coolify, quando o secret correspondente está configurado.

### Configuração no Coolify

No Coolify, crie um recurso do tipo **Docker Image** e informe:

```text
ghcr.io/SEU_USUARIO/SEU_REPOSITORIO:latest
```

Configure a porta publicada como `80`. Se o pacote do GHCR for privado, cadastre no Coolify um registro Docker com:

- Registry: `ghcr.io`
- Username: seu usuário do GitHub
- Password: um Personal Access Token (classic) com permissão `read:packages`

Para atualização automática, copie o deploy webhook gerado pelo Coolify e crie no GitHub um secret chamado `COOLIFY_WEBHOOK_URL` em **Settings > Secrets and variables > Actions**. O workflow aceita também `COOLIFY_URL` ou `COOLIFY_WEBHOOK` para manter compatibilidade com configurações anteriores. Se o seu endpoint exigir autenticação Bearer, crie adicionalmente o secret `COOLIFY_TOKEN`.

Se o webhook não for configurado, a imagem continuará sendo publicada normalmente no GHCR e o deploy poderá ser acionado manualmente pelo Coolify.

### Testar a imagem localmente

```bash
docker build -t portfolio:local .
docker run --rm -p 8080:80 portfolio:local
```

Depois, acesse `http://localhost:8080`.
