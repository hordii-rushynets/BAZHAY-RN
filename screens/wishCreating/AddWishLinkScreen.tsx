import React, { useState } from 'react';
import { View } from 'react-native';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import authStyles from '../auth/styles'
import styles from './styles'
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import WishCreatingLayout from '../../components/WishCreating/WishCreatingLayout';
import { RootStackParamList } from '../../components/RootNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DesignedText from '../../components/ui/DesignedText';
import { WishService } from './services';
import { useWishCreating } from '../../contexts/WishCreatingContext';
import Loader from '../../components/ui/Loader';

type AddWishLinkScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddWishLink'>;

interface AddWishLinkScreenProps {
  navigation: AddWishLinkScreenNavigationProp;
}

function AddWishLinkScreen({ navigation }: AddWishLinkScreenProps) {
  const authContext = useAuth();
  const wishService = new WishService();
  const { wishId, editingMode } = useWishCreating();
  const { staticData } = useLocalization();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    link: Yup.string().url(staticData.wishCreating.addWishLinkScreen.urlError).required(""),
  });

  return (
    <WishCreatingLayout index={3} link={editingMode ? "WishConfirmation" : "AddWishPrice"} editingMode={editingMode}>
      {loading && <Loader />}
        <View style={authStyles.contentContainer}>
            <View>
                <View style={styles.linkTitleContainer}>
                    <Title style={authStyles.title}>
                        {staticData.wishCreating.addWishLinkScreen.title}
                    </Title>
                </View>
                <Formik
                  initialValues={{ link: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setErrors }) => {
                    setLoading(true);
                    wishService.wishUpdate({ link: values.link.toLowerCase() }, wishId||"", authContext).then(success => {
                      setLoading(false);
                      if (success) {
                        navigation.navigate(editingMode ? "WishConfirmation" : "AddWishDescription")
                      }
                      else {
                        setErrors({ link: staticData.wishCreating.addWishLinkScreen.urlError});
                      }
                    })
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={authStyles.inputContainer}>
                        <TextInputWithArrow 
                          placeholder={staticData.wishCreating.addWishLinkScreen.placeholder}
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
                {staticData.wishCreating.addWishLinkScreen.button}
              </DesignedText>
            </TouchableOpacity>}
        </View>
    </WishCreatingLayout>
  );
};

export default AddWishLinkScreen;
