import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, StaticRouter } from 'react-router-dom'

import store, { history } from '../redux'

import Head from '../components/head'
import MainPage from '../components/mainpage'
import InnerPage from '../components/innerpage'
import NotFound from '../components/404'

import Startup from './startup'

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Head />
        <Startup>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/in/:cityName" component={() => <InnerPage />} />
            <Route component={NotFound} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
