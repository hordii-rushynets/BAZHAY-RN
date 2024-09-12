import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, PanResponder, View } from 'react-native';
import styles from '../../screens/wishCreating/styles';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import { captureFrames, extractFrame } from '../../utils/helpers';

type VideoCropBarProps = {
  video: string;
  videoDuration: number;
  coverTime: number;
  cover: string;
  setCover: (v: string) => void;
  setCoverTime: (v: number) => void;
}

export default function VideoCoverBar({ video, videoDuration, cover, coverTime, setCover, setCoverTime }: VideoCropBarProps) {
    const [frames, setFrames] = useState<string[]>([]);
    
    useEffect(() => {
      captureFrames(video, videoDuration/10, videoDuration).then(frames => { setFrames(frames) });
    }, [video, videoDuration])

    const panLeft = useRef(new Animated.Value(coverTime/videoDuration * 341)).current;
    const leftDragPosition = useRef(coverTime/videoDuration * 341);

    const panLeftResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
            const newLeftPosition = leftDragPosition.current + gestureState.dx;
            if (newLeftPosition >= 0 && newLeftPosition <= 341) {
              panLeft.setValue(newLeftPosition);
              setCoverTime(newLeftPosition/341 * videoDuration);
            }
          },
        onPanResponderRelease: (e, gestureState) => {
            const newLeftPosition = leftDragPosition.current + gestureState.dx;
            if (newLeftPosition >= 0 && newLeftPosition <= 341) {
              leftDragPosition.current = newLeftPosition;
              extractFrame(video, newLeftPosition/341 * videoDuration).then(frame => setCover(frame));
              Animated.spring(panLeft, {
                  toValue: newLeftPosition,
                  useNativeDriver: false,
                }).start();
            }
            else if (newLeftPosition < 0) {
              leftDragPosition.current = 0
            }
            else {
              leftDragPosition.current = 341;
            }
        },
      })
    ).current;

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
        <Animated.View style={[styles.coverBar, { transform: [{translateX: -17}, { translateX: panLeft }] }]} {...panLeftResponder.panHandlers}>
            <Image
                source={{ uri: cover }}
                style={{ width: "100%", height: "100%"}}
            />
        </Animated.View>
      </View>
    );
  };