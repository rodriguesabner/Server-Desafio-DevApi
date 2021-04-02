const fs = require('fs')
const puppeteer = require('puppeteer');
const receiveToInsert = require("./_insertDatabase");

async function googleSearch(query) {
    console.log(`Procurando pelo site ${query}`)
    /*
        Para ver o processo de raspagem
        basta trocar o valor do headless para false.
     */
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto('https://google.com');

    await page.click('[name=q]');
    await page.keyboard.type(query);

    await page.keyboard.press('Enter');

    await page.waitForSelector('div.tF2Cxc', {timeout: 10000});

    //get base_link
    const base_url = await page.evaluate(() => document.querySelector('div.yuRUbf a').getAttribute('href'));
    const description = await page.evaluate(() => document.querySelector('div.tF2Cxc span.aCOpRe span').textContent)

    console.log(`Dados encontrados. Fechando...`);
    await browser.close();

    return {base_url: base_url, description: description}
}

async function searchCompanyGoogle(listTitles, listImgs, listCategories) {
    let lista = [];
    const listConectores = fs.readFileSync("conectores.txt").toString().split(',');
    //Lê o arquivo conectores.txt e começa a raspar os dados de cada empresa listada.
    //Objetivo: Recuperar a descrição e o website de cada um.

    for (let i = 0; i < listConectores.length; i++) {
        const query = listConectores[i];
        const conector = await googleSearch(query);
        //Pega os dados de empresa por empresa
        //e joga na lista.
        lista.push(conector);
    }

    /*
        Recebe todas as informações de empresas,
        e salva no arquivo .json
     */
    fs.appendFile('conectores-formated.json', JSON.stringify(lista), function (err) {
        if (err) return console.log(err);

        //inserir no banco
        receiveToInsert(listTitles, listImgs, listCategories);
    });
}

module.exports = searchCompanyGoogle