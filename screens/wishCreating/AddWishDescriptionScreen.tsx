import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, View } from 'react-native';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import authStyles from '../auth/styles'
import styles from './styles'
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import WishCreatingLayout from '../../components/WishCreating/WishCreatingLayout';
import { RootStackParamList } from '../../components/RootNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DesignedText from '../../components/ui/DesignedText';
import TextFieldInput from '../../components/ui/inputs/TextFieldInput';
import { WishService } from './services';
import { useWishCreating } from '../../contexts/WishCreatingContext';

type AddWishDescriptionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddWishDescription'>;

interface AddWishDescriptionScreenProps {
  navigation: AddWishDescriptionScreenNavigationProp;
}

function AddWishDescriptionScreen({ navigation }: AddWishDescriptionScreenProps) {
  const authContext = useAuth();
  const wishService = new WishService();
  const { wishId, editingMode } = useWishCreating();
  const { staticData } = useLocalization();

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(),
  });

  const [ keyboardVisible, setKeyboardVisible ] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <WishCreatingLayout index={4} link={editingMode ? "WishConfirmation" : "AddWishLink"} editingMode={editingMode}>
        <View style={authStyles.contentContainer}>
              <KeyboardAvoidingView
                style={[{ flex: 1 }, (keyboardVisible && Platform.OS !== "ios") ? styles.titleAndInputContainerWithKeyboard : {}]}
                behavior={Platform.OS === "ios" ? 'position' : undefined} // Adjust for iOS
                keyboardVerticalOffset={Platform.OS === 'ios' ? 130 : 0} // Adjust the offset if needed
              >
                <View style={styles.linkTitleContainer}>
                    <Title style={authStyles.title}>
                    {staticData.wishCreating.addWishDescriptionScreen.title}
                    </Title>
                </View>
                <Formik
                  initialValues={{ description: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setErrors }) => {
                    wishService.wishUpdate({ description: values.description.toLowerCase() }, wishId || "", authContext).then(success => {
                      if (success) {
                        navigation.navigate(editingMode ? "WishConfirmation" :"AddWishVisibility")
                      }
                    })
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={authStyles.inputContainer}>
                        <TextFieldInput
                          placeholder={staticData.wishCreating.addWishDescriptionScreen.placeholder}
                          value={values.description}
                          error={errors.description}
                          onChange={handleChange('description')}
                          onSubmit={handleSubmit}
                          />
                    </View>
                  )}
                </Formik>
            </KeyboardAvoidingView>
            {!keyboardVisible && !editingMode && <TouchableOpacity onPress={() => {navigation.navigate("AddWishVisibility")}} style={authStyles.addLaterButton}>
              <DesignedText isUppercase={false}>
                {staticData.wishCreating.addWishDescriptionScreen.button}
              </DesignedText>
            </TouchableOpacity>}
        </View>
    </WishCreatingLayout>
  );
};

export default AddWishDescriptionScreen;
