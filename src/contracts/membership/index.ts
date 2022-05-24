import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import membershipABI from 'contracts/membership/membershipAbi.json';

const membershipAddress = '0x8e68c81ba9e3264e236b6d2273f601b385baa7b3';
const ALCHEMY_API_KEY = 'https://eth-goerli.alchemyapi.io/v2/M1NeZMgxHETfrPflwiAGtiaMwn2bKMmX';
const web3 = createAlchemyWeb3(ALCHEMY_API_KEY);

const MembershipContract = new web3.eth.Contract(
  // @ts-ignore
  membershipABI.abi,
  membershipAddress
);

const mint = async (provider: any, address: string, signature: string, nonce: string) => {
  try {
    console.log('Provider', provider);
    console.log('MembershipContract', MembershipContract);
    // set up transaction parameters
    const transactionParameters = {
      to: membershipAddress, // Required except during contract publications.
      from: address, // must match user's active address.
      data: MembershipContract.methods.mint(address, signature, nonce).encodeABI(),
    };

    // @ts-ignore
    const txHash = await provider.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });

    return txHash;
  } catch (error) {
    console.log('Membership mint error', error);
    return false;
  }
};

export default mint;
