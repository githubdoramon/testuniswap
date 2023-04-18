require('@matterlabs/hardhat-zksync-deploy');
require('@matterlabs/hardhat-zksync-solc');
require('@matterlabs/hardhat-zksync-verify');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('@nomicfoundation/hardhat-chai-matchers');
require('solidity-coverage');
require('hardhat-dependency-compiler');
require('hardhat-deploy');
require('hardhat-tracer');
require('dotenv').config();


const { networks, etherscan } = require('./hardhat.networks');

module.exports = {
    solidity: {
        compilers: [
            {
                version: '0.8.19',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000000,
                    },
                    viaIR: true,
                },
            },
            {
                version: '0.5.16',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000000,
                    },
                },
            },
            {
                version: '0.6.6',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000000,
                    },
                },
            },
        ],
    },
    etherscan,
    networks,
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    tracer: {
        enableAllOpcodes: true,
    },
    mocha: {
        timeout: 120000,
    },
    defaultNetwork: 'zksyncTest',
    dependencyCompiler: {
        paths: [
            '@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol',
            '@1inch/solidity-utils/contracts/mocks/TokenMock.sol',
            '@1inch/solidity-utils/contracts/mocks/ERC20PermitMock.sol',
            '@uniswap/v2-core/contracts/UniswapV2Factory.sol',
            '@uniswap/v2-periphery/contracts/UniswapV2Router02.sol',
        ],
    },
    zksolc: {
        version: '1.3.8',
        compilerSource: 'binary',
        settings: {
            optimizer: {
                mode: "z",
              },
        },
    },
};
