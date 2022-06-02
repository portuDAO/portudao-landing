import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import usdcAbi from 'contracts/usdc/usdcAbi.json';
import { MaxUint256 } from '@ethersproject/constants';
import erc20Abi from 'config/abi/erc20.json';
import ERC20_INTERFACE, { ERC20_ABI, ERC20_BYTES32_ABI } from 'config/abi/erc20';
import { getContract, getProviderOrSigner } from 'utils';
import { ethers, BigNumber } from 'ethers';
import { FeeTokenMembership, polygonMainnetTokens, polygonTestnetTokens } from 'config';
import getProvider from 'wallets/utils';

const usdcAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
const linkAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
const ALCHEMY_URL = `${process.env.REACT_APP_ALCHEMY_HOSTNAME}${process.env.REACT_APP_ALCHEMY_API_KEY}`;
const web3 = createAlchemyWeb3(ALCHEMY_URL);

const feeAddress = process.env.NODE_ENV !== 'development' ? usdcAddress : linkAddress;

const contract = new web3.eth.Contract(
  // @ts-ignore
  ERC20_ABI,
  feeAddress
);

const contractAddress =
  process.env.NODE_ENV !== 'development' ? '' : '0x0e562f5D6869f20b5243E6C441149705906094E8';

const approve = async () => {
  try {
    // TODO: dynamic imports mainnet and testnet variables
    if (process.env.NODE_ENV !== 'development') {
      const token = FeeTokenMembership.MAINNET;
      const tokenAddress = polygonMainnetTokens[token].address;
      console.log('Fee Token:', token);
      console.log('Fee Token Address:', tokenAddress);
    } else {
      const token = FeeTokenMembership.TESTNET;
      const tokenAddress = polygonTestnetTokens[token].address;
      console.log('Fee Token:', token);
      console.log('Fee Token Address:', tokenAddress);
      // const aa = getProviderOrSigner(library, account);
      const chosenProvider = getProvider('metamask');
      const provider = new ethers.providers.Web3Provider(chosenProvider);
      console.log('Provider', provider);
      const signer = provider.getSigner();
      console.log('Signer', signer);
      const contract2 = getContract(tokenAddress, erc20Abi, signer);
      console.log('Contract', contract2);
      const walletAddress = await signer.getAddress();
      console.log('Address:', walletAddress);
      const allowance = await contract2.allowance(walletAddress, contractAddress);
      const allowanceNum = ethers.utils.formatEther(allowance);
      console.log('Allowance', allowanceNum);
      if (allowance < 1.0) {
        console.log('USDCContract', contract);
        console.log('USDCContract methods', contract.methods);

        const transactionParameters = {
          to: tokenAddress,
          from: walletAddress,
          gas: ethers.utils.hexlify(46227),
          data: contract.methods
            .approve(contractAddress, ethers.utils.parseUnits('1', 18))
            .encodeABI(),
        };

        console.log('chosenProvider', chosenProvider);

        await chosenProvider
          .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          })
          .then((txHash: any) => {
            console.log('txHash', txHash);
          })
          .catch((error: any) => {
            console.log('error', error);
          });
      }
    }

    // const ERC20 = await ethers.getContractFactory("@openzeppelin/contracts/token/ERC20/ERC20.sol:ERC20");

    // console.log('USDCContract', USDCContract);
    // console.log('USDCContract methods', USDCContract.methods);
    // const receipt = await USDCContract.methods.approve(
    //   '0x8e68c81ba9e3264e236b6d2273f601b385baa7b3',
    //   ethers.utils.parseUnits('8', 18)
    // );
    return true;
  } catch (error) {
    console.log('Membership approve error', error);
    return false;
  }
};

export default approve;
