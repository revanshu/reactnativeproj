import React, { Component } from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import { eventEmitter } from "@gif/gifuicommon";

import StackNavigator from "./gifreceiveasdamagedmobile";
import NavigationContextProvider from "./gifreceiveasdamagedmobile/utils/NavigationContextProvider";
import reducers from "./gifreceiveasdamagedcommon/reducers";

const configureStoreProd = () => {
  const middlewares = [thunk];
  const store = createStore(reducers, compose(applyMiddleware(...middlewares)));
  return store;
};

const configureStoreDev = () => {
  const middlewares = [thunk];
  // adding support for Redux dev tools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return store;
};

const store = __DEV__ ? configureStoreDev() : configureStoreProd(); // eslint-disable-line

class Module extends Component {
  constructor(props) {
    super(props);
    const { userInfo } = props.navigation.state.params;
    store.dispatch({ type: "ADD_USER_DATA", payload: userInfo });
    this.subscribe = eventEmitter.on("scanner", data => {
      store.dispatch({ type: "ADD_SCANNED_DATA", payload: data });
    });
    // initializeLanguage();
  }

  componentWillUnmount() {
    this.subscribe();
  }

  render() {
    const { navigation } = this.props;
    let { openDrawer, dispatch } = navigation;

    if (!openDrawer) {
      openDrawer = () => console.warn("Open Drawer not available"); // eslint-disable-line
    }

    if (!dispatch) {
      dispatch = () => console.warn("Dispatch not available"); // eslint-disable-line
    }

    return (
      <NavigationContextProvider.Provider
        value={{
          openDrawer,
          dispatch
        }}
      >
        <Provider store={store}>
          <StackNavigator />
        </Provider>
      </NavigationContextProvider.Provider>
    );
  }
}

export default Module;
