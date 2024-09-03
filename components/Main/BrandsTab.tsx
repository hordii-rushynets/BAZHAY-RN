import React from 'react';
import { View } from 'react-native';
import DesignedText from '../ui/DesignedText';
import { useLocalization } from '../../contexts/LocalizationContext';
import styles from '../../screens/main/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { BrandCard } from './BrandCard';

type BrandsTabProps = {
  brands: {
    text: string;
    image: string;
  }[]
}

export const BrandsTab = ({brands}: BrandsTabProps) => {
    const { staticData } = useLocalization();
    return (
      <View style={styles.brandsTabContainer}>
        <DesignedText>Бренди</DesignedText>
        <ScrollView horizontal>
          {brands.map(brand => {
            return <BrandCard brand={brand} />
          })}
        </ScrollView>
      </View>
    );
  };