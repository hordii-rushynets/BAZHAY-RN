import React from 'react';
import { Image, View } from 'react-native';
import DesignedText from '../ui/DesignedText';
import { useLocalization } from '../../contexts/LocalizationContext';
import styles from '../../screens/main/styles';
import { Article } from '../../screens/main/interfaces';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootNavigator';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ArticleCardProps = {
  article: Article;
}

type ArticleCardNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const ArticleCard = ({ article }: ArticleCardProps) => {
    const { localization } = useLocalization();
    const navigation = useNavigation<ArticleCardNavigationProp>();

    return (
      <TouchableOpacity onPress={() => { navigation.navigate("HomeScreens", { screen: "Article", params: { slug: article.slug } }) }}>
      <View style={styles.articleCardContainer}>
        <View style={styles.articleCardImageContainer}>
            {article.photo !== "" && <Image source={{ uri: article.photo }} style={styles.articleCardImage}/>}
        </View>
        <DesignedText size="small" style={styles.articleCardText}>{article[`title_${localization}` as keyof Article]}</DesignedText>
      </View>
      </TouchableOpacity>
    );
  };