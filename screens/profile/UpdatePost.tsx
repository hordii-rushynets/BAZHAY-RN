import React, { useCallback, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../components/RootNavigator';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import BackButton from '../../components/ui/buttons/BackButton';
import DesignedText from '../../components/ui/DesignedText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { AccountService } from '../auth/services';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { AddressInfoBlock } from '../../components/Profile/AddressInfoBlock';
import Loader from '../../components/ui/Loader';
import TextInputWithoutArrow from '../../components/ui/inputs/TextInputWithoutArrow';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { Post } from '../auth/interfaces';
import { useLocalization } from '../../contexts/LocalizationContext';

type UpdatePostScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UpdatePost'>;

interface UpdatePostScreenProps {
  navigation: UpdatePostScreenNavigationProp;
}

function UpdatePostScreen({ navigation }: UpdatePostScreenProps) {
  const { staticData } = useLocalization();
  const accountService = new AccountService();
  const authContext = useAuth();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<Post>({
    country: "",
    post_service: "",
    city: "",
    nearest_branch: "",
    full_name: "",
    phone_number: ""
  });

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      accountService.getPost(authContext).then((post) => {
        setLoading(false);
        if (post) {
          setPost(post);
        }
      })
    }, [])
  );

  const validationSchema = Yup.object().shape({
    country: Yup.string(),
    post_service: Yup.string(),
    city: Yup.string(),
    nearest_branch: Yup.string(),
    full_name: Yup.string(),
    phone_number: Yup.string()
  });
  
  return (
    <ScreenContainer>
      {loading && <Loader />}
      <View style={styles.profileUpdateTop}>
        <BackButton />
        <View style={styles.addressTopText}>
            <DesignedText italic={true}>{staticData.profile.updatePostScreen.title}</DesignedText>
            <AddressInfoBlock type="post"/>
        </View>
      </View>
      {!loading && post.id && 
        <Formik
          initialValues={post}
          validationSchema={validationSchema}
          onSubmit={(values, { setErrors }) => {
            setLoading(true);
            accountService.updatePost(values, post.id || "", authContext).then(success => {
              setLoading(false)
              if (success) {
                navigation.navigate("UpdateProfile");
              }
            })
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <KeyboardAvoidingView behavior={"height"}>
              <ScrollView style={{ overflow: "visible", zIndex: -1 }} contentContainerStyle={{ gap: 16, backgroundColor: "white", paddingBottom: 10 }}>
                {staticData.profile.updatePostScreen.fields.map((field: { title: string, placeholder: string, name: string }, indx: number) => (
                    <View key={indx} style={styles.addressInputContainer}>
                        <DesignedText size="small" style={{ marginLeft: 8 }}>{field.title}</DesignedText>
                        <TextInputWithoutArrow 
                            placeholder={field.placeholder}
                            value={values[field.name as keyof typeof values]}
                            error={undefined}
                            onChange={handleChange(field.name)}
                            style={{
                              textTransform: "none"
                            }}
                        />         
                    </View>
                ))}
                <TouchableOpacity onPress={() => {
                  setLoading(true);
                  accountService.deletePost(post.id || "", authContext).then(success => {
                    setLoading(false);
                    if (success) {
                      navigation.navigate("UpdateProfile");
                    }
                  })
                }}>
                    <DesignedText isUppercase={false} style={{ textDecorationLine: "underline", color: "#8A8A8A" }}>{staticData.profile.updateAddressScreen.delete}</DesignedText>
                </TouchableOpacity>
                <SubmitButton onPress={() => { handleSubmit() }} width={200} style={{ alignSelf: "center" }}>{staticData.profile.updateAddressScreen.save}</SubmitButton>
              </ScrollView>
            </KeyboardAvoidingView>
          )}
        </Formik>
      }
    </ScreenContainer>
  );
};

export default UpdatePostScreen;
