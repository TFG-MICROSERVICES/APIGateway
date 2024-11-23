import { generarError } from "../utils/generateError.js";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const { API_AUTH, API_GATEWAY_KEY } = process.env;

export async function getAuthUser(req, res, next) {
    try {
        const getUserAuthRequest = await fetch(`${API_AUTH}/auth/check`, {
            headers: {
                authorization: `${req.headers.authorization}`,
                "X-API-Key": API_GATEWAY_KEY,
            },
        });

        const getUserAuth = await getUserAuthRequest.json();

        if (getUserAuth.status !== 200) {
            generarError(getUserAuth.message, getUserAuth.status);
        }

        req.user = getUserAuth.data;

        next();
    } catch (error) {
        next(error);
    }
}