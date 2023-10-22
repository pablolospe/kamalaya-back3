const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorization = req.get('authorization');

  let token = null;

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }
  console.log(authorization);
  console.log(token);

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.user_id) {
    return res.status(401).json({ error: 'Token invalido o faltante' });
  }

  const { user_id } = decodedToken;
  const { role } = decodedToken;
  // const { nombre } = decodedToken;
  // const { apellido } = decodedToken;
  // const { email } = decodedToken;

  req.body.user_id = user_id;
  req.body.role = role;
  // req.body.nombre = nombre;
  // req.body.apellido = apellido;
  // req.body.email = email;

  next();
};
