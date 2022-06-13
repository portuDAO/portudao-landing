import { createAlchemyWeb3 } from "@alch/alchemy-web3"
import { ERC20_ABI } from "config/abi/erc20"
import { getContract } from "utils"
import { ethers } from "ethers"
import { membershipContract } from "config"
import getProvider from "wallets/utils"

const ALCHEMY_URL = `${process.env.REACT_APP_ALCHEMY_HOSTNAME}${process.env.REACT_APP_ALCHEMY_API_KEY}`
const web3 = createAlchemyWeb3(ALCHEMY_URL)

const approve = async () => {
  try {
    const tokenAddress = membershipContract.feeAddress
    const FeeContract = new web3.eth.Contract(
      // @ts-ignore
      ERC20_ABI,
      membershipContract.feeAddress
    )
    // console.log('Fee Token Address:', tokenAddress);
    // const aa = getProviderOrSigner(library, account);
    const chosenProvider = getProvider("metamask")
    const provider = new ethers.providers.Web3Provider(chosenProvider)
    // console.log('Provider', provider);
    const signer = provider.getSigner()
    // console.log('Signer', signer);
    const contract = getContract(tokenAddress, ERC20_ABI, signer)
    // console.log('Contract', contract);
    const walletAddress = await signer.getAddress()
    console.log("Address:", walletAddress)
    const allowance = await contract.allowance(
      walletAddress,
      membershipContract.address
    )
    console.log("Allowance:", allowance)
    if (allowance < 50.0) {
      // console.log('USDCContract', FeeContract);
      // console.log('USDCContract methods', FeeContract.methods);
      const transactionParameters = {
        to: tokenAddress,
        from: walletAddress,
        data: FeeContract.methods
          .approve(membershipContract.address, ethers.utils.parseUnits("1", 18))
          .encodeABI(),
      }

      // console.log('chosenProvider', chosenProvider);

      await chosenProvider
        .request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })
        .catch((error: any) => {
          console.warn("error", error)
        })
    }

    return true
  } catch (error) {
    // console.log('Membership approve error', error);
    return false
  }
}

export default approve
