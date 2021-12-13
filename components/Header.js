import React from 'react'
import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header(props) {
    return (
        <View style={{ flexDirection: 'row', height:50, }}>
            <View style={{ flex:1, justifyContent: 'center' }}>
                <MaterialCommunityIcons name="format-list-bulleted" color={'black'} size={24} style={{ marginLeft: 5 }} />
            </View>
            <View style={{ flex:1.5, justifyContent:'center' }}>
                <Text style={{ textAlign: 'center' }}>{props.title}</Text>
            </View>
            <View style={{ flex:1, }}></View>
        </View>
    )
}
