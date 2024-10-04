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
import Loader from '../../components/ui/Loader';

type AddWishVisibilityScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddWishVisibility'>;

interface AddWishVisibilityScreenProps {
  navigation: AddWishVisibilityScreenNavigationProp;
}

function AddWishVisibilityScreen({ navigation }: AddWishVisibilityScreenProps) {
  const { staticData } = useLocalization();
  const [ visibility, setVisibility ] = useState<keyof typeof staticData.wishCreating.visibilityChoices>("");
  const authContext = useAuth(); 
  const wishService = new WishService();
  const { wishId, editingMode } = useWishCreating();
  const [loading, setLoading] = useState(false);

  return (
    <WishCreatingLayout index={5} link={editingMode ? "WishConfirmation" :"AddWishDescription"} editingMode={editingMode}>
      {loading && <Loader />}
        <View style={authStyles.contentContainer}>
            <View>
                <View style={authStyles.titleContainer}>
                    <Title style={authStyles.title}>
                    {staticData.wishCreating.addWishVisibilityScreen.title}
                    </Title>
                </View>
            </View>
            <View style={authStyles.sexCheckBoxContainer}>
              <CheckBox checked={visibility === "everyone"} onChange={() => { setVisibility("everyone"); }}>
                <DesignedText>{staticData.wishCreating.visibilityChoices.everyone}</DesignedText>
              </CheckBox>
              <CheckBox checked={visibility === "subscribers"} onChange={() => { setVisibility("subscribers"); }}>
                <DesignedText>{staticData.wishCreating.visibilityChoices.subscribers}</DesignedText>
              </CheckBox>
              <CheckBox checked={visibility === "only_me"} onChange={() => { setVisibility("only_me"); }}>
                <DesignedText>{staticData.wishCreating.visibilityChoices.only_me}</DesignedText>
              </CheckBox>
            </View>
        </View>
        {visibility !== "" && <SubmitButton onPress={() => {
          setLoading(true);
          wishService.wishUpdate({ access_type: visibility as string }, wishId||"", authContext).then(success => {
            setLoading(false);
            if (success) {
              navigation.navigate("WishConfirmation")
            }
            else {
              setVisibility("everyone")
              navigation.navigate("Premium")
            }
          })
          }} width={200} style={authStyles.gridButton}>{editingMode ? staticData.wishCreating.addWishVisibilityScreen.editingButton : staticData.wishCreating.addWishVisibilityScreen.button}</SubmitButton>}
    </WishCreatingLayout>
  );
};

export default AddWishVisibilityScreen;
