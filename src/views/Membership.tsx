import { Box, Button } from "@mui/material"
import styled from "styled-components"
import { ethers } from "ethers"
import spacing from "theme/spacing"
import getNonceSignature from "api/membership"
import mint from "contracts/membership"
import getProvider from "wallets/utils"
import approve from "contracts/usdc"
import { useState, useEffect } from "react"
import { getContract } from "utils"
import { membershipContract } from "config"
import { ERC20_ABI } from "config/abi/erc20"

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: ${spacing.xxl}px;
  margin-left: ${spacing.xxl}px;
  min-height: calc(100vh - 148px);
`

export default function Membership(): JSX.Element {
  const [tokenApproved, setTokenApproved] = useState(false)
  const [pendingStatus, setPendingStatus] = useState(true)

  const checkAllowance = async () => {
    const chosenProvider = getProvider("metamask")
    const provider = new ethers.providers.Web3Provider(chosenProvider)
    const signer = provider.getSigner()
    const memberShipContract = getContract(
      membershipContract.feeAddress,
      ERC20_ABI,
      signer
    )
    // console.log('Contract', memberShipContract);
    const walletAddress = await signer.getAddress()
    // console.log("Address:", walletAddress)
    const allowance = await memberShipContract.allowance(
      walletAddress,
      membershipContract.address
    )

    if (allowance >= membershipContract.allowance) {
      setTokenApproved(true)
    }
  }

  useEffect(() => {
    checkAllowance()
    setPendingStatus(false)
  })

  const mintNFT = async (signature: string, message: string) => {
    // console.log("mintNFT", signature, message)
    await mint(signature, message)
  }

  const fetchSignature = async () => {
    const timestamp = Date.now()
    const msg = timestamp.toString()
    // console.log("getNonceSignature", msg)
    const res = await getNonceSignature(msg, "metamask")
    // console.log("fetchSignature-res", res)
    if (res) {
      const { signature } = res
      await mintNFT(signature, msg)
    }
  }

  const approveToken = async () => {
    await approve()
  }

  return (
    <Container>
      {!pendingStatus &&
        (!tokenApproved ? (
          <Button variant="contained" onClick={approveToken}>
            APPROVE TOKEN
          </Button>
        ) : (
          <Button variant="contained" onClick={fetchSignature}>
            MINT NFT
          </Button>
        ))}
    </Container>
  )
}
