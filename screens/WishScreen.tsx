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
import * as ImageManipulator from 'expo-image-manipulator';
import styles from './styles';
import { UserSmallInfo } from '../components/UserSmallInfo';
import { UserFields } from './auth/interfaces';
import DesignedText from '../components/ui/DesignedText';
import authStyles from "./auth/styles"
import { openExternalLink } from '../utils/helpers';
import SubmitButton from '../components/ui/buttons/SubmitButton';
import { AccountService } from './auth/services';
import { useAuth } from '../contexts/AuthContext';
import { WishService } from './wishCreating/services';


type WishScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Wish'>;
type WishScreenRouteProp = RouteProp<RootStackParamList, 'Wish'>;

interface WishScreenProps {
  route: WishScreenRouteProp;
  navigation: WishScreenNavigationProp;
}

function WishScreen({ route, navigation }: WishScreenProps) {
  const { wishId } = route.params;
  const [ratio, setRatio] = useState(1/1);
  const wishService = new WishService();
  const authContext = useAuth();

  const [ wish, setWish ] = useState<Wish>({});
  const [ user, setUser ] = useState<UserFields>({});
  const [ loading, setLoading ] = useState(true);

  const loadImageSize = async (uri: string) => {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{rotate: 360}],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    setRatio(manipulatedImage.width/manipulatedImage.height);
  };

  useEffect(() => {
    if (wish.media) {
        loadImageSize(wish.media);
    }
  }, [wish.media]);

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
            <View style={[styles.wishImageContainer, { width: 164, aspectRatio: ratio }]} >
                {wish.media && <Image source={ {uri: wish.media} } style={styles.wishImage} resizeMode={"cover"}/>}
                <View style={styles.wishStarsContainer}>
                    <DesignStars width={160} height={172}/>
                </View>
            </View>
            <UserSmallInfo avatar={user?.photo || ""} name={user?.first_name || ""} nickname={user?.username || ""}/>
            <View>
              <DesignedText bold={true}>{wish.name || ""}</DesignedText>
              <DesignedText>{wish.price || ""} {wish.currency || ""}</DesignedText>
            </View>
            <DesignedText size="small">{wish.description || ""}</DesignedText>
            {wish.link && <TouchableOpacity onPress={()=>{ openExternalLink(wish.link || "") }}>
              <DesignedText isUppercase={false} style={authStyles.underlined}>Придбати за цим посиланням</DesignedText>
            </TouchableOpacity>}
            <View style={styles.wishBottom}>
              <DesignedText size="small">Якщо ти знаходишся далеко, то можеш відправити мені подарунок:</DesignedText>
              <View style={styles.wishBottomButtonsContainer}>
                <SubmitButton onPress={() => {}} width={120}><DesignedText size="small">Адреса</DesignedText></SubmitButton>
                <SubmitButton onPress={() => {}} width={120}><DesignedText size="small">Пошта</DesignedText></SubmitButton>
              </View>
            </View>
        </View>
    </ScreenContainer>
  );
};

export default WishScreen;
