const getProvider = (provider: string) => {
  // @ts-ignore
  const singleProvider = window?.ethereum
  // @ts-ignore
  let webProviders = window?.ethereum?.providers

  if (!webProviders && singleProvider) return singleProvider
  webProviders = webProviders || singleProvider

  switch (provider) {
    case "metamask":
      // @ts-ignore
      // eslint-disable-next-line no-case-declarations
      const metamaskProvider = webProviders.find((prov) => {
        return prov.isMetaMask
      })
      // console.log('metamaskProvider', metamaskProvider);
      return metamaskProvider
    case "coinbase":
      // @ts-ignore
      // eslint-disable-next-line no-case-declarations
      const coinbaseProvider = webProviders.find((prov) => {
        // eslint-disable-next-line no-underscore-dangle
        return prov.isCoinbaseWallet
      })
      // console.log('coinbaseProvider', coinbaseProvider);
      return coinbaseProvider
    default:
      // @ts-ignore
      // eslint-disable-next-line no-case-declarations
      const providerInstance = webProviders.find((prov) => {
        return prov.isMetaMask
      })
      // console.log('providerInstance', providerInstance);
      return providerInstance
  }
}

export default getProvider
