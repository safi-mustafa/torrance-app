import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";

import Layout from '../../constants/Layout';
import { primaryColor } from '../../constants/Colors';
import { getNotificationApiUrl } from '../../utility';

export default function NotificationCell({ item = {}, navigation, template = null, cellOptions = {}, isApprover = false, ...otherProps }) {
    const { entityType, entityId, message, formattedCreatedOn = '' } = item;
    const { Message = '' } = JSON.parse(message)
    const goToScreen = () => {
        navigation.navigate("SingleSubmission", { apiUrl: getNotificationApiUrl(entityType), id: entityId, isApproval: isApprover })
    };

    return (
        <View style={styles.section}>
            <Pressable
                onPress={() => goToScreen()}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}
            >
                <View style={styles.cellWrapper}>
                    <View style={{paddingRight:15, width:'100%'}}>
                        {formattedCreatedOn && <Text style={{ fontSize: 13, color: '#999', marginBottom: 5 }}>{formattedCreatedOn}</Text>}
                        <Text>{Message}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <FontAwesome
                            name={"angle-right"}
                            size={25}
                            color={primaryColor}
                            style={{ marginRight: 10 }}
                        />
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 12,
        marginHorizontal: 8,
        borderRadius: 6,
        // width: "48%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cellWrapper: {
        justifyContent: 'space-between',
        width: Layout.window.width - 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    badgeStyle: {
        alignItems: 'center',
        marginLeft: 15,
        right: 10,
    }
})
