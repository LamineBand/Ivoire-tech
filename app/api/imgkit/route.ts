import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  const { token, expire, signature } = getUploadAuthParams({
    privateKey: process.env.IMG_KIT_PUBLIC as string,
    publicKey: process.env.IMG_KIT_PRIVE as string,
  });

  return Response.json({
    token,
    expire,
    signature,
    publicKey: process.env.IMG_KIT_PUBLIC,
  });
}
