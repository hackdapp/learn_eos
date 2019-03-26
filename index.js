const eos = require('./utils/eossdk')({
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
  httpEndpoint: "http://jungle2.cryptolions.io:80",
  keyProvider: "5JxqGao9rzXWBUDnNzALyxaFdmZYXiZ46EzHL4sJkHkryzCFKxu",
  authorization: 'hackdappcom1@active',
  broadcast: true,
  sign: true
})
const {deployContract} = require('./utils/deploy')

deployContract(eos, { account: "hackdappcom1", contractDir: "./contracts" }).then((result) => {
    console.log(`Deployment successful`, JSON.stringify(result, null , 4))
})
.catch(err => {
    console.error(`Deployment failed`, err)
})
