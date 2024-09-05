import React from 'react';
import { View } from 'react-native';
import DesignedText from '../ui/DesignedText';
import { useLocalization } from '../../contexts/LocalizationContext';
import styles from '../../screens/main/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { BrandCard } from './BrandCard';
import { Brand } from '../../screens/main/interfaces';

type BrandsTabProps = {
  brands: Brand[]
}

export const BrandsTab = ({brands}: BrandsTabProps) => {
    const { staticData } = useLocalization();
    return (
      <View style={styles.brandsTabContainer}>
        <DesignedText>Бренди</DesignedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {brands.map((brand, indx) => {
            return <BrandCard brand={brand} key={indx}/>
          })}
        </ScrollView>
      </View>
    );
  };