import AsyncStorage from '@react-native-async-storage/async-storage'

const setItem = async (name, item) => {
  try {
    await AsyncStorage.setItem(name, item)
    return {
      status: 'success',
      name: name,
      item: item
    }
  } catch (err) {
    return {
      status: 'error',
      name: name,
      item: item,
      error: err
    }
  }
}

const setObjectItem = async (name, item) => {
  try {
    const jsonItem = JSON.stringify(item)
    await AsyncStorage.setItem(name, jsonItem)
    return {
      status: 'success',
      name: name,
      item: item
    }
  } catch (err) {
    return {
      status: 'error',
      name: name,
      item: item,
      error: err
    }
  }
}

const getItem = async (name) => {
  try {
    const item = await AsyncStorage.getItem(name)
    return {
      status: 'success',
      name: name,
      item: item
    }
  } catch (err) {
    // saving error
    return {
      status: 'error',
      name: name,
      error: err
    }
  }
}

const getObjectItem = async (name) => {
  try {
    const jsonItem = await AsyncStorage.getItem(name)
    const item = JSON.parse(jsonItem)
    return {
      status: 'success',
      name: name,
      item: item
    }
  } catch (err) {
    return {
      status: 'error',
      name: name,
      error: err
    }
  }
}

const removeItem = async (name) => {
  try {
    await AsyncStorage.removeItem(name)
    return {
      status: 'success'
    }
  } catch(e) {
    // remove error
    return {
      status: 'error'
    }
  }
}



export { setItem, setObjectItem, getItem, getObjectItem, removeItem }