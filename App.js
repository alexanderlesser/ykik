import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
// Redux
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices'

import HomeScreen from './screens/HomeScreen'
import CategoryScreen from './screens/CategoryScreen'
import SelectedCategoryScreen from './screens/SelectedCategoryScreen'
import TriviaScreen from './screens/TriviaScreen'

const store = configureStore({ reducer: rootReducer })

const Stack = createStackNavigator()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  }
}

const App = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
  })

  if(!fontsLoaded) return <AppLoading />

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator 
          screenOptions={{headerShown: false}}
          initalRouteName="Home"
        >
          <Stack.Screen 
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen 
            name="Category"
            component={CategoryScreen}
          />
          <Stack.Screen 
            name="Details"
            component={SelectedCategoryScreen}
          />
          <Stack.Screen 
            name="Trivia"
            component={TriviaScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App