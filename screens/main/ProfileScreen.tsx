import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { Animated, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, TouchableOpacity, View } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import Upload from '../../components/ui/icons/Upload';
import Settings from '../../components/ui/icons/Settings';
import styles from './styles';
import Profile from '../../components/ui/icons/Profile';
import BigProfile from '../../components/ui/icons/BigProfile';
import DesignedText from '../../components/ui/DesignedText';
import SortingButton from '../../components/Main/SortingButton';
import WishCard from '../../components/Main/WishCard';
import { Wish } from '../wishCreating/interfaces';
import PremiumProfileAdvert from '../../components/Main/PremiumProfileAdvert';
import { Address, Post, UserFields } from '../auth/interfaces';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { AccountService } from '../auth/services';
import { useAuth } from '../../contexts/AuthContext';
import { fromServerDateToFrontDate, proccessNextUrl } from '../../utils/helpers';
import { WishService } from '../wishCreating/services';
import { useLocalization } from '../../contexts/LocalizationContext';
import { RootStackParamList } from '../../components/RootNavigator';
import BackButton from '../../components/ui/buttons/BackButton';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { MainService } from './services';
import { usePopUpMessageContext } from '../../contexts/PopUpMessageContext';
import Loader from '../../components/ui/Loader';
import { useMessageContext } from '../../contexts/MessageContext';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'> | StackNavigationProp<RootStackParamList, 'CommunityProfile'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'> | RouteProp<RootStackParamList, 'CommunityProfile'>

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

function ProfileScreen({ navigation, route }: ProfileScreenProps) {
  const { userId } = route.params || { userId: undefined };
  const { staticData } = useLocalization();
  const [user, setUser] = useState<UserFields>({});
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState("");
  const accountService = new AccountService();
  const wishService = new WishService();
  const mainService = new MainService();
  const authContext = useAuth();
  const [address, setAddress] = useState<Address>();
  const [post, setPost] = useState<Post>();
  const [isFetching, setIsFetching] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [sortings, setSortings] = useState<{[key: string]: string}>({
    "user": userId || "",
    "price": "",
    "created": "",
    "is_fully_created": "true"
  });
  const { setIsOpen, setText, setButtonText, setButtonAction, setWidth, setExitAction } = usePopUpMessageContext();
  const { setIsOpen: setMessageOpen, setText: setMessageText } = useMessageContext();
  const { logout, isGuest } = useAuth();

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const avatarSize = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.4],
    extrapolate: 'clamp',
  });

  const translateBlock = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -60],
    extrapolate: 'clamp',
  });

  const translateText = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [12, -30],
    extrapolate: 'clamp',
  });

  const fontSize = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.75],
    extrapolate: 'clamp',
  });

  const translateUserName = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -10],
    extrapolate: 'clamp',
  });

  const translateScrollBlock = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -65],
    extrapolate: 'clamp',
  });

  const renderItem = ({ item, i }: {item: unknown, i: number}) => (
    <WishCard wish={item as Wish} key={i}/>
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;

    const isCloseToBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y < 1000;

    if (isCloseToBottom && !isFetching && nextUrl !== "") {
      setIsFetching(true);
      if (userId) {
        wishService.getWishes(sortings, authContext, nextUrl).then(response => {
          setWishes(prevWishes => [...prevWishes, ...response.results]);
          setNextUrl(proccessNextUrl(response.next || ""));
        }).finally(() => {
          setIsFetching(false);
        });
      }
      else {
        wishService.getMyWishes(sortings, authContext, nextUrl).then(response => {
          setWishes(prevWishes => [...prevWishes, ...response.results]);
          setNextUrl(proccessNextUrl(response.next || ""));
        }).finally(() => {
          setIsFetching(false);
        });
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      accountService.getUser(authContext, userId).then(userData => {
        if (!userData.haveErrors) {
          setUser(userData);
          if (userId) {
            accountService.getAddress(authContext, userData.is_addresses || "").then(address => {
              setAddress(address);
            })
            accountService.getPost(authContext, userData.is_post_addresses || "").then(post => {
              setPost(post);
            })
          }
        }
        else {
          setText(staticData.main.profileScreen.guestMessage);
          setButtonText(staticData.main.profileScreen.guestMessageButton);
          setWidth(343);
          setExitAction(() => () => { setExitAction(() => () => { }); navigation.navigate("Home"); });
          setButtonAction(() => () => { setExitAction(() => () => { }); logout(); setIsOpen(false);});
          setIsOpen(true);
        }
      });
      if (userId) {
        wishService.getWishes(sortings, authContext).then(response => {
          setWishes(response.results);
          setNextUrl(proccessNextUrl(response.next || ""));
          setLoading(false);
        })
      }
      else {
        wishService.getMyWishes(sortings, authContext).then(response => {
          setWishes(response.results);
          setNextUrl(proccessNextUrl(response.next || ""));
          setLoading(false);
        })
      }
    }, [sortings, updateTrigger])
  );

  useEffect(() => {
    setSortings({
      "user": userId || "",
      "price": "",
      "created": "",
      "is_fully_created": "true"
    });
  }, [userId]);

  return (
    <ScreenContainer>
        {loading && <Loader />}
        {userId && <View style={[styles.backButtonContainer]}>
          <BackButton link="Community"/>
        </View>}
        <View style={styles.settingsContainer}>
          <TouchableOpacity>
            <Upload />
          </TouchableOpacity>
          {!userId && <TouchableOpacity onPress={() => { navigation.navigate("ProfileScreens", { screen: "Settings" }) }}>
            <Settings />
          </TouchableOpacity>}
        </View>
        <Animated.View style={{ alignItems: "center", zIndex: -1, transform: [{ translateY: translateBlock }] }}>
          <Animated.View style={[styles.avatarContainer, { transform: [{ scale: avatarSize }] }]}>
              {user.photo ? <Image source={ { uri: user.photo } } style={styles.avatar}/> : 
              <BigProfile />}
          </Animated.View>
          <Animated.View style={{ transform: [{ translateY: translateText }] }}>
            <Animated.Text style={{ 
              textAlign: "center",
              textTransform: "uppercase",
              fontFamily: "Inter-Regular",
              fontSize: 16,
              transform: [{ scale: fontSize }]
            }}>{user.first_name || staticData.main.profileScreen.namePlaceholder}</Animated.Text>
            <Animated.Text style={[styles.grayText, {
              textAlign: "center",
              fontFamily: "Inter-Regular",
              fontSize: 12,
              transform: [{ translateY: translateUserName }]
            }]}>@{user.username || "nickname"}</Animated.Text>
          </Animated.View>
        </Animated.View>
        <Animated.ScrollView stickyHeaderIndices={[1]} style={{ transform: [{ translateY: translateScrollBlock }] }} contentContainerStyle={{paddingBottom: 350}} onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollY },
              },
            },
          ],
          {
            useNativeDriver: true,
            listener: handleScroll,
          }
        )} ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          <View style={styles.profileInfoContainer}>
            <View style={styles.descriptionContainer}>
              <DesignedText size="small">{user.about_user || staticData.main.profileScreen.aboutPlaceholder}</DesignedText>
              {((userId && user.view_birthday) || (!userId)) && <DesignedText size="small">{user.birthday ? fromServerDateToFrontDate(user.birthday) : ""}</DesignedText>}
            </View>
            {userId && <View style={styles.addressesContainer}>
              {user.is_addresses && 
                <SubmitButton height={32} width={120} onPress={() => {
                  if (address) {
                    navigation.navigate("ProfileScreens", { screen: "AddressOrPost", params: { address: address } })
                  }
                  else {
                    setText(staticData.addressAccess.text);
                    setButtonText(staticData.addressAccess.buttonText);
                    setButtonAction(() => () => {
                      accountService.requestAddressAccess(user.id || "", authContext).then(success => {
                        if (success) {
                          setMessageText(staticData.addressAccess.message);
                          setMessageOpen(true);
                          setIsOpen(false);
                        }
                      })
                    });
                    setExitAction(() => () => {
                      setIsOpen(false);
                    });
                    setIsOpen(true);
                  }
                }} textStyle={{fontSize: 12}}>{staticData.main.profileScreen.address}</SubmitButton>
              }
              {user.is_post_addresses && 
                <SubmitButton height={32} width={120} onPress={() => {
                  if (post) {
                    navigation.navigate("ProfileScreens", { screen: "AddressOrPost", params: { post: post } })
                  }
                  else {
                    setText(staticData.postAccess.text);
                    setButtonText(staticData.postAccess.buttonText);
                    setButtonAction(() => () => {
                      accountService.requestPostAccess(user.id || "", authContext).then(success => {
                        if (success) {
                          setMessageText(staticData.postAccess.message);
                          setMessageOpen(true);
                          setIsOpen(false);
                        }
                      })
                    });
                    setExitAction(() => () => {
                      setIsOpen(false);
                    });
                    setIsOpen(true);
                  }
                }} textStyle={{fontSize: 12}}>{staticData.main.profileScreen.post}</SubmitButton>
              }
            </View>}
            <View style={styles.subscribersContainer}>
              <TouchableOpacity onPress={() => {!userId && navigation.navigate("ProfileScreens", { screen: "ProfileCommunity", params: { mode: "subscribers" } })}}><View style={styles.subcribeContainer}><DesignedText size="small">{user.subscriber || "0"}</DesignedText><DesignedText size="small">{staticData.main.profileScreen.subscribers}</DesignedText></View></TouchableOpacity>
              <TouchableOpacity onPress={() => {!userId && navigation.navigate("ProfileScreens", { screen: "ProfileCommunity", params: { mode: "subscriptions" } })}}><View style={styles.subcribeContainer}><DesignedText size="small">{user.subscription || "0"}</DesignedText><DesignedText size="small">{staticData.main.profileScreen.subscriptions}</DesignedText></View></TouchableOpacity>
            </View>
            {userId && !isGuest && <SubmitButton height={32} width={120} onPress={() => {
              if (user.is_subscribed) {
                mainService.unsubscribe(user.id || "", authContext).then(success => {
                  if (success) {
                    setUpdateTrigger(!updateTrigger);
                  }
                });
              }
              else {
                mainService.subscribe(user.id || "", authContext).then(success => {
                  if (success) {
                    setUpdateTrigger(!updateTrigger);
                  }
                });
              }
            }} style={{marginTop: 24}} textStyle={{fontSize: 12, textTransform: "none"}}>{user.is_subscribed ? staticData.main.subscriptionCard.unsubscribe : staticData.main.subscriptionCard.subscribe}</SubmitButton>}
          </View>
          <View style={styles.profileWishesContainer}>
            {!userId && <View style={[styles.subscriptionsChoosing, { position: "absolute", width: 229 }]}>
              <View style={[styles.subscriptionsOption, sortings["is_fully_created"] === "true" && styles.subscriptionsOptionActive]}>
                <TouchableOpacity onPress={() => { setSortings({...sortings, "is_fully_created": "true"}) }}>
                  <DesignedText size="small">
                    {staticData.main.profileScreen.wishes}
                  </DesignedText>
                </TouchableOpacity>
              </View>
              <View style={[styles.subscriptionsOption, sortings["is_fully_created"] === "false" && styles.subscriptionsOptionActive]}>
                <TouchableOpacity onPress={() => { setSortings({...sortings, "is_fully_created": "false"}) }}>
                  <DesignedText size="small">
                    {staticData.main.profileScreen.drafts}
                  </DesignedText>
                </TouchableOpacity>
              </View>
            </View>}
            <SortingButton sortings={sortings} setSortings={setSortings}/>
          </View>
          <MasonryList
            data={wishes}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.wishesContainer}
          />
          {!user.is_premium && <PremiumProfileAdvert onButtonPress={() => {
            setLoading(true);
            accountService.tryPremium(authContext).then(success => {
              if (success) {
                setUpdateTrigger(!updateTrigger);
              }
              setLoading(false);
            })
          }}/>}
        </Animated.ScrollView>
    </ScreenContainer>
  );
};

export default ProfileScreen;
