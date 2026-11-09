import { createHash } from "node:crypto";
import { getSessionUserQuery } from "../models/userModel.js";
import AppError from "../utils/AppError.js";

export const cookieName = "tails_session";

export const cookieOptions = () => ({
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "strict",
	path: "/",
});

export const sessionToken = (req) => {
	const cookies = req.headers.cookie?.split(";") ?? [];

	const sessionCookie = cookies
		.map((cookie) => cookie.trim())
		.find((cookie) => cookie.startsWith(`${cookieName}=`));

	return sessionCookie?.slice(cookieName.length + 1);
};

export const requireAuth = async (req, _res, next) => {
	try {
		const token = sessionToken(req);

		if (!token) {
			throw new AppError("Unauthorized: No session token provided", 401);
		}

		const tokenHash = createHash("sha256").update(token).digest("hex");

		const user = await getSessionUserQuery(tokenHash);

		if (!user) {
			throw new AppError("Unauthorized: Invalid session token", 401);
		}

		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};
