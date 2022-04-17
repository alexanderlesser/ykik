import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { triviaSelector } from '../../slices/trivia'
import { COLORS, SIZES, SHADOWS, FONTS, assets } from '../../constants'

export const shuffleArray = (array) => {
  // // replace(/[^a-zA-Z0-9 ]/g, "")
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

const TriviaQuestion = ({ sessionDone, score, setScore}) => {
  const { triviaQuestions, timer } = useSelector(triviaSelector)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion ] = useState(triviaQuestions[0])
  const [currentOptions, setCurrentOptions ] = useState([])
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null)
  const [correctOption, setCorrectOption] = useState(null)
  const [isOptionDisabled, setIsOptionDisabled] = useState(false)
  const [showNextButton, setShowNextButton] = useState(false)
  const [currentPercentage, setCurrentPercentage] = useState(100)
  const [intervalId, setIntervalId] = useState(0)
  const [intervalRunning, setIntervalRunning] = useState(false)


  useEffect(() => {
    if(!intervalRunning) {
      setIntervalRunning(true)
      const newIntervalId = setInterval(function(){
        const one = (1/timer) * 100
        setCurrentPercentage(currentPercentage => currentPercentage -one)
      }, 1000)
      setIntervalId(newIntervalId)
    }

    return () => {
      if(intervalRunning) {
        clearInterval(intervalId)
      }
    }

  }, [intervalRunning])
  
  useEffect(() => {
    setCurrentOptions(shuffleArray([...currentQuestion.incorrect_answers, currentQuestion.correct_answer]))
  }, [currentQuestion])

  useEffect(() => {
    if(currentPercentage <= 0) {
      clearInterval(intervalId)
      setIntervalId(0)
      setIsOptionDisabled(true)
      setCorrectOption(currentQuestion.correct_answer)
      setShowNextButton(true)
    }

  }, [currentPercentage])

  const validateAnswer = (option) => {
      let correctOption = currentQuestion.correct_answer
      clearInterval(intervalId)
      setCurrentOptionSelected(option)
      setIsOptionDisabled(true)
      setCorrectOption(correctOption)
      if(correctOption === option) {
        setScore(score +1)
      }
      setShowNextButton(true)
  }

  const handleNext = () => {
    if(currentQuestionIndex+1 === triviaQuestions.length) {
      // Last question set sessionDone to true
      sessionDone(true)
      clearInterval(intervalId)
      setIntervalId(0)
    } else {
      const nextQuestion = currentQuestionIndex+1
      setCurrentQuestionIndex(nextQuestion)
      setCurrentQuestion(triviaQuestions[nextQuestion])
      setCurrentOptionSelected(null)
      setIntervalRunning(false)
      setIsOptionDisabled(false)
      setShowNextButton(false)
      setCurrentPercentage(100)
    }
  }

  const renderProgressBar = () => {
    return (
      <View
        style={styles.progressBackground}
      >
        <View 
          style={{
            width: `${currentPercentage}%`,
            ...styles.progressBar,
          }}
        />
      </View>
    )
  }

  const questionCounter = () => (
    <View
      style={styles.counterContainer}
    >
      <Text style={{...styles.counterText, marginRight: 2}}>{triviaQuestions.length >= currentQuestionIndex+1 ? currentQuestionIndex +1 : triviaQuestions.length }</Text>
      <Text style={styles.counterText}> / {triviaQuestions.length}</Text>
    </View>
  )

  const question = () => (
    <Text
      style={styles.questionText}
    >
     {currentQuestion.question.replace("&quot;", "").replace(/&rdquo;/g,'"').replace(/&ldquo;/g,'"').replace(/&quot;/g,"").replace(/&#039;/g,"'").replace(/&iacute;/g,"'").replace(/&oacute;/g,"Ó").replace(/&amp;/g,"&")}
    </Text>
  )

  const renderOptions = () => (
    <View>
        {
          currentOptions.map(option => (
            <TouchableOpacity
              key={option}
              style={{
                borderColor: correctOption === option 
                ? COLORS.success : option === currentOptionSelected 
                ? COLORS.error : COLORS.secondary+'40',
                ...styles.optionBtn
              }}
              disabled={isOptionDisabled}
              onPress={() => validateAnswer(option)}
            >
              <Text style={{
                fontSize: 20,
                color: COLORS.white,

              }}>{option.replace("&quot;", "").replace(/&rdquo;/g,"'").replace(/&ldquo;/g,"'").replace(/&quot;/g,"").replace(/&#039;/g,"'").replace(/&iacute;/g,"'").replace(/&oacute;/g,"Ó").replace(/&lrm;/g,"").replace(/&amp;/g,"&")}</Text>
              {/* SHOW CHECK OR CROSS ICON */}
              {
                option === correctOption ? (
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
                ) : option === currentOptionSelected ? (
                  <View>
                    <Image 
                      source={assets.cross}
                      resizeMode='contain'
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    />
                  </View>
                ) : null
              }
              
            </TouchableOpacity>
          ))
        }
      </View>
  )

  const renderNextButton = () => {
    if(showNextButton) {
      return (
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={handleNext}
        >
          <Text 
            style={styles.nextBtntext}>
             {currentQuestionIndex+1 >= triviaQuestions.length ? 'Show score' : 'Next question'}
            </Text>
        </TouchableOpacity>
      )
    }
    return null
  }


  return (
    <View style={{
      flex: 1,
      paddingVertical: 20,
      paddingHorizontal: 20,
      position: 'relative',
    }}>
        {renderProgressBar()}
        {questionCounter()}
    <View
      style={{
        paddingVertical: SIZES.medium
      }}
    >
      {question()}
    </View>
      {renderOptions()}
      <View>
        {renderNextButton()}
      </View>
      <Image 
        source={assets.confetti}
        style={{
          position: 'absolute',
          width: '100%',
          height: '20%',
          bottom: -30,
          zIndex: -1,
        }}
      />
    </View>
  )
}

export default TriviaQuestion

const styles = StyleSheet.create({
  progressBackground: {
    width: `100%`,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#00000020',
    marginTop: SIZES.font,
    marginBottom: SIZES.font
  },

  progressBar: {
    height: '100%',
    borderRadius: 20,
    backgroundColor: COLORS.orange
  },  
  /* 
  * QuestionCunter
  */
  counterContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: SIZES.base,
  },

  counterText: {
    color: COLORS.white, 
    fontSize: SIZES.medium, 
    opacity: 0.6
  },  
  /* 
  * Question
  */
 questionText: {
  color: COLORS.white,
  fontSize: SIZES.large,
  fontFamily: FONTS.semiBold,
  textAlign: 'center'
 },
 /* 
 * Options
 */
 optionBtn: {
  borderWidth: 3,
  marginBottom: SIZES.medium,
  backgroundColor: COLORS.secondary+'20',
  height: 60,
  borderRadius: 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  marginVertical: 10,
 },
 /* 
  *   NextBtn
 */
nextBtn: {
  width: '100%',
  paddingVertical: SIZES.font,
  backgroundColor: COLORS.secondary,
  marginTop: SIZES.font
},
nextBtntext: {
  color: COLORS.white, 
  fontFamily: FONTS.semiBold, 
  fontSize: SIZES.extraLarge, 
  textAlign: 'center'
}

})