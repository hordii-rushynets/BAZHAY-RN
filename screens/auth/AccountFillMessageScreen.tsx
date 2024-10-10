import React, { useEffect, useRef } from 'react';
import { Animated, Easing, TouchableOpacity, View } from 'react-native';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';
import { useLocalization } from '../../contexts/LocalizationContext';

type AccountFillMessageScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'AccountFillMessage'>;

interface AccountFillMessageScreenProps {
  navigation: AccountFillMessageScreenNavigationProp;
}

function AccountFillMessageScreen({ navigation }: AccountFillMessageScreenProps) {
  const { staticData } = useLocalization();

  const animatedOpacity = useRef(new Animated.Value(0)).current

  const animation = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    animation.current = Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    animation.current?.start(() => {
      navigation.navigate("AccountFillName");
    });
  }, []);

  return (
    <TouchableOpacity onPress={() => {
      animation.current?.stop();
      navigation.navigate("AccountFillName")
    }} style={generalStyles.screenContainer}>
        <Animated.View style={[generalStyles.centerContainer, { opacity: animatedOpacity }]}>
            <Title style={styles.title}>
                {staticData.auth.accountFillMessageScreen.titleFirstPart}
                <Title bold={true}> {staticData.auth.accountFillMessageScreen.titleBoldPart}</Title> {staticData.auth.accountFillMessageScreen.titleCenterPart}
                <Title italic={true}>  {staticData.auth.accountFillMessageScreen.titleItalicPart}</Title>
            </Title>
        </Animated.View>
    </TouchableOpacity>
  );
};

export default AccountFillMessageScreen;
