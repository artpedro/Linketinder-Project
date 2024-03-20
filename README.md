# Linketinder-Project
Repositório para a execução do projeto Linketinder, parte do processo seletivo Acelera ZG

## Inicialização

Execute o backend através do script Application na pasta:

```
src/com/acelerazg/cli_app/Application
```

Para executar o frontend, abra um servidor no arquivo registration.html na pasta:

```
frontend/registration.html
```

## Uso backend

O atual projeto é um protótipo em CLI do back-end de uma aplicação chamada Linketinder, no qual candidatos e empresas podem criar seus perfis profissionais e se conhecerem através apenas de suas afinidades e habilidades. Usuários podem curtir outros e é analizado se correrá um match. Todos os dados são armazenados em formato .JSON.

## Uso frontend

O atual frontend é um protótipo, utilizando apenas Typescript e permanência em localstorage, do Linketinder, no qual os candidatos e empresas podem se registrar em um formulário e acessar seus perfis por uma tela de login. As funções de curtida e match ainda não foram implementadas, mas há dados pre-cadastrados para testes. Os candidatos podem ver as empresas com quem já ocorreu o match e seu nivel de afinidade com elas, enquanto as empresas podem ver apenas algumas informações dos usuários e um gráfico informando a distribuição de habilidades dos candidatos com quem ela compartilha match.

## Futuras implementações

A criação de mais de uma vaga por empresa já foi implementada, porém resta vincular os candidatos a essas vagas e não às próprias empresas. Isso será implementado em futuras atualizações.

## Tecnologias utilizadas

- Gradle
- Spock
- Groovy
- Typescript
- HTML e CSS