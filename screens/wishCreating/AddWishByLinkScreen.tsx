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
import { RootStackParamList } from '../../components/RootNavigator';
import DesignedText from '../../components/ui/DesignedText';
import { WishService } from './services';
import { useWishCreating } from '../../contexts/WishCreatingContext';
import ScreenContainer from '../../components/ui/ScreenContainer';
import BackButton from '../../components/ui/buttons/BackButton';
import { Wish } from './interfaces';
import Loader from '../../components/ui/Loader';
import { usePopUpMessageContext } from '../../contexts/PopUpMessageContext';

type AddWishByLinkScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddWishByLink'>;

interface AddWishByLinkScreenProps {
  navigation: AddWishByLinkScreenNavigationProp;
}

function AddWishByLinkScreen({ navigation }: AddWishByLinkScreenProps) {
  const authContext = useAuth();
  const wishService = new WishService();
  const { setWishId } = useWishCreating();
  const { staticData } = useLocalization();
  const [loading, setLoading] = useState(false);
  const { setIsOpen, setText, setButtonText, setButtonAction, setWidth } = usePopUpMessageContext();
  const { logout } = useAuth();

  const validationSchema = Yup.object().shape({
    link: Yup.string().url(staticData.wishCreating.addWishLinkScreen.urlError).required(""),
  });

  return (
    <ScreenContainer>
      {loading && <Loader />}
      <View style={styles.wishConfirmationTop}>
          <BackButton/>
      </View>
      <View style={authStyles.contentContainer}>
          <View>
              <View style={styles.linkTitleContainer}>
                  <Title style={authStyles.title}>
                    {staticData.wishCreating.addWishByLinkScreen.titleFirst} <Title bold={true}>{staticData.wishCreating.addWishByLinkScreen.titleSecond} {"\n"}</Title>
                    {staticData.wishCreating.addWishByLinkScreen.titleThird}
                  </Title>
                  <DesignedText style={authStyles.title}>{staticData.wishCreating.addWishByLinkScreen.span}</DesignedText>
              </View>
              <Formik
                initialValues={{ link: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setErrors }) => {
                  setLoading(true);
                  try {
                    await wishService.getWishByLink(values.link.toLowerCase(), authContext).then(wish => {
                      const copyOfWish: Wish = {
                        name: wish.name,
                        description: wish.description,
                        photo: wish.photo,
                        video: wish.video,
                        link: wish.link,
                        price: wish.price,
                        currency: wish.currency,
                        image_size: wish.image_size
                      }
                      wishService.wishCreate(copyOfWish, authContext).then(createdWish => {
                        setLoading(false);
                        if (createdWish.premiumError) {
                          navigation.navigate("Premium");
                          return;
                        }
                        if (createdWish.guestError) {
                          setText(staticData.wishCreating.addWishByLinkScreen.guestMessage);
                          setButtonText(staticData.wishCreating.addWishByLinkScreen.guestMessageButton);
                          setWidth(343);
                          setButtonAction(() => () => {logout(); setIsOpen(false);});
                          setIsOpen(true);
                          return;
                        }
                        if (createdWish.id) {
                            setWishId(createdWish.id);
                            navigation.navigate("WishConfirmation");
                        }
                      })
                    });
                  }
                  catch {
                    setLoading(false);
                    setErrors({ link: staticData.wishCreating.addWishByLinkScreen.error })
                  }
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View style={authStyles.inputContainer}>
                      <TextInputWithArrow 
                        placeholder={staticData.wishCreating.addWishByLinkScreen.placeholder}
                        value={values.link}
                        error={errors.link}
                        onChange={handleChange('link')}
                        onSubmit={handleSubmit}
                        />
                  </View>
                )}
              </Formik>
          </View>
      </View>
    </ScreenContainer>
  );
};

export default AddWishByLinkScreen;
