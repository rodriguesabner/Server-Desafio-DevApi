export function notFound(req, res) {
    return res.status(404).json({status: false, message: "Esta rota não existe."})
}