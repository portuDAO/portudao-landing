// libraries
import axios from "axios"
import { ethers } from "ethers"
import { getContract } from "utils"
import erc20Abi from "config/abi/erc20.json"
import getProvider from "wallets/utils"
import { membershipContract } from "config"

const getNonceSignature = async (message: string, providerName: string) => {
  const tokenAddress = membershipContract.feeAddress
  const chosenProvider = getProvider(providerName)
  const provider =
    providerName === "metamask"
      ? new ethers.providers.Web3Provider(chosenProvider)
      : new ethers.providers.Web3Provider(chosenProvider)
  // console.log('Provider', provider);
  const signer = provider.getSigner()
  // console.log('Signer', signer);
  const contract = getContract(tokenAddress, erc20Abi, signer)
  // console.log('Contract', contract);
  const add = await signer.getAddress()
  // console.log('Address:', add);

  const endpoint = `${process.env.REACT_APP_API_HOSTNAME}/api/membership/signature`

  // console.log('Endpoint', endpoint);
  const sig =
    "0xa3552ed017d0f39e558b4ca8a35fdef95a6edcca094f383271874654219a10eb51f160da7528e9b036b33c52cc711ba4f096a63de2b949ecc1787009488d1ede1c"
  const bodyPayload = {
    msg: message,
    sig,
  }
  const res = await axios.get(endpoint)

  if (res && res.data) {
    // console.log("Response:", res)
    return res.data
  }
  return res
}

export default getNonceSignature
