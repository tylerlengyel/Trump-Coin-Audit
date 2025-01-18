const { Connection, PublicKey } = require("@solana/web3.js");
require("dotenv").config();

const connection = new Connection(process.env.RPC_ENDPOINT || "https://api.mainnet-beta.solana.com");
const programId = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

(async () => {
  try {
    const programAccount = await connection.getAccountInfo(programId);
    if (programAccount.executable) {
      console.log("Program is executable.");
    } else {
      console.warn("Program is not executable.");
    }
    const owner = programAccount.owner.toBase58();
    console.log("Program Owner:", owner);
    if (owner === "BPFLoaderUpgradeab1e11111111111111111111111") {
      console.log("The program is upgradeable. Checking upgrade authority...");
      console.log("Upgrade Authority: Unknown");
    } else {
      console.warn("Unknown program owner. Proceed with caution.");
    }
  } catch (error) {
    console.error("Error analyzing program ownership:", error);
  }
})();
