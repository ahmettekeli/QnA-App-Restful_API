const db = require("../Models");
const User = db.QnA_DB.models.user;

const getAllUsers = async (req, res) => {
		console.log("Retrieving all users...");
		const users = await User.findAll();
		console.log({ users });
		if (!users) {
			return res.status(404).json({
				message: "No user found.",
			});
		}
		return res.status(200).json(users);
	},
	getUser = async (req, res) => {
		console.log("Retrieving user by id...");
		const id = req.params.id,
			user = await User.findOne({
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
	},
	createUser = async (req, res) => {
		console.log("Creating user...");
		const user = await User.create({
			userName: req.body.userName,
			password: req.body.password,
			email: req.body.email,
		});
		if (!user) {
			return res.status(500).json({
				message: "User could not be created.",
			});
		}
		res.status(200).json({
			user,
			message: "User is created successfully.",
		});
	},
	updateUser = async (req, res) => {
		console.log("Updating user...");
		const id = req.params.id,
			updateOptions = {};
		for (const option of req.body) {
			updateOptions[option.propName] = option.value;
		}
		const user = User.update(updateOptions, {
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
			message: "User is updated successfully.",
		});
	},
	deleteUser = async (req, res) => {
		console.log("Deleting user...");
		const id = req.params.id,
			deleteResult = await User.destroy({
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
			message: "User is deleted successfully.",
		});
	};

module.exports = { getAllUsers, createUser, getUser, updateUser, deleteUser };
