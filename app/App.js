import React from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import store from './app/redux/store';
import App from './app/index';


class Index extends React.Component{
  render(){
    return (
    	<Provider store={store}>
    		<App />
    	</Provider>
    )
  }
}

export default Index;

