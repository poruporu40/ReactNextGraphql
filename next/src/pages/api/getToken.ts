import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Auth0のトークンエンドポイントにリクエストを送信
    const response = await axios.post(
      process.env.AUTH0_MANAGEMENT_API_TOKEN_ENDPOINT,
      {
        client_id: process.env.AUTH0_MANAGEMENT_API_CLIENT_ID,
        client_secret: process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET,
        audience: process.env.AUTH0_MANAGEMENT_API_AUDIENCE_ENDPOINT,
        grant_type: 'client_credentials',
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    // 取得したアクセストークンをレスポンスとして返す
    res.status(200).json({ accessToken: response.data.access_token });
  } catch (error) {
    console.error('Failed to fetch access token:', error);
    res.status(500).json({ error: 'Failed to fetch access token' });
  }
}
