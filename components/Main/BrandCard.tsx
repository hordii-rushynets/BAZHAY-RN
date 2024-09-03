import React from 'react';
import { Image, View } from 'react-native';
import DesignedText from '../ui/DesignedText';
import { useLocalization } from '../../contexts/LocalizationContext';
import styles from '../../screens/main/styles';

type BrandCardProps = {
  brand: {
    text: string;
    image: string;
  }
}

export const BrandCard = ({ brand }: BrandCardProps) => {
    const { staticData } = useLocalization();
    return (
      <View style={styles.brandCardContainer}>
        <View style={styles.brandCardImageContainer}>
            {brand.image !== "" && <Image source={{ uri: brand.image }} style={styles.articleCardImage}/>}
        </View>
        <DesignedText size="small">{brand.text}</DesignedText>
      </View>
    );
  };