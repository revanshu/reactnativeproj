import React, { PureComponent } from 'react';
import {
  View, Text, TouchableHighlight, StyleSheet, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import NavigationContext from '../utils/NavigationContextProvider';
import { actions } from '../../gifreceiveasdamagedcommon';
import {
  COLORS, MARGINS, FONTS, SIZE,
} from './Styles';

class Header extends PureComponent {
  constructor() {
    super();
    this.state = {
      showInput: false,
      text: '',
    };
  }

  componentDidUpdate(prevProps) {
    const {
      navigation, inputButton, scannedData, getASN,
    } = this.props;
    if (
      navigation.isFocused
      && navigation.isFocused()
      && inputButton
      && prevProps.scannedData !== scannedData
    ) {
      const { value } = this.props.scannedData;
      const valueUpperCase = value.toUpperCase();
      this.setState(() => ({ showInput: true, text: valueUpperCase }));
      getASN(valueUpperCase);
    }
  }

  showInput() {
    this.setState({ text: '' });
    const { showInput } = this.state;
    // if (showInput === true) this.props.loadUnconfirmedCarrierbagOrders(1, true);
    this.setState(prevState => ({ showInput: !prevState.showInput }));
  }

  backHandler() {
    const { dismissBehaviour, navigation, navigationContext } = this.props;
    if (dismissBehaviour === 'back') {
      navigation.goBack();
    } else if (dismissBehaviour === 'home') {
      navigationContext.navigate('home');
    }
  }

  onSubmit() {
    const { getASN } = this.props;
    const { text } = this.state;
    getASN(text);
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.leftButton}>
          <TouchableHighlight
            style={styles.headerButton}
            onPress={() => {
              this.backHandler();
            }}
          >
            <Icon size={SIZE.iconSize} color={COLORS.whiteColor} name="arrow-back" />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.headerButton}
            onPress={() => {
              this.props.navigationContext.openDrawer();
            }}
          >
            <Icon size={SIZE.iconSize} color={COLORS.whiteColor} name="menu" />
          </TouchableHighlight>
        </View>
        <View style={styles.content}>
          {!this.state.showInput && <Text style={styles.text}>{this.props.title}</Text>}
          {this.state.showInput && (
            <TextInput
              placeholder={this.props.placeholder}
              placeholderTextColor={COLORS.whiteColor}
              style={styles.textInput}
              onSubmitEditing={() => {
                this.onSubmit();
              }}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
          )}
        </View>
        {this.props.inputButton && (
          <View style={styles.rightButton}>
            <TouchableHighlight
              onPress={() => {
                this.showInput();
              }}
            >
              <Icon
                size={SIZE.iconSize}
                color={COLORS.whiteColor}
                name={this.state.showInput ? 'close' : 'keyboard'}
              />
            </TouchableHighlight>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: MARGINS.average,
    paddingHorizontal: MARGINS.average,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.footerButtonColor,
  },
  leftButton: {
    flexDirection: 'row',
  },
  content: {
    flex: 8,
    paddingHorizontal: MARGINS.small,
    justifyContent: 'center',
  },
  rightButton: {},
  backButtonStyle: {
    marginRight: MARGINS.small,
  },
  menuButtonStyle: {
    marginRight: MARGINS.small,
  },
  text: {
    color: COLORS.whiteColor,
    fontSize: FONTS.headerFontSize,
  },
  textInput: {
    color: COLORS.whiteColor,
    fontSize: FONTS.labelFontSize,
    height: 30,
    padding: 0,
    // borderBottomColor: COLORS.whiteColor,
    // borderBottomWidth: 1,
  },
  headerButton: {
    marginRight: MARGINS.small,
  },
});

Header.propTypes = {
  inputButton: PropTypes.bool,
  placeholder: PropTypes.string,
  dismissBehaviour: PropTypes.string,
  title: PropTypes.string,
  scannedData: PropTypes.shape({
    value: PropTypes.any,
  }),
  navigationContext: PropTypes.shape({
    navigate: PropTypes.func,
    openDrawer: PropTypes.func,
  }),
  onSubmit: PropTypes.func,
  loadUnconfirmedCarrierbagOrders: PropTypes.func,
  filterOrders: PropTypes.func,
  navigation: PropTypes.shape({
    isFocused: PropTypes.func,
    goBack: PropTypes.func,
  }),
};

const mapDispatchToState = state => ({
  scannedData: state.scannedData,
});

const mapDispatchToProps = dispatch => ({
  getASN: () => {
    dispatch(actions.getASN());
  },
  filterOrders: (input) => {
    dispatch(actions.filterOrders(input));
  },
  loadUnconfirmedCarrierbagOrders: (page, loading) => {
    dispatch(actions.loadOrders(page, loading));
  },
});

const CarrierBagHeaderWithNavigation = props => (
  <NavigationContext.Consumer>
    {navigation => <Header {...props} navigationContext={navigation} />}
  </NavigationContext.Consumer>
);

export default connect(
  mapDispatchToState,
  mapDispatchToProps,
)(CarrierBagHeaderWithNavigation);
