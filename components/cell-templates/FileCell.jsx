import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";

import appStyles from '../../app-styles';
import { primaryColor } from '../../constants/Colors';

export default function FileCell({ item, navigation }) {
    return (<>
        <View>
            <Text style={[appStyles.fw500, appStyles.my1]}>{item?.name}</Text>
            <Text style={{ color: '#999' }}>{item?.subtitle}</Text>
        </View>
        <View>
            <Pressable
                // onPress={() => navigation.navigate("SingleSubmission", { ...item })}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}
            >
                <FontAwesome
                    name="angle-right"
                    size={25}
                    color={primaryColor}
                    style={{ marginRight: 10 }}
                />
            </Pressable>
        </View>
    </>
    )
}

const styles = StyleSheet.create({
    
})
