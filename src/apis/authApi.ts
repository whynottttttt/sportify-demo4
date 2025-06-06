import axios from "axios"
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "../configs/authConfig"
import { ClientCredentialTokenResponse, ExchangeTokenResponse } from "../models/auth"

const encodedBase64 = (data: string): string => {
    if (typeof window !== "undefined") {
        // 브라우저 환경
        return btoa(data);
    } else {
        // Node.js 환경 (서버 사이드 렌더링 등)
        return Buffer.from(data).toString("base64");
    }
}

export const getClientCredientialToken = async (): Promise<ClientCredentialTokenResponse> => {
    try {
        const body = new URLSearchParams({
            grant_type: "client_credentials"
        })
        const response = await axios.post("https://accounts.spotify.com/api/token", body, {
            headers: {
                Authorization: `Basic ${encodedBase64(CLIENT_ID + ":" + CLIENT_SECRET)}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return response.data
    } catch (error) {
        throw new Error("Fail to fetch client credential token");

    }
}

export const exchangeToken = async (code: string, codeVerifier: string): Promise<ExchangeTokenResponse> => {
    try {
        const url = "https://accounts.spotify.com/api/token";
        if (!CLIENT_ID || !REDIRECT_URI) {
            throw new Error("Missing required parameters")
        }

        console.log('Token exchange parameters:', {
            client_id: CLIENT_ID,
            grant_type: 'authorization_code',
            code: code.substring(0, 20) + '...',
            redirect_uri: REDIRECT_URI,
            code_verifier: codeVerifier ? 'present' : 'missing'
        });

        const body = new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: codeVerifier,
        });

        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        return response.data;
    } catch (error: any) {
        console.error('Token exchange error:', error.response?.data || error.message);
        throw new Error(`Token exchange failed: ${error.response?.data?.error_description || error.message}`);
    }
};