import React from 'react';
import { View } from 'react-native';
import styles from '../../screens/wishCreating/styles';
import SubmitButton from '../ui/buttons/SubmitButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootNavigator';
import { useNavigation } from '@react-navigation/native';
import { useLocalization } from '../../contexts/LocalizationContext';
import { WishService } from '../../screens/wishCreating/services';
import { useAuth } from '../../contexts/AuthContext';
import { useWishCreating } from '../../contexts/WishCreatingContext';

type AddWishPopUpNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function AddWishPopUp() {
    const navigation = useNavigation<AddWishPopUpNavigationProp>();
    const { staticData } = useLocalization();
    const wishService = new WishService();
    const authContext = useAuth();
    const { setWishId, setEditingMode } = useWishCreating();
    return (
      <View style={styles.addWishPopUpContainer}>
        <SubmitButton onPress={() => {
          wishService.getMyWishes({"is_fully_created": "false"}, authContext).then(wishes => {
            if (wishes.results.length !== 0) {
              setWishId(wishes.results[0].id);
              setEditingMode(true);
              navigation.navigate("WishCreating", {screen: "WishConfirmation"});
            }
            else {
              navigation.navigate("WishCreating", {screen: "AddWishByLink"})
            }
          })
        }} width={"auto"}>{staticData.wishCreating.addWishPopUp.linkButton}</SubmitButton>
        <SubmitButton onPress={() => {
          wishService.getMyWishes({"is_fully_created": "false"}, authContext).then(wishes => {
            if (wishes.results.length !== 0) {
              setWishId(wishes.results[0].id);
              setEditingMode(true);
              navigation.navigate("WishCreating", {screen: "WishConfirmation"});
            }
            else {
              navigation.navigate("WishCreating", {screen: "AddWishTitle"})
            }
          })
        }} width={"auto"}>{staticData.wishCreating.addWishPopUp.manualButton}</SubmitButton>
      </View>
    );
  };