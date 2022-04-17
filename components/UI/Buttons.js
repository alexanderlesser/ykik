import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants'

 export const CircleButton = ({imageUrl, handlePress, ...props}) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        position: 'absolute',
        borderRadius: SIZES.extraLarge,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.light,
        ...props,
      }}
      onPress={handlePress}
    >
      <Image 
        source={imageUrl}
        resizeMode='contain'
        style={{width: 24, height: 24}}
      />
    </TouchableOpacity>
  )
}

export const CircleSelectButton = ({btnText, handlePress, ...props}) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.extraLarge,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.light,
        ...props,
      }}
      onPress={handlePress}
    >
      <Text style={{color: COLORS.primary, fontFamily: FONTS.semiBold, fontSize: SIZES.medium}}>{btnText}</Text>
    </TouchableOpacity>
  )
}

export const RectButton = ({title, btnTxtColor, handlePress, width, height, ...props}) => {
  return (
    <TouchableOpacity
      style={{
        width: width,
        height: height,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.extraLarge,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.light,
        ...props,
      }}
      onPress={handlePress}
    >
      <Text 
      style={{
        color: btnTxtColor, 
        fontSize: SIZES.bold, 
        fontFamily: FONTS.semiBold
      }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}