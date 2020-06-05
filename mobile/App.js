import React from 'react';
import { Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer"

import SignIn from './SignIn';
import CreateAccount from './CreateAccount';
import ForgetPassword from './ForgetPassword';
import Home from './Home';
import HomeDetails from './Home/details';
import Profile from './Profile';
import Chat from './Chat';
import Upload from './Upload';

import { AuthContext } from './context';

import firebase from './config/firebase';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: "Home",
        headerTitleAlign: "center",
        headerShown: false
      }}
    />
    <HomeStack.Screen
      name="HomeDetails"
      component={HomeDetails}
      options={{
        title: "HomeDetails",
        headerTitleAlign: "center"
      }}
    />
  </HomeStack.Navigator>

)

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{
        title: "Profile",
        headerTitleAlign: "center",
        headerShown: false,
        animationEnabled: false
      }}
    />
  </ProfileStack.Navigator>
)

const TabsScreen = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'account-circle' : 'account-circle-outline';
        } else if (route.name === 'Chat') {
          iconName = focused ? 'chat' : 'chat';
        } else if (route.name === 'Upload') {
          iconName = focused ? 'file-upload' : 'file-upload-outline';
        }

        // You can return any component that you like here!
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#0093BA',
      inactiveTintColor: 'gray',
    }}
  >
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Profile" component={ProfileStackScreen} />
    <Tabs.Screen name="Chat" component={Chat} />
    <Tabs.Screen name="Upload" component={Upload} />
  </Tabs.Navigator>
)

export default () => {

  const [userToken, setUserToken] = React.useState(null);

  React.useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUserToken(user)
      } else {
        setUserToken(null)
      }

    })
    // 
  }, []);



  const authContext = React.useMemo(() => {
    return {
      signIn: () => { setUserToken('umMontedeCaracteres') },
      signUp: () => { setUserToken('umMontedeCaracteres') },
      signOut: () => { setUserToken(null) },
    }
  })

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ?
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={TabsScreen} />
            <Drawer.Screen name="Profile" component={ProfileStackScreen} />
          </Drawer.Navigator>

          :

          <AuthStack.Navigator>
            <AuthStack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                title: "Acessar",
                headerTitleAlign: "center",
                headerShown: false,
                animationEnabled: false
              }}
            />
            <AuthStack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{
                title: "",
                headerTitleAlign: "center",
                headerTransparent: true
              }}
            />
            <AuthStack.Screen
              name="ForgetPassword"
              component={ForgetPassword}
              options={{
                title: "",
                headerTitleAlign: "center",
                headerTransparent: true
              }}
            />
          </AuthStack.Navigator>
        }
      </NavigationContainer>
    </AuthContext.Provider>

  )
}