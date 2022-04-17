import { View, Text } from 'react-native'
import React from 'react'
import { FONTS, SIZES, COLORS } from '../../constants'

const PreviousSession = ({ data }) => {
  // toLocaleString('en-GB', { timeZone: 'UTC' })
  let options = { weekday: 'short', month: 'short', day: 'numeric'}
  return (
    <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '100%', paddingHorizontal: SIZES.font, marginBottom: SIZES.base}}>
      <Text style={{width: '25%', fontFamily: FONTS.semiBold, fontSize: SIZES.small, color: COLORS.primary}}>{data.score} pts</Text>
      <Text style={{width: '25%', fontFamily: FONTS.semiBold, fontSize: SIZES.small, color: COLORS.primary}}>{data.questionAmount}</Text>
      <Text style={{width: '25%', fontFamily: FONTS.semiBold, fontSize: SIZES.small, color: COLORS.primary}}>{data.difficulty}</Text>
      <Text style={{width: '25%', fontFamily: FONTS.semiBold, fontSize: SIZES.small, color: COLORS.primary}}>{new Date(JSON.parse(data.date)).toLocaleString('en-GB', options)}</Text>
    </View>
  )
}

export default PreviousSession