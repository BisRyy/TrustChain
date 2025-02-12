import { createThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
const privateKey = process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
  secretKey: privateKey,
});

// connect to your contract
export const contract = getContract({
  client,
  chain: sepolia,
  address: "0xf914996beB5B1Da4b3Fb16C8D1b39C21Ea33Dde0",
});

export const chain = sepolia;
