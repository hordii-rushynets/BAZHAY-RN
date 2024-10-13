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
import { ScrollView, View } from 'react-native';
import ImageButton from '../../components/ui/buttons/ImageButton';
import ButtonWithArrow from '../../components/ui/buttons/ButtonWithArrow';
import { Wish } from './interfaces';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalization } from '../../contexts/LocalizationContext';
import SmoothCorner from '../../components/ui/icons/SmoothCorner';
import Loader from '../../components/ui/Loader';
import { MessageWithTwoButtons } from '../../components/ui/MessageWithTwoButtons';

type WishConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WishConfirmation'>;

interface WishConfirmationScreenProps {
  navigation: WishConfirmationScreenNavigationProp;
}

function WishConfirmationScreen({ navigation }: WishConfirmationScreenProps) {
  const { staticData } = useLocalization();
  const visibilityChoices = staticData.wishCreating.visibilityChoices;
  const wishService = new WishService();
  const authContext = useAuth();
  const { wishId, setEditingMode, setWishId, copyingMode, setCopyingMode } = useWishCreating();
  const [wish, setWish] = useState<Wish>();
  const [loading, setLoading] = useState(false);
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [displayFulfilledPopUp, setFulfilledDisplayPopUp] = useState(false);

  useFocusEffect(
    useCallback(() => {
      wishService.getMyWish(wishId || "", authContext).then(wish => setWish(wish));
    }, [])
  );

  return (
    <ScreenContainer>
      {loading && <Loader />}
      {displayPopUp && 
        <MessageWithTwoButtons 
          text={<DesignedText size="small" style={{textAlign: "center"}}>{staticData.deleteWish.first} <DesignedText size="small" italic={true}>{staticData.deleteWish.italic}</DesignedText> {staticData.deleteWish.second}</DesignedText>}
          onCancel={() => {
            setDisplayPopUp(false);
          }}
          onAccept={() => {
            setLoading(true);
            wishService.deleteWish(wish?.id || "", authContext).then(success => {
              setLoading(false);
              if (success) {
                setWishId(undefined);
                setDisplayPopUp(false);
                navigation.navigate("Profile", {});
              }
            });
          }}
        />
      }
      {displayFulfilledPopUp && 
        <MessageWithTwoButtons 
          text={<DesignedText size="small" style={{ textAlign: "center" }}><DesignedText size="small" bold={true}>{staticData.doesHelped.bold}</DesignedText> {staticData.doesHelped.first} <DesignedText size="small" italic={true}>{staticData.doesHelped.italic}</DesignedText> {staticData.doesHelped.second}</DesignedText>}
          onCancel={() => {
            setFulfilledDisplayPopUp(false);
          }}
          onAccept={() => {
            setLoading(true);
            wishService.markWishAsFulfilled(wish?.id || "", authContext).then(success => {
              setLoading(false);
              if (success) {
                setFulfilledDisplayPopUp(false);
                setWish({...wish, is_fulfilled: true})
              }
            });
          }}
        />
      }
        <View style={styles.wishConfirmationTop}>
          <TouchableOpacity onPress={() => {setEditingMode(false)}}>
            <BackButton/>
          </TouchableOpacity>
          <DesignedText italic={true}>{copyingMode ? staticData.wishCreating.wishConfirmationScreen.copyingModeText : staticData.wishCreating.wishConfirmationScreen.yourWishText}</DesignedText>
        </View>
        <ScrollView contentContainerStyle={[styles.wishConfirmationButtonsContainer]}>
            <ImageButton ratio={wish?.image_size || 3/4} url={wish?.photo || ""} onPress={() => {setEditingMode(true); navigation.navigate("AddWishPhotoOrVideo")}} height={216}/>
            <View style={styles.wishConfirmationButtons}>
              {wish?.is_fully_created && !wish.is_fulfilled && 
                <TouchableOpacity onPress={() => {
                  setFulfilledDisplayPopUp(true);
                }}>
                  <View style={styles.wishFulfilledButton}>
                    <SmoothCorner />
                    <DesignedText size={"small"}>
                    {staticData.wishCreating.wishConfirmationScreen.fulfilledButton}
                    </DesignedText>
                  </View>
                </TouchableOpacity>
              }
              <ButtonWithArrow onPress={() => {setEditingMode(true); navigation.navigate("AddWishTitle")}} width={"auto"}>{wish?.name || staticData.wishCreating.wishConfirmationScreen.namePlaceholder}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => {setEditingMode(true); navigation.navigate("AddWishPrice")}} width={"auto"}>{wish?.price ? `${wish?.price} ${wish.currency}` : staticData.wishCreating.wishConfirmationScreen.pricePlaceholder}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => {setEditingMode(true); navigation.navigate("AddWishLink")}} width={"auto"}>{wish?.link || staticData.wishCreating.wishConfirmationScreen.linkPlaceholder}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => {setEditingMode(true); navigation.navigate("AddWishDescription")}} width={"auto"}>{wish?.description || staticData.wishCreating.wishConfirmationScreen.descriptionPlaceholder}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => {setEditingMode(true); navigation.navigate("AddWishVisibility")}} width={"auto"}>{wish?.access_type ? visibilityChoices?.[wish?.access_type as keyof typeof visibilityChoices] : staticData.wishCreating.wishConfirmationScreen.accessPlaceholder}</ButtonWithArrow>
              {wish?.author?.is_premium && wish?.is_fully_created &&
                <ButtonWithArrow onPress={() => { navigation.navigate("ReservationsSettings") }} width="auto">{staticData.wishCreating.wishConfirmationScreen.reservePlaceholder}</ButtonWithArrow>
              }
            </View>
            {wish?.is_fully_created && <View style={{ width: "100%" }}>
              <TouchableOpacity onPress={() => {
                setDisplayPopUp(true);
              }}>
                <DesignedText style={styles.deleteButton} isUppercase={false}>
                  {staticData.wishCreating.wishConfirmationScreen.deleteButton}
                </DesignedText>
              </TouchableOpacity>
            </View>}
            <SubmitButton 
                onPress={() => {
                  setLoading(true);
                  wishService.wishUpdate({ is_fully_created: true }, wishId || "", authContext).then(success => {
                    setLoading(false);
                    if (success) {
                      setWishId(undefined);
                      setEditingMode(false);
                      setCopyingMode(false);
                      navigation.navigate("Main");
                    }
                  })
                }}
                width={200}
                style={{ marginBottom: 20 }}
            >{staticData.wishCreating.wishConfirmationScreen.button}</SubmitButton>
        </ScrollView>
    </ScreenContainer>
  );
};

export default WishConfirmationScreen;
