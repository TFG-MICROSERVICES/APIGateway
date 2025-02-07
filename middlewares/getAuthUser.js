import { generateError } from "../utils/generateError.js";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const { AUTH_API, API_GATEWAY_KEY } = process.env;

export async function getAuthUser(req, res, next) {
    try {
        const token = req.headers.authorization;
        const getUserAuthRequest = await fetch(`${AUTH_API}/auth/check`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": API_GATEWAY_KEY,
                Authorization: token,
            },
        });

        const getUserAuth = await getUserAuthRequest.json();

        if (getUserAuthRequest.status !== 200) generateError(getUserAuth.message, getUserAuth.status);

        req.user = getUserAuth.user;
        req.user.token = token;

        console.log(req.user);

        next();
    } catch (error) {
        next(error);
    }
}