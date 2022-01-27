import React from 'react';
import Login from './App/Screens/Login';
import Signup from './App/Screens/Signup';
import Dashboard from './src/screens/Dashboard';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import EditProfile from './App/Screens/EditProfile';
import Screen2 from './App/Screens/Screen2';
import Screen3 from './App/Screens/Screen3';
import CustomDrawer from './App/Components/CustomDrawer';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Messages" drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Messages" component={Dashboard} />
      <Drawer.Screen name="Edit Profile" component={EditProfile} />
      <Drawer.Screen name="Screen2" component={Screen2} />
      <Drawer.Screen name="Screen3" component={Screen3} />
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
        
        {/* <Stack.Screen
          name="dashboard"
          component={Dashboard}
          options={{title: '', headerShown: false}}
        /> */}
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
