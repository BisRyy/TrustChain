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
  address: "0x935dDB1094dAA9b8f5087C57bfbC339293a99E3a",
});

export const chain = sepolia;
