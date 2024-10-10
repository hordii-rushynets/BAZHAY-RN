import React, { useEffect, useRef } from 'react';
import { Animated, Easing, TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../components/navigationStacks/AuthStackScreen';
import { RouteProp } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';

type AccountConnectedScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'AccountConnected'>;
type AccountConnectedScreenRouteProp = RouteProp<AuthStackParamList, 'AccountConnected'>;

interface AccountConnectedScreenProps {
  route: AccountConnectedScreenRouteProp;
  navigation: AccountConnectedScreenNavigationProp;
}

function AccountConnectedScreen({ route, navigation }: AccountConnectedScreenProps) {
  const { token } = route.params;
  const { login, setIsAccountFilled } = useAuth();
  const { staticData } = useLocalization();

  const animatedOpacity1 = useRef(new Animated.Value(0)).current
  const animatedOpacity2 = useRef(new Animated.Value(0)).current

  const animation1 = useRef<Animated.CompositeAnimation | null>(null);
  const animation2 = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    animation1.current = Animated.timing(animatedOpacity1, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    animation2.current = Animated.timing(animatedOpacity2, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    animation1.current?.start(() => {
      animation2.current?.start(() => {
        setIsAccountFilled(token.is_already_registered);
        login(token.access, token.refresh)
      });
    });
  }, []);

  return (
    <TouchableOpacity onPress={() => { 
      animation1.current?.stop();
      animation2.current?.stop();
      setIsAccountFilled(token.is_already_registered); 
      login(token.access, token.refresh) 
    }} style={generalStyles.screenContainer}>
        <View style={generalStyles.centerContainer}>
            <Animated.View style={{ opacity: animatedOpacity1 }}>
              <Title style={styles.title}>{staticData.auth.accountConnectedScreen.title}</Title>
            </Animated.View>
            <Animated.View style={{ opacity: animatedOpacity2 }}>
              <DesignedText style={styles.accountConnectedText}>
              {staticData.auth.accountConnectedScreen.textFirstPart}
                  <DesignedText bold={true}> {staticData.auth.accountConnectedScreen.textBoldPart}</DesignedText>{staticData.auth.accountConnectedScreen.textCenterPart}
                  <DesignedText italic={true}> {staticData.auth.accountConnectedScreen.textFirstItalicPart} {"\n"} {staticData.auth.accountConnectedScreen.textSecondItalicPart}</DesignedText> {staticData.auth.accountConnectedScreen.textEndPart}
              </DesignedText>
            </Animated.View>
        </View>
    </TouchableOpacity>
  );
};

export default AccountConnectedScreen;
