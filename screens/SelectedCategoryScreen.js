import { View, Text, SafeAreaView, StyleSheet, Image, ActivityIndicator, FlatList, StatusBar } from 'react-native'
import { COLORS, SIZES, SHADOWS, FONTS, assets } from '../constants'
import { FocusedStatusBar, RectButton, CircleButton, PreviousSession, CircleSelectButton } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Slider from '@react-native-community/slider'
import {React, useEffect, useState} from 'react'
import { triviaSelector, fetchTrivia, setSelectedCategory, setQuestions, setDifficulty, setTimer } from '../slices/trivia'

const SelectedCategoryScreen = ({ route, navigation }) => {
  const Navigation = useNavigation()
  const item = route.params.item
  const dispatch = useDispatch()
  // use the hook and selector
  const { selectedCategory, questions, loading, hasErrors, prevScore, difficulty, timer } = useSelector(triviaSelector)
  const [previousSessions, setPreviousSessions] = useState([])

  useEffect(() => {
    dispatch(setSelectedCategory(item.id))
  }, [route])
  useEffect(() => {
    if(prevScore.length > 0) {
      const index = prevScore.findIndex(prev => prev.category === item.id)
      if(index > -1) {
        setPreviousSessions(prevScore[index].scores)
      }
    }
  }, [])

  const onStartClick = () => {
    dispatch(fetchTrivia({selectedCategory, questions, difficulty})).then(() => {
      Navigation.navigate('Trivia')
    }).catch(error => {
      console.log('error', error)
    })
  }

  const handleDiffeculty = (value) => {
    dispatch(setDifficulty(value))
  }

  const handleQuestionAmount = (value) => {
    dispatch(setQuestions(value))
  }

  const handleTmer = (value) => {
    dispatch(setTimer(value))
  }

  const SessionsHeader = ({data, navigation}) => (
    <View style={styles.sessionHeaderContainer}>
      <Image 
        source={data.image}
        resizeMode='cover'
        style={{
          width: '100%',
          height: '100%'
        }}
      />
      <CircleButton 
        imageUrl={assets.left}
        left={15}
        top={StatusBar.currentHeight + 10}
        handlePress={() => navigation.goBack()}
      />
      <View style={{padding: SIZES.font}}>
        <View
          style={styles.sessionTitleContainer}
        >
          <Text 
            style={styles.sessionTitle}
          >
            {data.name}
          </Text>
        </View>
      </View>
    </View>
  )

  const renderQuestionSlider = () => (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderTextNumber}>{questions}</Text>
      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={50}
        value={questions}
        step={5}
        thumbTintColor={COLORS.success}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={COLORS.gray}
        onSlidingComplete={handleQuestionAmount}
      />
    </View>
  )

  const rednerTimerSlider = () => (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderTextNumber}>{timer}s</Text>
      <Slider
        style={styles.slider}
        minimumValue={15}
        maximumValue={120}
        value={timer}
        step={15}
        thumbTintColor={COLORS.success}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={COLORS.gray}
        onSlidingComplete={handleTmer}
      />
    </View>
  )

  const renderDiffecultyButtons = () => (
    <View style={styles.difficultyContainer}>
      <RectButton 
        width={SIZES.extraLarge * 4}
        height={SIZES.extraLarge + 10}
        title='Easy'
        backgroundColor={difficulty === 'easy' ? COLORS.success : COLORS.white}
        btnTxtColor={difficulty === 'easy' ? COLORS.white : COLORS.primary}
        handlePress={() => {handleDiffeculty('easy')}}
      />
      <RectButton 
        width={SIZES.extraLarge * 4}
        height={SIZES.extraLarge + 10}
        title='Medium'
        backgroundColor={difficulty === 'medium' ? COLORS.success : COLORS.white}
        btnTxtColor={difficulty === 'medium' ? COLORS.white : COLORS.primary}
        handlePress={() => {handleDiffeculty('medium')}}
      />
      <RectButton 
        width={SIZES.extraLarge * 4}
        height={SIZES.extraLarge + 10}
        title='Hard'
        backgroundColor={difficulty === 'hard' ? COLORS.success : COLORS.white}
        btnTxtColor={difficulty === 'hard' ? COLORS.white : COLORS.primary}
        handlePress={() => {handleDiffeculty('hard')}}
      />
      </View>
  )

  return (
    <SafeAreaView style={{flex: 1}}>
      <FocusedStatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      {
        loading ? (
        <View 
          style={{position: 'absolute', zIndex: 100, width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>) : null
      }
      <View>
        <FlatList 
          data={previousSessions}
          renderItem={({item}) => <PreviousSession data={item} />}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: SIZES.extraLarge * 3}}
          ListHeaderComponent={() => (
            <View>
          <SessionsHeader data={item} navigation={navigation} />
          <View style={{ marginTop: SIZES.extraLarge * 2, marginLeft: SIZES.font, marginRight: SIZES.font}}>
            <Text style={{paddingBottom: SIZES.base, fontFamily: FONTS.semiBold, color: COLORS.primary}}>Questions</Text>
            {renderQuestionSlider()}
            <Text style={{paddingBottom: SIZES.base, fontFamily: FONTS.semiBold, color: COLORS.primary}}>Time</Text>
            {rednerTimerSlider()}
          <Text style={{paddingBottom: SIZES.base, fontFamily: FONTS.semiBold, color: COLORS.primary}}>Difficlty</Text>
            {renderDiffecultyButtons()}
          { previousSessions.length > 0 ? (
            <Text style={{paddingBottom: SIZES.base, paddingTop: SIZES.font, fontFamily: FONTS.semiBold, color: COLORS.primary}}>Previous sessions</Text>
          ) : null}
          </View>
          { previousSessions.length > 0 ? (
            <View style={styles.prevSessionContainer}>
              <Text style={styles.prevSessionText}>Score</Text>
              <Text style={styles.prevSessionText}>Questions</Text>
              <Text style={styles.prevSessionText}>Difficulty</Text>
              <Text style={styles.prevSessionText}>Date</Text>
            </View>
          ) : null}
          </View>
          )}
        />
      </View>
      <View style={styles.btnContainer}>
        <RectButton 
          width={'80%'}
          height={50}
          btnTxtColor={COLORS.white}
          title='Start'
          elevation={3}
          handlePress={onStartClick}
        />
      </View>
    </SafeAreaView>
  )
}

export default SelectedCategoryScreen

const styles = StyleSheet.create({
  /* 
  * Sessionheader
  */
 sessionHeaderContainer: {
  width: '100%', 
  height: 273
 },

 sessionTitleContainer: {
  backgroundColor: COLORS.white,
  paddingHorizontal: SIZES.font,
  paddingVertical: SIZES.base,
  maxWidth: '80%',
  ...SHADOWS.light,
  top: -25,
 },

 sessionTitle: {
  fontFamily: FONTS.semiBold, 
  fontSize: SIZES.extraLarge, 
  textAlign: 'center',
  color: COLORS.primary,
 },
  /* 
  * QuestionSlider
  */
 sliderContainer: {
  width: '100%', 
  flexDirection: 'row', 
  justifyContent: 'space-around', 
  alignItems: 'center'
 },

 sliderTextNumber: {
  color: COLORS.orange, 
  fontFamily: FONTS.semiBold
 },

 slider: {
  width: '85%', 
  height: 40
 },

 /* 
 * DifficultyButtons
 */
 difficultyContainer: {
  width: '100%', 
  flexDirection: 'row', 
  justifyContent: 'space-around'
 },
 /* 
  * PreviousSession 
 */
 prevSessionContainer: {
  alignItems: 'flex-start', 
  justifyContent: 'space-between', 
  flexDirection: 'row', 
  width: '100%', 
  paddingHorizontal: SIZES.small, 
  marginBottom: SIZES.base,
 },

 prevSessionText: {
  width: '25%', 
  fontFamily: FONTS.semiBold, 
  color: COLORS.primary
 },
 /*
  * extra
 */
btnContainer: {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: SIZES.font,
  backgroundColor: 'rgba(255, 255,255, 0.5)',
  zIndex: 1,
}

})