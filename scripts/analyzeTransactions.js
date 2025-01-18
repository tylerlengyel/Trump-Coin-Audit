const { Connection, PublicKey } = require("@solana/web3.js");
require("dotenv").config();

const connection = new Connection(process.env.RPC_ENDPOINT || "https://api.mainnet-beta.solana.com");
const mintAddress = new PublicKey("6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN");

(async () => {
  try {
    const signatures = await connection.getSignaturesForAddress(mintAddress, { limit: 20 });
    console.log("Recent Signatures:", signatures);
    for (const signature of signatures) {
      try {
        const transaction = await connection.getParsedTransaction(signature.signature, {
          maxSupportedTransactionVersion: 0,
        });
        console.log(`Transaction ${signature.signature}:`, transaction);
      } catch (txError) {
        console.error(`Error fetching transaction ${signature.signature}:`, txError.message);
      }
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
})();
