import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';
import { Link } from '@react-navigation/native';
import generalStyles from '../generalStyles'; 

type LayoutProps = {
    children: ReactNode;
    index: number;
}

const Layout = ({ children, index }: LayoutProps) => {
  return (
    <View style={generalStyles.screenContainer}>
      <View>
        <ProgressBar index={index} />
        <Link to="">Пропустити</Link>
      </View>
      <View>
        {children}
      </View>
    </View>
  );
};

export default Layout;
