import React, { useCallback, useEffect, useState } from 'react';
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
import { Touchable, View } from 'react-native';
import ImageButton from '../../components/ui/buttons/ImageButton';
import ButtonWithArrow from '../../components/ui/buttons/ButtonWithArrow';
import { Wish } from './interfaces';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { visibilityChoices } from './AddWishVisibilityScreen';
import { useFocusEffect } from '@react-navigation/native';

type WishConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WishConfirmation'>;

interface WishConfirmationScreenProps {
  navigation: WishConfirmationScreenNavigationProp;
}

function WishConfirmationScreen({ navigation }: WishConfirmationScreenProps) {
  const wishService = new WishService();
  const authContext = useAuth();
  const { wishId, setEditingMode, setWishId } = useWishCreating();
  const [wish, setWish] = useState<Wish>();

  useFocusEffect(
    useCallback(() => {
      wishService.getWish(wishId || "", authContext).then(wish => setWish(wish));
    }, [])
  );

  return (
    <ScreenContainer>
        <View style={styles.wishConfirmationTop}>
          <TouchableOpacity onPress={() => {setEditingMode(false)}}>
            <BackButton link={"AddWishVisibility"}/>
          </TouchableOpacity>
          <DesignedText italic={true}>Твоє бажання</DesignedText>
        </View>
        <View style={styles.wishConfirmationButtonsContainer}>
            <ImageButton url={wish?.media || ""} onPress={() => {setEditingMode(true); navigation.navigate("AddWishPhotoOrVideo")}} height={216}/>
            <View style={styles.wishConfirmationButtons}>
              <ButtonWithArrow onPress={() => {setEditingMode(true); navigation.navigate("AddWishTitle")}} width={"auto"}>{wish?.name || "напиши Назву бажання"}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => {setEditingMode(true); navigation.navigate("AddWishPrice")}} width={"auto"}>{wish?.price ? `${wish?.price} ${wish.currency}` : "вкажи вартість та валюту"}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => {setEditingMode(true); navigation.navigate("AddWishLink")}} width={"auto"}>{wish?.link || "вкажи посилання"}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => {setEditingMode(true); navigation.navigate("AddWishDescription")}} width={"auto"}>{wish?.description || "додай опис та характеристики"}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => {setEditingMode(true); navigation.navigate("AddWishVisibility")}} width={"auto"}>{wish?.access_type ? visibilityChoices?.[wish?.access_type as keyof typeof visibilityChoices] : "налаштуй, хто бачить це бажання"}</ButtonWithArrow>
            </View>
        </View>
        <SubmitButton 
            onPress={() => {
              wishService.wishUpdate({ is_fully_created: true }, wishId || "", authContext).then(success => {
                if (success) {
                  setWishId(undefined);
                  setEditingMode(false);
                  navigation.navigate("Main");
                }
              })
            }}
            width={200}
            style={authStyles.gridButton}
        >Готово</SubmitButton>
    </ScreenContainer>
  );
};

export default WishConfirmationScreen;
