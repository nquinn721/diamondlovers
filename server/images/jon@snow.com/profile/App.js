import React from 'react';
import { StyleSheet, Text, View , FlatList} from 'react-native';

export default class App extends React.Component {
  data = [{title: 'Humans walk dogs recently!', body: 'Some text for the body'}, {title: 'Shopping is now getting more expensive', body: 'Some more text for this post'}];
  render() {
    return (
      <View style={styles.container}>
       <Text>Welcome!</Text>
       <FlatList
        data={this.data}
        renderItem={({item}) => 
          <View>
            <Text style={styles.title}>{item.title} </Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  title: {
    fontWeight: "800",
    fontSize: 18
  },
  body: {
    fontWeight: "200",
    fontSize: 14
  }
});
