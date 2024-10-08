import React, { useCallback, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { MainStackParamList } from '../../components/navigationStacks/MainStackScreen';
import SearchInput from '../../components/ui/inputs/SearchInput';
import { NativeScrollEvent, NativeSyntheticEvent, Touchable, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import styles from './styles';
import wishStyles from "../wishCreating/styles"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Subscription, userType } from './interfaces';
import { MainService } from './services';
import { useAuth } from '../../contexts/AuthContext';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import SubscriptionCard from '../../components/Main/SubscriptionCard';
import { AccountService } from '../auth/services';
import { UserFields } from '../auth/interfaces';
import Connection from '../../components/ui/icons/Connection';
import UserCard from '../../components/Main/UserCard';
import { ProfileStackParamList } from '../../components/navigationStacks/ProfileStackScreen';
import BackButton from '../../components/ui/buttons/BackButton';
import SubmitButton from '../../components/ui/buttons/SubmitButton';

type CommunityScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Community'> | StackNavigationProp<ProfileStackParamList, 'ProfileCommunity'>;
type CommunityScreenRouteProp = RouteProp<MainStackParamList, 'Community'> | RouteProp<ProfileStackParamList, 'ProfileCommunity'>;

interface CommunityScreenProps {
  navigation: CommunityScreenNavigationProp;
  route: CommunityScreenRouteProp;
}

function CommunityScreen({ navigation, route }: CommunityScreenProps) {
  const { mode } = route.params || { mode: undefined };
  const [searchPrompt, setSearchPrompt] = useState("");
  const [userType, setUserType] = useState<userType>(mode || "subscribers");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [nextUrl, setNextUrl] = useState("");
  const [users, setUsers] = useState<UserFields[]>([]);
  const [nextUsersUrl, setNextUsersUrl] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const mainService = new MainService();
  const accountService = new AccountService();
  const authContext = useAuth();
  const { isGuest, logout } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchPrompt !== "") {
        accountService.getUsers(searchPrompt, authContext).then(paginatedUsers => {
          if (paginatedUsers.count !== 0) {
            setUsers(paginatedUsers.results);
            if (paginatedUsers.next) {
              setNextUsersUrl(paginatedUsers.next);
            }
          }
        });
      }
      else {
        setUsers([]);
      }
    }, 500)

    return () => clearTimeout(timeout);
  }, [searchPrompt, searchTrigger])

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;

    const isCloseToBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y < 300;

    if (isCloseToBottom && nextUrl !== "") {
      mainService.getSubscription(userType, authContext, nextUrl).then(paginatedResults => {
        if (paginatedResults.count > 0) {
          setSubscriptions(prevSubscriptions => [...prevSubscriptions, ...paginatedResults.results]);
          setNextUrl(paginatedResults.next || "");
        }
      });
    }
  }

  const handleUserScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;

    const isCloseToBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y < 300;

    if (isCloseToBottom && nextUsersUrl !== "") {
      accountService.getUsers(searchPrompt, authContext, nextUsersUrl).then(paginatedUsers => {
        if (paginatedUsers.count !== 0) {
          setUsers(prevUsers => [...prevUsers, ...paginatedUsers.results]);
          setNextUsersUrl(paginatedUsers.next || "");
        }
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      mainService.getSubscription(userType, authContext).then(paginatedResults => {
        if (paginatedResults.count >= 0) {
          setSubscriptions(paginatedResults.results);
          if (paginatedResults.next) {
            setNextUrl(paginatedResults.next);
          }
        }
      });
    }, [userType])
  );

  return (
    <ScreenContainer>
        {mode && <View style={wishStyles.wishConfirmationTop}>
          <BackButton/>
          <DesignedText italic={true}>{userType === "subscribers" ? "підписники" : "підписки"}</DesignedText>
        </View>}
        <SearchInput placeholder={"Знайди близьких"} value={searchPrompt} error={undefined} onChange={(text) => {setSearchPrompt(text)}} onFocus={() => {setSearchTrigger(!searchTrigger); setIsSearchActive(true)}} onBlur={() => {setUsers([]); setIsSearchActive(false)}}/>
        {!isSearchActive ?
          <>
            <View style={styles.subscriptionsChoosing}>
              <View style={[styles.subscriptionsOption, userType === "subscribers" && styles.subscriptionsOptionActive]}>
                <TouchableOpacity onPress={() => {setUserType("subscribers")}}>
                  <DesignedText size="small">
                    Підписники
                  </DesignedText>
                </TouchableOpacity>
              </View>
              <View style={[styles.subscriptionsOption, userType === "subscriptions" && styles.subscriptionsOptionActive]}>
                <TouchableOpacity onPress={() => {setUserType("subscriptions")}}>
                  <DesignedText size="small">
                    Підписки
                  </DesignedText>
                </TouchableOpacity>
              </View>
            </View>
            {subscriptions.length === 0 ? 
              <View style={{marginVertical: "auto", alignSelf: "center", gap: 16}}>
                <DesignedText style={{ textAlign: "center" }}>У вас ще немає {userType === "subscribers" ? "підписників" : "підписок"}</DesignedText>
                {isGuest && 
                  <SubmitButton onPress={() => {
                    logout();
                  }} width={"auto"} height={32} textStyle={{ fontSize: 12 }}>Увійти в обліковий запис</SubmitButton>
                }
              </View>
            : 
            <ScrollView contentContainerStyle={styles.usersContainer} onScroll={handleScroll}>
              {subscriptions.map((subscription => <SubscriptionCard subscription={subscription} onSubscribtionUnsubscribe={() => {
                setSubscriptions(prevSubscriptions => [...prevSubscriptions.filter(sub => sub.id !== subscription.id)]);
              }} key={subscription.id}/>))}
            </ScrollView>}
          </>
        : 
        <View>
          <View style={styles.addFriendsButton}>
            <View style={styles.smallButton}>
              <Connection />
            </View>
            <View><DesignedText size="small">додати друзів</DesignedText></View>
          </View>
          <ScrollView contentContainerStyle={styles.usersContainer} onScroll={handleUserScroll} scrollEventThrottle={16} keyboardShouldPersistTaps="always">
              {users.map(user => <UserCard user={user} key={user.id}/>)}
          </ScrollView>
        </View>}
    </ScreenContainer>
  );
};

export default CommunityScreen;
