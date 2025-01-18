const { Connection, PublicKey } = require("@solana/web3.js");
require("dotenv").config();

const connection = new Connection(process.env.RPC_ENDPOINT || "https://api.mainnet-beta.solana.com");
const mintAddress = new PublicKey("6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN");

(async () => {
  try {
    const mintAccount = await connection.getParsedAccountInfo(mintAddress);
    const mintData = mintAccount.value?.data?.parsed?.info;
    console.log("Mint Data:", mintData);
    console.log("Mint Authority:", mintData?.mintAuthority || "None");
    console.log("Freeze Authority:", mintData?.freezeAuthority || "None");
    const tokenAccounts = await connection.getTokenSupply(mintAddress);
    console.log("Token Supply:", tokenAccounts.value);
    const metadataUri = mintData?.uri || "No metadata URI";
    console.log("Metadata URI:", metadataUri);
  } catch (error) {
    console.error("Error analyzing token:", error);
  }
})();
