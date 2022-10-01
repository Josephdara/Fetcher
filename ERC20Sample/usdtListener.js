const ethers = require("ethers");
const usdtABI = require("./abi/usdt.json");
require("dotenv").config();

const apikey = process.env.API_KEY;

const listen = async () => {
  const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const provider = new ethers.providers.WebSocketProvider(
    `wss://eth-mainnet.g.alchemy.com/v2/${apikey}`
  );

  const contract = await new ethers.Contract(usdtAddress, usdtABI, provider);
  contract.on("Transfer", (from, to, value, event) => {
    let log = {
      from: from,
      to: to,
      value: ethers.utils.formatUnits(value, 6),
      data: event,
    };
    console.log(JSON.stringify(log, null, 4));
  });
  
};

listen();
