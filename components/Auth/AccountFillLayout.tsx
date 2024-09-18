import React, { ReactNode } from 'react';
import { View } from 'react-native';
import ProgressBar from '../ui/ProgressBar';
import ScreenContainer from '../ui/ScreenContainer';
import DesignedText from '../ui/DesignedText';
import { useLocalization } from '../../contexts/LocalizationContext';

type LayoutProps = {
    children: ReactNode;
    index: number;
}

const AccountFillLayout = ({ children, index }: LayoutProps) => {
  const { staticData } = useLocalization();

  return (
    <ScreenContainer>
        <View>
            <ProgressBar index={index} n={5}/>
            <DesignedText isUppercase={false} size={"small"}>{staticData.auth.accountFillLayout.topText} {index + 1}/{5}</DesignedText>
        </View>
        {children}
    </ScreenContainer>
  );
};

export default AccountFillLayout;
