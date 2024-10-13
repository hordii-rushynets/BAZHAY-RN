import React, { useCallback, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { RootStackParamList } from '../../components/RootNavigator';
import { WishService } from './services';
import { useWishCreating } from '../../contexts/WishCreatingContext';
import ScreenContainer from '../../components/ui/ScreenContainer';
import BackButton from '../../components/ui/buttons/BackButton';
import authStyles from "../auth/styles";
import styles from "./styles";
import DesignedText from '../../components/ui/DesignedText';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';
import { Reservation, WishAccessModel } from './interfaces';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalization } from '../../contexts/LocalizationContext';
import Loader from '../../components/ui/Loader';
import { MainService } from '../main/services';
import { Subscription } from '../main/interfaces';
import CheckBox from '../../components/ui/inputs/CheckBox';
import { UserSmallInfo } from '../../components/UserSmallInfo';
import { MessageWithTwoButtons } from '../../components/ui/MessageWithTwoButtons';
import { UserFields } from '../auth/interfaces';

type ReservationsSettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReservationsSettings'>;

interface ReservationsSettingsScreenProps {
  navigation: ReservationsSettingsScreenNavigationProp;
}

function ReservationsSettingsScreen({ navigation }: ReservationsSettingsScreenProps) {
  const { staticData } = useLocalization();
  const wishService = new WishService();
  const authContext = useAuth();
  const [reservation, setReservation] = useState<Reservation>({candidates: []});
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserFields>();
  const { wishId } = useWishCreating();
  const [ showPopUp, setShowPopUp ] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      wishService.getReservations(wishId || "", authContext).then(reservation => {
        setLoading(false);
        if (reservation.wish) {
            setReservation(reservation);
        }
      })
    }, [])
  );

  return (
    <ScreenContainer>
      {loading && <Loader />}
      {showPopUp && 
        <MessageWithTwoButtons 
            text={<DesignedText size="small" style={{ textAlign: "center" }}>{`${staticData.wishCreating.reservationsSettingsScreen.popUp.first}${selectedUser?.username} ${staticData.wishCreating.reservationsSettingsScreen.popUp.second}`}</DesignedText>}
            onCancel={() => {
                setShowPopUp(false);
            }}
            onAccept={() => {
                setLoading(true);
                wishService.selectUserToGift(reservation.id || "", selectedUser?.id || "", authContext).then(success => {
                    setLoading(false);
                    if (success) {
                        navigation.navigate("WishConfirmation");
                    }
                })
            }}
        />
      }
        <View style={styles.wishConfirmationTop}>
          <BackButton/>
          <DesignedText italic={true}>{staticData.wishCreating.reservationsSettingsScreen.title}</DesignedText>
        </View>
        <ScrollView style={{ marginTop: 24 }} contentContainerStyle={{ gap: 8 }}>
            {reservation.selected_user ? 
                <View style={{marginVertical: "auto", alignSelf: "center", gap: 16}}>
                    <DesignedText size="small" style={{ textAlign: "center" }}>{staticData.wishCreating.reservationsSettingsScreen.emptyMessageFirst}</DesignedText>
                </View>
                : reservation.candidates.length === 0 ? 
                    <View style={{marginVertical: "auto", alignSelf: "center", gap: 16}}>
                        <DesignedText size="small" style={{ textAlign: "center" }}>{staticData.wishCreating.reservationsSettingsScreen.emptyMessageSecond}</DesignedText>
                    </View>
                    :
                    reservation.candidates.map(candidate => (
                        <CheckBox key={candidate.bazhay_user.id} checked={ candidate.bazhay_user.id === selectedUser?.id } onChange={ () => { 
                          setSelectedUser(candidate.bazhay_user);
                        } }>
                            <UserSmallInfo avatar={candidate.bazhay_user.photo || ""} name={candidate.bazhay_user.first_name || ""} nickname={candidate.bazhay_user.username || ""} size="small"/>
                        </CheckBox>
                    ))
            }
        </ScrollView>
        {selectedUser && <SubmitButton 
            onPress={() => {
              setShowPopUp(true);
            }}
            width={200}
            style={authStyles.gridButton}
        >{staticData.wishCreating.wishConfirmationScreen.button}</SubmitButton>}
    </ScreenContainer>
  );
};

export default ReservationsSettingsScreen;
