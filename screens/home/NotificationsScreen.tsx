import React, { useEffect, useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { RootStackParamList } from '../../components/RootNavigator';
import { ScrollView, View } from 'react-native';
import BackButton from '../../components/ui/buttons/BackButton';
import DesignedText from '../../components/ui/DesignedText';
import wishStyles from "../wishCreating/styles";
import { Notification, useNotifications } from '../../contexts/NotificationContext';
import { NotificationCard } from '../../components/Home/NotificationCard';
import styles from './styles';
import { HomeService } from './services';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import { ButtonCard } from '../../components/Home/ButtonCard';


type NotificationsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Notifications'>;

interface NotificationsScreenProps {
  navigation: NotificationsScreenNavigationProp;
}

function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const { staticData } = useLocalization();
  const { notifications: newNotifications, markAllAsRead } = useNotifications();
  const homeService = new HomeService();
  const authContext = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    markAllAsRead();
    homeService.getNotifications(authContext).then(result => {
      if (result.length > 0) {
        setNotifications(result);
      }
    });

    return () => {
      markAllAsRead();
    }
  }, []);

  return (
    <ScreenContainer>
        <View style={wishStyles.wishConfirmationTop}>
          <BackButton />
          <DesignedText italic={true}>{staticData.home.notificationsScreen.title}</DesignedText>
        </View>
        <ScrollView ref={scrollRef} contentContainerStyle={styles.notificationsContainer} onContentSizeChange={() => {scrollRef.current?.scrollToEnd()}}>
          {newNotifications.length === 0 && notifications.length === 0 && 
            <DesignedText size="small" style={{alignSelf: "center"}}>{staticData.home.notificationsScreen.emptyMessage}</DesignedText>
          }
          {notifications.map((notification, indx) => (
            notification.is_button ? 
              <ButtonCard isActive={false} message={notification} key={indx}/> :
              <NotificationCard notification={notification} key={indx}/>
          ))}
          {newNotifications.map((notification, indx) => (
            notification.is_button ? 
              <ButtonCard isActive={false} message={notification} key={indx}/> :
              <NotificationCard notification={notification} key={indx}/>
          ))}
        </ScrollView>
        <View style={[styles.notificationsContainer, { marginTop: 24 }]}>
          {newNotifications.length !== 0 ? 
            newNotifications.at(-1)?.button?.map((button, indx) => (
              <ButtonCard button={button} key={indx}/>
            )) :
            notifications.at(-1)?.button?.map((button, indx) => (
              <ButtonCard button={button} key={indx}/>
            ))
          }
        </View>
    </ScreenContainer>
  );
};

export default NotificationsScreen;