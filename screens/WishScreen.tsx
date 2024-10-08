import React, { useCallback, useEffect, useState } from 'react';
import ScreenContainer from '../components/ui/ScreenContainer';
import { Image, Platform, Share, View } from 'react-native';
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
import mainStyles from "./main/styles"
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
import Upload from '../components/ui/icons/Upload';
import { useWishCreating } from '../contexts/WishCreatingContext';
import { Brand } from './main/interfaces';
import Copy from '../components/ui/icons/Copy';
import config from '../config.json'
import { MainService } from './main/services';

const apiUrl = config.apiUrl;

type WishScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Wish'>;
type WishScreenRouteProp = RouteProp<RootStackParamList, 'Wish'>;

interface WishScreenProps {
  route: WishScreenRouteProp;
  navigation: WishScreenNavigationProp;
}

function WishScreen({ route, navigation }: WishScreenProps) {
  const { staticData, localization } = useLocalization(); 
  const { wishId } = route.params;
  const wishService = new WishService();
  const mainService = new MainService();
  const authContext = useAuth();
  const { isGuest } = useAuth();

  const [ wish, setWish ] = useState<Wish>({});
  const [ user, setUser ] = useState<UserFields>({});
  const [ loading, setLoading ] = useState(true);
  const { setWishId, setCopyingMode } = useWishCreating();

  useFocusEffect(
    useCallback(() => {
      wishService.getWish(wishId, authContext).then(wishData => {
        setWish(wishData);
        setUser(wishData.author || {});
        setLoading(false);
      });
      mainService.viewWish(wishId, authContext);
    }, [])
  );

  if (loading) {
    return <></>
  }

  return (
    <ScreenContainer>
        <View style={wishCreatingStyles.wishConfirmationTop}>
          <BackButton/>
          {wish.is_your_wish ? <TouchableOpacity onPress={() => {
            setWishId(wish.id);
            navigation.navigate("WishCreating", { screen: "WishConfirmation" });
          }}>
            <Pen/>
          </TouchableOpacity> :
          <TouchableOpacity onPress={async () => {
            const result = await Share.share({
              title: wish.name,
              message: Platform.OS === "ios" ? wish.name : `${apiUrl}/api/wish/all-wishes/${wish.id}/`,
              url: `${apiUrl}/api/wish/all-wishes/${wish.id}/`
            });
          }}>
            <Upload width={18} height={18}/>
          </TouchableOpacity>
          }
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
                : wish.photo ?
                  <Image source={ {uri: wish.photo} } style={styles.wishImage} resizeMode={"cover"}/>
                  :
                  <View style={styles.wishStarsContainer}>
                    <DesignStars width={160} height={172}/>
                  </View>
                }
                <View style={mainStyles.buttonsContainer}>
                    {!wish.is_your_wish && !isGuest && <TouchableOpacity onPress={async () => {
                        const copyOfWish: Wish = {
                            name: wish.name,
                            description: wish.description,
                            photo: wish.photo,
                            video: wish.video,
                            link: wish.link,
                            price: wish.price,
                            currency: wish.currency,
                            image_size: wish.image_size
                        }
                        wishService.wishCreate(copyOfWish, authContext).then(createdWish => {
                            if (createdWish.premiumError) {
                              navigation.navigate("WishCreating", { screen: "Premium" });
                              return;
                            }
                            if (createdWish.id) {
                                setWishId(createdWish.id);
                                setCopyingMode(true);
                                navigation.navigate("WishCreating", { screen: "WishConfirmation" });
                            }
                        })
                    }}>
                        <View style={[mainStyles.smallButton, styles.smallButton]}><Copy /></View>
                    </TouchableOpacity>}
                </View>
            </View>
            {!wish.is_reservation && wish.is_user_create && !wish.is_your_wish && 
                <View style={styles.giftButton}>
                  <DesignedText bold={true} italic={true} style={styles.giftButtonText}>Подарувати!</DesignedText>
                </View>
            }
            {wish.author && <UserSmallInfo avatar={user?.photo || ""} name={user?.first_name || ""} nickname={user?.username || ""}/>}
            {wish.brand_author && <UserSmallInfo avatar={wish.brand_author.photo} name={wish.brand_author[`name_${localization}` as keyof Brand]} nickname={wish.brand_author.nickname} />}
            <View>
              <DesignedText bold={true}>{wish.name || ""}</DesignedText>
              <DesignedText>{wish.price || ""} {wish.currency || ""}</DesignedText>
            </View>
            <DesignedText size="small">{wish.description || ""}</DesignedText>
            {wish.link && <TouchableOpacity onPress={()=>{ openExternalLink(wish.link || "") }}>
              <DesignedText isUppercase={false} style={authStyles.underlined}>{staticData.wishScreen.buyByLink}</DesignedText>
            </TouchableOpacity>}
            {wish.is_user_create && <View style={styles.wishBottom}>
              <DesignedText size="small">{staticData.wishScreen.bottomText}</DesignedText>
              <View style={styles.wishBottomButtonsContainer}>
                <SubmitButton onPress={() => {}} width={120}><DesignedText size="small">{staticData.wishScreen.address}</DesignedText></SubmitButton>
                <SubmitButton onPress={() => {}} width={120}><DesignedText size="small">{staticData.wishScreen.post}</DesignedText></SubmitButton>
              </View>
            </View>}
        </View>
    </ScreenContainer>
  );
};

export default WishScreen;
