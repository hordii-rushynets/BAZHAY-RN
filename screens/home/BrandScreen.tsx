import React, { useEffect, useState } from 'react';
import Title from '../../components/ui/Title';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { RootStackParamList } from '../../components/RootNavigator';
import { Image, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import BackButton from '../../components/ui/buttons/BackButton';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Upload from '../../components/ui/icons/Upload';
import BigProfile from '../../components/ui/icons/BigProfile';
import DesignedText from '../../components/ui/DesignedText';
import mainStyles from "../main/styles";
import MasonryList from '@react-native-seoul/masonry-list';
import WishCard from '../../components/Main/WishCard';
import { Wish } from '../wishCreating/interfaces';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { MainService } from '../main/services';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import { Brand } from '../main/interfaces';
import { WishService } from '../wishCreating/services';

type BrandScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Brand'>;
type BrandScreenRouteProp = RouteProp<RootStackParamList, 'Brand'>;

interface BrandScreenProps {
  navigation: BrandScreenNavigationProp;
  route: BrandScreenRouteProp;
}

function BrandScreen({ navigation, route }: BrandScreenProps) {
  const { slug } = route.params;
  const [ brand, setBrand ] = useState<Brand>();
  const [nextUrl, setNextUrl] = useState("");
  const wishService = new WishService();
  const mainService = new MainService();
  const authContext = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const { localization } = useLocalization();
  const [wishes, setWishes] = useState<Wish[]>([]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;

    const isCloseToBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y < 1000;

    if (isCloseToBottom && !isFetching && nextUrl !== "") {
      setIsFetching(true);
      wishService.getWishes({brand: slug}, authContext, nextUrl).then(response => {
        setWishes(prevWishes => [...prevWishes, ...response.results]);
        setNextUrl(response.next || "");
      }
    ).finally(() => {
        setIsFetching(false);
      });
    }
  }

  useEffect(() => {
    mainService.getBrand(slug, authContext).then(brand => { setBrand(brand) });
    wishService.getWishes({brand: slug}, authContext).then(response => { setWishes(response.results); setNextUrl(response.next || ""); });
  }, [slug]);

  return (
    <SafeAreaView style={styles.grayBackground}>
      <ScrollView contentContainerStyle={{ flex: 1 }} onScroll={handleScroll}>
        <View style={styles.topBrand}>
          <BackButton/>
          <TouchableOpacity>
            <Upload />
          </TouchableOpacity>
        </View>
        <View style={[styles.brandContentContainer]}>
            <View style={styles.brandInfoContainer}>
              <View style={[mainStyles.avatarContainer, styles.avatarContainer]}>
                  {brand?.photo ? <Image source={ { uri: brand.photo } } style={mainStyles.avatar}/> : <BigProfile />}
              </View>
              <View style={styles.brandNameContainer}>
                <DesignedText>{brand?.[`name_${localization}` as keyof Brand]}</DesignedText>
                <DesignedText size="small" isUppercase={false} style={mainStyles.grayText}>@{brand?.nickname}</DesignedText>
              </View>
              <DesignedText size="small" style={styles.textCenter}>
                {brand?.[`description_${localization}` as keyof Brand]}
              </DesignedText>
            </View>
            <MasonryList
              data={wishes}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              contentContainerStyle={styles.wishesContainer}
            />
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default BrandScreen;

const renderItem = ({ item, i }: {item: unknown, i: number}) => (
  <WishCard wish={item as Wish} key={i}/>
);
