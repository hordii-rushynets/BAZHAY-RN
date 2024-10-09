import React, { useState } from 'react';
import { View } from 'react-native';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import styles from '../auth/styles'
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import WishCreatingLayout from '../../components/WishCreating/WishCreatingLayout';
import { RootStackParamList } from '../../components/RootNavigator';
import { WishService } from './services';
import { useWishCreating } from '../../contexts/WishCreatingContext';
import Loader from '../../components/ui/Loader';
import { usePopUpMessageContext } from '../../contexts/PopUpMessageContext';

type AddWishTitleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddWishTitle'>;

interface AddWishTitleScreenProps {
  navigation: AddWishTitleScreenNavigationProp;
}

function AddWishTitleScreen({ navigation }: AddWishTitleScreenProps) {
  const authContext = useAuth();
  const wishService = new WishService();
  const { wishId, setWishId, editingMode } = useWishCreating(); 
  const [loading, setLoading] = useState(false);
  const { setIsOpen, setText, setButtonText, setButtonAction, setWidth } = usePopUpMessageContext();
  const { logout } = useAuth();

  const { staticData } = useLocalization();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(""),
  });

  return (
    <WishCreatingLayout index={0} link={editingMode ? "WishConfirmation" : "Main"} editingMode={editingMode}>
      {loading && <Loader />}
        <View style={styles.contentContainer}>
            <View>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>
                    {staticData.wishCreating.addWishTitleScreen.title}
                    </Title>
                </View>
                <Formik
                  initialValues={{ name: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setErrors }) => {
                    setLoading(true);
                    if ( wishId ) {
                      wishService.wishUpdate({ name: values.name.toLowerCase() }, wishId, authContext).then(success => {
                        setLoading(false);
                        if (success) {
                          navigation.navigate(editingMode ? "WishConfirmation" : "AddWishPhotoOrVideo");
                        }
                      })
                    }
                    else {
                      wishService.wishCreate({ name: values.name }, authContext).then(wish => {
                        setLoading(false);
                        if (wish.premiumError) {
                          navigation.navigate("Premium");
                          return;
                        }
                        if (wish.guestError) {
                          setText(staticData.wishCreating.addWishByLinkScreen.guestMessage);
                          setButtonText(staticData.wishCreating.addWishByLinkScreen.guestMessageButton);
                          setWidth(343);
                          setButtonAction(() => () => {logout(); setIsOpen(false);});
                          setIsOpen(true);
                          return;
                        }
                        if (wish) {
                          setWishId(wish?.id || undefined);
                          navigation.navigate("AddWishPhotoOrVideo");
                        }
                      })
                    }
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.inputContainer}>
                        <TextInputWithArrow 
                          placeholder={staticData.wishCreating.addWishTitleScreen.placeholder}
                          value={values.name}
                          error={errors.name}
                          onChange={handleChange('name')}
                          onSubmit={handleSubmit}
                          />
                    </View>
                  )}
                </Formik>
            </View>
        </View>
    </WishCreatingLayout>
  );
};

export default AddWishTitleScreen;
