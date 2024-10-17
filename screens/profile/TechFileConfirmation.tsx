import React from 'react';
import { Image, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useLocalization } from '../../contexts/LocalizationContext';
import { RootStackParamList } from '../../components/RootNavigator';
import ScreenContainer from '../../components/ui/ScreenContainer';
import BackButton from '../../components/ui/buttons/BackButton';
import { isVideo } from '../../utils/helpers';
import { ResizeMode, Video } from 'expo-av';
import styles from './styles';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { useSupportFileContext } from '../../contexts/SupportFileContext';

type TechFileConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'TechFileConfirmation'>;
type TechFileConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TechFileConfirmation'>;

interface TechFileConfirmationScreenProps {
  route: TechFileConfirmationScreenRouteProp;
  navigation: TechFileConfirmationScreenNavigationProp;
}

function TechFileConfirmationScreen({ route, navigation }: TechFileConfirmationScreenProps) {
  const { file } = route.params;
  const { staticData } = useLocalization();
  const { setFile } = useSupportFileContext();

  return (
    <ScreenContainer>
        <BackButton />
        {isVideo(file.uri) ? 
            <Video 
                source={{ uri: file.uri }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                shouldPlay={false}
                useNativeControls
                isLooping={true}
                resizeMode={ResizeMode.COVER}
                style={styles.fileConfirmation}
                onError={(error) => {
                  console.error('Video Error:', error);
                }}
            />
            :
            <Image 
                source={{ uri: file.uri }}
                style={styles.fileConfirmation }
            />
        }
        <View style={styles.fileConfirmationBottom}>
            <SubmitButton onPress={() => {
                navigation.navigate("SupportCameraOrGallery");
            }} width={164} textStyle={{ fontSize: 12 }}>{staticData.profile.techFileConfirmationScreen.retook}</SubmitButton>
            <SubmitButton onPress={() => {
                setFile(file);
                navigation.navigate("TechSupport");
            }} width={164} textStyle={{ fontSize: 12 }}>{staticData.profile.techFileConfirmationScreen.send}</SubmitButton>
        </View>
    </ScreenContainer>
  );
};

export default TechFileConfirmationScreen;
