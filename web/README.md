# Bancada Online

## Tecnologias necessárias.
* [Node](https://nodejs.org/en/download/) Latest LTS Version: 8.9.1 (includes npm 5.5.1).
* [ Angular](https://angular.io/).


### Instalação do Angular
0. Instale a versão LTS do [Node](https://nodejs.org/en/download/) Latest LTS Version: 8.9.1 (includes npm 5.5.1).
1. `$ cd /wind-turbine/web`
2. `wind-turbine/web$ npm install`

Pronto seu ambiente já esta pronto para o desenvolvimento.

# Comandos uteis já configurados
## Rodar o servidor.
* `wind-turbine/web$ npm start`
## gerar build
* `npm build`

### Instalação do docker
1. Instalar a ultima versão estável do [Docker CE](https://docs.docker.com/engine/installation/linux/docker-ce/debian/), a instalação varia de acordo com o sistema Operacional, siga as instruções de acordo com o seu SO.

### Subir os contêineres gerados pelo _Docker Compose_.
1. `$ cd /wind-turbine/web$`
2. `wind-turbine/web$ docker build -t turbina .` Criar uma imagem do diretório atual.
3. `wind-turbine/web$ docker run -p 8080:80 turbina ` Rodar o contêiner na porta 8080.

Pronto você pode acessar a aplicação web na porta 8080 do seu navegador
