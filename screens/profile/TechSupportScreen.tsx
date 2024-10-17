import React, { useEffect, useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { RootStackParamList } from '../../components/RootNavigator';
import { Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import BackButton from '../../components/ui/buttons/BackButton';
import DesignedText from '../../components/ui/DesignedText';
import wishCreatingStyles from '../wishCreating/styles';
import styles from './styles';
import generalStyles from "../../components/ui/generalStyles";
import { useLocalization } from '../../contexts/LocalizationContext';
import { NotificationCard } from '../../components/Home/NotificationCard';
import ArrowRight from '../../components/ui/icons/ArrowRight';
import Clip from '../../components/ui/icons/Clip';
import { useSupportFileContext } from '../../contexts/SupportFileContext';
import { isVideo } from '../../utils/helpers';
import { ResizeMode, Video } from 'expo-av';
import { FontAwesome6 } from '@expo/vector-icons';
import authStyles from "../auth/styles";
import wishStyles from "../wishCreating/styles";
import homeStyles from "../home/styles";
import CrissCross from '../../components/ui/icons/CrissCross';
import { TechSupportService } from './services';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../../components/ui/Loader';

type TechSupportScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TechSupport'>;

interface TechSupportScreenProps {
  navigation: TechSupportScreenNavigationProp;
}

function TechSupportScreen({ navigation }: TechSupportScreenProps) {
  const { staticData } = useLocalization();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { file, setFile } = useSupportFileContext();
  const [questions, setQuestions] = useState<{question: string, file?: string}[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  const techSupportService = new TechSupportService();
  const authContext = useAuth();

  useEffect(() => {
    techSupportService.getQuestions(authContext).then(questions => {
      setQuestions(questions);
    });
  }, [loading]);

  return (
    <ScreenContainer>
      {loading && <Loader />}
      <View style={{ paddingBottom: 20, zIndex: -1 }}>
        <View style={wishCreatingStyles.wishConfirmationTop}>
          <BackButton />
          <DesignedText italic={true}>{staticData.profile.techSupportScreen.title}</DesignedText>
        </View>
        <ScrollView ref={scrollRef} contentContainerStyle={[styles.settingsContainer, { paddingBottom: 150 }]} showsVerticalScrollIndicator={false} onContentSizeChange={() => {scrollRef.current?.scrollToEnd()}}>
            <NotificationCard 
                notification={{
                    message_en: "Greetings, how can we help you?",
                    message_uk: "Привіт, як ми можемо Тобі допомогти?"
                }}
            />
            {questions.map((question, indx) => (
              <View key={indx} style={{ gap: 24 }}>
                <View style={homeStyles.buttonContainer}>
                  <DesignedText isUppercase={false} style={homeStyles.notificationMessage}>{question.question}</DesignedText>
                  {question.file && 
                    <View style={authStyles.gridItem}>
                      {isVideo(question.file) ? 
                        <><Video source={{uri: question.file}} style={authStyles.gridImage} resizeMode={"cover" as ResizeMode}/>
                        <FontAwesome6 name="play" size={15} color="#B70000" style={wishStyles.videoIcon}/></> : 
                        <Image source={{ uri: question.file }} style={authStyles.gridImage} />
                      }
                    </View>
                  }
                </View>
                <NotificationCard 
                    notification={{
                        message_en: "We will consider your question and the answer will be sent to you shortly!",
                        message_uk: "Ми розглянемо ваше питання і незабаром відповідь прийде вам на пошту!"
                    }}
                />
              </View>
            ))}
        </ScrollView>
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        style={{ position: "absolute", bottom: 0, alignSelf: "center", gap: 8, backgroundColor: "white", paddingTop: 10, paddingBottom: 30, zIndex: 1 }}
      >
        {file && <View style={authStyles.gridItem}>
          {isVideo(file.uri) ? 
            <><Video source={{uri: file.uri}} style={authStyles.gridImage} resizeMode={"cover" as ResizeMode}/>
            <FontAwesome6 name="play" size={15} color="#B70000" style={wishStyles.videoIcon}/></> : 
            <Image source={{ uri: file.uri }} style={authStyles.gridImage} />
          }
          <TouchableOpacity style={styles.removeFileButton} onPress={() => { setFile(undefined) }}>
            <CrissCross />
          </TouchableOpacity>
        </View>}
        <View style={[generalStyles.textInputWithArrowContainer]}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("SupportCameraOrGallery");
            }}>
              <View style={generalStyles.arrowContainer}>
                <Clip />
              </View>
            </TouchableOpacity>
            <TextInput
              style={[generalStyles.textInputWithArrow, {textTransform: "none"}]}
              placeholder={staticData.profile.techSupportScreen.placeholder}
              value={message}
              onChangeText={(text: string) => {
                setMessage(text);
              }}
            />
            <TouchableOpacity onPress={() => {
              if (message === "") { return; }
              setLoading(true);
              techSupportService.createQuestion(message, file, authContext).then(success => {
                setLoading(false);
                if (success) {
                  setMessage("");
                  setFile(undefined);
                }
              });
            }}>
              <View style={generalStyles.arrowContainer}>
                <ArrowRight />
              </View>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default TechSupportScreen;
