import { Connectors } from 'web3-react'
import TrezorApi from 'trezor-connect'

const { InjectedConnector, TrezorConnector, LedgerConnector } = Connectors

const supportedNetworkURLs = {
  1: 'https://mainnet.infura.io/v3/60ab76e16df54c808e50a79975b4779f',
  4: 'https://rinkeby.infura.io/v3/60ab76e16df54c808e50a79975b4779f'
}

const defaultNetwork = 1

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] })

// todo: set trezor manifest
const Trezor = new TrezorConnector({
  api: TrezorApi,
  supportedNetworkURLs,
  defaultNetwork,
  manifestEmail: 'custom@mail.com',
  manifestAppUrl: 'http://localhost:1234/'
})

const Ledger = new LedgerConnector({
  supportedNetworkURLs,
  defaultNetwork
})

export default { MetaMask, Trezor, Ledger }
