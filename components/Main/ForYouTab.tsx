import React from 'react';
import { View } from 'react-native';
import DesignedText from '../ui/DesignedText';
import { useLocalization } from '../../contexts/LocalizationContext';
import { ArticleCard } from './ArticleCard';
import styles from '../../screens/main/styles';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Article } from '../../screens/main/interfaces';

type ForYouTabProps = {
  news: Article[];
}

export const ForYouTab = ({ news }: ForYouTabProps) => {
    const { staticData } = useLocalization();
    return (
      <View style={styles.forYouTabContainer}>
        <DesignedText>{staticData.main.forYouTabTitle}</DesignedText>
        <SwiperFlatList
          showPagination
          data={news}
          renderItem={({ item }) => (
            <ArticleCard article={item}/>
          )}
          paginationStyle={styles.dotContainer}
          paginationStyleItem={styles.dot}
          paginationStyleItemActive={styles.dotActive}
        />
      </View>
    );
  };