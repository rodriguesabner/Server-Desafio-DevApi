require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const createConnectors = require("./_createFakeConnectors");

function App() {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    let path = 'conectores-formated.json';
    console.log('Verificando existência do arquivo JSON ->')

    if (!fs.existsSync(path)) {
        console.log('Arquivo JSON não existe...');
        console.log('Aguarde um momento, procurando por conectores...');

        createConnectors();
    } else {
        console.log('Arquivo JSON existe...');
        console.log('Não há necessidade de gerar os dados novamente...', 'Finalizando Processo.');
        process.exit(0);
    }

}

App();