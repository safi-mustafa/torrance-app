import React from 'react';
import * as ImagePicker from 'expo-image-picker/src/ImagePicker';
import { Dimensions, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import Buttonx from './Buttonx';
import { primaryColor } from '../../constants/Colors';
import { HOST_URL } from '../../constants/Misc';

export default function ImageInput({ buttonText = 'Upload', ...otherProps }) {
  const images = otherProps.value ? [otherProps?.value?.previewImgUrl ? HOST_URL + otherProps?.value?.previewImgUrl : otherProps?.value?.uri] : [];
  const imageWidth = Dimensions.get('screen').width / 3.5;
  const imageHeight = Dimensions.get('screen').height / 6.5;

  const onSelection = (asset) => {
    otherProps.setFieldValue(otherProps?.name, asset);
  };

  const onRemoveImage = (image) => {
    otherProps.setFieldValue(otherProps?.name, null);
  };

  React.useEffect(() => {
    (async () => {
      const { status: cameraRollStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

      if (cameraRollStatus !== 'granted' || cameraStatus !== 'granted') {
        alert('Sorry, we need camera roll and camera permissions to make this work!');
      }
    })();
  }, []);


  const pickImage = async (sourceType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      sourceType: sourceType, // Added sourceType parameter
    });

    if (!result.canceled) {
      let asset = result.assets[0];
      let uri = asset.uri;
      let name = uri.split('/').pop();
      let match = /\.(\w+)$/.exec(name);
      let type = match ? `image/${match[1]}` : `image`;
      onSelection({ ...asset, name });
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let asset = result.assets[0];
      // console.log("🚀 ~ file: ImageInput.js:63 ~ openCamera ~ result:", result)
      let uri = asset.uri;
      let name = uri.split('/').pop();
      delete asset?.base64;
      delete asset?.duration;
      delete asset?.assetId;
      delete asset?.rotation;
      asset = { ...asset, fileName: name };
      if (Platform.OS === 'android') {
        asset = { ...asset, type: 'image/jpeg' };
      }
      onSelection({ ...asset, name });
    }
  };

  return (
    <>
      <Buttonx
        style={{ backgroundColor: 'transparent' }}
        onPress={() => pickImage(ImagePicker.MediaTypeOptions.Images)}
        title={
          <>
            <AntDesign name="upload" size={18} color={primaryColor} />
            <Text style={{ color: primaryColor, fontSize: 16 }}> {buttonText}</Text>
          </>
        }
      />
      <Buttonx
        style={{ backgroundColor: 'transparent' }}
        onPress={() => openCamera()}
        title={
          <>
            <AntDesign name="camera" size={18} color={primaryColor} />
            <Text style={{ color: primaryColor, fontSize: 16 }}> Capture</Text>
          </>
        }
      />
      <View style={{ flexDirection: 'column' }}>
        {images &&
          images.map((image, index) => (
            <View key={index}>
              <View style={{ position: 'relative', zIndex: 999, top: 10, left: 5, elevation: 1 }}>
                <TouchableOpacity onPress={() => onRemoveImage(image)}>
                  <Ionicons name="remove-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
              <Image m={1} source={{ uri: image }} style={{ width: imageWidth, height: imageHeight }} alt="attchment" />
            </View>
          ))}
      </View>
    </>
  );
}