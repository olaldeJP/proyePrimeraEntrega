import {
  ussersMongoose,
  conectar,
  desconectar,
} from "../../dao/services/index.js";
import { emailAdmin } from "../../dao/services/config.js";

//Se guarda en la base de datos el usuario enviado desde register.handlebars
export async function register(req, res) {
  try {
    await conectar();
    const reg = await ussersMongoose.create(req.body);
    await desconectar();
    if (reg) {
      req.session["usser"] = {
        first_name: reg.first_name,
        last_name: reg.last_name, //si Existe se guarda el nombre en req.session
      };
      /*res.cookie(
        "usserLogin", //nombre de la cookie
        req.session["usser"], //contenido de la cookie
        {
          signed: true, //firma digital, el mensaje no sera adulterado
          maxAge: 120_000, //tiempo que vivira la cookie
        }
      );*/ // se guarda en la cookie la informacion del usuario por 2 minutos
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
// si existe el nobmre y usuario enviado desde el formulario de login , se guarda en res.session y en req.cookie
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
      //verifica si es admin
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
//elimina la sesion y la cookie luego de darle al boton desconectar en perfil.handlebars
export async function logout(req, res) {
  req.session.destroy((err) => {
    res.clearCookie("usserLogin");
    res.status(204).json({ status: "sucess" });
  });
}
