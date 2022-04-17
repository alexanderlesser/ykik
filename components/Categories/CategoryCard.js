import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

import { COLORS, SIZES, SHADOWS, FONTS } from '../../constants'
import { RectButton } from '../UI/Buttons'

const CategoryCard = ({item}) => {
  const navigation = useNavigation()
  return (
    <View style={styles.card}>
      <View style={{width: '100%', height: 150, position: 'relative'}}>
      <Image 
          source={item.image}
          resizeMode="cover"
          style={styles.cardImage}
        />
      </View>
      <View 
      style={styles.cardInfoContainer}
    >
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardText}>{item.name}</Text>
      </View>
      <View>
      <RectButton 
        title='Select'
        btnTxtColor={COLORS.white}
        width={100}
        height={38}
        handlePress={() => navigation.navigate('Details', { item })}
      />
    </View>
    </View>
    </View>
  )
}

export default CategoryCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.font,
    marginBottom: SIZES.extraLarge,
    margin: SIZES.base,
    ...SHADOWS.dark
  },

  cardImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: SIZES.font,
    borderTopRightRadius: SIZES.font
  },

  cardInfoContainer: {
    width: '100%',
    paddingHorizontal: SIZES.font,
    marginTop: SIZES.small,
    marginBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardTextContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },

  cardText: {
    fontFamily: FONTS.bold, 
    color: COLORS.primary, 
    fontSize: SIZES.large
  }
})