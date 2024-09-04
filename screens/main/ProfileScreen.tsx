import React, { useCallback, useEffect, useRef, useState } from 'react';
import Title from '../../components/ui/Title';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, TouchableOpacity, View } from 'react-native';
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
import { useFocusEffect } from '@react-navigation/native';
import { AccountService } from '../auth/services';
import { useAuth } from '../../contexts/AuthContext';
import { fromServerDateToFrontDate } from '../../utils/helpers';
import { WishService } from '../wishCreating/services';
import { useLocalization } from '../../contexts/LocalizationContext';
import { RootStackParamList } from '../../components/RootNavigator';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { staticData } = useLocalization();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [user, setUser] = useState<UserFields>({});
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState("");
  const accountService = new AccountService();
  const wishService = new WishService();
  const authContext = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [sortings, setSortings] = useState<{[key: string]: string}>({
    "price": "",
    "created": ""
  });

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
      wishService.getMyWishes(sortings, authContext, nextUrl).then(response => {
        setWishes(prevWishes => [...prevWishes, ...response.results]);
        setNextUrl(response.next || "");
      }).finally(() => {
        setIsFetching(false);
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      accountService.getUser(authContext).then(userData => {
        setUser(userData);
      });
      wishService.getMyWishes(sortings, authContext).then(response => {
        setWishes(response.results);
        setNextUrl(response.next || "");
        setLoading(false);
      })
    }, [sortings])
  );

  if (loading) {
    return <></>
  }

  return (
    <ScreenContainer>
        <View style={styles.settingsContainer}>
          <TouchableOpacity>
            <Upload />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate("ProfileScreens", { screen: "Settings" }) }}>
            <Settings />
          </TouchableOpacity>
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
            <DesignedText size="small">{user.birthday ? fromServerDateToFrontDate(user.birthday) : ""}</DesignedText>
          </View>
          <View style={styles.subscribersContainer}>
            <View style={styles.subcribeContainer}><DesignedText size="small">{user.subscriber || "0"}</DesignedText><DesignedText size="small">{staticData.main.profileScreen.subscribers}</DesignedText></View>
            <View style={styles.subcribeContainer}><DesignedText size="small">{user.subscription || "0"}</DesignedText><DesignedText size="small">{staticData.main.profileScreen.subscriptions}</DesignedText></View>
          </View></>}
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
            <PremiumProfileAdvert />
          </ScrollView>
        </View>
    </ScreenContainer>
  );
};

export default ProfileScreen;
