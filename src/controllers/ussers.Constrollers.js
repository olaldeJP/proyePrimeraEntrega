import {
  ussersMongoose,
  conectar,
  desconectar,
} from "../dao/services/index.js";

export async function registrarUsuario(req, res) {
  try {
    await conectar();
    const reg = await ussersMongoose.create(req.body);
    await desconectar();
    if (reg) {
      return res.status(201).json(reg.toObject());
    }
    return res
      .status(400)
      .json({ status: "error", message: "Error al registrar usuario" });
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}
