/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import FBSDK, { LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';

export default class RNfacebook extends Component {
  _fbAuth() {
      LoginManager.logInWithReadPermissions(['public_profile']).then(
         function(result) {
           debugger;
            if (result.isCancelled) {
               alert('Login cancelled');
            } else {
               alert('Login success with permissions: '
               +result.grantedPermissions.toString());
            }
         },
         function(error) {
            alert('Login fail with error: ' + error);
         }
      );
   }

   _fbLogout() {
     LoginManager.logOut(function(result) {
       console.log(result);
     }, function(error) {
       console.log(error);
     });
 }



  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                debugger;
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                debugger;
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    debugger;
                    alert(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RNfacebook', () => RNfacebook);
