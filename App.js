import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Dashboard from './src/screens/Dashboard';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import EditProfile from './src/screens/EditProfile';
import CustomDrawer from './src/components/CustomDrawer';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import RegisteredUsers from './src/screens/RegisteredUsers';
import PersonalChat from './src/screens/PersonalChat';
import Dashboard1 from './src/screens/Dashboard1';
import Login1 from './src/screens/Login1';
import PhoneLogout from './src/screens/PhoneLogout';
import Login2 from './src/screens/Login2';
import Otp from './src/screens/Otp';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Messages"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Messages"
        component={Dashboard}
        options={{title: 'Stalk Group Chat'}}
      />
      <Drawer.Screen name="Edit Profile" component={EditProfile} />
      <Drawer.Screen
        name="Users"
        component={RegisteredUsers}
        options={{headerShown: true}}
      />
    </Drawer.Navigator>
  );
}

const App = props => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Login"
          component={Login}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="Login2"
          component={Login2}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="OTP"
          component={Otp}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="PhoneLogout"
          component={PhoneLogout}
          option={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="dashboard"
          component={DrawerRoutes}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard1"
          component={Dashboard1}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="personalChat"
          component={PersonalChat}
          // options={{title: 'Inbox', headerShown: true}}
          options={({route}) => ({
            title: (
              <View>
                <Text style={{color: 'black', fontSize: 17}}>
                  {route.params.UserName}
                </Text>
                <Text style={{color: 'black', fontSize: 10}}>
                  {route.params.Status}
                </Text>
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
