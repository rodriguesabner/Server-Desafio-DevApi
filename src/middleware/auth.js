import jwt from 'jsonwebtoken'

export default function AuthJWT(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({auth: false, message: 'O token não foi informado.'});

    jwt.verify(token.split(' ')[1], process.env.SECRET_TOKEN, function (err, decoded) {
        if (err) return res.status(500).json({
            auth: false,
            message: 'Houve uma falha ao autenticar com este token. Verifique se está correto e tente novamente.'
        });

        // console.log(decoded);
        req.userId = decoded.id;
        next();
    });
}