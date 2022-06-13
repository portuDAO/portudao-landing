import membershipAbi from "config/abi/MembershipNFT.json"

export enum ChainIdBsc {
  MAINNET = 56,
  TESTNET = 97,
}

export enum ChainIdPolygon {
  MAINNET = 137,
  TESTNET = 80001,
}

const polygonMainnetTokens = {
  usdc: {
    chainId: ChainIdPolygon.MAINNET,
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    decimals: 18,
    symbol: "USDC",
    name: "Polygon-Peg USD Coin",
    projectLink: "https://www.centre.io/usdc",
  },
}

const polygonTestnetTokens = {
  link: {
    chainId: ChainIdPolygon.TESTNET,
    address: "0x326c977e6efc84e512bb9c30f76e30c160ed06fb",
    decimals: 18,
    symbol: "LINK",
    name: "Mumbai-Peg Chainlink Token",
    projectLink: "https://chain.link/",
  },
}

export const membershipContract = {
  feeAddress:
    process.env.NODE_ENV === "development"
      ? polygonMainnetTokens.usdc.address
      : polygonTestnetTokens.link.address,
  allowance: process.env.NODE_ENV === "development" ? 50 : 1,
  address:
    process.env.NODE_ENV === "development"
      ? "0x8e68c81ba9e3264e236b6d2273f601b385baa7b3"
      : "0x0e562f5D6869f20b5243E6C441149705906094E8",
  abi: membershipAbi,
}

export const tokens =
  process.env.NODE_ENV === "development"
    ? polygonMainnetTokens
    : polygonTestnetTokens

export const IPFS_GATEWAY = "https://ipfs.io/ipfs"
