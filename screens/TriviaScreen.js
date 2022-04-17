import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { triviaSelector } from '../slices/trivia'
import { COLORS, SIZES, SHADOWS, FONTS, assets } from '../constants'

import { FocusedStatusBar, TriviaQuestion, SessionDone } from '../components'

const TriviaScreen = ({ route, navigation }) => {
  const [currentSession, setCurrentSession ] = useState(false)
  const [score, setScore] = useState(0)
   // use the hook and selector
   const { triviaQuestions, questions } = useSelector(triviaSelector)

  return (
    <SafeAreaView style={{flex: 1}}>
      <FocusedStatusBar 
        barStyle="light-content"
        backgroundColor={COLORS.primary}
      />
      <View
        style={styles.container}
      >
      { !currentSession ? (
        <TriviaQuestion 
          sessionDone={setCurrentSession}
          score={score}
          setScore={setScore}
        />
      ) : (
        <SessionDone 
          score={score}
          setScore={setScore}
          amount={questions}
          setCurrentSession={setCurrentSession}
        />
      ) }
      </View>
    </SafeAreaView>
  )
}

export default TriviaScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary, 
    color: COLORS.white,
    width: '100%',
    height: '100%'
  }
})