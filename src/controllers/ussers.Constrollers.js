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

export async function conectUsser(req, res) {
  try {
    await conectar();
    const usser = await ussersMongoose.findOne(req.body).lean();
    await desconectar();
    if (!usser) {
      console.log("entro");
      return res
        .status(400)
        .json({ status: "error", message: "Usuario No Encontrado" });
    }

    return res.status(200).json({
      status: "success",
      usuario: { firstName: usser.first_name, lastName: usser.last_name },
    });
  } catch (error) {
    return res.status(200).json({ status: "error", message: error.message });
  }
}
