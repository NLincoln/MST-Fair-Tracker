import React, { Component } from "react";
import Sidebar from "../side-bar";
import theme from "./theme";
import { MuiThemeProvider } from "material-ui/styles";
import { ApolloProvider } from "./apollo-client";
import CompanyList from "../CompanyList";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <ApolloProvider>
          <BrowserRouter>
            <Sidebar>
              <CompanyList />
            </Sidebar>
          </BrowserRouter>
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
