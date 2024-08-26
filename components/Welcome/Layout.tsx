import React, { ReactNode } from 'react';
import { View, TouchableOpacity } from 'react-native';
import ProgressBar from '../ui/ProgressBar';
import ScreenContainer from '../ui/ScreenContainer';
import styles from '../../screens/welcome/styles'
import DesignedText from '../ui/DesignedText';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';

type LayoutProps = {
    children: ReactNode;
    index: number;
    displaySkip?: boolean;
}

const Layout = ({ children, index, displaySkip = true }: LayoutProps) => {
  const { completeWelcome } = useAuth();
  const { staticData } = useLocalization();
  return (
    <ScreenContainer>
        <View>
            <ProgressBar index={index} n={3}/>
            {displaySkip && <TouchableOpacity onPress={() => {completeWelcome()}} style={styles.link}><DesignedText size="small" isUppercase={false}>{staticData.welcome.layout.skipButton}</DesignedText></TouchableOpacity>}
        </View>
        {children}
    </ScreenContainer>
  );
};

export default Layout;
