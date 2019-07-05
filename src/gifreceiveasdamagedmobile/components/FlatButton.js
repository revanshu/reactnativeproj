import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

const styles = {
  buttonContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
};

const FlatButton = (props) => {
  const disabledStyle = props.isDisabled ? { opacity: 0.4 } : { opacity: 1 };

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, props.buttonStyle]}
      disabled={props.isDisabled}
      onPress={props.onPress}
    >
      <Text style={[{ color: 'green' }, styles.buttonText, props.textStyle, disabledStyle]}>
        {props.text.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

FlatButton.propTypes = {
  text: PropTypes.string,
  accessibilityLabel: PropTypes.string,
  /* eslint-disable */
  textStyle: PropTypes.any,
  buttonStyle: PropTypes.any,
  /* eslint-enable */
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func,
};

FlatButton.defaultProps = {
  text: '',
  accessibilityLabel: '',
  textStyle: {},
  buttonStyle: { backgroundColor: 'transparent' },
  isDisabled: false,
  onPress: () => {},
};

export default FlatButton;
