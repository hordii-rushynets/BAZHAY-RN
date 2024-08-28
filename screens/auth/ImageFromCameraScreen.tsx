import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { Camera, CameraType, CameraView } from 'expo-camera';
import ScreenContainer from '../../components/ui/ScreenContainer';
import BackButton from '../../components/ui/buttons/BackButton';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import styles from "./styles"
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';
import { useLocalization } from '../../contexts/LocalizationContext';

type ImageFromCameraScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'ImageFromCamera'>;

interface ImageFromCameraScreenProps {
  navigation: ImageFromCameraScreenNavigationProp;
}

export default function ImageFromCameraScreen({ navigation }: ImageFromCameraScreenProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<CameraType>("front");
  const cameraRef = useRef<CameraView | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const { staticData } = useLocalization();

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScreenContainer>
      <BackButton link={"AccountFillAvatar"}/>
      <View style={styles.takePictureContainer}>
        <CameraView
          style={styles.camera}
          ref={cameraRef}
          facing='front'
        />
        <View style={styles.takePicture}></View>
      </View>
      <SubmitButton
        onPress={async () => {
          if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            navigation.navigate("AvatarConfirmation", { image: photo?.uri || "" });
          }
        }}
        width={232}
        style={styles.gridButton}
      > {staticData.auth.imageFromCameraScreen.continueButton}
      </SubmitButton>
    </ScreenContainer>
  );
}
