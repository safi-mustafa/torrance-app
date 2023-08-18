import React from 'react';
// import * as ImagePicker from 'expo-image-picker';
import * as ImagePicker from "expo-image-picker/src/ImagePicker";
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import Buttonx from './Buttonx';
import { primaryColor } from '../../constants/Colors';

export default function UploadAttachment({ buttonText = 'Upload', ...otherProps }) {

  // console.log("🚀 ~ file: UploadAttachment.js:13 ~ UploadAttachment ~ otherProps.value:", otherProps.value)
  const images = otherProps.value ? [otherProps.value?.file?.uri] : [];
  const imageWidth = Dimensions.get("screen").width / 3.5;
  const imageHeight = Dimensions.get("screen").height / 6.5;

  const onSelection = (asset) => {
    // const fileData = {
    //   ...asset,
    //   name,
    //   type
    // };
    otherProps.setFieldValue(otherProps?.name, asset);
  }

  const onRemoveImage = (image) => {
    otherProps.setFieldValue(otherProps?.name, null);
  }

  React.useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log("🚀 ~ file: UploadAttachment.js:47 ~ pickImage ~ result:", result)
    if (!result.canceled) {
      let asset = result.assets[0];
      let uri = asset.uri;
      let name = uri.split('/').pop();
      let match = /\.(\w+)$/.exec(name);
      let type = match ? `image/${match[1]}` : `image`;
      // console.log("🚀 ~ file: UploadAttachment.js:53 ~ pickImage ~ name, type:", name, type)
      onSelection({...asset, name});
    }
  };

  return (
    <>
      <Buttonx style={{ backgroundColor: 'transparent' }} onPress={pickImage} title={<>
        <AntDesign name="upload" size={18} color={primaryColor} />
        <Text style={{ color: primaryColor, fontSize: 16 }}> {buttonText}</Text>
      </>} />
      <View style={{ flexDirection: 'column' }}>
        {images && images.map((image, index) => <View key={index}>
          <View  style={{ position: 'relative', zIndex: 999, top: 10, left: 5, elevation: 1 }}>
            <TouchableOpacity onPress={() => onRemoveImage(image)}>
              <Ionicons name="remove-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <Image m={1} source={{ uri: image }} style={{ width: imageWidth, height: imageHeight }} alt="attchment" />
          </View>
        )}
      </View>
    </>
  );
}
