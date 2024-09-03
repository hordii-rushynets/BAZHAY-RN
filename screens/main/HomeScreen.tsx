import React, { useState } from 'react';
import Title from '../../components/ui/Title';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { MainStackParamList } from '../../components/navigationStacks/MainStackScreen';
import Logo from '../../components/ui/icons/Logo';
import { View } from 'react-native';
import Bell from '../../components/ui/icons/Bell';
import { ForYouTab } from '../../components/Main/ForYouTab';
import { BrandsTab } from '../../components/Main/BrandsTab';
import styles from './styles';
import MasonryList from '@react-native-seoul/masonry-list';
import WishCard from '../../components/Main/WishCard';
import { Wish } from '../wishCreating/interfaces';
import DesignStars from '../../components/ui/icons/DesignStars';
import DesignedText from '../../components/ui/DesignedText';

type HomeScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const news = [
  {
    text: "Колаборація з Юлією Лунковою",
    image: ""
  },
  {
    text: "Колаборація з Юлією Лунковою",
    image: ""
  },
  {
    text: "Колаборація з Юлією Лунковою",
    image: ""
  },
]

const brands = [
  {
    text: "БРЕНД 1",
    image: ""
  },
  {
    text: "БРЕНД 1",
    image: ""
  },
  {
    text: "БРЕНД 1",
    image: ""
  },
  {
    text: "БРЕНД 1",
    image: ""
  },
  {
    text: "БРЕНД 1",
    image: ""
  },
  {
    text: "БРЕНД 1",
    image: ""
  },
]

function HomeScreen({ navigation }: HomeScreenProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);

  const renderItem = ({ item, i }: {item: unknown, i: number}) => (
    <WishCard wish={item as Wish} key={i}/>
  );

  return (
    <ScreenContainer>
        <View style={styles.topBar}>
          <Logo/>
          <Bell />
        </View>
        <ForYouTab news={news}/>
        <BrandsTab brands={brands}/>
        <View>
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
    </ScreenContainer>
  );
};

export default HomeScreen;
