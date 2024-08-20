import React, { useState } from 'react';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { TextInput, TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import AccountFillLayout from '../../components/Auth/AccountFillLayout';
import { RootStackParamList } from '../../App';
import DateTimePicker from '@react-native-community/datetimepicker';
import ArrowRight from '../../components/ui/icons/ArrowRight';
import CheckBox from '../../components/ui/inputs/CheckBox';

type AccountFillBirthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountFillBirth'>;

interface AccountFillBirthScreenProps {
  navigation: AccountFillBirthScreenNavigationProp;
}

function AccountFillBirthScreen({ navigation }: AccountFillBirthScreenProps) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    setDay(String(selectedDate.getDate()));
    setMonth(String(selectedDate.getMonth() + 1));
    setYear(String(selectedDate.getFullYear()));
  };

  return (
    <AccountFillLayout index={3}>
        <View style={styles.contentContainer}>
            <View>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>
                      Напиши свою дату <Title bold={true}>народження</Title>
                    </Title>
                    <DesignedText style={styles.titleSpan}>
                    Твої близькі люди завжди пам’ятатимуть про нього
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
                    {year && <TouchableOpacity onPress={() => { navigation.navigate("AccountFillSex") }}>
                      <View style={generalStyles.arrowContainer}>
                        <ArrowRight />
                      </View>
                    </TouchableOpacity>}
                </View>
            </View>
            <CheckBox style={styles.birthCheckbox}>
              <DesignedText isUppercase={false}>Приховати рік народження</DesignedText>
            </CheckBox>
        </View>
        {open && <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={(event, selectedDate) => {
              handleDateChange(selectedDate || date);
              if (event.type === "set" || event.type === "dismissed") {
                setOpen(false);
              }
            }}
            maximumDate={new Date(Date.now())}
            minimumDate={new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 100)}
        />}
    </AccountFillLayout>
  );
};

export default AccountFillBirthScreen;
