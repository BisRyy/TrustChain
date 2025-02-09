"use server";

import { createThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
const privateKey = process.env.THIRDWEB_SECRET_KEY;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: privateKey ? privateKey : clientId,
  secretKey: privateKey,
});

// connect to your contract
export const contract = getContract({
  client,
  chain: sepolia,
  address: "0xf32419209E84a6382558aCD6DaF3B396478b5f5e",
});

export const chain = sepolia;
