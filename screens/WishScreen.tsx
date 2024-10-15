import React, { useCallback, useState } from 'react';
import ScreenContainer from '../components/ui/ScreenContainer';
import { Image, Platform, Share, View, TouchableOpacity } from 'react-native';
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
import Loader from '../components/ui/Loader';
import { usePopUpWithTwoOptionsContext } from '../contexts/PopUpWithTwoOptionsContext';
import { useMessageContext } from '../contexts/MessageContext';
import Stick from '../components/ui/icons/Stick';
import Fulfilled from '../components/ui/icons/Fulfilled';
import NotFulfilled from '../components/ui/icons/NotFulfilled';
import { usePopUpMessageContext } from '../contexts/PopUpMessageContext';

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
  const { setIsOpen, setText, setOnAccept, setOnCancel } = usePopUpWithTwoOptionsContext();
  const { setIsOpen: setMessageOpen, setText: setMessageText } = useMessageContext();
  const { setIsOpen: setPopUpOpen, setText: setPopUpText, setButtonText: setPopUpButtonText, setExitAction, setButtonAction } = usePopUpMessageContext();

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

  return (
    <ScreenContainer>
      {loading && <Loader />}
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
            <View style={[styles.wishImageContainer, { width: 164, aspectRatio: wish.image_size || 3/4 }]} >
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
                    {!wish.is_fulfilled && !isGuest && wish.is_user_create && wish.is_reservation && !wish.is_me_candidates_to_reservation &&
                        <TouchableOpacity onPress={() => {
                            if (wish.is_reserved_by_me) {
                                setMessageText(staticData.firstTypeReservationButton);
                                setMessageOpen(true);
                            }
                            else if (wish.is_your_wish && wish.author?.is_premium) {
                                wishService.getReservations(wish.id || "", authContext).then(reservation => {
                                    if (reservation.wish) {
                                        setMessageText(`${staticData.secondTypeReservationButton}${reservation.selected_user?.username}`);
                                        setMessageOpen(true);
                                    }
                                })
                            }
                            else if (wish.is_your_wish && !wish.author?.is_premium) {
                                setMessageText(staticData.thirdTypeReservationButton);
                                setMessageOpen(true);
                            }
                            else {
                                setMessageText(staticData.fourthTypeReservationButton);
                                setMessageOpen(true);
                            }
                        }}>
                            <View style={[mainStyles.smallButton, styles.smallButton, { alignItems: "flex-start", justifyContent: "flex-start", paddingLeft: 10, paddingTop: 8}]}><Stick /></View>
                        </TouchableOpacity>
                    }
                    {wish.is_fulfilled && wish.is_user_create &&
                        <TouchableOpacity onPress={() => {
                            setMessageText(staticData.fulfilledMessage);
                            setMessageOpen(true);
                        }}>
                            <View style={[mainStyles.smallButton, styles.smallButton]}><Fulfilled /></View>
                        </TouchableOpacity>
                    }
                    {!wish.is_fulfilled && wish.is_your_wish &&
                        <TouchableOpacity onPress={() => {
                            setText(
                              <DesignedText size="small" style={{ textAlign: "center" }}><DesignedText size="small" bold={true}>{staticData.doesHelped.bold}</DesignedText> {staticData.doesHelped.first} <DesignedText size="small" italic={true}>{staticData.doesHelped.italic}</DesignedText> {staticData.doesHelped.second}</DesignedText>
                            )
                            setOnCancel(() => () => {
                                setIsOpen(false);
                            });
                            setOnAccept(() => () => {
                                wishService.markWishAsFulfilled(wish?.id || "", authContext).then(success => {
                                  if (success) {
                                    setIsOpen(false);
                                    setMessageText(staticData.yourWishFulfilled);
                                    setMessageOpen(true);
                                    setWish({...wish, is_fulfilled: true})
                                  }
                                });
                            });
                            setIsOpen(true);
                        }}>
                            <View style={[mainStyles.smallButton, styles.smallButton]}><NotFulfilled /></View>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            {!wish.is_fulfilled && !wish.is_reservation && wish.is_user_create && !wish.is_your_wish && !wish.is_me_candidates_to_reservation &&
              <TouchableOpacity style={styles.giftButton} onPress={() => {
                setText(
                  <DesignedText size="small" style={{ textAlign: "center" }}>{staticData.doYouWantToFulfillWish.firstPart} <DesignedText size="small" italic={true}>{staticData.doYouWantToFulfillWish.italicPart}</DesignedText> {staticData.doYouWantToFulfillWish.secondPart}</DesignedText>
                );
                setOnCancel(() => () => {
                    setIsOpen(false);
                });
                setOnAccept(() => () => {
                    wishService.reserveWish(wish.id || "", authContext).then(success => {
                        if (success) {
                            setIsOpen(false);
                            if (wish.author?.is_premium) {
                                setWish({...wish, is_me_candidates_to_reservation: true})
                                setMessageText(staticData.fulfillWishPremiumMessage);
                                setMessageOpen(true);
                            }
                            else {
                                setWish({...wish, is_reservation: true})
                                setMessageText(staticData.fulfillWishNotPremiumMessage);
                                setMessageOpen(true);
                            }
                        }
                    });
                });
                setIsOpen(true);
              }}>
                <DesignedText bold={true} italic={true} style={styles.giftButtonText}>{staticData.wishScreen.giftButton}</DesignedText>
              </TouchableOpacity>
            }
            {wish.author && <UserSmallInfo avatar={user?.photo || ""} name={user?.first_name || ""} nickname={user?.username || ""}/>}
            {wish.brand_author && <UserSmallInfo avatar={wish.brand_author.photo} name={wish.brand_author[`name_${localization}` as keyof Brand] || ""} nickname={wish.brand_author.nickname} />}
            <View>
              <DesignedText bold={true}>{wish[`name_${localization}` as keyof Wish] as string || wish.name || ""}</DesignedText>
              <DesignedText>{wish.price || ""} {wish.currency || ""}</DesignedText>
            </View>
            <DesignedText size="small">{wish[`description_${localization}` as keyof Wish] as string || wish.description || ""}</DesignedText>
            {wish.link && <TouchableOpacity onPress={()=>{ openExternalLink(wish.link || "") }}>
              <DesignedText isUppercase={false} style={authStyles.underlined}>{staticData.wishScreen.buyByLink}</DesignedText>
            </TouchableOpacity>}
            {wish.is_user_create && <View style={styles.wishBottom}>
              <DesignedText size="small">{staticData.wishScreen.bottomText}</DesignedText>
              <View style={styles.wishBottomButtonsContainer}>
                <SubmitButton onPress={() => {
                  setPopUpText("Для того, щоб подивитись адресу цього користувача, потрібен дозвіл");
                  setPopUpButtonText("Запросити дозвіл");
                  setButtonAction(() => () => {
                    setMessageText("запит на дозвіл перегляду адреси надіслано");
                    setMessageOpen(true);
                    setPopUpOpen(false);
                  });
                  setExitAction(() => () => {
                    setPopUpOpen(false);
                  });
                  setPopUpOpen(true);
                }} width={120}><DesignedText size="small">{staticData.wishScreen.address}</DesignedText></SubmitButton>
                <SubmitButton onPress={() => {
                  setPopUpText("Для того, щоб подивитись пошту цього користувача, потрібен дозвіл");
                  setPopUpButtonText("Запросити дозвіл");
                  setButtonAction(() => () => {
                    setMessageText("запит на дозвіл перегляду пошти надіслано");
                    setMessageOpen(true);
                    setPopUpOpen(false);
                  });
                  setExitAction(() => () => {
                    setPopUpOpen(false);
                  });
                  setPopUpOpen(true);
                }} width={120}><DesignedText size="small">{staticData.wishScreen.post}</DesignedText></SubmitButton>
              </View>
            </View>}
        </View>
    </ScreenContainer>
  );
};

export default WishScreen;
