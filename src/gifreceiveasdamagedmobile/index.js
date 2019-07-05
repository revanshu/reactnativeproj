import React, { Component } from 'react';
import { createStackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import LandingScreen from './containers/LandingScreen';
import SetupPrinterScreen from './containers/SetupPrinterScreen';

const StackNavigator = createStackNavigator({
  Home: LandingScreen,
  SetupPrinter: SetupPrinterScreen,
});

// class Nav extends Component {
//   render() {
//     return (
//       <StackNavigator
//         navigation={addNavigationHelpers({
//           dispatch: this.props.dispatch,
//           state: this.props.navigation,
//         })}
//       />
//     );
//   }
// }

// const mapStateToProps = state => ({
//   navigation: state.navigation,
// });

export default StackNavigator;
// export default connect(mapStateToProps)(StackNavigator);
