import { logger } from "../../utils/main.js";

export default class UsersMemory {
	constructor() {
		this.data = [];
	}
	async readOne(email) {
		try {
			const user = await this.data.find(
				{ email: email },
				{
					_id: true,
					first_name: true,
					last_name: true,
					age: true,
					email: true,
					password: true,
					role: true,
				}
			);
			return user;
		} catch (e) {
			logger.error(e.message);
		}
	}
	async read() {
		try {
			const users = await this.data.find(
				{},
				{
					_id: true,
					first_name: true,
					last_name: true,
					age: true,
					email: true,
					password: true,
					role: true,
				}
			);
			return users;
		} catch (e) {
			logger.error(e.message);
		}
	}
	async create(first_name, last_name, age, email, password, role) {
		try {
			const userCreated = await this.data.find({
				first_name,
				last_name,
				age,
				email,
				password,
				role,
				cartID: cartId,
			});
			return userCreated;
		} catch (e) {
			logger.error(e.message);
		}
	}
	async update({ _id, first_name, last_name, age, email, password, role }) {
		try {
			const userUpdated = await this.data.find({ _id: _id }, { first_name, last_name, age, email, password, role });
			if (userUpdated.nModified > 0) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			logger.error(e.message);
			return false;
		}
	}
	async delete(_id) {
		try {
			const deletedUser = await this.data.find({ _id: _id });
			return deletedUser;
		} catch (e) {
			logger.error(e.message);
		}
	}
}

export const usersMemory = new UsersMemory();
