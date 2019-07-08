import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Alert, TextInput, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import actions from '../../gifreceiveasdamagedcommon/actions';
import FooterButton from '../components/FooterButton';

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
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
  },
  parentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconStyle: {
    padding: 20,
  },
  textInput: {
    height: 40,
    width: '100%',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 20,
    // flex: 1,
  },
  defaultPrinters: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
  },
});

class LandingScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation;
    return {
      header: (
        <Header
          title="Setup Printer"
          dismissBehaviour="back"
          navigation={{
            goBack,
          }}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    const { getDefaultPrinter } = this.props;
    getDefaultPrinter();
    this.state = { text: '', selectedPrinterType: 'laser' };
    this.onSave = this.onSave.bind(this);
    this.onInputSelect = this.onInputSelect.bind(this);
  }

  componentWillMount() {
    const { macAddress } = this.props;
    this.setState({ text: macAddress });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.scannedData !== nextProps.scannedData) {
      this.setState({ text: nextProps.scannedData.value, selectedPrinterType: 'mobile' });
    }
  }

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
        { text: 'YES', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  };

  onSave = () => {
    const { navigation, changeSavedPrinter, changeNameTest } = this.props;
    const { selectedPrinterType } = this.state;
    changeSavedPrinter(selectedPrinterType);
    setTimeout(() => {
      changeNameTest();
    }, 0);
    // changeNameTest();
    navigation.goBack();
  };

  onPrinterSelect = () => {
    this.setState({ selectedPrinterType: 'laser' });
    this.input.focus();
  };

  onInputSelect = () => {
    this.setState({ selectedPrinterType: 'mobile' });
  };

  inputRef = (ref) => {
    this.input = ref;
  };

  render() {
    const { navigation, defaultPrinter } = this.props;
    const { text } = this.state;
    return (
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          <TextInput
            ref={this.inputRef}
            style={styles.textInput}
            onChangeText={text => this.setState({ text, selectedPrinterType: 'mobile' })}
            value={text}
            placeholder="Scan/Enter Printer Barcode"
            onFocus={this.onInputSelect}
          />
          <Text>Or</Text>
          <TouchableOpacity
            style={styles.defaultPrinters}
            elevation={2}
            onPress={this.onPrinterSelect}
          >
            <Text>{defaultPrinter.name}</Text>
            <Text>{defaultPrinter.ipAddress}</Text>
          </TouchableOpacity>
        </View>
        <FooterButton title="SAVE" onPress={this.onSave} />
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

const mapStateToProps = state => ({
  defaultPrinter: state.receiveasdamaged.defaultPrinter,
  macAddress: state.printer.macAddress,
  scannedData: state.scannedData,
});

const mapDispatchToProps = dispatch => ({
  navigationDispatch: (action) => {
    dispatch(action);
  },
  getDefaultPrinter: () => {
    dispatch(actions.getDefaultPrinter());
  },
  changeSavedPrinter: (type) => {
    console.log('view action, savedprinter');
    dispatch(actions.changeSavedPrinter(type));
  },
  changeNameTest: () => {
    console.log('view action, change name');
    dispatch(actions.changeNameTest());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingScreen);
