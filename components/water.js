import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

export default class ExampleOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["time", "8:00 am", "8:00 pm"],
      tableData: [
        [
          "Saturday",
          <Image
            source={require("../assets/plant1.jpg")}
            style={{ width: 40, height: 40 }}
          />,
          " "
        ],
        ["Sunday", " ", " "],
        ["Monday", " ", " "],
        ["Tuesday", " ", " "],
        ["Wednesday", " ", " "],
        ["Thursday", " ", " "],
        ["Friday", " ", " "]
      ]
    };
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          <Rows data={state.tableData} textStyle={styles.text} />
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 }
});
