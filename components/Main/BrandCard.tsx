import React from 'react';
import { Image, View } from 'react-native';
import DesignedText from '../ui/DesignedText';
import { useLocalization } from '../../contexts/LocalizationContext';
import styles from '../../screens/main/styles';
import { Brand } from '../../screens/main/interfaces';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootNavigator';
import { useNavigation } from '@react-navigation/native';

type BrandCardProps = {
  brand: Brand;
}

type BrandCardNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const BrandCard = ({ brand }: BrandCardProps) => {
    const { localization } = useLocalization();
    const navigation = useNavigation<BrandCardNavigationProp>();

    return (
      <TouchableOpacity onPress={() => { navigation.navigate('HomeScreens', { screen: "Brand", params: { slug: brand.slug } }) }}>
        <View style={styles.brandCardContainer}>
          <View style={styles.brandCardImageContainer}>
              {brand.photo !== "" && <Image source={{ uri: brand.photo }} style={styles.articleCardImage}/>}
          </View>
          <DesignedText size="small">{brand[`name_${localization}` as keyof Brand]}</DesignedText>
        </View>
      </TouchableOpacity>
    );
  };