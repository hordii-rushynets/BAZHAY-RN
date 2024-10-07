import React, { useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from '../auth/styles';
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import ArrowRight from '../../components/ui/icons/ArrowRight';
import CheckBox from '../../components/ui/inputs/CheckBox';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import Loader from '../../components/ui/Loader';
import { AccountService } from '../auth/services';
import { RootStackParamList } from '../../components/RootNavigator';
import ScreenContainer from '../../components/ui/ScreenContainer';
import BackButton from '../../components/ui/buttons/BackButton';
import profileStyles from './styles';

type UpdateBirthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateBirth'>;

interface UpdateBirthScreenProps {
  navigation: UpdateBirthScreenNavigationProp;
}

function UpdateBirthScreen({ navigation }: UpdateBirthScreenProps) {
  const [day, setDay] = useState(Platform.OS === "web" ? "12" : '');
  const [month, setMonth] = useState(Platform.OS === "web" ? "09" : '');
  const [year, setYear] = useState(Platform.OS === "web" ? "2023" : '');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [hideBirthday, setHideBirthday] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    setDay(String(selectedDate.getDate()));
    setMonth(String(selectedDate.getMonth() + 1));
    setYear(String(selectedDate.getFullYear()));
  };

  const accountService = new AccountService();
  const authContext = useAuth();

  const { staticData } = useLocalization();

  return (
    <ScreenContainer>
        {loading && <Loader />}
        <View style={profileStyles.profileUpdateTop}>
          <BackButton />
        </View>
        <View style={styles.contentContainer}>
            <View>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>
                      {staticData.auth.accountFillBirthScreen.titleFirstPart} <Title bold={true}>{staticData.auth.accountFillBirthScreen.titleSecondPart}</Title>
                    </Title>
                    <DesignedText style={styles.titleSpan}>
                    {staticData.auth.accountFillBirthScreen.titleSpan}
                    </DesignedText>
                </View>
                <View style={styles.birthInputContainer}>
                    <TouchableOpacity onPress={() => {setOpen(true)}} style={[styles.birthInput, styles.smallBirthInput]}>
                        <DesignedText style={styles.birthInputText}>{day}</DesignedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setOpen(true)}} style={[styles.birthInput, styles.smallBirthInput]}>
                        <DesignedText style={styles.birthInputText}>{month}</DesignedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setOpen(true)}} style={[styles.birthInput, styles.bigBirthInput]}>
                        <DesignedText style={styles.birthInputText}>{year}</DesignedText>
                    </TouchableOpacity>
                    {year && <TouchableOpacity onPress={() => { 
                      setLoading(true);
                      accountService.userUpdate({ birthday: `${year}-${month}-${day}`, view_birthday: !hideBirthday }, authContext).then(success => {
                        setLoading(false);
                        if (success) {
                          navigation.navigate("UpdateProfile");
                        }
                      })
                      }}>
                      <View style={generalStyles.arrowContainer}>
                        <ArrowRight />
                      </View>
                    </TouchableOpacity>}
                </View>
            </View>
            <CheckBox checked={hideBirthday} onChange={() => setHideBirthday(!hideBirthday)} style={styles.birthCheckbox}>
              <DesignedText isUppercase={false}>{staticData.auth.accountFillBirthScreen.checkBox}</DesignedText>
            </CheckBox>
        </View>
        {open && <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={(event, selectedDate) => {
              handleDateChange(selectedDate || date);
              if ((event.type === "set" || event.type === "dismissed") && Platform.OS !== "ios") {
                setOpen(false);
              }
            }}
            maximumDate={new Date(Date.now())}
            minimumDate={new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 100)}
        />}
    </ScreenContainer>
  );
};

export default UpdateBirthScreen;
