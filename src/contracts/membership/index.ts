import { createAlchemyWeb3 } from "@alch/alchemy-web3"
import getProvider from "wallets/utils"
import { ethers } from "ethers"
import { membershipContract } from "config"

const ALCHEMY_API_KEY = `${process.env.REACT_APP_ALCHEMY_HOSTNAME}${process.env.REACT_APP_ALCHEMY_API_KEY}`
const web3 = createAlchemyWeb3(ALCHEMY_API_KEY)

const mint = async (signature: string, message: string) => {
  try {
    const MembershipContract = new web3.eth.Contract(
      // @ts-ignore
      membershipContract.abi,
      membershipContract.address
    )

    // console.log('MembershipContract', MembershipContract);
    console.log("signature mint", signature)
    console.log("message mint", message)

    const providerName = "metamask"
    const chosenProvider = getProvider(providerName)
    const provider =
      providerName === "metamask"
        ? new ethers.providers.Web3Provider(chosenProvider)
        : new ethers.providers.Web3Provider(chosenProvider)
    // console.log('Provider', provider);
    const signer = provider.getSigner()
    const walletAddress = await signer.getAddress()
    // console.log('walletAddress', walletAddress);

    // set up transaction parameters
    const transactionParameters = {
      to: membershipContract.address,
      from: walletAddress,
      gas: ethers.utils.hexlify(450000),
      data: MembershipContract.methods
        .mint(walletAddress, signature, message)
        .encodeABI(),
    }

    await chosenProvider
      .request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })
      .catch((error: any) => {
        console.warn("error", error)
      })
  } catch (error) {
    console.warn("Membership mint error", error)
  }
}

export default mint
