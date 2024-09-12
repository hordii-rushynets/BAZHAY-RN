import React, { useCallback, useEffect, useState } from 'react';
import ScreenContainer from '../components/ui/ScreenContainer';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BackButton from '../components/ui/buttons/BackButton';
import Pen from '../components/ui/icons/Pen';
import { StackNavigationProp } from '@react-navigation/stack';
import wishCreatingStyles from "./wishCreating/styles"
import { RootStackParamList } from '../components/RootNavigator';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { Wish } from './wishCreating/interfaces';
import DesignStars from '../components/ui/icons/DesignStars';
import styles from './styles';
import { UserSmallInfo } from '../components/UserSmallInfo';
import { UserFields } from './auth/interfaces';
import DesignedText from '../components/ui/DesignedText';
import authStyles from "./auth/styles"
import { openExternalLink } from '../utils/helpers';
import SubmitButton from '../components/ui/buttons/SubmitButton';
import { useAuth } from '../contexts/AuthContext';
import { WishService } from './wishCreating/services';
import { useLocalization } from '../contexts/LocalizationContext';
import { ResizeMode, Video } from 'expo-av';


type WishScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Wish'>;
type WishScreenRouteProp = RouteProp<RootStackParamList, 'Wish'>;

interface WishScreenProps {
  route: WishScreenRouteProp;
  navigation: WishScreenNavigationProp;
}

function WishScreen({ route, navigation }: WishScreenProps) {
  const { staticData } = useLocalization(); 
  const { wishId } = route.params;
  const wishService = new WishService();
  const authContext = useAuth();

  const [ wish, setWish ] = useState<Wish>({});
  const [ user, setUser ] = useState<UserFields>({});
  const [ loading, setLoading ] = useState(true);

  useFocusEffect(
    useCallback(() => {
      wishService.getWish(wishId, authContext).then(wishData => {
        setWish(wishData);
        setUser(wishData.author || {});
        setLoading(false);
      });
      
    }, [])
  );

  if (loading) {
    return <></>
  }

  return (
    <ScreenContainer>
        <View style={wishCreatingStyles.wishConfirmationTop}>
          <BackButton/>
          <TouchableOpacity>
            <Pen/>
          </TouchableOpacity>
        </View>
        <View style={styles.wishContentContainer}>
            <View style={[styles.wishImageContainer, { width: 164, aspectRatio: wish.image_size }]} >
                {
                wish.video ? 
                  <Video
                    source={{ uri: wish.video }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    shouldPlay={true}
                    isLooping={true}
                    resizeMode={ResizeMode.STRETCH}
                    style={styles.wishImage}
                    onError={(error) => {
                      console.error('Video Error:', error);
                    }}
                  />
                : wish.photo && 
                  <>
                    <Image source={ {uri: wish.photo} } style={styles.wishImage} resizeMode={"cover"}/>
                    <View style={styles.wishStarsContainer}>
                      <DesignStars width={160} height={172}/>
                    </View>
                  </>
                }
            </View>
            <UserSmallInfo avatar={user?.photo || ""} name={user?.first_name || ""} nickname={user?.username || ""}/>
            <View>
              <DesignedText bold={true}>{wish.name || ""}</DesignedText>
              <DesignedText>{wish.price || ""} {wish.currency || ""}</DesignedText>
            </View>
            <DesignedText size="small">{wish.description || ""}</DesignedText>
            {wish.link && <TouchableOpacity onPress={()=>{ openExternalLink(wish.link || "") }}>
              <DesignedText isUppercase={false} style={authStyles.underlined}>{staticData.wishScreen.buyByLink}</DesignedText>
            </TouchableOpacity>}
            <View style={styles.wishBottom}>
              <DesignedText size="small">{staticData.wishScreen.bottomText}</DesignedText>
              <View style={styles.wishBottomButtonsContainer}>
                <SubmitButton onPress={() => {}} width={120}><DesignedText size="small">{staticData.wishScreen.address}</DesignedText></SubmitButton>
                <SubmitButton onPress={() => {}} width={120}><DesignedText size="small">{staticData.wishScreen.post}</DesignedText></SubmitButton>
              </View>
            </View>
        </View>
    </ScreenContainer>
  );
};

export default WishScreen;
