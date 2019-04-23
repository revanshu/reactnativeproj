import { createStackNavigator } from 'react-navigation';

import Index from './containers';

const StackNavigator = createStackNavigator({
  Home: Index,
});

export default StackNavigator;
