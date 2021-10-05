import { QueryClient, QueryClientProvider } from "react-query"
import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./App.sass"
import TransaksiPage from "./pages/TransaksiCust/TransaksiPage"
import Login from "./pages/LoginCust/Login"
import home from "./pages/HomeCust/Home"
import logout from "./pages/StatusCust/Logout"
import AuthorizedRoute from "./AuthorizedRoute"
import RestrictedWrapper from "./RestrictedWrapper"
import { AuthorizedContextProvider } from "./AuthorizedContext"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthorizedContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact>
              <RestrictedWrapper>
                <Login />
              </RestrictedWrapper>
            </Route>
            <AuthorizedRoute
              path="/transaksi"
              exact
              component={TransaksiPage}
            ></AuthorizedRoute>
            <Route path="/signout" exact component={logout} />
            <AuthorizedRoute path="/home" exact component={home}></AuthorizedRoute>
          </Switch>
        </Router>
      </AuthorizedContextProvider>
    </QueryClientProvider>
  )
}

export default App
