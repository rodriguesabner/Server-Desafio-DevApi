const Connector = require("./models/Conector");
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const arrPrivacy = ["public", "private"];
const arrType = ["REST", "BD", "SOAP"];

/*
    Pega um index aleatório de acordo com o tamanho da lista;
    Objetivo: Setar um valor aleatório para os itens finais.
 */
const randomArr = (arr) => Math.floor(Math.random() * arr.length);

async function receiveToInsert(listTitles, listImgs, listCategories) {

    console.log('Lendo conectores-formated.json')
    const data = await readFile('conectores-formated.json');
    const conectoresJson = JSON.parse(data.toString())

    listTitles.map(async (item, index) => {
        await insertDB(
            item, //name
            arrType[randomArr(arrType)], //type
            arrPrivacy[randomArr(arrPrivacy)], //arrPrivacy
            conectoresJson[index].base_url, //base_url: conectoresJson - Generated with searchCompanyGoogle
            listImgs[index], //logo_url
            listCategories[randomArr(listCategories)], //categoriy
            conectoresJson[index].description, //description: conectoresJson - Generated with searchCompanyGoogle
            true //status: default true
        );

        if (listTitles.length - 1 === index) {
            console.log('Finalizando Processo...');
            process.exit(0);
        }
    })
}

async function insertDB(name, type, privacy, base_url, logo_url, category, description, status) {
    await Connector.create({
        name,
        type,
        privacy,
        base_url,
        logo_url,
        category,
        description,
        status,
    })
}

module.exports = receiveToInsert