import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { RootStackParamList } from '../../components/RootNavigator';
import ButtonWithArrow from '../../components/ui/buttons/ButtonWithArrow';
import { View } from 'react-native';
import BackButton from '../../components/ui/buttons/BackButton';
import DesignedText from '../../components/ui/DesignedText';
import wishCreatingStyles from '../wishCreating/styles';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { useLocalization } from '../../contexts/LocalizationContext';
import { RouteProp } from '@react-navigation/native';

type AddressOrPostScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddressOrPost'>;
type AddressOrPostRouteProp = RouteProp<RootStackParamList, 'AddressOrPost'>;

interface AddressOrPostScreenProps {
  navigation: AddressOrPostScreenNavigationProp;
  route: AddressOrPostRouteProp;
}

function AddressOrPostScreen({ navigation, route }: AddressOrPostScreenProps) {
  const { staticData } = useLocalization();
  const { address, post } = route.params;

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} style={{ overflow: "visible" }} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={wishCreatingStyles.wishConfirmationTop}>
          <BackButton />
          <DesignedText italic={true}>{address ? "Адреса доставки" : "Адреса відділення пошти"}</DesignedText>
        </View>
        <View style={styles.settingsContainer}>
            {address && 
                <>
                    <DesignedText size="small">{`країна: ${address.country}`}</DesignedText>
                    <DesignedText size="small">{`Регіон: ${address.region}`}</DesignedText>
                    <DesignedText size="small">{`Місто: ${address.city}`}</DesignedText>
                    <DesignedText size="small">{`вулиця: ${address.street}`}</DesignedText>
                    <DesignedText size="small">{`Індекс: ${address.post_index}`}</DesignedText>
                    <DesignedText size="small">{`ПІБ: ${address.full_name}`}</DesignedText>
                    <DesignedText size="small">{`Номер телефону: ${address.phone_number}`}</DesignedText>
                </>
            }
            {post && 
                <>
                    <DesignedText size="small">{`країна: ${post.country}`}</DesignedText>
                    <DesignedText size="small">{`сервіс доставки: ${post.post_service}`}</DesignedText>
                    <DesignedText size="small">{`Місто: ${post.city}`}</DesignedText>
                    <DesignedText size="small">{`найближче відділення: ${post.nearest_branch}`}</DesignedText>
                    <DesignedText size="small">{`ПІБ: ${post.full_name}`}</DesignedText>
                    <DesignedText size="small">{`Номер телефону: ${post.phone_number}`}</DesignedText>
                </>
            }
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AddressOrPostScreen;
