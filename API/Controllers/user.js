const db = require("../Models");
const User = db.QnA_DB.models.user;

const getAllUsers = async (req, res) => {
		console.log("Retrieving all users...");
		try {
			const users = await User.findAll();
			console.log({ users });
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
		console.log("Retrieving user by id...");
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
			console.log({ user });
			return res.status(200).json(user);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	createUser = async (req, res) => {
		const { userName, email, password } = req.body;
		let userExists = User.findOne({
			where: {
				userName,
			},
		});
		if (!userName || !email || !password) {
			return res.status(400).json({
				message: "Username , email and password should be specified.",
			});
		}
		if (userExists) {
			return res.status(400).json({
				message: `A user already exists with the user name: ${userName}`,
			});
		}
		console.log("Creating user...");
		try {
			const user = await User.create({
				userName,
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
		console.log("Updating user...");
		const id = req.params.id,
			updateOptions = {};
		for (const option of req.body) {
			updateOptions[option.propName] = option.value;
		}
		try {
			const user = await User.update(updateOptions, {
				where: {
					id,
				},
			});
			if (!user) {
				res.status(500).json({
					message: "User could not be updated.",
				});
			}
			res.status(200).json({
				user,
				message: "User has been updated successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	deleteUser = async (req, res) => {
		console.log("Deleting user...");
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
			console.log({ deleteResult });
			return res.status(200).json({
				message: "User has been deleted successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};

module.exports = { getAllUsers, createUser, getUser, updateUser, deleteUser };
