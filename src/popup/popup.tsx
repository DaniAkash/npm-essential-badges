import React from "react";
import { AppRegistry, View, Text } from "react-native-web";

const App = () => {
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.querySelector("#app"),
});
