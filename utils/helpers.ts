import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Dimensions, Image } from "react-native";
import styles from "../screens/auth/styles";

export const cropPhoto = async (uri: string) => {
    const { imageWidth, imageHeight } = await new Promise<{ imageWidth: number, imageHeight: number }>((resolve, reject) => {
      Image.getSize(uri, (width, height) => {
        resolve({ imageWidth: width, imageHeight: height });
      }, reject);
    });

    const cropWidth = (160 / Dimensions.get('window').width) * imageWidth;
    const cropHeight = (160 / Dimensions.get('window').height) * imageHeight;
  
    const originX = imageWidth / 2;
    const originY = imageHeight/ 2;
  
    const croppedPhoto = await manipulateAsync(
      uri,
      [{ crop: { originX, originY, width: cropWidth, height: cropHeight } }],
      { compress: 1, format: SaveFormat.PNG }
    );
    console.log(imageWidth, imageHeight, cropWidth, cropHeight, originX, originY)
    console.log(croppedPhoto)
    return croppedPhoto;
  };