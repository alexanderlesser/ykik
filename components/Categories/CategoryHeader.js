import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, SHADOWS, FONTS, assets } from '../../constants'
import { useNavigation } from '@react-navigation/native'

import { CircleButton } from '../UI/Buttons'

const CategoryHeader = ({ onSearch }) => {
  const navigation = useNavigation()
  return (
    <View
      style={styles.headerContainer}
    >
      <View
        style={styles.btnContainer}
      >
        <View
          style={{position: 'relative'}}
        >
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}
        >
        <Image 
          source={assets.left}
          resizeMode='contain'
          style={{width: 30, height: 30}}
        />
        </TouchableOpacity>
        </View>
        <Image
          style={{
            width: 30,
            height: 30,
            right: 5,
          }}
          source={assets.ykik}
          resizeMode='contain'
        />
      </View>
      <View
        style={{ marginVertical: SIZES.font }}
      >
        <Text style={styles.headerText}>
          Choose a category for trivia questions
        </Text>
      </View>
      <View
        style={{ marginTop: SIZES.font }}>
        <View
          style={styles.iconContainer}
        >
          <Image 
            source={assets.search}
            resizeMode="contain"
            style={{width: 20, height: 20, marginRight: SIZES.base}}
          />
          <TextInput 
            placeholder='Search categories'
            style={{ flex: 1}}
            onChangeText={onSearch}
          />
        </View>
      </View>
    </View>
  )
}

export default CategoryHeader

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.primary,
    padding: SIZES.font
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  btn: {
    backgroundColor: COLORS.white,
    left: 5,
    width: 40,
    height: 40,
    borderRadius: SIZES.extraLarge,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },

  headerText: {
    fontFamily: FONTS.bold, 
    fontSize: SIZES.large, 
    color: COLORS.white,
    marginTop: SIZES.base / 2
  },

  iconContainer: {
    width: '100%',
    borderRadius: SIZES.font,
    backgroundColor: COLORS.gray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.small -2,
  },
})