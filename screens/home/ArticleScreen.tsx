import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { RootStackParamList } from '../../components/RootNavigator';
import { Image, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import BackButton from '../../components/ui/buttons/BackButton';
import { ScrollView } from 'react-native-gesture-handler';
import DesignedText from '../../components/ui/DesignedText';
import mainStyles from "../main/styles";
import MasonryList from '@react-native-seoul/masonry-list';
import WishCard from '../../components/Main/WishCard';
import { Wish } from '../wishCreating/interfaces';
import styles from './styles';
import { RouteProp } from '@react-navigation/native';
import { Article } from '../main/interfaces';
import { MainService } from '../main/services';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import { WishService } from '../wishCreating/services';
import Loader from '../../components/ui/Loader';
import { proccessNextUrl } from '../../utils/helpers';

type ArticleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Article'>;
type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

interface ArticleScreenProps {
  navigation: ArticleScreenNavigationProp;
  route: ArticleScreenRouteProp;
}

function ArticleScreen({ navigation, route }: ArticleScreenProps) {
  const { slug } = route.params;
  const [ article, setArticle ] = useState<Article>();
  const [nextUrl, setNextUrl] = useState("");
  const wishService = new WishService();
  const mainService = new MainService();
  const authContext = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const { localization } = useLocalization();
  const [ wishes, setWishes ] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;

    const isCloseToBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y < 1000;

    if (isCloseToBottom && !isFetching && nextUrl !== "") {
      setIsFetching(true);
      wishService.getArticleWishes(slug, authContext, nextUrl).then(response => {
        setWishes(prevWishes => [...prevWishes, ...response.results]);
        setNextUrl(proccessNextUrl(response.next || ""));
      }
    ).finally(() => {
        setIsFetching(false);
      });
    }
  }

  useEffect(() => {
    mainService.getArticle(slug, authContext).then(article => { setArticle(article); setLoading(false) });
    wishService.getArticleWishes(slug, authContext, nextUrl).then(response => {
      setWishes(prevWishes => [...prevWishes, ...response.results]);
      setNextUrl(proccessNextUrl(response.next || ""));
    })
  }, [slug]);

  return (
    <ScreenContainer>
      {loading && <Loader />}
        <View style={[styles.topBrand, { paddingHorizontal: 0 }]}>
          <BackButton/>
        </View>
        <ScrollView contentContainerStyle={{ gap: 24 }} onScroll={handleScroll}>
            <View style={styles.articleImageContainer}>
                <Image source={ { uri: article?.photo } } style={mainStyles.avatar}/>
            </View>
            <View style={{ gap: 8 }}>
                <DesignedText>{article?.[`title_${localization}` as keyof Article]}</DesignedText>
                <DesignedText size="small">
                {article?.[`description_${localization}` as keyof Article]}
                </DesignedText>
            </View>
            <MasonryList
              data={wishes}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              contentContainerStyle={mainStyles.wishesContainer}
            />
        </ScrollView>
    </ScreenContainer>
  );
};

export default ArticleScreen;

const renderItem = ({ item, i }: {item: unknown, i: number}) => (
  <WishCard wish={item as Wish} key={i}/>
);
