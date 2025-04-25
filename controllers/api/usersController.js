const { User } = require("../../database/models");
const bcrypt = require("bcryptjs");
const userController = {
  login: async (req, res) => {
    try {
      console.log("req.body", req.body);

      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          meta: {
            status: 400,
            msg: "Faltan datos de inicio de sesión",
          },
        });
      }
      //Expresion regular para validar el formato del email
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
      if (!regex.test(email)) {
        return res.status(400).json({
          meta: {
            status: 400,
            msg: "El formato del email es incorrecto",
          },
        });
      }

      const user = await User.findOne({
        where: {
          email: email,
        },
        attributes: ["id", "name", "email", "password"],
      });

      if (!user) {
        return res.status(401).json({
          meta: {
            status: 401,
            msg: "Credenciales inválidas",
          },
        });
      }

      //Comparto la contraseña ingresada con la contraseña encriptada de la base de datos
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          meta: {
            status: 401,
            msg: "Credenciales inválidas",
          },
        });
      }

      // Si las credenciales son válidas, puedes devolver un token o la información del usuario
       // Eliminar la contraseña del objeto de usuario antes de enviarlo como respuesta
      return res.status(200).json({
        meta: {
          status: 200,
          msg: "Inicio de sesión exitoso",
        },
        data: user,
      });
    } catch (error) {
      console.error("Error en el controlador de inicio de sesión:", error);
      return res.status(500).json({
        meta: {
          status: 500,
          msg: "Error interno del servidor",
        },
      });
    }
  },
};

module.exports = userController;
