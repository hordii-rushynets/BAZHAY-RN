import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from '../ui/ProgressBar';
import { Link } from '@react-navigation/native';
import ScreenContainer from '../ui/ScreenContainer';
import styles from '../../screens/welcome/styles'
import DesignedText from '../ui/DesignedText';
import { useLocalization } from '../../contexts/LocalizationContext';
import BackButton from '../ui/buttons/BackButton';

type LayoutProps = {
    children: ReactNode;
    index: number;
    link: string;
    editingMode?: boolean;
}

const WishCreatingLayout = ({ children, index, link, editingMode = false }: LayoutProps) => {
  const { staticData } = useLocalization();

  return (
    <ScreenContainer>
        <BackButton link={link}/>
        {!editingMode && <View>
            <ProgressBar index={index} n={6}/>
            <DesignedText isUppercase={false} size={"small"}>{staticData.wishCreating.wishCreatingLayout.topText} {index + 1}/{6}</DesignedText>
        </View>}
        {children}
    </ScreenContainer>
  );
};

export default WishCreatingLayout;
