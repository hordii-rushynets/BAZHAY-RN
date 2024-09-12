import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, PanResponder, View } from 'react-native';
import styles from '../../screens/wishCreating/styles';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import { captureFrames } from '../../utils/helpers';

type VideoCropBarProps = {
  video: string;
  videoDuration: number;
  startTime: number;
  endTime: number;
  currentTime: number;
  setStartTime: (v: number) => void;
  setEndTime: (v: number) => void;
}

export default function VideoCropBar({ video, videoDuration, startTime, endTime, currentTime, setStartTime, setEndTime }: VideoCropBarProps) {
    const [frames, setFrames] = useState<string[]>([]);

    const panLeft = useRef(new Animated.Value(startTime/videoDuration * 343)).current;
    const leftDragPosition = useRef(startTime/videoDuration * 343);
    const panRight = useRef(new Animated.Value(endTime/videoDuration * 343 - 343)).current;
    const rightDragPosition = useRef(endTime/videoDuration * 343 - 343);

    const panLeftResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
            const newLeftPosition = leftDragPosition.current + gestureState.dx;
            if (newLeftPosition < rightDragPosition.current + 300 && newLeftPosition >= 0) {
              panLeft.setValue(newLeftPosition);
            }
          },
        onPanResponderRelease: (e, gestureState) => {
            const newLeftPosition = leftDragPosition.current + gestureState.dx;
            if (newLeftPosition < rightDragPosition.current + 300 && newLeftPosition >= 0) {
              leftDragPosition.current = newLeftPosition;
              setStartTime((newLeftPosition / 343) * videoDuration);
              Animated.spring(panLeft, {
                  toValue: newLeftPosition,
                  useNativeDriver: false,
                }).start();
            }
            else if (newLeftPosition < 0) {
              leftDragPosition.current = 0
            }
            else {
              leftDragPosition.current = rightDragPosition.current + 300;
            }
        },
      })
    ).current;

    const panRightResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: (e, gestureState) => {
              const newRightPosition = rightDragPosition.current + gestureState.dx;
              if (newRightPosition > leftDragPosition.current - 300 && newRightPosition <= 0) {
                panRight.setValue(newRightPosition);
              }
            },
          onPanResponderRelease: (e, gestureState) => {
              const newRightPosition = rightDragPosition.current + gestureState.dx;
              if (newRightPosition > leftDragPosition.current - 300 && newRightPosition <= 0) {
                rightDragPosition.current = newRightPosition;
                setEndTime(((newRightPosition + 343)/343) * videoDuration);
                Animated.spring(panRight, {
                    toValue: newRightPosition,
                    useNativeDriver: false,
                  }).start();
              }
              else if (newRightPosition > 0) {
                rightDragPosition.current = 0
              }
              else {
                rightDragPosition.current = leftDragPosition.current - 300
              }
          },
        })
      ).current;

    
    useEffect(() => {
      captureFrames(video, videoDuration/10, videoDuration).then(frames => { setFrames(frames) });
    }, [video, videoDuration])

    const translateX = useRef(new Animated.Value(startTime/videoDuration * 343)).current;

    useEffect(() => {
      const newTranslateX = (currentTime / videoDuration) * 343;
  
      Animated.timing(translateX, {
        toValue: newTranslateX,
        duration: 200,
        useNativeDriver: true,
        easing: (v) => {
          return v;
        }
      }).start();
    }, [currentTime]);

    return (
      <View style={[styles.videoCropBar, { width: 341 }]}>
        <View style={styles.videoFramesContainer}>
          {frames.map((frame, indx) => {
            return <Image
              key={indx}
              source={{ uri: frame }}
              style={{ height: "100%", width: 31 }}
            />
          })}
        </View>
        <Animated.View style={[styles.timerBar, { transform: [{ translateX: translateX }] }]}>
        </Animated.View>
        <Animated.View style={[styles.cropBar, { transform: [{translateX: -16}, { translateX: panLeft }] }]} {...panLeftResponder.panHandlers}>
        </Animated.View>
        <Animated.View style={[styles.cropBar, { transform: [{translateX: 16}, { translateX: panRight }, { rotateY: "180deg" }], right: 0 }]} {...panRightResponder.panHandlers}>
        </Animated.View>
      </View>
    );
  };