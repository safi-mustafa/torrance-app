import React, { Component } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";

import appStyles from '../app-styles';
import { primaryColor } from '../constants/Colors';
import Layout from '../constants/Layout';
import { getFormatedDate } from '../utility';
import StatusBadge from './StatusBadge';

export default function ListCell({ item = {}, navigation, template = null, cellOptions = {}, ...otherProps }) {
    // console.log("🚀 ~ file: ListCell.js ~ line 9 ~ ListCell ~ item", item)
    const { titleLabel = '', titleField = 'name', subTitleField = '' } = cellOptions;
    const TemplateComponent = React.cloneElement(
        template ? template : <></>,
        { item, cellOptions }
    );

    const showTitle = (value) => {
        if (typeof value === 'object')
            return value?.name
        else
            return value
    }

    return (
        <View style={styles.section}>
            {template ? TemplateComponent :
                <Pressable
                    onPress={() => navigation.navigate("SingleSubmission", { ...item })}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                    })}
                >
                    <View style={styles.cellWrapper}>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[appStyles.fw500, appStyles.my1]}>
                                    <Text style={{color: '#999'}}>{titleLabel}</Text>
                                    {showTitle(item[titleField])}</Text>
                                {item?.status && <StatusBadge style={styles
                                    .badgeStyle} status={item?.status} />}
                            </View>
                            {subTitleField && <Text style={{ color: '#999' }}>{item[subTitleField]}</Text>}
                            {/* {item?.date && <Text style={{ marginTop: 3, color: '#666', fontSize: 14 }}>{getFormatedDate(item?.date)}</Text>} */}
                        </View>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <FontAwesome
                                name={item?.icon ? item?.icon : "angle-right"}
                                size={25}
                                color={primaryColor}
                                style={{ marginRight: 10 }}
                            />
                        </View>
                    </View>
                </Pressable>
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
