import {
  ussersMongoose,
  conectar,
  desconectar,
} from "../dao/services/index.js";
import { emailAdmin } from "../dao/services/config.js";

export async function register(req, res) {
  try {
    await conectar();
    const reg = await ussersMongoose.create(req.body);
    await desconectar();
    if (reg) {
      req.session["usser"] = {
        first_name: reg.first_name,
        last_name: reg.last_name,
      };
      return res
        .status(201)
        .json({ status: "success", payload: req.session["usser"] });
    }
    return res
      .status(400)
      .json({ status: "error", message: "Error al registrar usuario" });
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}

export async function login(req, res) {
  try {
    await conectar(req.body);
    const usserFind = await ussersMongoose.findOne(req.body).lean();
    await desconectar();
    if (!usserFind) {
      return res
        .status(400)
        .json({ status: "error", message: "Usuario No Encontrado" });
    }

    req.session["usser"] = {
      first_name: usserFind.first_name,
      last_name: usserFind.last_name,
    };
    if (usserFind.email === emailAdmin) {
      req.session["usser"].isAdmin = true;
    } else {
      req.session["usser"].isAdmin = false;
    }

    return res.status(200).json({
      status: "success",
      payload: req.session["usser"],
    });
  } catch (error) {
    return res.status(200).json({ status: "error", message: error.message });
  }
}

export async function logout(req, res) {
  req.session.destroy((err) => {
    res.status(204).json({ status: "sucess" });
  });
}
