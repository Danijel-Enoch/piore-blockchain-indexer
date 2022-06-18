var express = require('express');
var mongoose = require('mongoose');
var app = express();
const {ethers}=require("ethers");
const bodyparser=require('body-parser')
const transferModel=require("./model/transferModel");
const abi=require("./api.json");
app.use(bodyparser.json())


function listenToEvent(){
  var wsProvider = new ethers.providers.WebSocketProvider("wss://speedy-nodes-nyc.moralis.io/a9679fa83d33a799678a5795/bsc/mainnet/ws");
const contractAddress="0x55d398326f99059fF775485246999027B3197955";
const listener = new ethers.Contract(contractAddress, abi, wsProvider);

    listener.on("Transfer", async(from, to, amount,event) => {
       // console.log(`${ from } sent ${ amount } to ${ to}`);
        var newTransfer=new transferModel({
          "from":from,
          "amount":amount,
          "to":to
        })
        newTransfer.save();
      //  console.log(newTransfer);
    })

}

listenToEvent()


const CONNECTION_PORT="mongodb://mongo:P27AiuVVj8hAgAg1solH@containers-us-west-36.railway.app:6504"
const PORT=process.env.PORT || 8090;

mongoose
  .connect(CONNECTION_PORT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });