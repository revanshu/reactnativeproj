import i18n from "i18next";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator
} from "react-native";
import { createStackNavigator, withNavigationFocus } from "react-navigation";

import { capabilitiesLoader, httpService } from "@gif/gifuicommon";

import Module from "./src";

const CAPABILITY_URL_MAP = {
  US: {
    // stage: 'https://qa-int.gif-ui-helper-services.us.cloud.walmart.com/gif-ui-helper-services/resources/v1/metaCapabilities',
    stage:
      "https://qa-int.gif-cloud-helper-services.prod.us.walmart.net/api/v1/metaCapabilities?market=walmart"
  },
  UK: {},
  MX: {},
  CA: {}
};

class HomeScreen extends Component {
  state = {
    isLoading: false
  };

  componentDidMount = async () => {
    i18n.init({
      lng: "en-US",
      fallbackLng: "en-US"
    });
    this.setState({ isLoading: true });
    httpService.config({
      headers: {
        "Accept-Language": "en-US",
        "X-countryCode": "US",
        // 'X-nodeId': '5505',
        "X-nodeId": "5585",
        "X-UserId": "sbk0006",
        "X-consumerId": "gif-ui"
      }
    });
    const urlMapper = (environment, country) =>
      `${CAPABILITY_URL_MAP[country.toUpperCase()][environment]}`;
    await capabilitiesLoader.initialize(urlMapper("stage", "US"), true);
    this.setState({ isLoading: false });
  };

  render() {
    const { navigation } = this.props;
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Main App!</Text>
        <Button
          disabled={isLoading}
          onPress={() => {
            navigation.navigate("Module", {
              userInfo: {
                countryCode: "US",
                // siteId: '5505',
                siteId: "5585",
                userId: "sbk0006"
              },
              storeInfo: {
                // apiVersion: '1.0',
                apiVersion: "2.0"
              }
            });
          }}
          title="Module"
          color="#841584"
        />
        {isLoading && (
          <View style={styles.ActivityIndicator}>
            <ActivityIndicator size={50} />
          </View>
        )}
      </View>
    );
  }
}

const App = createStackNavigator({
  Home: withNavigationFocus(HomeScreen),
  Module: {
    screen: Module,
    navigationOptions: () => ({
      header: null
    })
  }
});

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  ActivityIndicator: {
    position: "absolute"
  }
});
