# Conector API

Este projeto consiste em criar uma API para o portal web da DevApi.

## Gerando novos conectores

Com um comando você consegue gerar os conectores. Note que este processo pode ser demorado dependendo do desempenho de
sua máquina.

Esse script baseia-se em raspar os conectores existentes no site DevAPI, depois procurar por cada conector no Google,
recuperando assim dados como: Descrição e BaseURL.

Será criado 2 arquivos: `conectores.txt` e `conectores-formated.json`.

```shell
yarn generate-data
#or
npm run generate-data
```

## Rodando o servidor

Após gerar o primeiro script, você está apto a rodar o servidor. Para rodar é simples, basta utilizar o comando:

```shell
yarn dev
#or
npm run dev
```

O servidor está rodando de acordo com ES6, então foi utilizado sintaxes como `import`, `export default`... Isso permite
uma organização e visualização melhor dos códigos.

Utilizei o package babel para isto. Acabei utilizando o NodeJS sem framework (NestJS) por não conhecer a fundo o Nest.
(Mas já dei uma estudada por cima e parece bem tranquilo).

## Construindo o servidor

```shell
yarn build
#or
npm run build
```

## Banco de dados

O banco de dados utilizado foi o **MongoDB**, com a ODM **mongoose**.

Para utilizar a API você precisa alterar o **valor** de *MONGO_URL* presente no arquivo .env.

[Aqui](.env) você encontra o arquivo **.env**

## Padrão JWT

O padrão de autenticação JWT foi implementado no servidor através de um middleware, sempre que uma requisição é feita, o
middleware detecta se o Authorization está presente.

## Rotas

[Aqui](requests.http) você encontra a relação de rotas presentes no servidor.

Demonstração
![Peek 2021-04-02 17-25](https://user-images.githubusercontent.com/40338524/113451513-7def8400-93d8-11eb-9de2-ab38ecff3c99.gif)

### Autor

---

<a href="https://github.com/kingaspx/">
 <img style="border-radius: 50%;" src="https://github.com/kingaspx.png" width="100px;" alt=""/>
 <br />
 <sub><b>Abner Rodrigues</b></sub></a> <a href="https://blog.rocketseat.com.br/author/thiago//" title="Rocketseat">🚀</a>


Feito com ❤️ por Abner Rodrigues 👋🏽 Entre em contato!

[![Twitter Badge](https://img.shields.io/badge/-@kingaspx-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/kingaspx)](https://twitter.com/kingaspx)
[![Linkedin Badge](https://img.shields.io/badge/-Thiago-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/rodriguesabner/)
[![Gmail Badge](https://img.shields.io/badge/-abnerodrigs@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:abnerodrigs@gmail.com)](mailto:abnerodrigs@gmail.com)
