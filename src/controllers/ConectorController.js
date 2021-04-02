import Conector from '../models/Conector'

function _checkIfUndefined(newItem, oldItem) {
    return newItem === undefined ? oldItem : newItem;
}

export async function index(req, res) {
    const conectores = await Conector.find().where('status').equals(true).sort('-createdAt');
    return res.status(200).json(conectores);
}

export async function findBy(req, res) {
    const {query} = req.params

    const conectores = await Conector.find({
        $or: [
            {name: query},
            {category: query},
            {type: query},
            {privacy: query},
        ]
    }).sort('-createdAt');

    if (conectores.length <= 0) {
        return res.status(400).json({status: false, message: "Não foi encontrado nenhum resultado"})
    } else {
        return res.status(200).json({status: true, result: conectores});
    }
}

export async function store(req, res) {
    const {name, type, privacy, base_url, logo_url, category, description, status} = req.body

    const conector = new Conector({
        name: name,
        type: type,
        privacy: privacy,
        base_url: base_url,
        logo_url: logo_url,
        category: category,
        description: description,
        status: status
    });

    const conectorNew = await conector.save();
    res.status(201).json(conectorNew);
}

export async function updateConector(req, res) {
    const {id} = req.params;
    const {name, type, privacy, base_url, logo_url, category, description} = req.body;

    const oldConector = await Conector.findById(id);
    const update = {
        name: _checkIfUndefined(name, oldConector.name),
        type: _checkIfUndefined(type, oldConector.type),
        privacy: _checkIfUndefined(privacy, oldConector.privacy),
        base_url: _checkIfUndefined(base_url, oldConector.base_url),
        logo_url: _checkIfUndefined(logo_url, oldConector.logo_url),
        category: _checkIfUndefined(category, oldConector.category),
        description: _checkIfUndefined(description, oldConector.description)
    }

    try {
        await Conector.updateOne({_id: id}, update, {
            returnOriginal: false
        }, (err, doc) => {
            return res.status(201).json({status: true, message: `O item foi atualizado com sucesso`, conector: doc});
        })

    } catch (e) {
        return res.status(401).json({status: false, message: "Verifique se o ID está correto"});
    }

}

export async function deleteConector(req, res) {
    const {id} = req.params;
    const itemDelete = await Conector.findOneAndUpdate({_id: id}, {status: false}, {
        returnOriginal: false,
        useFindAndModify: true
    });

    if (itemDelete !== null) {
        return res.status(201).json({status: true, message: "Deletado com sucesso", conector: itemDelete});
    } else {
        return res.status(401).json({status: false, message: "Não existe nenhum conector com este ID"});
    }
}