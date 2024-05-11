function createLog(...types) {
    return (req, res, next) => {
        const payload = types[0];
        req.log = payload;
        next();
    }
}

export default createLog;
