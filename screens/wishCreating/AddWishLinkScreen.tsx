import React from 'react';
import { View } from 'react-native';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import authStyles from '../auth/styles'
import styles from './styles'
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import WishCreatingLayout from '../../components/WishCreating/WishCreatingLayout';
import { RootStackParamList } from '../../components/RootNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DesignedText from '../../components/ui/DesignedText';
import { WishService } from './services';
import { useWishCreating } from '../../contexts/WishCreatingContext';

type AddWishLinkScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddWishLink'>;

interface AddWishLinkScreenProps {
  navigation: AddWishLinkScreenNavigationProp;
}

function AddWishLinkScreen({ navigation }: AddWishLinkScreenProps) {
  const authContext = useAuth();
  const wishService = new WishService();
  const { wishId, editingMode } = useWishCreating();
  const { staticData } = useLocalization();

  const validationSchema = Yup.object().shape({
    link: Yup.string().url("Вкажіть правильне покликання").required(""),
  });

  return (
    <WishCreatingLayout index={3} link={editingMode ? "WishConfirmation" : "AddWishPrice"} editingMode={editingMode}>
        <View style={authStyles.contentContainer}>
            <View>
                <View style={styles.linkTitleContainer}>
                    <Title style={authStyles.title}>
                        Де можна замовити бажання?
                    </Title>
                </View>
                <Formik
                  initialValues={{ link: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setErrors }) => {
                    wishService.wishUpdate({ link: values.link.toLowerCase() }, wishId||"", authContext).then(success => {
                      if (success) {
                        navigation.navigate(editingMode ? "WishConfirmation" : "AddWishDescription")
                      }
                      else {
                        setErrors({ link: "Вкажіть правильне покликання" });
                      }
                    })
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={authStyles.inputContainer}>
                        <TextInputWithArrow 
                          placeholder={"Вкажи посилання з сайту"}
                          value={values.link}
                          error={errors.link}
                          onChange={handleChange('link')}
                          onSubmit={handleSubmit}
                          />
                    </View>
                  )}
                </Formik>
            </View>
            {!editingMode && <TouchableOpacity onPress={() => {navigation.navigate("AddWishDescription")}} style={styles.addLaterButton}>
              <DesignedText isUppercase={false}>
                Додати пізніше
              </DesignedText>
            </TouchableOpacity>}
        </View>
    </WishCreatingLayout>
  );
};

export default AddWishLinkScreen;
