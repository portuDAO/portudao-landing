// libraries
import axios from 'axios';
import { ethers } from 'ethers';
import { getContract, getProviderOrSigner } from 'utils';
import erc20Abi from 'config/abi/erc20.json';
import getProvider from 'wallets/utils';
import { FeeTokenMembership, polygonMainnetTokens, polygonTestnetTokens } from 'config';

const path = `${process.env.REACT_APP_API_HOSTNAME}/api/membership`;

const getNonceSignature = async (providerName: string) => {
  let tokenAddress: string;

  if (process.env.NODE_ENV !== 'development') {
    const token = FeeTokenMembership.MAINNET;
    tokenAddress = polygonMainnetTokens[token].address;
  } else {
    const token = FeeTokenMembership.TESTNET;
    tokenAddress = polygonTestnetTokens[token].address;
  }
  const chosenProvider = getProvider(providerName);
  const provider =
    providerName === 'metamask'
      ? new ethers.providers.Web3Provider(chosenProvider)
      : new ethers.providers.Web3Provider(chosenProvider);
  console.log('Provider', provider);
  const signer = provider.getSigner();
  console.log('Signer', signer);
  const contract = getContract(tokenAddress, erc20Abi, signer);
  console.log('Contract', contract);
  const add = await signer.getAddress();
  console.log('Address:', add);

  const endpoint = `${process.env.REACT_APP_API_HOSTNAME}/api/membership/${add}`;

  console.log('Endpoint', endpoint);
  const timestamp = Date.now();
  // const msg = timestamp.toString()
  const msg = '1653469595976';
  const sig =
    '0xa3552ed017d0f39e558b4ca8a35fdef95a6edcca094f383271874654219a10eb51f160da7528e9b036b33c52cc711ba4f096a63de2b949ecc1787009488d1ede1c';
  const bodyPayload = {
    msg,
    sig,
  };
  const res = await axios.post(endpoint, bodyPayload);

  if (res && res.data) {
    console.log('Response:', res);
    return res.data;
  }
  return false;
};

export default getNonceSignature;
