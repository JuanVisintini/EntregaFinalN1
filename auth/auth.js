const middlewareAutenticacion = (req, res, next) => {
    req.user = {
        isAdmin: true,
    };
    next();
};

const middlewareAutorizacion = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({
            message: "No estas autorizado",
        });
    }
};


module.exports = {
    middlewareAutenticacion,
    middlewareAutorizacion
}