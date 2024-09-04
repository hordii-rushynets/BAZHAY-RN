import React, { useCallback, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { MainStackParamList } from '../../components/navigationStacks/MainStackScreen';
import Logo from '../../components/ui/icons/Logo';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import Bell from '../../components/ui/icons/Bell';
import { ForYouTab } from '../../components/Main/ForYouTab';
import { BrandsTab } from '../../components/Main/BrandsTab';
import styles from './styles';
import MasonryList from '@react-native-seoul/masonry-list';
import WishCard from '../../components/Main/WishCard';
import { Wish } from '../wishCreating/interfaces';
import DesignedText from '../../components/ui/DesignedText';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useAuth } from '../../contexts/AuthContext';
import { WishService } from '../wishCreating/services';
import { ScrollView } from 'react-native-gesture-handler';
import { Article, Brand } from './interfaces';
import { MainService } from './services';

type HomeScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

function HomeScreen({ navigation }: HomeScreenProps) {
  const { staticData } = useLocalization();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState("");
  const wishService = new WishService();
  const mainService = new MainService();
  const authContext = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [news, setNews] = useState<Article[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const renderItem = ({ item, i }: {item: unknown, i: number}) => (
    <WishCard wish={item as Wish} key={i}/>
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;

    const isCloseToBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y < 1000;

    if (isCloseToBottom && !isFetching && nextUrl !== "") {
      setIsFetching(true);
      wishService.getWishes({}, authContext, nextUrl).then(response => {
        setWishes(prevWishes => [...prevWishes, ...response.results]);
        setNextUrl(response.next || "");
      }
    ).finally(() => {
        setIsFetching(false);
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      mainService.getNews(authContext).then(articles => { setNews(articles) });
      mainService.getBrands(authContext).then(brands => { setBrands(brands) });
      wishService.getWishes({}, authContext).then(response => {
        setWishes(response.results);
        setNextUrl(response.next || "");
        setLoading(false);
      })
    }, [])
  );

  return (
    <ScreenContainer>
        <View style={styles.topBar}>
          <Logo/>
          <Bell />
        </View>
        <ScrollView onScroll={handleScroll}>
        {news.length !== 0 && <ForYouTab news={news}/>}
        {brands.length !== 0 && <BrandsTab brands={brands}/>}
        <View style={styles.homeWishesContainer}>
          <DesignedText>
          Найпопулярніше
          </DesignedText>
          <MasonryList
            data={wishes}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.wishesContainer}
          />
        </View>
        </ScrollView>
    </ScreenContainer>
  );
};

export default HomeScreen;
