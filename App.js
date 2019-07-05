import React, {Component} from 'react';
import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import { HomeScreen } from './views/HomeScreen';
import KalendarScreen from './views/KalendarScreen';
import ListRiegosScreen from './views/ListRiegosScreen';
import ConfigScreen from './views/ConfigScreen';
import configureStore from './store/configureStore';

const store = configureStore();
const drawerNavigation = createDrawerNavigator(
  {
    Home: {
      path: '/home',
      screen: HomeScreen
    },
    Kalendar: {
      path: '/kalendar',
      screen: KalendarScreen
    },
    ListRiegos: {
      path: '/list-riegos',
      screen: ListRiegosScreen
    },
    Configuration: {
      path: '/configurarion',
      screen: ConfigScreen
    }
  }, {
    contentOptions: {
      activeTintColor: '#e91e63',
    },
    initialRouteName: 'Home',
  }
);

// const App = createAppContainer(drawerNavigation);
const AppContainer = createAppContainer(drawerNavigation);

// export default App;
export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    )
  }
}