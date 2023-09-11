# Aplicação de Gerenciamento de Pessoas

Esta é uma aplicação de gerenciamento de pessoas desenvolvida usando Vue.js para o frontend e JSON Server para simular um servidor de backend. A aplicação permite adicionar, editar, excluir e filtrar informações sobre pessoas.

## Pré-requisitos
Antes de começar, certifique-se de que você tenha o Node.js e o npm (Node Package Manager) instalados em seu sistema. Você pode baixá-los em nodejs.org.

## Instalação
Clone este repositório para o seu sistema, ou descopacte-o em uma pasta, e entre na pasta do projeto


```bash
git clone git@github.com:Kamui-Hebertt/vue-form-vuex.git
```
Navegue até o diretório do projeto:

```bash

cd seu-repositorio
```bash
Instale as dependências do projeto executando o seguinte comando:

```bash
npm install
```
Instale o JSON Server globalmente. Se você já o tiver instalado globalmente, pule para a próxima etapa:


```bash
npm install -g json-server
```

## Inicializando o Servidor
Para iniciar o servidor JSON Server, execute o seguinte comando:

```bash
json-server --watch data.json
```
Isso irá simular um servidor de backend com base nos dados do arquivo data.json.

## Inicializando a Aplicação Frontend
Com o servidor JSON em execução, abra um novo terminal na pasta do projeto.

Execute o seguinte comando para iniciar a aplicação frontend:

```bash
npm run dev
```

A aplicação frontend será executada na porta 3001.

## Utilização
Abra um navegador da web e acesse http://localhost:3001.

Na página inicial, você verá um botão "Pessoas". Clique nele para acessar a aplicação de gerenciamento de pessoas.

Você pode adicionar novas pessoas, editar informações existentes, excluir registros e filtrar dados usando os controles disponíveis na interface.