import customError from "../errors/index.js";
import { isTokenValid } from "../utility/utiltityAuth.js";


function aurhenticateCustomer (req,res,next) {
    const token = req.signedCookies.token

    if (!token) {
        throw new customError.UnauthenticatedError("Authentication invalid");
    }
    try {
        const payload = isTokenValid({token});
        req.customer = {...payload}
    } catch (error) {
        throw new customError.UnauthenticatedError("Authentication invalid");
    }
    next()
}

function checkRoleCustomer(req,res,next) {
    if (!req.customer || req.customer.role === "demo") {
        throw new customError.UnauthorizedError("Not unauthorized to access this route");
    }
    next()
}

const aurhenticateMiddleware = {
    aurhenticateCustomer,
    checkRoleCustomer
}


export default aurhenticateMiddleware;