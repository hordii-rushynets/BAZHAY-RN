import React from 'react';
import { View } from 'react-native';
import styles from '../../screens/wishCreating/styles';
import SubmitButton from '../ui/buttons/SubmitButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootNavigator';
import { useNavigation } from '@react-navigation/native';

type AddWishPopUpNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function AddWishPopUp() {
    const navigation = useNavigation<AddWishPopUpNavigationProp>();

    return (
      <View style={styles.addWishPopUpContainer}>
        <SubmitButton onPress={() => {}} width={"auto"}>Додати за посиланням</SubmitButton>
        <SubmitButton onPress={() => {navigation.navigate("WishCreating")}} width={"auto"}>Додати бажання вручну</SubmitButton>
      </View>
    );
  };