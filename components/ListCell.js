import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ListCell({ item }) {
    const { date = '', jobDescription = '', twr = '' } = item;
    return (
        <View style={styles.section}>
            <Text>TWR: {twr}</Text>
            <Text>{date}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 10
    }
})
