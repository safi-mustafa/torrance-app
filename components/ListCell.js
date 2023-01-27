import React, { Component } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";

import appStyles from '../app-styles';
import { primaryColor } from '../constants/Colors';

export default function ListCell({ item = {}, navigation, template = null, cellOptions = {}, ...otherProps }) {
    const { titleField = 'name', subTitleField = '' } = cellOptions;
    const TemplateComponent = React.cloneElement(
        template,
        { item, cellOptions }
    );

    return (
        <View style={styles.section}>
            {template ? TemplateComponent :
                <>
                    <View>
                        <Text style={[appStyles.fw500, appStyles.my1]}>{item[titleField]}</Text>
                        {subTitleField && <Text style={{ color: '#999' }}>{item[subTitleField]}</Text>}
                    </View>
                    <View>
                        <Pressable
                            onPress={() => navigation.navigate("SingleSubmission", { ...item })}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name={item?.icon ? item?.icon : "angle-right"}
                                size={25}
                                color={primaryColor}
                                style={{ marginRight: 10 }}
                            />
                        </Pressable>
                    </View>
                </>
            }
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
    }
})
