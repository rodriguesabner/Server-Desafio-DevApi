const puppeteer = require('puppeteer');
const fs = require('fs');
const searchCompanyGoogle = require("./_searchCompanyGoogle");

async function createConnectors() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://devapi.com.br/conectores');

    /*
        Listar Logotipos (dos conectores)
     */
    const listImgs = await page.evaluate(() => Array.from(document.querySelectorAll('.conectors__ConnectorCard-sc-1iqf9hr-6 img'))
        .map((image) => image.src))

    /*
        Listar Titulo (dos conectores)
        Obs: Caso queira pegar todos os conectores (96).
        basta remover o splice.
     */
    const listTitles = await page.evaluate(() => Array.from(document.querySelectorAll('.conectors__ConnectorCard-sc-1iqf9hr-6 p'))
        .map((title) => title.innerText).splice(0, 15))

    /*
        Listar Categoria (dos conectores)
     */
    await page.waitForSelector('#dropdown-basic-button');
    await page.click('#dropdown-basic-button');
    const listCategories = await page.evaluate(() => Array.from(document.querySelectorAll('.dropdown-item'))
        .map((item) => item.textContent))

    //Salva os conectores raspados em um arquivo .txt
    createTextFile(listTitles, listImgs, listCategories);
    await browser.close();
}

function createTextFile(listTitles, listImgs, listCategories) {
    let path = 'conectores.txt';

    if (!fs.existsSync(path)) {
        fs.writeFile(path, listTitles, function (err) {
            if (err) return console.log(err);

            console.log("Criando arquivo JSON...");
            console.log('Aguarde um momento...');

            //Cria o arquivo JSON com o conteúdo recuperado de cada website (pra pegar a descrição e base_url).
            searchCompanyGoogle(listTitles, listImgs, listCategories);
        });
    }
}

module.exports = createConnectors;