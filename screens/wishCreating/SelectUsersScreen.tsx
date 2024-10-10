import React, { useCallback, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { RootStackParamList } from '../../components/RootNavigator';
import { WishService } from './services';
import { useWishCreating } from '../../contexts/WishCreatingContext';
import ScreenContainer from '../../components/ui/ScreenContainer';
import BackButton from '../../components/ui/buttons/BackButton';
import authStyles from "../auth/styles";
import styles from "./styles";
import DesignedText from '../../components/ui/DesignedText';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';
import { WishAccessModel } from './interfaces';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalization } from '../../contexts/LocalizationContext';
import Loader from '../../components/ui/Loader';
import { MainService } from '../main/services';
import { Subscription } from '../main/interfaces';
import CheckBox from '../../components/ui/inputs/CheckBox';
import { UserSmallInfo } from '../../components/UserSmallInfo';

type SelectUsersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SelectUsers'>;

interface SelectUsersScreenProps {
  navigation: SelectUsersScreenNavigationProp;
}

function SelectUsersScreen({ navigation }: SelectUsersScreenProps) {
  const { staticData } = useLocalization();
  const wishService = new WishService();
  const mainService = new MainService();
  const authContext = useAuth();
  const [accesses, setAccesses] = useState<WishAccessModel[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [nextUrl, setNextUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { wishId } = useWishCreating();

  useFocusEffect(
    useCallback(() => {
      mainService.getSubscription("subscribers", authContext).then(paginatedResults => {
        if (paginatedResults.count >= 0) {
          setSubscriptions(paginatedResults.results);
          if (paginatedResults.next) {
            setNextUrl(paginatedResults.next);
          }
        }
      });
      wishService.getAccessToWish(wishId || "", authContext).then(accesses => {
        setAccesses(accesses);
        if (accesses.length > 0) {
          setSelectedUsers(accesses[0].users.map(user => user.user.id || ""));
        }
      });
    }, [])
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;

    const isCloseToBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y < 300;

    if (isCloseToBottom && nextUrl !== "") {
      mainService.getSubscription("subscribers", authContext, nextUrl).then(paginatedResults => {
        if (paginatedResults.count > 0) {
          setSubscriptions(prevSubscriptions => [...prevSubscriptions, ...paginatedResults.results]);
          setNextUrl(paginatedResults.next || "");
        }
      });
    }
  }

  return (
    <ScreenContainer>
      {loading && <Loader />}
        <View style={styles.wishConfirmationTop}>
          <BackButton/>
          <DesignedText italic={true}>{staticData.wishCreating.selectUsersScreen}</DesignedText>
        </View>
        <ScrollView onScroll={handleScroll} style={{ marginTop: 24 }} contentContainerStyle={{ gap: 8 }}>
            {subscriptions.map(subscription => (
                <CheckBox key={subscription.id} checked={ selectedUsers.includes(subscription.user?.id || "") } onChange={ () => { 
                  if (selectedUsers.includes(subscription.user?.id || "")) {
                    setSelectedUsers(prevUsers => prevUsers.filter(userId => userId !== subscription.user?.id || ""))
                  }
                  else {
                    setSelectedUsers(prevUsers => [...prevUsers, subscription.user?.id || ""]) 
                  }
                } }>
                    <UserSmallInfo avatar={subscription.user?.photo || ""} name={subscription.user?.first_name || ""} nickname={subscription.user?.username || ""} size="small"/>
                </CheckBox>
            ))}
        </ScrollView>
        <SubmitButton 
            onPress={() => {
              wishService.setAccessToWish(wishId || "", selectedUsers, accesses.length > 0 ? "update" : "create", authContext, accesses.length > 0 ? accesses[0].id : "").then(success => {
                if (success) {
                  wishService.wishUpdate({ access_type: "selected_users" }, wishId||"", authContext).then(success => {
                    setLoading(false);
                    if (success) {
                      navigation.navigate("WishConfirmation")
                    }
                    else {
                      navigation.navigate("Premium")
                    }
                  })
                }
                else {
                  navigation.navigate("Premium")
                }
              });
            }}
            width={200}
            style={authStyles.gridButton}
        >{staticData.wishCreating.wishConfirmationScreen.button}</SubmitButton>
    </ScreenContainer>
  );
};

export default SelectUsersScreen;
