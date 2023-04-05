const hre = require('hardhat');
const { ether, constants, time } = require('@1inch/solidity-utils');
const { utils, Wallet, Provider } = require('zksync-web3');
const { Deployer } = require('@matterlabs/hardhat-zksync-deploy');
const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe.only('ZKSync paymaster integration @zksync', function () {
    async function initContracts () {
        const provider = Provider.getDefaultProvider();

        const addr1 = new Wallet(process.env.ZKSYNC_PRIVATE_KEY, provider, ethers.provider);

        const deployer = new Deployer(hre, addr1);
        const ERC20PermitMock = await deployer.loadArtifact('contracts/ERC20PermitMock.sol:ERC20PermitMock');
        const WETH = await deployer.deploy(ERC20PermitMock, ['WETH', 'WETH', addr1.address, ether('1000')]);
        const TokenMock = await deployer.loadArtifact('contracts/TokenMock.sol:TokenMock');
        const DAI = await deployer.deploy(TokenMock, ['DAI', 'DAI']);
        const USDC = await deployer.deploy(TokenMock, ['USDC', 'USDC']);
        await DAI.mint(addr1.address, ether('2000'));
        await USDC.mint(addr1.address, ether('2000'));
        const tokens = {
            DAI,
            WETH,
            USDC,
            ETH: {
                address: constants.ETH_ADDRESS,
                balanceOf: ethers.provider.getBalance,
                decimals: () => 18,
            },
        };
        const UniV2Factory = await deployer.loadArtifact('UniswapV2Factory');
        const uniV2Factory = await deployer.deploy(UniV2Factory, [constants.ZERO_ADDRESS]);
        const UniV2Router = await deployer.loadArtifact('UniswapV2Router02');
        const uniV2Router = await deployer.deploy(UniV2Router, [uniV2Factory.address, tokens.WETH.address]);
        await tokens.DAI.approve(uniV2Router.address, ether('200'));
        await tokens.USDC.approve(uniV2Router.address, ether('200'));
        await uniV2Router.addLiquidity(tokens.DAI.address, tokens.USDC.address, ether('100'), ether('100'), ether('100'), ether('100'), addr1.address, '20000000000')
        const uniV2DaiUsdc = await uniV2Factory.getPair(tokens.DAI.address, tokens.USDC.address);
        // const Paymaster = await deployer.loadArtifact('Paymaster');
        // const paymaster = await deployer.deploy(Paymaster, [addr1.address]);

        return { addr1, tokens, uniV2DaiUsdc, provider };
    }

    it('try', async function () {
        await initContracts()
    });
});
