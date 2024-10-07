import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { Camera, CameraType, CameraView } from 'expo-camera';
import ScreenContainer from '../../components/ui/ScreenContainer';
import BackButton from '../../components/ui/buttons/BackButton';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import styles from "../auth/styles"
import { StackNavigationProp } from '@react-navigation/stack';
import { useLocalization } from '../../contexts/LocalizationContext';
import { RootStackParamList } from '../../components/RootNavigator';

type AvatarFromCameraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AvatarFromCamera'>;

interface AvatarFromCameraScreenProps {
  navigation: AvatarFromCameraScreenNavigationProp;
}

export default function AvatarFromCameraScreen({ navigation }: AvatarFromCameraScreenProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
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
      <BackButton />
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
            navigation.navigate("UpdateAvatarConfirmation", { image: photo?.uri || "" });
          }
        }}
        width={232}
        style={styles.gridButton}
      > {staticData.auth.imageFromCameraScreen.continueButton}
      </SubmitButton>
    </ScreenContainer>
  );
}
