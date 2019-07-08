import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import FlatButton from './FlatButton';

const styles = StyleSheet.create({
  buttonTextStyle: {
    // color: 'green',
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'sans-serif-medium',
    color: '#017acd',
  },
  buttonStyle: {
    //  color: 'blue',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    // marginTop: 8
    // backgroundColor: 'green',
  },
});

const FooterButton = (props) => {
  const { onPress, title } = props;
  return (
    <FlatButton
      onPress={onPress}
      text={title}
      buttonStyle={styles.buttonStyle}
      textStyle={styles.buttonTextStyle}
    />
  );
};

FooterButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default FooterButton;
