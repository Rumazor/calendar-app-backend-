const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const { generarJwt } = require("../helpers/jwt");

const newUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con ese correo",
      });
    }

    user = new User(req.body);

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    // generar jwt
    const token = await generarJwt(user.id, user.name);
    return res.status(201).json({
      ok: true,
      uid: user._id,
      name: user.name,
      msg: "Registro exitoso",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact to the server admin",
    });
  }
};

const loginUser = async (req, res = response, validateFields) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario o la contraseña son incorrectos",
      });
    }

    // confirmar contraseñas
    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrect",
      });
    }

    // Generar Json Web Token
    const token = await generarJwt(user.id, user.name);
    return res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact to the server admin",
    });
  }
};

const renewUserToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  //genear un nuevo json web token y retornarlo
  const token = await generarJwt(uid, name);

  res.json({
    ok: true,
    token,
    uid,
    name,
  });
};

module.exports = { newUser, loginUser, renewUserToken };
