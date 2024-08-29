import React from 'react';
import { TextInput, View } from 'react-native';
import Title from '../../components/ui/Title';
import authStyles from '../auth/styles';
import generalStyles from "../../components/ui/generalStyles";
import styles from "./styles"
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import WishCreatingLayout from '../../components/WishCreating/WishCreatingLayout';
import { RootStackParamList } from '../../components/RootNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DesignedText from '../../components/ui/DesignedText';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ArrowRight from '../../components/ui/icons/ArrowRight';
import DropDownInput from '../../components/ui/inputs/DropDownInput';
import { WishService } from './services';
import { useWishCreating } from '../../contexts/WishCreatingContext';

type AddWishPriceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddWishPrice'>;

interface AddWishPriceScreenProps {
  navigation: AddWishPriceScreenNavigationProp;
}

function AddWishPriceScreen({ navigation }: AddWishPriceScreenProps) {
  const authContext = useAuth();
  const wishService = new WishService();
  const { wishId, editingMode } = useWishCreating(); 

  const { staticData } = useLocalization();

  const validationSchema = Yup.object().shape({
    price: Yup.number().integer("Вкажіть валідну ціну").positive("Вкажіть валідну ціну").required(""),
    currency: Yup.string().required(""),
  });

  const currencies = ['UAH', 'USD', 'EUR', 'PLN', 'GBP', 'CAD', 'NOK', 'CHF', 'SEK'];

  return (
    <WishCreatingLayout index={2} link={editingMode ? "WishConfirmation" :"AddWishPhotoOrVideo"} editingMode={editingMode}>
        <View style={authStyles.contentContainer}>
            <View>
                <View style={authStyles.titleContainer}>
                    <Title style={authStyles.title}>
                    Яка вартість твого бажання?
                    </Title>
                </View>
                    <View style={authStyles.inputContainer}>
                        <Formik
                          initialValues={{ price: '', currency: 'UAH' }}
                          validationSchema={validationSchema}
                          onSubmit={(values, { setErrors }) => {
                            if (wishId) {
                              wishService.wishUpdate({ price: +values.price, currency: values.currency }, wishId, authContext).then(success => {
                                if (success) {
                                  navigation.navigate(editingMode ? "WishConfirmation" :"AddWishLink")
                                }
                                else {
                                  setErrors({ price: "Вкажіть валідну ціну" });
                                }
                              })
                            }
                          }}
                        >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={generalStyles.textInputWithArrowContainer}>
                                <TextInput 
                                  style={generalStyles.textInputWithArrow}
                                  placeholder={"Напиши ціну"}
                                  value={values.price}
                                  onChangeText={handleChange("price")}
                                  keyboardType="numeric"
                                />
                                <DropDownInput options={currencies} defaultValue={'UAH'} onChange={handleChange("currency")}/>
                                <TouchableOpacity onPress={() => {handleSubmit()}}>
                                <View style={generalStyles.arrowContainer}>
                                  <ArrowRight />
                                </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        </Formik>
                    </View>
            </View>
            {!editingMode && <TouchableOpacity onPress={() => {navigation.navigate("AddWishLink")}} style={styles.addLaterButton}>
              <DesignedText isUppercase={false}>
                Додати пізніше
              </DesignedText>
            </TouchableOpacity>}
        </View>
    </WishCreatingLayout>
  );
};

export default AddWishPriceScreen;
