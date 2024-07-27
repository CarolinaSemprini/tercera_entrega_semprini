//archivo users.model.js
import { UsersMongoose } from "../mongo/models/users.mongoose.js";
import { logger } from "../../utils/main.js";
import { subDays } from "date-fns";

class UsersModel {
  async readOne(email) {
    try {
      const user = await UsersMongoose.findOne(
        { email: email },
        {
          _id: true,
          first_name: true,
          last_name: true,
          age: true,
          email: true,
          password: true,
          role: true,
          premium: true,
          cartID: true,
          purchase_made: true,
          last_connection: true,
          documents: true,
        },
      );
      return user;
    } catch (e) {
      logger.error(e.message);
    }
  }

  async read() {
    try {
      const users = await UsersMongoose.find(
        {},
        {
          _id: true,
          first_name: true,
          last_name: true,
          age: true,
          email: true,
          password: true,
          role: true,
          premium: true,
          cartID: true,
          purchase_made: true,
          last_connection: true,
          documents: true,
        },
      );
      return users;
    } catch (e) {
      logger.error(e.message);
    }
  }

  async readBasicInfo() {
    try {
      const users = await UsersMongoose.find(
        {},
        {
          _id: false,
          first_name: true,
          last_name: true,
          email: true,
          role: true,
        },
      );
      return users;
    } catch (e) {
      logger.error(e.message);
    }
  }

  async readById(_id) {
    try {
      const userById = await UsersMongoose.findOne({ _id });
      return userById;
    } catch (e) {
      logger.error(e.message);
    }
  }

  async create(first_name, last_name, age, email, password, role, cartID) {
    try {
      const userCreated = await UsersMongoose.create({
        first_name,
        last_name,
        age,
        email,
        password,
        role,
        cartID,
        purchase_made: [],
      });
      return userCreated;
    } catch (e) {
      logger.error(e.message);
    }
  }

  async update(_id, user) {
    try {
      const userUpdated = await UsersMongoose.findByIdAndUpdate(_id, user, {
        new: true,
      });
      return userUpdated;
    } catch (e) {
      logger.error(e.message);
      return false;
    }
  }

  async delete(_id) {
    try {
      const deletedUser = await UsersMongoose.deleteOne({ _id: _id });
      return deletedUser;
    } catch (e) {
      logger.error(e.message);
    }
  }

  async findInactiveUsers(thresholdDays, currentDate) {
    try {
      // Encuentra a los usuarios inactivos que han estado inactivos durante más de dos días
      const deletedUsers = await UsersMongoose.find({
        last_connection: { $lt: subDays(currentDate, thresholdDays) },
      });
      return deletedUsers;
    } catch (e) {
      logger.error(e.message);
      throw e;
    }
  }

  async deleteInactiveUsers(usersToDelete) {
    try {
      // Elimina a los usuarios inactivos
      await UsersMongoose.deleteMany({
        _id: { $in: usersToDelete.map(user => user._id) },
      });
    } catch (e) {
      logger.error(e.message);
      throw e;
    }
  }

  async postDocuments(_id, file) {
    try {
      const user = await UsersMongoose.findById(_id);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      const { originalname, filename } = file;
      const documentLink = `/images/profiles/${filename}`;

      user.documents.push({ name: originalname, reference: documentLink });

      const updatedUser = await user.save();
      return updatedUser;
    } catch (e) {
      logger.error(e.message);
      throw e;
    }
  }
}

export const usersModel = new UsersModel();
