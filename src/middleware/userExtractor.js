const jwt = require('jsonwebtoken')

module.exports = (req , res , next) => {
    const authorization = req.get('authorization')

    let token = null;

    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7);
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if(!token || !decodedToken.id){
        return res.status(401).json({ error: 'Token invalido o faltante'})
    }

    const { id } = decodedToken;
    const {userRole} = decodedToken;
    const {userName} = decodedToken;
    const {userEmail} = decodedToken;

    req.body.user_id = user_id;
    req.body.userRole = userRole
    req.body.userName = userName
    req.body.userEmail = userEmail

    next()

}