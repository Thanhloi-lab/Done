import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SnackbarProvider } from "notistack";
import Slide from '@material-ui/core/Slide';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <SnackbarProvider maxSnack={10} 
      preventDuplicate
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
    iconVariant={{
        success: '✅',
        error: '✖️',
        warning: '⚠️',
        info: 'ℹ️',
    }}
    TransitionComponent={Slide}>
        <App />
      </SnackbarProvider>
    </Provider>
  </Router>,

  document.getElementById("root")
);
