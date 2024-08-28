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

type TabBarProps = BottomTabBarProps & {
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  showPopUp: boolean;
}

export const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation, setShowPopUp, showPopUp }) => {
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
            span = "Дім"
          }
          else if (route.name === 'Search') {
            icon = <Search />;
            span = "Пошук";
          }
          else if (route.name === 'Community') {
            icon = <Community />;
            span = "ком’юніті"
          }
          else if (route.name === 'Profile') {
            icon = <Profile />;
            span = "Профіль"
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
                  {showPopUp && <DesignedText bold={true} size={"smallest"} style={styles.buttonText}>Створити бажання</DesignedText>}
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