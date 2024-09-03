import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, PanResponder, Dimensions, PanResponderInstance } from 'react-native';

interface SwiperProps {
  children: React.ReactNode;
}

const Swiper: React.FC<SwiperProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const panResponderRef = useRef<PanResponderInstance | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    panResponderRef.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Animated.spring(scrollX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: scrollX },
        ],
        { useNativeDriver: true }
      ),
      onPanResponderRelease: (e, gestureState) => {
        const screenWidth = Dimensions.get('window').width;
        const threshold = screenWidth / 3;
        if (Math.abs(gestureState.dx) > threshold) {
          const newIndex = gestureState.dx > 0 ? activeIndex - 1 : activeIndex + 1;
          scrollToIndex(newIndex);
        } else {
          scrollToIndex(activeIndex);
        }
      },
    });
  }, []);

  const scrollToIndex = (index: number) => {
    Animated.spring(scrollX, {
      toValue: -index * screenWidth,
      useNativeDriver: true,
    }).start();
    setActiveIndex(index);
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        {...panResponderRef.current?.panHandlers}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
};

export default Swiper;