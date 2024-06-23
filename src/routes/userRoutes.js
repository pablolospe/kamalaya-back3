const { Router } = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/db');
const router = Router();
const { validarSignin } = require('../schemas/signin');
const { validarPass } = require('../schemas/pass');
const userExtractor = require('../middleware/userExtractor');

router.get('/', userExtractor, async (req, res) => {
  // const token = req.headers['authorization'];

  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get('/:id', userExtractor, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const userToUpdate = await User.findByPk(id);

    const result = validarSignin(req.body);

    const { password } = result.data;

    const passwordMatch = await bcrypt.compare(password, userToUpdate.hashPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    result.data.hashPassword = await bcrypt.hash(password, 8);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }

    await userToUpdate.update(result.data);

    res.status(200).json({ message: 'Usuario actualizado con éxito', user: userToUpdate });
  } catch (error) {
    res.status(404).json(error);
  }
});

router.patch('/', userExtractor, async (req, res) => {
  try {

    const result = validarPass(req.body);
    const { user_id, oldPassword, newPassword } = result.data;

    const userToUpdate = await User.findByPk(user_id);

    const passwordMatch = await bcrypt.compare(oldPassword, userToUpdate.hashPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    result.data.hashPassword = await bcrypt.hash(newPassword, 8);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }

    await userToUpdate.update(result.data);

    res.status(200).json({ message: 'Usuario actualizado con éxito', user: userToUpdate });
  } catch (error) {
    res.status(404).json(error);
  }
});


router.delete('/:id', userExtractor, async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioABorrar = await User.findByPk(id);
    if (!usuarioABorrar) res.status(200).send('Usuario no encontrado');
    else {
      await usuarioABorrar.destroy();
      res
        .status(200)
        .json(
          `Paciente ${usuarioABorrar.nombre} ${usuarioABorrar.apellido} (${usuarioABorrar.email}) borrado/a con éxito.`
        );
    }
  } catch (error) {
    res.status(404).json(error);
  }
});


module.exports = router;
