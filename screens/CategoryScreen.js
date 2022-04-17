import { View, Text, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {React, useEffect, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import { FocusedStatusBar, CategoryCard, CategoryHeader } from '../components'
import { assets, COLORS, SIZES, triviaCategories } from '../constants'

// selector
import { getTheToken } from '../slices/trivia'

const HomeScreen = () => {
  const dispatch = useDispatch()
  // use the hook and selector
  const [categories, setCategories] = useState(triviaCategories)
  useEffect(() => {
    dispatch(getTheToken())
  }, [])

  const handleSearch = (value) => {
    // triviaCategories.filter(category => category.name.includes(term))
    if(!value.length) return setCategories(triviaCategories)

    const filteredCategories = triviaCategories.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
    
    if(filteredCategories.length > 0) {
      setCategories(filteredCategories)
    } else {
      setCategories(triviaCategories)
    }
  }

  return (
    <SafeAreaView style={styles.flexContainer}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={styles.flexContainer}>
        <View style={{ zIndex: 100 }}>
          <FlatList 
            data={categories}
            renderItem={({item}) => <CategoryCard item={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<CategoryHeader onSearch={handleSearch} />}
          />
        </View>
        <View style={styles.backgroundContainer}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary ]}
            style={styles.gradient}
            start={{ x: 0.5, y: 0.5}}
          />
        </View>
        <Image 
          source={assets.confetti}
          style={styles.bgImage}
        />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },

  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
},

gradient: {
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
},

bgImage: {
  position: 'absolute',
  zIndex: -1,
  bottom: -20,
  left: 0,
  width: '120%',
  height: '60%',
  zIndex: 10
}
})