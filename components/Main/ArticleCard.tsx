import React from 'react';
import { Image, View } from 'react-native';
import DesignedText from '../ui/DesignedText';
import { useLocalization } from '../../contexts/LocalizationContext';
import styles from '../../screens/main/styles';

type ArticleCardProps = {
  article: {
    text: string;
    image: string;
  }
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
    const { staticData } = useLocalization();
    return (
      <View style={styles.articleCardContainer}>
        <View style={styles.articleCardImageContainer}>
            {article.image !== "" && <Image source={{ uri: article.image }} style={styles.articleCardImage}/>}
        </View>
        <DesignedText size="small" style={styles.articleCardText}>{article.text}</DesignedText>
      </View>
    );
  };