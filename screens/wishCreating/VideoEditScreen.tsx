import React, { useEffect, useRef, useState } from 'react';
import { Image, View } from 'react-native';
import authStyles from "../auth/styles"
import styles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../components/RootNavigator';
import ScreenContainer from '../../components/ui/ScreenContainer';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import BackButton from '../../components/ui/buttons/BackButton';
import { ResizeMode, Video } from 'expo-av';
import VideoCropBar from '../../components/WishCreating/VideoCropBar';
import VideoCoverBar from '../../components/WishCreating/VideoCoverBar';
import { blobToBase64, extractFrame, getBlobFromUri } from '../../utils/helpers';
import DesignedText from '../../components/ui/DesignedText';
import { WishService } from './services';
import { useWishCreating } from '../../contexts/WishCreatingContext';
import { useAuth } from '../../contexts/AuthContext';

type VideoEditScreenRouteProp = RouteProp<RootStackParamList, 'VideoEdit'>;
type VideoEditScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VideoEdit'>;

interface VideoEditScreenProps {
  route: VideoEditScreenRouteProp;
  navigation: VideoEditScreenNavigationProp;
}

function VideoEditScreen({ route, navigation }: VideoEditScreenProps) {
  const { video } = route.params;
  const [ cover, setCover ] = useState("");
  const [ coverTime, setCoverTime ] = useState(0);
  const [ croppingMode, setCroppingMode ] = useState(false);
  const [ coverMode, setCoverMode ] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState(150);
  const [endTime, setEndTime] = useState(videoDuration);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEndTime(videoDuration - 150);
    setLoading(false);
  }, [videoDuration]);

  useEffect(() => {
    extractFrame(video.uri, 0).then((frame) => setCover(frame));
  }, [video]);

  useEffect(() => {
    if (videoRef.current) {
      setIsSeeking(true);
      videoRef.current.setPositionAsync(coverTime).then(() => {
        setIsSeeking(false); 
      });
    }
  }, [coverTime])

  const handleVideoLoad = (status: any) => {
    if (status.durationMillis) {
      setVideoDuration(status.durationMillis);
    }
  };

  const videoRef = useRef<Video>(null);

  const [isSeeking, setIsSeeking] = useState(false);

  const handleProgress = (status: any) => {
    if (status.positionMillis >= endTime && videoRef.current && !isSeeking) {
      setIsSeeking(true);
      videoRef.current.setPositionAsync(startTime).then(() => {
        setIsSeeking(false); 
      });
    } else {
      setCurrentTime(status.positionMillis);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      setIsSeeking(true);
      videoRef.current.setPositionAsync(startTime).then(() => {
        setIsSeeking(false); 
      });
    }
  }, [startTime]);

  const wishService = new WishService();
  const { wishId, editingMode } = useWishCreating();
  const authContext = useAuth();

  if (loading) {
    return (
      <ScreenContainer>
        <BackButton link={"AddWishFromGallery"}/>
      </ScreenContainer>
    )
  }
  
  return (
    <ScreenContainer>
        <BackButton link={"AddWishFromGallery"}/>
        <View style={styles.videoEditorContainer}>
            <View style={styles.videoContainer}>
                {coverMode ?
                  <Video
                    ref={videoRef}
                    source={{ uri: video.uri }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={true}
                    shouldPlay={false}
                    isLooping={false}
                    resizeMode={ResizeMode.CONTAIN}
                    style={{width: "100%", height: "100%"}}
                    onLoad={handleVideoLoad}
                  />
                : 
                  <Video
                    ref={videoRef}
                    source={{ uri: video.uri }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={true}
                    shouldPlay
                    isLooping={false}
                    onPlaybackStatusUpdate={handleProgress}
                    progressUpdateIntervalMillis={200}
                    resizeMode={ResizeMode.CONTAIN}
                    style={{width: "100%", height: "100%"}}
                    onLoad={handleVideoLoad}
                  />
                } 
            </View>
            {croppingMode ?  
                <VideoCropBar video={video.uri} videoDuration={videoDuration} startTime={startTime} endTime={endTime} currentTime={currentTime} setStartTime={setStartTime} setEndTime={setEndTime}/>
            : coverMode ?
                <View style={styles.coverBarContainer}>
                  <DesignedText size="small" isUppercase={false}>Натисніть, щоб обрати обкладинку</DesignedText>
                  <VideoCoverBar video={video.uri} videoDuration={videoDuration} cover={cover} coverTime={coverTime} setCover={setCover} setCoverTime={setCoverTime}/>
                </View>
            :   <View style={styles.videoEditingButtonsContainer }>
                    <SubmitButton onPress={() => { setCroppingMode(true) }} width={168} height={32} textStyle={styles.videoEditingText}>обрізати відео</SubmitButton>
                    <SubmitButton onPress={() => { setCoverMode(true) }} width={168} height={32} textStyle={styles.videoEditingText}>обрати обкладинку</SubmitButton>
                </View>
            }
        </View>
        <SubmitButton 
            onPress={
                async () => {
                  if (croppingMode) {setCroppingMode(false)}
                  else if (coverMode) {setCoverMode(false)}
                  else {
                    wishService.wishVideoUpdate(video, Math.floor(startTime/1000), Math.ceil(endTime/1000), wishId||"", authContext).then(success => {
                      if (success) {
                        wishService.wishPhotoUpdate(cover, {width: 9, height: 16}, wishId||"", authContext).then(success => {
                          if (success) {
                            navigation.navigate(editingMode ? "WishConfirmation" : "AddWishPrice");
                          }
                        })  
                      }
                    });                
                  }
                }}
            width={200}
            style={authStyles.gridButton}
        >Готово</SubmitButton>
    </ScreenContainer>
  );
};

export default VideoEditScreen;
