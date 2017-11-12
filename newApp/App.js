import React from 'react';
import { Provider, connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import store from './app/redux/store';
import App from './app/index';


class Index extends React.Component{
  render(){
  	// return (<Text>HI</Text>);
    return (
    	<Provider store={store}>
    		<App />
    	</Provider>
    )
  }
}

export default Index;

