//archivo users.controller.js
import UsersDTO from "./DTO/users.dto.js";
import { userService } from "../services/users.service.js";
import { logger } from "../utils/main.js";
import { sendEmail } from "../utils/main.js";

class UserController {
  async read(req, res) {
    try {
      const users = await userService.read();
      return res.status(200).json({
        status: "success",
        msg: "listado de usuarios",
        payload: users,
      });
    } catch (e) {
      logger.error(e.message);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  }

  async readBasicInfo(req, res) {
    try {
      const users = await userService.readBasicInfo();
      return res.status(200).json({
        status: "success",
        msg: "listado de usuarios (información básica)",
        payload: users,
      });
    } catch (e) {
      logger.error(e.message);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  }

  async readById(req, res) {
    try {
      const { _id } = req.params;
      const userById = await userService.readById(_id);
      return res.status(201).json({
        status: "success",
        msg: `Mostrando el producto con id ${_id}`,
        payload: { userById },
      });
    } catch (e) {
      logger.error(e.message);
    }
  }

  async readByrender(req, res) {
    try {
      const data = await userService.read();
      const dataParse = data.map(user => {
        const lastConnection = new Date(user.last_connection);
        const formattedLastConnection = lastConnection.toLocaleString();
        return {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          age: user.age,
          email: user.email,
          password: user.password,
          role: user.role,
          last_connection: formattedLastConnection,
        };
      });
      const first_name = req.session.user.first_name;
      const role = req.session.user.role;
      const title = "Padel® - Users";
      return res.status(200).render("users", { dataParse, title, first_name, role });
    } catch (e) {
      logger.error(e.message);
      res.status(501).send({ status: "error", msg: "Error en el servidor", error: e });
    }
  }

  async update(req, res) {
    try {
      const { _id } = req.params;
      const { first_name, last_name, age, email, password } = req.body;
      let user = new UsersDTO({ first_name, last_name, age, email, password });
      try {
        const userUpdated = await userService.update(_id, user);
        if (userUpdated) {
          return res.status(201).json({
            status: "success",
            msg: "user uptaded",
            payload: { userUpdated },
          });
        } else {
          return res.status(404).json({
            status: "error",
            msg: "user not found",
            payload: {},
          });
        }
      } catch (e) {
        return res.status(500).json({
          status: "error",
          msg: "db server error while updating user",
          payload: {},
        });
      }
    } catch (e) {
      logger.error(e.message);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  }

  async updateUserCart(req, res) {
    const { userId, cartId } = req.body;
    try {
      const user = await user.findById(userId);
      if (!user) {
        return res.status(404).json({ status: 'error', msg: 'User not found' });
      }
      //se cambio cart a minuscula, estaba en mayuscula
      const cart = await cart.findById(cartId);
      if (!cart) {
        return res.status(404).json({ status: 'error', msg: 'Cart not found' });
      }

      user.cartID = cartId;
      await user.save();
      res.status(200).json({ status: 'success', msg: 'User cart updated', payload: user });
    } catch (error) {
      res.status(500).json({ status: 'error', msg: 'Error interno del servidor' });
    }
  }

  async delete(req, res) {
    try {
      const { _id } = req.params;
      const userDeleted = await userService.readById(_id);
      const result = await userService.delete(_id);
      if (result?.deletedCount > 0) {
        return res.status(200).json({
          status: "success",
          msg: "user deleted",
          payload: { userDeleted },
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "user not found",
          payload: {},
        });
      }
    } catch (e) {
      logger.error(e.message);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  }

  async deleteInactiveUsers(req, res) {
    try {
      const deletedUsers = await userService.deleteInactiveUsers();

      for (const user of deletedUsers) {
        const to = user.email;
        const subject = "Cuenta eliminada por inactividad";
        const htmlContent = `
        <div>
          <h1>Hola ${user.first_name || "Usuario"},</h1>
          <p>Tu cuenta ha sido eliminada debido a la inactividad durante los últimos 2 días.</p>
          <p>PADEL</p>
        </div>
      `;
        await sendEmail(to, subject, htmlContent);
      }
      return res.status(200).json({
        status: "success",
        msg: "Usuarios inactivos eliminados y notificados por correo electrónico",
        payload: deletedUsers,
      });
    } catch (e) {
      logger.error(e.message);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  }

  async loginUser(email, password) {
    try {
      const user = await userService.authenticateUser(email, password);
      return user;
    } catch (e) {
      logger.error(e.message);
      return null;
    }
  }

  async registerUser(req) {
    try {
      const { first_name, last_name, age, email, password } = req.body;
      const role = "user";
      const userCreated = await userService.registerUser(first_name, last_name, age, email, password, role);
      return userCreated;
    } catch (e) {
      logger.error(e.message);
      return null;
    }
  }

  async premiumSwitch(req, res) {
    try {
      const userId = req.params.uid;
      const user = await userService.premiumSwitch(userId);
      req.session.user.premium = user.premium;

      const responseMessage = `Se ha actualizado correctamente la propiedad premium del usuario a ${req.session.user.premium}`;

      res.status(200).json({
        message: responseMessage,
        user: user,
      });
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  }

  async rolSwitch(req, res) {
    try {
      const userId = req.params.uid;
      const user = await userService.rolSwitch(userId);
      // No actualizar la sesión del usuario que realiza la solicitud
      //req.session.user.role = user.role;

      const responseMessage = `Se ha actualizado correctamente la propiedad rol del usuario a ${user.role} y premium a ${user.premium}`;

      res.status(200).json({
        message: responseMessage,
        user: user,
      });
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  }

  async postDocuments(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ status: "error", msg: "No se ha proporcionado un archivo." });
      }

      const { uid } = req.params;
      const file = req.file;
      await userService.postDocuments(uid, file);

      return res.status(200).render("current");
    } catch (e) {
      console.error(e.message);
      return res.status(500).json({
        status: "error",
        msg: "Error al subir la imagen de perfil.",
        error: e.message,
      });
    }
  }

  //se agrega el metodo para buscar por email
  async readByEmail(req, res) {
    try {
      const { email } = req.params;
      const user = await userService.readByEmail(email);
      if (user) {
        return res.status(200).json({
          status: "success",
          msg: `Mostrando el usuario con email ${email}`,
          payload: { user },
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: `El usuario con email ${email} no existe`,
        });
      }
    } catch (e) {
      logger.error(e.message);
      return res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        payload: {},
      });
    }
  }

}

export const usersController = new UserController();
