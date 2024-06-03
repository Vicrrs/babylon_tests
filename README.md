# Babylon.js 3D Viewer

Este projeto é um visualizador 3D usando Babylon.js para carregar e visualizar objetos 3D. Ele permite clicar em pontos específicos para mover a câmera para aquela posição.

## Requisitos

- Docker
- Docker Compose

## Como Executar

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd babylon-js-test
```

2. Construa e inicie o contêiner:

```bash
docker-compose up --build
```

3. Acesse a aplicação:

Abra o navegador e vá para `http://localhost:3000`.

## Estrutura do Projeto

- `Dockerfile`: Define o ambiente Docker para construir e executar o projeto.
- `docker-compose.yml`: Configuração do Docker Compose.
- `src/`: Contém o código-fonte do projeto.
  - `api/upload.js`: Endpoint para upload de arquivos.
  - `components/BabylonScene.jsx`: Componente principal do Babylon.js.
  - `components/UploadForm.jsx`: Formulário para upload de arquivos.

