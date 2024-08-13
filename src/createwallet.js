// importando as dependencias
const bip32 = require("bip32")
const bip39 = require("bip39")
const bitcoin = require("bitcoinjs-lib")

//definir a rede utilizada
// redes para utilizar = bitcoin -rede principal - main net
// Testnet -- rede para test - testnet
const network = bitcoin.networks.testnet

// derivação de carteiras HD
// o segundo /1 é para o test net, caso for utilizado a mainnet utilizar /0
const path = `m/49'/1'/0'/0`

//criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da cartiera HD
let root = bip32.fromSeed(seed, network)

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada:", node.toWIF())
console.log("Seed:", mnemonic)