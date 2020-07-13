const MacAddressValidation = (req, res, next) => {
    if (!req.body.macaddress) {
        return res.status(400).json({ error: 'Informar o MacAddress' })
    }
    next();
}

module.exports = MacAddressValidation;