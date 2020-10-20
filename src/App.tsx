import React, { useCallback, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import DisclaimerModal from './components/DisclaimerModal'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
// import SushiProvider from './contexts/SushiProvider'
import NFTsProvider from './contexts/NFTs'
import AcceleratorsProvider from './contexts/Accelerators'
import useModal from './hooks/useModal'
import theme from './theme'
import Farms from './views/Farms'
import Home from './views/Home'
// import Stake from './views/Stake'
import Shop from './views/Shop'
import NFTs from './views/NFTs'
import Referral from './views/Referral'
import VestNFT from './views/VestNFT'
import MyNFT from './views/MyNFT'

const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/farms">
            <Farms />
          </Route>
          <Route path="/vestnft">
            <VestNFT />
          </Route>
          <Route path="/mynft">
            <MyNFT />
          </Route>
          <Route path="/referral">
            <Referral />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/nfts">
            <NFTs />
          </Route>
        </Switch>
      </Router>
      <Disclaimer />
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={97}
        connectors={{
          walletconnect: { rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/' },
        }}
      >
          <TransactionProvider>
            <FarmsProvider>
              <NFTsProvider>
                <AcceleratorsProvider>
                  <ModalsProvider>{children}</ModalsProvider>
                </AcceleratorsProvider>
              </NFTsProvider>
            </FarmsProvider>
          </TransactionProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const Disclaimer: React.FC = () => {
  const markSeen = useCallback(() => {
    localStorage.setItem('disclaimer', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(
    <DisclaimerModal onConfirm={markSeen} />,
  )

  useEffect(() => {
    const seenDisclaimer = true // localStorage.getItem('disclaimer')
    if (!seenDisclaimer) {
      onPresentDisclaimerModal()
    }
  }, [onPresentDisclaimerModal])

  return <div />
}

export default App
