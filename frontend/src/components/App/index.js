import React, { Component } from 'react';
import Sidebar from '../side-bar';
import theme from './theme';
import { MuiThemeProvider } from 'material-ui/styles';
import { ApolloProvider } from "./apollo-client"
import CompanyList from '../CompanyList';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <ApolloProvider>
          <Sidebar>
            <CompanyList/>
          </Sidebar>
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
