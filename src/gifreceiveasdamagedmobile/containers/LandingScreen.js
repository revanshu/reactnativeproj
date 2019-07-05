import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Alert, Modal, TextInput, TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import actions from '../../gifreceiveasdamagedcommon/actions';

const styles = StyleSheet.create({
  scanContainerHeader: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderLeftWidth: 4,
    borderLeftColor: 'yellow',
    justifyContent: 'center',
    paddingLeft: 16,
  },
  scanContainerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  highPriorityContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  parentContainer: {
    flex: 1,
  },
  iconStyle: {
    padding: 20,
  },
  modal: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
  },
});

class LandingScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { isFocused } = navigation;
    return {
      header: (
        <Header
          title="Receive as Damaged"
          placeholder="Scan or Enter ASN or Tracking ID"
          inputButton
          dismissBehaviour="home"
          navigation={{
            isFocused,
          }}
        />
      ),
    };
  };

  state = {
    modalVisible: false,
  };

  // static navigationOptions = () => ({
  //   header: null,
  // });

  constructor() {
    super();
    this.navigateToSetupPrinterScreen.bind(this);
    // this.onSearch = this.throttle(this.onSearch.bind(this), 5000);
    this.onSearch = this.onSearch.bind(this);
    this.renderModalMacAddress = this.renderModalMacAddress.bind(this);
    // this.throttleGetASN = this.throttle(this.props.getASN, 5000);
  }

  componentDidMount() {
    // const { getASN } = this.props;
    // getASN();
  }

  componentWillReceiveProps(nextProps) {
    console.log('props:', nextProps, this.props);
    if (nextProps.asnDetails !== this.props.asnDetails) {
      console.log('show alert called');
      this.showAlert(nextProps.asnDetails);
    }
  }

  renderScanHeader = () => (
    <View style={styles.scanContainerHeader}>
      <Text style={styles.scanContainerText}>Scan Containers for Quality Check</Text>
    </View>
  );

  renderModalMacAddress = () => {
    console.log('state modal', this, this.state);
    return <View />;
  };

  navigateToSetupPrinterScreen = () => {
    const { navigation } = this.props;
    navigation.navigate('SetupPrinter');
  };

  showAlert = (detail) => {
    let message = '';
    if (detail.orderStatus === 'IN TRANSIT' || detail.orderStatus === 'RELEASED') {
      message = 'will be marked as "Received as Damaged". Claim slip(s) will be printed for each item. \n \n Do you want to continue?';
    } else if (detail.orderStatus === 'CANCEL') {
      message = 'is marked as "Cancelled". \n \n Do you want to print claim slip(s)?';
    } else if (detail.orderStatus === 'RECEIVED') {
      message = 'has an order status of RECEIVED and cannot be marked as "Received as Damaged"';
    }

    Alert.alert(
      'Confirm',
      `Order ${detail.orderNumber} \n ASN ${detail.packageId} \n ${message}`,
      [
        {
          text: 'NO',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            console.log('OK Pressed');
            this.setState({ modalVisible: true });
          },
        },
      ],
      { cancelable: false },
    );
  };

  throttle = (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
          func.apply(context, args);
        }, limit);
      }
    };
  };

  onSearch = () => {
    const { getASN } = this.props;

    // this.throttleGetASN();
    getASN();
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.parentContainer}>
        {this.renderModalMacAddress()}
        {/* <CommonHeader
          title="Receive as damage"
          dismissBehavior="back"
          primaryContextBehavior="menu"
          secondaryContextBehavior="search"
          searchPlaceholder="Scan or Enter ASN or Tracking ID"
          searchKeyboardType="numeric"
          onToggleSearch={() => {}}
          onSearch={this.throttle(this.onSearch, 3000)}
          navigation={navigation}
          contextMenuItems={[
            {
              name: 'Setup Printer',
              onPress: () => {
                this.navigateToSetupPrinterScreen();
              },
            },
          ]}
        /> */}
        <View style={styles.container}>
          <Icon name="broken-image" style={styles.iconStyle} size={200} color="#dddddd" />
        </View>
      </View>
    );
  }
}

LandingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    goBack: PropTypes.func,
    dispatch: PropTypes.func,
    state: PropTypes.shape({
      params: PropTypes.shape({
        commodityCode: PropTypes.number,
      }),
    }),
  }).isRequired,
};

const mapStateToProps = (state) => {
  console.log('statetoprops', state);
  return {
    asnDetails: state.receiveasdamaged.asnDetail,
    scannedData: state.scannedData,
    defaultPrinter: state.receiveasdamaged.defaultPrinter,
    savedPrinter: state.receiveasdamaged.savedPrinter,
  };
};

const mapDispatchToProps = dispatch => ({
  navigationDispatch: (action) => {
    dispatch(action);
  },
  getASN: () => {
    dispatch(actions.getASN());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingScreen);
