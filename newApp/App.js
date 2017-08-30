import React from 'react';
import { Provider, connect } from 'react-redux';
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

