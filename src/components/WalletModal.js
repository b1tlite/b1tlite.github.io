import { Button, Modal, Row } from 'web3uikit'
import React from 'react'
const Col = Row.Col

const CONNECTOR_TYPES = {
  METAMASK: 'metamask',
  WALLETCONNECT: 'walletconnect',
}

function getConnectFunction(connectorType, sdkConnect) {
  if (!sdkConnect) throw new Error('empty sdk connect')
  const baseOptins = {
    throwOnError: true,
    signingMessage:
      "Hello and welcome to our awesome project. Please sign this message to authenticate. It won't cost you any gas!",
    chainId: 137,
  }

  let options
  switch (connectorType) {
    case CONNECTOR_TYPES.METAMASK:
      options = { ...baseOptins, ...{ provider: CONNECTOR_TYPES.METAMASK } }
      break
    case CONNECTOR_TYPES.WALLETCONNECT:
      options = { ...baseOptins, ...{ provider: CONNECTOR_TYPES.WALLETCONNECT } }
      break
    default:
      throw new Error('Wrong connector type')
  }
  return () => sdkConnect(options)
}

export function WalletModal({ closeModal, sdkConnect }) {
  const connectWithMetamask = getConnectFunction(CONNECTOR_TYPES.METAMASK, sdkConnect)
  const walletConnect = getConnectFunction(CONNECTOR_TYPES.WALLETCONNECT, sdkConnect)

  return (
    <Modal
      isVisible={true}
      id="wallet-modal"
      hasFooter={false}
      title="Connect your wallet"
      width="350px"
      onCloseButtonPressed={closeModal}
    >
      <Row
        alignItems="center"
        justifyItems="center"
        lg={8}
        md={8}
        sm={4}
        xs={4}
        style={{
          padding: '20px 0 20px 0',
        }}
      >
        <Col
          breakpointsConfig={{
            lg: 8,
            md: 8,
            sm: 4,
            xs: 4,
          }}
          span={8}
        >
          <div
            style={{
              alignItems: 'center',
              color: 'white',
              display: 'flex',
              height: '50px',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Button
              color="blue"
              onClick={connectWithMetamask}
              size="large"
              text="Connect Metamask"
              theme="translucent"
              isFullWidth
              type="button"
              icon="metamask"
              iconLayout="trailing"
            />
          </div>
        </Col>

        <Col
          breakpointsConfig={{
            lg: 8,
            md: 8,
            sm: 4,
            xs: 4,
          }}
          span={8}
        >
          <div
            style={{
              alignItems: 'center',
              color: 'white',
              display: 'flex',
              height: '50px',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Button
              color="blue"
              onClick={walletConnect}
              size="large"
              text="Connect WalletConnect"
              theme="translucent"
              isFullWidth
              type="button"
              icon="link"
              iconLayout="trailing"
            />
          </div>
        </Col>
        {/* <Col
          breakpointsConfig={{
            lg: 8,
            md: 8,
            sm: 4,
            xs: 4,
          }}
          span={8}
        >
          <div
            style={{
              alignItems: 'center',
              color: 'white',
              display: 'flex',
              height: '50px',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Button
              color='blue'
              onClick={walletLink}
              size='large'
              text='Connect WalletLink'
              theme='translucent'
              isFullWidth
              icon='link'
              iconLayout='trailing'
              type='button'
            />
          </div>
        </Col> */}
      </Row>
    </Modal>
  )
}
