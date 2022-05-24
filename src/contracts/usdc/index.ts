import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import usdcAbi from 'contracts/usdc/usdcAbi.json';
import { ethers } from 'ethers';

const usdcAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
const ALCHEMY_API_KEY = 'https://eth-goerli.alchemyapi.io/v2/M1NeZMgxHETfrPflwiAGtiaMwn2bKMmX';
const web3 = createAlchemyWeb3(ALCHEMY_API_KEY);

const USDCContract = new web3.eth.Contract(
  // @ts-ignore
  usdcAbi,
  usdcAddress
);

const approve = async () => {
  try {
    console.log('USDCContract', USDCContract);
    console.log('USDCContract methods', USDCContract.methods);
    const receipt = await USDCContract.methods.approve(
      '0x8e68c81ba9e3264e236b6d2273f601b385baa7b3',
      ethers.utils.parseUnits('8', 18)
    );
    return true;
  } catch (error) {
    console.log('Membership mint error', error);
    return false;
  }
};

export default approve;
