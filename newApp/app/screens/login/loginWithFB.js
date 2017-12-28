import { Facebook } from 'expo';

export default class LoginWithFB{
	
	static login = async () => {
	 	
	 	
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '375101439599841', 
        { permissions: ['public_profile'] }
      );
      console.log(type, token);
      
      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          console.log(profile);
          Alert.alert(
            'Logged in!',
            `Hi ${JSON.stringify(profile)}!`,
          );
          break;
        }
        case 'cancel': {
          // Alert.alert(
          //   'Cancelled!',
          //   'Login was cancelled!',
          // );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };
  

}

