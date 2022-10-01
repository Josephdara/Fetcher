const ethers = require("ethers");
const seaportABI = require("./abi/seaport.json");
require("dotenv").config();

const apikey = process.env.API_KEY;

const listen = async () => {
  const seaportAddress = "0x00000000006c3852cbEf3e08E8dF289169EdE581";
  const provider = new ethers.providers.WebSocketProvider(
    `wss://eth-mainnet.g.alchemy.com/v2/${apikey}`
  );

  const contract = await new ethers.Contract(seaportAddress, seaportABI, provider);
  contract.on("OrderFulfilled", (orderHash, offerer, zone, recipient,  offer,  consideration, event) => {
    let log = {
      orderHash: orderHash,
      offerer: offerer,
      zone: zone,
      recipient: recipient,
      offer: offer,
      consideration: consideration,
      data: event,
    };
    console.log(JSON.stringify(log, null, 7));
  });
  
};

listen();