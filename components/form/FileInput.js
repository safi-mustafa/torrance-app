import React, { useState } from 'react';
import * as ImagePicker from "expo-image-picker/src/ImagePicker";
import {
  Dimensions, Image, Text, TouchableOpacity, View, StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

import Buttonx from './Buttonx';
import { primaryColor } from '../../constants/Colors';
import { HOST_URL } from '../../constants/Misc';
import fileIcon from '../../assets/images/fco.png';

export default function ImageInput({ buttonText = 'Upload', ...otherProps }) {

  const files = otherProps.value ? [otherProps?.value?.previewImgUrl ? HOST_URL + otherProps?.value?.previewImgUrl : otherProps?.value] : [];
  const imageWidth = Dimensions.get("screen").width / 3.5;
  const imageHeight = Dimensions.get("screen").height / 6.5;

  const checkPermissions = async () => {
    if (Platform.OS === 'ios') {
      return true;
    } else {
      try {
        const result = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );

        if (!result) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title:
                'You need to give storage permission to download and save the file',
              message: 'App needs access to your camera ',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
            return true;
          } else {
            Alert.alert('Error', 'PERMISSION_ACCESS_FILE');

            console.log('Camera permission denied');
            return false;
          }
        } else {
          return true;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
  };

  async function selectFile() {
    try {
      const isGranted = await checkPermissions();

      if (isGranted) {
        const result = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: false,
          // type: 'image/*',
        });

        if (result.type === 'success') {
          // Printing the log realted to the file
          console.log('res : ' + JSON.stringify(result));
          // Setting the state to show single file attributes
          onSelection({...result, type: result.mimeType});
        }
      }
    } catch (err) {
      onSelection(null);
      console.warn(err);
      return false;
    }
  }

  const onSelection = (asset) => {
    otherProps.setFieldValue(otherProps?.name, asset);
  }

  const onRemoveFile = () => {
    otherProps.setFieldValue(otherProps?.name, null);
  }
  //check if string contain image
  const isImage = (str) => {
    return str.includes('image');
  }

  return (
    <>
      <Buttonx style={{ backgroundColor: 'transparent' }} onPress={selectFile} title={<>
        <AntDesign name="upload" size={18} color={primaryColor} />
        <Text style={{ color: primaryColor, fontSize: 16 }}> {buttonText}</Text>
      </>} />
      <View style={{ flexDirection: 'column' }}>
        {files && files.map(({ uri, mimeType }, index) => <View key={index}>
          <View style={{ position: 'relative', zIndex: 999, top: 10, left: 5, elevation: 1 }}>
            <TouchableOpacity onPress={() => onRemoveFile()}>
              <Ionicons name="remove-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <Image m={1} source={isImage(mimeType) ? { uri } : fileIcon} style={{ width: imageWidth, height: imageHeight }} alt="attchment" />
        </View>
        )}
      </View>
    </>
  );
}
