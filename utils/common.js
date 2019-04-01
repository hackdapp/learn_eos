const fs = require('fs')
const path = require('path')

function getDeployableFilesFromDir(dir) {
    const dirCont = fs.readdirSync(dir)
    const wasmFileName = dirCont.find(filePath => filePath.match(/.*\.(wasm)$/gi))
    const abiFileName = dirCont.find(filePath => filePath.match(/.*\.(abi)$/gi))
    if (!wasmFileName) throw new Error(`Cannot find a ".wasm file" in ${dir}`)
    if (!abiFileName) throw new Error(`Cannot find an ".abi file" in ${dir}`)
    return {
        wasmPath: path.join(dir, wasmFileName),
        abiPath: path.join(dir, abiFileName),
    }
}

function deployContract(eos, { account, contractDir }) {
  const { wasmPath, abiPath } = getDeployableFilesFromDir(contractDir)

  const wasm = fs.readFileSync(wasmPath)
  const abi = fs.readFileSync(abiPath)

  const codePromise = eos.setcode(account, 0, 0, wasm)
  const abiPromise = eos.setabi(account, JSON.parse(abi))
  return Promise.all([codePromise, abiPromise])
}

module.exports = {deployContract}
