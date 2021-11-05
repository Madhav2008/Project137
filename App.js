import React,{Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './screens/Home';
import Details from './screens/Details';

export default class App extends Component {
  render(){
    return (
      <AppContainer/>
    )
  }
}

const AppStackNavigator = createStackNavigator({
  Home:{
    screen:Home,
    navigationOptions:{
      headerShown:false
    }
  },
  Details:{
    screen:Details
  }
},
{
  initialRouteName:'Home'
})

const AppContainer = createAppContainer(AppStackNavigator)