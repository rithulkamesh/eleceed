import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

type Data = {
  message: string;
  status: number;
};

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

const getAccessToken = async (code: string): Promise<TokenResponse> => {
  const formData = new URLSearchParams();

  formData.append("client_id", process.env.DISCORD_CLIENT_ID as string);
  formData.append("client_secret", process.env.DISCORD_CLIENT_SECRET as string);

  formData.append("grant_type", "authorization_code");
  formData.append("code", code);
  formData.append("redirect_uri", process.env.REDIRECT_URI as string);

  const tokenResult = await fetch("https://discord.com/api/v10/oauth2/token", {
    body: formData,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => res.json());
  return tokenResult as TokenResponse;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!("code" in req.query)) {
    res.status(400);
    return;
  }
  let code = req.query["code"] as string;
  const token = await getAccessToken(code);
  let result = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }).then((res) => res.json());

  await fetch(
    `https://discord.com/api/guilds/${process.env.GUILD_ID}/members/${result.id}/roles/${process.env.VERIFY_ROLE_ID}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
      },
    }
  ).then();

  await setCookie("_discord_token" as string, token.access_token, {
    maxAge: token.expires_in,
    req,
    res,
  });

  res.redirect(process.env.DISCORD_SERVER as string);
}
