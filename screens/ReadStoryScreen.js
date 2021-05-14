import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SearchBar } from "react-native-elements";
import db from "../config";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      allStories: [],
      lastVisibleStory: null,
    };
  }
  componentDidMount = async () => {
    const query = await db.collection("Stories").get();
    query.docs.map((doc) => {
      this.setState({
        allStories: [...this.state.allStories, doc.data()],
        lastVisibleStory: doc,
      });
    });
  };
  SearchFilterFunction = async (text) => {
    var Transaction = await db
      .collection("Stories")
      .where("StoryTitle", "==", text)
      .get();
    Transaction.docs.map((doc) => {
      this.setState({
        allStories: [...this.state.allStories, doc.data()],
        lastVisibleStory: doc,
      });
    });
  };
  // fetchMoreTransactions = async () => {
  //   var text = this.state.search;
  //   var Transaction = await db
  //     .collection("Stories")
  //     .where("StoryTitle", "==", text)
  //     .startAfter(this.state.lastVisibleTransaction)
  //     .limit(10)
  //     .get();
  //   Transaction.docs.map((doc) => {
  //     this.setState({
  //       allStories: [...this.state.allStories, doc.data()],
  //       lastVisibleStory: doc,
  //     });
  //   });
  // };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Type Here..."
            onChangeText={(text) => {
              this.setState({
                search: text,
              });
            }}
            value={this.state.search}
            style={styles.bar}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({
                allStories: [],
              });
              this.SearchFilterFunction(this.state.search);
            }}
          >
            <Text style={{ color: "#fff" }}>Search</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.allStories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomWidth: 4,
                border: "solid  #FF9055 ",
                justifyContent: "center",
                padding: 10,
              }}
            >
              <Text style={styles.itemsText}>
                {"Story Title: " + item.StoryTitle}
              </Text>
              <Text style={styles.itemsText}>{"Author: " + item.Author}</Text>
              <Text style={styles.itemsText}>
                {"Story Details: " + item.StoryDetails}
              </Text>
            </View>
          )}
          // onEndReached={this.fetchMoreTransactions}
          // onEndReachedThreshold={0.7}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  itemsText: {
    fontSize: 20,
  },
  bar: {
    borderWidth: 2,
    height: 40,
    width: "75%",
    paddingLeft: 10,
    margin: 10,
  },
  searchBar: {
    flexDirection: "row",
    height: 50,
    margin: 5,
    width: "auto",
    borderWidth: 0.5,
    alignItems: "center",
    backgroundColor: "#FF9055",
  },
  searchButton: {
    borderWidth: 1,
    height: 30,
    width: "18%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF9055",
  },
});
