import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Dimensions, Image } from "react-native";
import styles from "../screens/auth/styles";
import { AuthContextData } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  export async function fetchWithAuth(url: string, options : RequestInit = {}, authContext: AuthContextData) : Promise<Response> {
    const accessToken = await AsyncStorage.getItem('AccessToken');
    if (accessToken) {
      options = {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${accessToken}`,
        },
      };
    }
    let response = await fetch(url, options);
  
    if (response.status === 401) {
      await authContext.refreshToken();
      const newAccessToken = await AsyncStorage.getItem('AccessToken');
      if (newAccessToken) {
        // Update options with new access token
        options = {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${newAccessToken}`,
          },
        }
      }
      response = await fetch(url, options);
    }
  
    return response;
  }

  export const getBlobFromUri = async (uri: string) => {
    try {
      // Fetch the image from the URI
      const response = await fetch(uri);
      
      // Convert the response to a Blob
      const blob = await response.blob();
      
      return blob;
    } catch (error) {
      console.error('Error fetching the image:', error);
      throw error;
    }
  };
  
  export const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  export function isVideo(uri: string): boolean {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.flv', '.wmv', '.webm'];
    return videoExtensions.some(extension => uri.toLowerCase().endsWith(extension));
  }