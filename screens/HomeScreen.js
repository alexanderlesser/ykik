import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setPrevScore } from '../slices/trivia'
import { COLORS, SIZES, SHADOWS, FONTS, assets } from '../constants'
import { getObjectItem } from '../common/storage'
import { FocusedStatusBar } from '../components'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  useEffect(() => {
    getObjectItem('prevScore')
    .then((response) => {
      const prevScore = response.item
      if(response.item && response.status === 'success') {
        dispatch(setPrevScore(prevScore))
      } else {
        // do nothing
      }
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: '65%',
          paddingBottom: 20
        }}
      >
      <View
        style={styles.circleContainer}
      >
        <Image 
          source={assets.logo}
          resizeMode='contain'
          style={styles.logo}
        />
        <Image 
          source={assets.confetti}
          resizeMode='cover'
          style={styles.backgroundImage}
        />
      </View>
      </View>
      <View
        style={styles.btnContainer}
      >
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Category')}
        >
          <LinearGradient
            colors={[COLORS.orange, COLORS.primary ]}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: SIZES.extraLarge,
              justifyContent: 'center',
              alignItems: 'center',
              ...SHADOWS.extraDark
            }}
            start={{ x: 0.5, y: 5}}
            end={{ x: -1, y: 3 }}
          >
          <Text style={styles.btnText}>PLAY</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: COLORS.secondary,
  },

  circleContainer: {
    width: '140%',
    left: '-20%',
    top: '-25%',
    height: '126%',
    zIndex: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    overflow: 'hidden',
    borderRadius: 300,
    ...SHADOWS.extraDark
  },

  logo: {
    top: '60%',
    width: 150,
    height: 150,
    zIndex: 300,
  },

  backgroundImage: {
    left: '-5%',
    width: '110%',
    height: '100%'
  },

  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.font,
  },

  btn: {
    width: '100%',
    height: 60,
    borderRadius: SIZES.extraLarge,
    ...SHADOWS.extraDark
  },

  btnText: {
    color: COLORS.white, 
    fontSize: SIZES.extraLarge, 
    fontFamily: FONTS.semiBold
  }
})