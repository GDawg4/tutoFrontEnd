import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as utils from '../../resources/utils'

const Tutor = ({ vertical = false, info, handleOnPress }) => (
  <TouchableOpacity onPress={() => console.log('yay')}>
    <View style={[styles.tagContainer, vertical ? styles.verticalTag : null]}>
      <Text style={styles.title}>{info.name}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  tagContainer: {
    width: 150,
    height: 125,
    borderRadius: 16,
    backgroundColor: utils.getRandomColor(),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  verticalTag: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
  },
})

export default Tutor
