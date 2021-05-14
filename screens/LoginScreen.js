import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginID: "",
      password: "",
    };
  }

  login = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("TabNavigator");
        return alert("User Logged in Succesfully");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Story Hub </Text>
        <Image
          source={{
            uri:
              "https://www.linoluka.com/wp-content/uploads/2017/07/ll_icon_2.jpg",
          }}
          style={styles.mainIcon}
        />
        <TextInput
          placeholder=" Login ID"
          style={styles.emailInput}
          keyboardType={"email-address"}
          onChangeText={(text) => {
            this.setState({
              loginID: text,
            });
          }}
        />
        <TextInput
          placeholder=" Password"
          style={styles.passwordInput}
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({
              password: text,
            });
          }}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            this.login(this.state.loginID, this.state.password);
          }}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
  },
  mainIcon: {
    width: "70%",
    height: "40%",
  },
  emailInput: {
    width: "80%",
    height: 40,
    border: "solid 4px #58C4DE",
    borderRadius: 10,
  },
  passwordInput: {
    width: "80%",
    height: 40,
    border: "solid 4px #58C4DE",
    borderRadius: 10,
  },
  loginButton: {
    width: "40%",
    height: 40,
    border: "solid 4px #F1A15C",
    borderRadius: 10,
    justifyContent:'center'
  },
  loginButtonText: {
      alignSelf: 'center',
      fontSize: 22
  }
});
