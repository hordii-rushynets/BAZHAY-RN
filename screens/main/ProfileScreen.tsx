import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, TouchableOpacity, View } from 'react-native';
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
import { UserFields } from '../auth/interfaces';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { AccountService } from '../auth/services';
import { useAuth } from '../../contexts/AuthContext';
import { fromServerDateToFrontDate } from '../../utils/helpers';
import { WishService } from '../wishCreating/services';
import { useLocalization } from '../../contexts/LocalizationContext';
import { RootStackParamList } from '../../components/RootNavigator';
import BackButton from '../../components/ui/buttons/BackButton';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { MainService } from './services';
import { usePopUpMessageContext } from '../../contexts/PopUpMessageContext';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'> | StackNavigationProp<RootStackParamList, 'CommunityProfile'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'> | RouteProp<RootStackParamList, 'CommunityProfile'>

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

function ProfileScreen({ navigation, route }: ProfileScreenProps) {
  const { userId } = route.params || { userId: undefined };
  const { staticData } = useLocalization();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [user, setUser] = useState<UserFields>({});
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState("");
  const accountService = new AccountService();
  const wishService = new WishService();
  const mainService = new MainService();
  const authContext = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [sortings, setSortings] = useState<{[key: string]: string}>({
    "user": userId || "",
    "price": "",
    "created": ""
  });
  const { setIsOpen, setText, setButtonText, setButtonAction, setWidth, setExitAction } = usePopUpMessageContext();
  const { logout, isGuest } = useAuth();

  const scrollViewRef = useRef<ScrollView>(null);

  const renderItem = ({ item, i }: {item: unknown, i: number}) => (
    <WishCard wish={item as Wish} key={i}/>
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setIsScrolled(scrollPosition > 0);
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;

    const isCloseToBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y < 1000;

    if (isCloseToBottom && !isFetching && nextUrl !== "") {
      setIsFetching(true);
      if (userId) {
        wishService.getWishes(sortings, authContext, nextUrl).then(response => {
          setWishes(prevWishes => [...prevWishes, ...response.results]);
          setNextUrl(response.next || "");
        }).finally(() => {
          setIsFetching(false);
        });
      }
      else {
        wishService.getMyWishes(sortings, authContext, nextUrl).then(response => {
          setWishes(prevWishes => [...prevWishes, ...response.results]);
          setNextUrl(response.next || "");
        }).finally(() => {
          setIsFetching(false);
        });
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      accountService.getUser(authContext, userId).then(userData => {
        if (!userData.haveErrors) {
          setUser(userData);
        }
        else {
          setText("Ти увійшов(ла) як гість. Увійди в свій обліковий запис, щоб переглянути профіль");
          setButtonText("Увійти в обліковий запис");
          setWidth(343);
          setExitAction(() => () => { setExitAction(() => () => { }); navigation.navigate("Home"); });
          setButtonAction(() => () => { setExitAction(() => () => { }); logout(); setIsOpen(false);});
          setIsOpen(true);
        }
      });
      if (userId) {
        wishService.getWishes(sortings, authContext).then(response => {
          setWishes(response.results);
          setNextUrl(response.next || "");
          setLoading(false);
        })
      }
      else {
        wishService.getMyWishes(sortings, authContext).then(response => {
          setWishes(response.results);
          setNextUrl(response.next || "");
          setLoading(false);
        })
      }
    }, [sortings, updateTrigger])
  );

  useEffect(() => {
    setSortings({
      "user": userId || "",
      "price": "",
      "created": ""
    });
  }, [userId]);

  if (loading) {
    return <></>
  }

  return (
    <ScreenContainer>
        {userId && <View style={styles.backButtonContainer}>
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
        <View style={[styles.avatarContainer, isScrolled && styles.smallAvatarContainer]}>
            {user.photo ? <Image source={ { uri: user.photo } } style={styles.avatar}/> : 
            isScrolled ? <Profile width={24} height={24}/> : <BigProfile />}
        </View>
        <View style={styles.profileInfoContainer}>
          <DesignedText size={isScrolled ? "small" : "medium"}>{user.first_name || staticData.main.profileScreen.namePlaceholder}</DesignedText>
          <DesignedText size="small" isUppercase={false} style={styles.grayText}>@{user.username || "nickname"}</DesignedText>
          {!isScrolled && <><View style={styles.descriptionContainer}>
            <DesignedText size="small">{user.about_user || staticData.main.profileScreen.aboutPlaceholder}</DesignedText>
            {((userId && user.view_birthday) || (!userId)) && <DesignedText size="small">{user.birthday ? fromServerDateToFrontDate(user.birthday) : ""}</DesignedText>}
          </View>
          {userId && <View style={styles.addressesContainer}>
            <SubmitButton height={32} width={120} onPress={() => {}} textStyle={{fontSize: 12}}>Адреса</SubmitButton>
            <SubmitButton height={32} width={120} onPress={() => {}} textStyle={{fontSize: 12}}>Пошта</SubmitButton>
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
          }} style={{marginTop: 24}} textStyle={{fontSize: 12, textTransform: "none"}}>{user.is_subscribed ? "Відстежується" : "Стежити"}</SubmitButton>}
          </>}
        </View>
        <View style={styles.profileWishesContainer}>
          <SortingButton sortings={sortings} setSortings={setSortings}/>
          <ScrollView contentContainerStyle={{paddingBottom: 350}} onScroll={handleScroll} ref={scrollViewRef}>
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
          </ScrollView>
        </View>
    </ScreenContainer>
  );
};

export default ProfileScreen;
