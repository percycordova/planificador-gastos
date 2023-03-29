import React from 'react'
import { ScrollView, View } from 'react-native'

const TypeView = (props: any) => {
  if (props.isView) {
    return <ScrollView>{props.children}</ScrollView>
  } else {
    return <View>{props.children}</View>
  }
}

export default TypeView
