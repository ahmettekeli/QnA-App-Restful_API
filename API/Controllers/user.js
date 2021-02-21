const db = require("../Models");
const User = db.user;

const getAllUsers = async (req, res) => {
		try {
			const users = await User.findAll();
			if (!users) {
				return res.status(404).json({
					message: "No user found.",
				});
			}
			return res.status(200).json(users);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	getUser = async (req, res) => {
		const id = req.params.id;
		try {
			const user = await User.findOne({
				where: {
					id,
				},
			});
			if (!user) {
				return res.status(404).json({
					message: "User not found",
				});
			}
			return res.status(200).json(user);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	createUser = async (req, res) => {
		const { username, email, password } = req.body;
		let userExists = await User.findOne({
			where: {
				username,
			},
		});
		if (!username || !email || !password) {
			return res.status(400).json({
				message: "Username , email and password should be specified.",
			});
		}
		if (userExists) {
			return res.status(400).json({
				message: `A user already exists with the user name: ${username}`,
			});
		}
		try {
			const user = await User.create({
				username,
				password,
				email,
			});
			if (!user) {
				return res.status(500).json({
					message: "User could not be created.",
				});
			}
			res.status(200).json({
				user,
				message: "User has been created successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	updateUser = async (req, res) => {
		const id = req.params.id,
			updateOptions = {};
		for (const option in req.body) {
			updateOptions[option] = req.body[option];
		}
		try {
			const user = await User.update(updateOptions, {
				where: {
					id,
				},
			});
			if (!user) {
				return res.status(500).json({
					message: "User could not be updated.",
				});
			}
			return res.status(200).json({
				message: "User has been updated successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	deleteUser = async (req, res) => {
		const id = req.params.id;
		try {
			const deleteResult = await User.destroy({
				where: {
					id,
				},
			});
			if (!deleteResult) {
				return res.status(404).json({
					message: "User not found.",
				});
			}
			return res.status(200).json({
				message: "User has been deleted successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};

module.exports = { getAllUsers, createUser, getUser, updateUser, deleteUser };
