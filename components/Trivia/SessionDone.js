import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import ConfettiCannon from 'react-native-confetti-cannon'
import { COLORS, SIZES, SHADOWS, FONTS, assets } from '../../constants'
import { triviaSelector, fetchTrivia, addPrevScoreObject } from '../../slices/trivia'
import { setObjectItem } from '../../common/storage'

const SessionDone = ({score, setScore, amount, setCurrentSession}) => {
  const dispatch = useDispatch()
  const Navigation = useNavigation()
  const { triviaQuestions, questions, difficulty, selectedCategory, loading, prevScore } = useSelector(triviaSelector)

  useEffect(() => {
    
    dispatch(addPrevScoreObject({
      category: selectedCategory,
      score: score,
      amount: amount,
      difficulty: difficulty,
    }))
  }, [])

  const handlePlayAgainPress = () => {
    dispatch(fetchTrivia({selectedCategory, questions, difficulty})).then(() => {
      setCurrentSession(false)
      setScore(0)
    }).catch(error => {
      console.log('error', error)
    })
  }

  const handleMenuPress = () => {
    Navigation.navigate('Category')
  }


  const renderScore = () => (
    <View style={{ paddingVertical: 20 }}
    >
      <Text style={styles.scoreText}>{score}/{amount}</Text>
      <Text style={styles.scoreText}>{score < questions/2 ? 'You can do better!' : score == questions/2 && score < questions-3 ? 'Not bad!': 'Excellent!' }</Text>
    </View>
  )

  const renderAnswer = (item, index) => (
    <View style={{ paddingVertical: SIZES.base }}>
      <Text style={styles.questionText}>{item.question.replace("&quot;", "").replace(/&rdquo;/g,"'").replace(/&ldquo;/g,"'").replace(/&quot;/g,"").replace(/&#039;/g,"'").replace(/&iacute;/g,"'").replace(/&oacute;/g,"Ó").replace(/&amp;/g,"&")}</Text>
      <View style={styles.answerContainer}>
        <Text 
          style={{
            fontSize: 20,
            color: COLORS.white,
          }}
        >
          {item.correct_answer.replace("&quot;", "").replace(/&rdquo;/g,"'").replace(/&ldquo;/g,"'").replace(/&quot;/g,"").replace(/&#039;/g,"'").replace(/&iacute;/g,"'").replace(/&oacute;/g,"Ó").replace(/&amp;/g,"&")}
        </Text>
        <View>
          <Image 
            source={assets.check}
            resizeMode='contain'
            style={{
              width: 25,
              height: 25,
            }}
          />
        </View>
      </View>
    </View>
  )

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.footerbtn}
        onPress={handlePlayAgainPress}
      >
        <Text style={styles.footerBtnText}>
          Play again
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerbtn}
        onPress={handleMenuPress}
      >
        <Text style={styles.footerBtnText}>
          Menu
        </Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.sessionContainer}>
      {
        loading ? (
        <View 
          style={styles.activityContainer}
        >
          <ActivityIndicator size="large" color={COLORS.white} />
        </View>) : null
      }
       {
         score >= questions/2 ? <ConfettiCannon count={200} fadeOut={true} origin={{x: -40, y: 300}} /> : null
       }
      <View>
        {renderScore()}
      <FlatList 
            data={triviaQuestions}
            renderItem={({item, index}) => renderAnswer(item, index)}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Text style={styles.headerText}>Correct Answers:</Text>}
            ListFooterComponent={renderFooter()}
          />
      </View>
    </View>
  )
}

export default SessionDone

const styles = StyleSheet.create({
  /* 
  * Score
  */
  scoreText: {
    color: COLORS.white, 
    textAlign: 'center', 
    fontFamily: FONTS.semiBold, 
    fontSize: SIZES.extraLarge
  },
  /* 
  *   Answer
  */
  questionText: {
    color: COLORS.white, 
    fontSize: SIZES.medium, 
    textAlign: 'center', 
    marginBottom: SIZES.font
  },
  answerContainer: {
    borderWidth: 3,
    marginBottom: SIZES.medium,
    borderColor: COLORS.success,
    backgroundColor: COLORS.secondary+'20',
    height: 50,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: SIZES.base,
  },
  /* 
  *   Footer
  */
 footerContainer: {
  marginBottom: 150,
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around'
 },
 footerbtn: {
  width: '45%',
  paddingVertical: SIZES.font,
  backgroundColor: COLORS.secondary,
  borderRadius: SIZES.extraLarge,
  marginTop: SIZES.font,
 },
 footerBtnText: {
  color: COLORS.white, 
  fontFamily: FONTS.semiBold, 
  fontSize: SIZES.extraLarge, 
  textAlign: 'center'
 },
 /* 
 * Extra
 */
sessionContainer: {
  flex: 1, 
  marginBottom: 30, 
  paddingHorizontal: 20, 
  paddingVertical: 20
},

activityContainer: {
  position: 'absolute', 
  zIndex: 100, 
  width: '100%', 
  height: '100%', 
  flex: 1, 
  justifyContent: 'center', 
  alignItems: 'center'
},
headerText: {
  color: COLORS.white, 
  fontFamily: FONTS.semiBold, 
  fontSize: SIZES.large
}
})