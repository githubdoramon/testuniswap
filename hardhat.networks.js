const networks = {
    hardhat: {
        // forking: {
        //     url: process.env.MAINNET_RPC_URL,
        // },
        // chainId: Number(process.env.FORK_CHAIN_ID) || 31337,
    },
    zksyncTest: {
        url: 'http://localhost:3050',
        ethNetwork: 'http://localhost:8545',
        zksync: true,
        chainId: 270,
    },
};
const etherscan = { apiKey: {}, customChains: [] };

// if (process.env.ZKSYNC_PRIVATE_KEY) {
//     networks.zksync = {
//         url: 'https://mainnet.era.zksync.io',
//         ethNetwork: 'mainnet',
//         zksync: true,
//         chainId: 324,
//         verifyURL: 'https://zksync2-mainnet-explorer.zksync.io/contract_verification',
//         accounts: [process.env.ZKSYNC_PRIVATE_KEY],
//     };
//     console.log('Network \'zksync\' registered');
// } else {
//     console.log('Network \'zksync\' not registered');
// }

// function register (name, chainId, url, privateKey, etherscanNetworkName, etherscanKey) {
//     if (url && privateKey && etherscanKey) {
//         networks[name] = {
//             url,
//             chainId,
//             accounts: [privateKey],
//         };
//         etherscan.apiKey[etherscanNetworkName] = etherscanKey;
//         console.log(`Network '${name}' registered`);
//     } else {
//         console.log(`Network '${name}' not registered`);
//     }
// }

// function registerCustom (name, chainId, url, privateKey, etherscanKey, apiURL, browserURL) {
//     if (url && privateKey && etherscanKey) {
//         register(name, chainId, url, privateKey, name, etherscanKey);
//         etherscan.customChains.push({ network: name, chainId, urls: { apiURL, browserURL } });
//     }
// }


module.exports = {
    networks,
    etherscan,
};
