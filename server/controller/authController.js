import { createHash, randomBytes } from "node:crypto";
import { cookieOptions, sessionToken } from "../middleware/auth.js";
import {
	createSessionQuery,
	createUserInDB,
	deleteSessionQuery,
	getUserByEmailQuery,
} from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import {
	hashPassword,
	isValidEmail,
	isValidPassword,
	isValidUsername,
	verifyPassword,
} from "../utils/password.js";

export const registerUser = async (req, res, next) => {
	try {
		const { username, email, password } = req.body ?? {};

		// check if username, email, and password are provided and are strings
		if (
			typeof username !== "string" ||
			typeof email !== "string" ||
			typeof password !== "string"
		) {
			throw new AppError("Username, email and password are required", 400);
		}

		const trimmedUsername = username.trim();
		const normalizedEmail = email.trim().toLowerCase();

		if (!trimmedUsername || trimmedUsername.length > 100) {
			throw new AppError("Username must be 1–100 characters", 400);
		}

		if (!isValidUsername(trimmedUsername)) {
			throw new AppError("Username must be 1–100 characters", 400);
		}

		if (!isValidEmail(normalizedEmail)) {
			throw new AppError("Enter a valid email address", 400);
		}

		if (!isValidPassword(password)) {
			throw new AppError("Password must be 15–128 characters", 400);
		}

		// Generate the hashed password
		const hashedPassword = await hashPassword(password);

		const newUser = await createUserInDB({
			username: trimmedUsername,
			email: normalizedEmail,
			hashedPassword,
		});
		res.status(201).json({
			success: true,
			data: newUser,
		});
	} catch (err) {
		if (err.code === "23505") {
			return next(new AppError("Email is already registered", 409));
		}

		next(err);
	}
};

export const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body ?? {};

		if (
			typeof email !== "string" ||
			typeof password !== "string" ||
			!email.trim() ||
			!password ||
			password.length > 128
		) {
			throw new AppError("Email and password are required", 400);
		}

		const normalizedEmail = email.trim().toLowerCase();

		const user = await getUserByEmailQuery(normalizedEmail);
		console.log({
			userFound: Boolean(user),
			hasPasswordHash: Boolean(user?.password_hash),
		});
		if (!user?.password_hash) {
			throw new AppError("Invalid email or password", 401);
		}

		const isValid = await verifyPassword(password, user.password_hash);

		if (!isValid) {
			throw new AppError("Invalid email or password", 401);
		}

		// 下一步：create a session token, store it in the database, and set it as a cookie in the response
		// generate a random token
		const token = randomBytes(32).toString("hex");
		const tokenHash = createHash("sha256").update(token).digest("hex");
		const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
		const expiresAt = new Date(Date.now() + maxAge); // 7 days from now

		await createSessionQuery(user.id, tokenHash, expiresAt);

		// set the cookie in the response
		res.cookie("tails_session", token, {
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge,
		});

		res.status(200).json({
			success: true,
			data: {
				id: user.id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (err) {
		next(err);
	}
};

export const logoutUser = async (req, res, next) => {
	try {
		const token = sessionToken(req);
		if (token) {
			const tokenHash = createHash("sha256").update(token).digest("hex");
			await deleteSessionQuery(tokenHash);
		}

		// Clear the cookie
		res.clearCookie("tails_session", cookieOptions());

		res.status(200).json({
			success: true,
			message: "Logged out successfully",
		});
	} catch (err) {
		next(err);
	}
};

export const getCurrentUser = async (req, res) => {
	res.status(200).json({
		success: true,
		data: {
			id: req.user.id,
			username: req.user.username,
			email: req.user.email,
		},
	});
};
