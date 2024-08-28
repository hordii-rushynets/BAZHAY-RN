import React, { useState } from 'react';
import { View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import authStyles from '../auth/styles'
import { StackNavigationProp } from '@react-navigation/stack';
import CheckBox from '../../components/ui/inputs/CheckBox';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import WishCreatingLayout from '../../components/WishCreating/WishCreatingLayout';
import { RootStackParamList } from '../../components/RootNavigator';
import { WishService } from './services';
import { useWishCreating } from '../../contexts/WishCreatingContext';

type AddWishVisibilityScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddWishVisibility'>;

interface AddWishVisibilityScreenProps {
  navigation: AddWishVisibilityScreenNavigationProp;
}

function AddWishVisibilityScreen({ navigation }: AddWishVisibilityScreenProps) {
  const [ visibility, setVisibility ] = useState("");
  const authContext = useAuth(); 
  const { staticData } = useLocalization();
  const wishService = new WishService();
  const { wishId } = useWishCreating();

  return (
    <WishCreatingLayout index={5} link={"AddWishDescription"}>
        <View style={authStyles.contentContainer}>
            <View>
                <View style={authStyles.titleContainer}>
                    <Title style={authStyles.title}>
                    Хто буде бачити твоє бажання
                    </Title>
                </View>
            </View>
            <View style={authStyles.sexCheckBoxContainer}>
              <CheckBox checked={visibility === "everyone"} onChange={() => { setVisibility("everyone"); }}>
                <DesignedText>Всі</DesignedText>
              </CheckBox>
              <CheckBox checked={visibility === "subscribers"} onChange={() => { setVisibility("subscribers"); }}>
                <DesignedText>Підписники</DesignedText>
              </CheckBox>
              <CheckBox checked={visibility === "only_me"} onChange={() => { setVisibility("only_me"); }}>
                <DesignedText>Тільки я</DesignedText>
              </CheckBox>
            </View>
        </View>
        {visibility !== "" && <SubmitButton onPress={() => {
          wishService.wishUpdate({ access_type: visibility }, wishId||"", authContext).then(success => {
            if (success) {
              navigation.navigate("WishConfirmation")
            }
          })
          }} width={200} style={authStyles.gridButton}>Далі</SubmitButton>}
    </WishCreatingLayout>
  );
};

export default AddWishVisibilityScreen;
