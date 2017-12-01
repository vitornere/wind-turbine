# Bancada Online

## Tecnologias necessárias.
* [Node](https://nodejs.org/en/download/) Latest LTS Version: 8.9.1 (includes npm 5.5.1).
* [Ionic LTS ](https://ionicframework.com/getting-started/).

## Instalação das dependências.
1. Instale o [Node](https://nodejs.org/en/download/) de acordo com o seu SO.
2. `$ cd /wind-turbine/mobile/`
3. `wind-turbine/mobile$ npm install package.json`

Pronto seu sistema já esta pronto para o desenvolvimento.

# Comandos uteis já configurados.
## Rodar aplicativo direto pelo celular com depuração pelo terminal.
* `npm runAdroid`
Execulta o comando `ionic cordova run android -lc --prod`

## Rodar o aplicativo no navegador
* `npm start`
 Execulta o comando `ionic serve -l`

## gerar apk em mode de debug
* `npm bdebug`
 Execulta o comando `ionic cordova build android --prod`

## gerar apk em mode de release
* `npm brelease`
 Execulta o comando `ionic cordova build android --prod --release`
