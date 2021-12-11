import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function Chapter(props) {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('reading_chapter')}>
            <Text>
                {props.item.chapter_name}
            </Text>
        </TouchableOpacity>
    )
}
