// libraries
import axios from "axios"
import { ethers } from "ethers"
import getProvider from "wallets/utils"

const getNonceSignature = async (providerName: string) => {
  const chosenProvider = getProvider(providerName)
  const provider =
    providerName === "metamask"
      ? new ethers.providers.Web3Provider(chosenProvider)
      : new ethers.providers.Web3Provider(chosenProvider)
  // console.log('Provider', provider);
  const signer = provider.getSigner()
  // console.log('Signer', signer);

  const endpoint = `${process.env.REACT_APP_API_HOSTNAME}/api/membership/signature`

  // console.log('Endpoint', endpoint);

  const res = await axios.get(endpoint)

  if (res && res.data) {
    // console.log('Response:', res);
    return res.data
  }
  return false
}

export default getNonceSignature
