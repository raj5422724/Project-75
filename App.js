import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import WriteStoryScreen from "./screens/WriteStoryScreen";
import ReadStoryScreen from "./screens/ReadStoryScreen";
import LoginScreen from './screens/LoginScreen';

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    WriteStoryScreen: { screen: WriteStoryScreen },
    ReadStoryScreen: { screen: ReadStoryScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({}) => {
        const routeName = navigation.state.routeName;
        if (routeName === "WriteStoryScreen") {
          return (
            <Image
              source={require("./assets/WriteStory.png")}
              style={{ width: 40, height: 40 }}
            />
          );
        } else if (routeName === "ReadStoryScreen") {
          return (
            <Image
              source={require("./assets/ReadStory.png")}
              style={{ width: 40, height: 40 }}
            />
          );
        }
      },
    }),
  }
);

const SwitchNavigator  = createSwitchNavigator({
  LoginScreen: LoginScreen,
  TabNavigator: TabNavigator,
})

const AppContainer = createAppContainer(SwitchNavigator);
