import React, { ReactElement, ReactNode } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styles from "../../screens/main/styles"
import Home from '../ui/icons/Home';
import Search from '../ui/icons/Search';
import Community from '../ui/icons/Community';
import Profile from '../ui/icons/Profile';
import PlusInCircle from '../ui/icons/PlusInCircle';
import DesignedText from '../ui/DesignedText';
import { useLocalization } from '../../contexts/LocalizationContext';

type TabBarProps = BottomTabBarProps & {
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  showPopUp: boolean;
}

export const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation, setShowPopUp, showPopUp }) => {
    const { staticData } = useLocalization();
    return (
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
  
          const onPress = () => {
            if (index !== 2) {
              navigation.navigate(route.name);
            }
            setShowPopUp(false);
          };
  
          let icon: ReactElement = <></>;
          let span: string = "";
          if (route.name === 'Home') {
            icon = <Home />;
            span = staticData.main.tabBar.home
          }
          else if (route.name === 'Search') {
            icon = <Search />;
            span = staticData.main.tabBar.search;
          }
          else if (route.name === 'Community') {
            icon = <Community />;
            span = staticData.main.tabBar.community
          }
          else if (route.name === 'Profile') {
            icon = <Profile />;
            span = staticData.main.tabBar.profile
          }
  
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabButton}
            >
              {index === 2 ? (
                <TouchableOpacity
                  onPress={() => {
                    setShowPopUp(true);
                  }}
                  style={styles.centerButton}
                >
                  <PlusInCircle />
                  {showPopUp && <DesignedText bold={true} size={"smallest"} style={styles.buttonText}>{staticData.main.tabBar.createWish}</DesignedText>}
                </TouchableOpacity>
              ) : (
                <>
                  {icon}
                  {isFocused && !showPopUp && <DesignedText bold={true} size={"smallest"} style={styles.buttonText}>{span}</DesignedText>}
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };