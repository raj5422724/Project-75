import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import firebase from "firebase";
import db from "../config";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      storyTitle: "",
      author: "",
      storyDetails: "",
    };
  }
  submitStory = async () => {
    db.collection("Stories").add({
      "StoryTitle": this.state.storyTitle,
      "Author": this.state.author,
      "StoryDetails": this.state.storyDetails,
    });
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
        <View style={styles.header}>
          <Text style={styles.headerText}>Story Hub</Text>
        </View>
        <TextInput
          style={styles.smallInput}
          placeholder=" Story Title"
          onChangeText={(text) => {
            this.setState({
              storyTitle: text,
            });
          }}
        />
        <TextInput
          style={styles.smallInput}
          placeholder=" Author"
          onChangeText={(text) => {
            this.setState({
              author: text,
            });
          }}
        />
        <TextInput
          style={styles.largeInput}
          placeholder=" Write Your Story"
          multiline={true}
          onChangeText={(text) => {
            this.setState({
              storyDetails: text,
            });
          }}
        />
        <TouchableOpacity
          style={styles.submitContainer}
          onPress={async () => {
            var message = "Story Submitted"
            this.submitStory();
            alert(message)
            this.setState({
              author: "",
              storyTitle: "",
              storyDetails: "",
            });
          }}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#FF9055",
    height: 75,
    justifyContent: "center",
  },
  headerText: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
  },
  smallInput: {
    border: "solid",
    width: "85%",
    alignSelf: "center",
    height: 40,
    marginTop: 25,
    fontSize: 20,
  },
  largeInput: {
    border: "solid",
    width: "85%",
    alignSelf: "center",
    height: 200,
    marginTop: 25,
    fontSize: 18,
  },
  submitContainer: {
    alignSelf: "center",
    backgroundColor: "#FF9055",
    width: "35%",
    height: 45,
    marginTop: 25,
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
  },
});
