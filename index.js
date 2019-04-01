const eos = require('./utils/eossdk')({
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
  httpEndpoint: "http://jungle2.cryptolions.io:80",
  keyProvider: "5JxqGao9rzXWBUDnNzALyxaFdmZYXiZ46EzHL4sJkHkryzCFKxu",
  authorization: 'hackdappcom1@active',
  broadcast: true,
  sign: true
})

const data = {
	actions: [
		{
      account: 'hackdappcom1',
      name: 'hi',
      authorization: [{
          actor: 'hackdappcom1',
          permission: 'active'
      }],
      data: {"user": "111"}
		}
	]
}
eos.transaction(data).then((result)=>{
    console.log(JSON.stringify(result.processed.action_traces[0].console, null, 4))
  }).catch((err)=>{
    console.log(err)
  })
