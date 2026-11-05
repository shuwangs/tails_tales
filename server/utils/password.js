import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const derive = promisify(scrypt);

const options = { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 };

export async function hashPassword(password, salt = randomBytes(16).toString("hex")) {
    const key = await derive(password, salt, 64, options);
    return `${salt}:${key.toString("hex")}`;
}

export async function verifyPassword(password, stored) {
    const [salt, hash] = stored.split(":");
    const candidate = await hashPassword(password, salt);
    return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(candidate.split(":")[1], "hex"));
}

export const isValidEmail = (email) => {
    if (typeof email !== "string") return false;
    const normalizedEmail = email.trim().toLowerCase();
    return (
        normalizedEmail.length <= 254 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    );
}

export const isValidPassword = (password) => {
    if (typeof password !== "string") return false;
    return password.length >= 15 && password.length <= 128;
}

export const isValidUsername = (username) => {
    if (typeof username !== "string") return false;
    const trimmedUsername = username.trim();
    return trimmedUsername.length >= 1 && trimmedUsername.length <= 100;
}