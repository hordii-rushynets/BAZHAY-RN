import React from 'react';
import { View } from 'react-native';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import styles from '../auth/styles'
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import WishCreatingLayout from '../../components/WishCreating/WishCreatingLayout';
import { RootStackParamList } from '../../components/RootNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WishService } from './services';
import { useWishCreating } from '../../contexts/WishCreatingContext';

type AddWishTitleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddWishTitle'>;

interface AddWishTitleScreenProps {
  navigation: AddWishTitleScreenNavigationProp;
}

function AddWishTitleScreen({ navigation }: AddWishTitleScreenProps) {
  const authContext = useAuth();
  const wishService = new WishService();
  const { wishId, setWishId, editingMode } = useWishCreating(); 

  const { staticData } = useLocalization();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(""),
  });

  return (
    <WishCreatingLayout index={0} link={editingMode ? "WishConfirmation" : "Main"} editingMode={editingMode}>
        <View style={styles.contentContainer}>
            <View>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>
                    Як називається твоє бажання?
                    </Title>
                </View>
                <Formik
                  initialValues={{ name: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setErrors }) => {
                    if ( wishId ) {
                      wishService.wishUpdate({ name: values.name }, wishId, authContext).then(success => {
                        if (success) {
                          navigation.navigate(editingMode ? "WishConfirmation" : "AddWishPhotoOrVideo");
                        }
                      })
                    }
                    else {
                      wishService.wishCreate({ name: values.name }, authContext).then(wish => {
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
                          placeholder={"Напиши назву свого бажання"}
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
