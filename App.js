import React from 'react';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Dashboard from './src/screens/Dashboard';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import EditProfile from './src/screens/EditProfile';
import CustomDrawer from './src/components/CustomDrawer';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator  initialRouteName="Messages" drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Messages" component={Dashboard} options={{title: 'Stalk Group Chat'}} />
      <Drawer.Screen name="Edit Profile" component={EditProfile} />
    </Drawer.Navigator>
  );
}

const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="login"
          component={Login}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{ title: '', headerShown: false }}
        />
        <Stack.Screen
          name="dashboard"
          component={DrawerRoutes}
          options={{title: '', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
