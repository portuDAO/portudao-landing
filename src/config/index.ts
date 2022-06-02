export enum ChainIdBsc {
  MAINNET = 56,
  TESTNET = 97,
}

export enum ChainIdPolygon {
  MAINNET = 137,
  TESTNET = 80001,
}

export enum FeeTokenMembership {
  MAINNET = 'usdc',
  TESTNET = 'link',
}

export const polygonMainnetTokens = {
  usdc: {
    chainId: ChainIdPolygon.MAINNET,
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    decimals: 18,
    symbol: 'USDC',
    name: 'Polygon-Peg USD Coin',
    projectLink: 'https://www.centre.io/usdc',
  },
};

export const polygonTestnetTokens = {
  link: {
    chainId: ChainIdPolygon.TESTNET,
    address: '0x326c977e6efc84e512bb9c30f76e30c160ed06fb',
    decimals: 18,
    symbol: 'LINK',
    name: 'Mumbai-Peg Chainlink Token',
    projectLink: 'https://chain.link/',
  },
};

export const IPFS_GATEWAY = 'https://ipfs.io/ipfs';
