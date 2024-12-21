import { generateError } from "../utils/generateError.js";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const { AUTH_API, API_GATEWAY_KEY } = process.env;

export async function getAuthUser(req, res, next) {
    try {
        const getUserAuthRequest = await fetch(`${AUTH_API}/auth/check`, {
            headers: {
                authorization: `${req.headers.authorization}`,
                "X-API-Key": API_GATEWAY_KEY,
            },
        });

        const getUserAuth = await getUserAuthRequest.json();

        if (getUserAuthRequest.status !== 200) generateError(getUserAuth.message, getUserAuth.status);

        req.user = getUserAuth.user;

        console.log(req.user);

        next();
    } catch (error) {
        next(error);
    }
}