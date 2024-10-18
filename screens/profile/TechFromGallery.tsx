import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import ScreenContainer from '../../components/ui/ScreenContainer';
import BackButton from '../../components/ui/buttons/BackButton';
import authStyles from "../auth/styles"
import { StackNavigationProp } from '@react-navigation/stack';
import { useLocalization } from '../../contexts/LocalizationContext';
import { RootStackParamList } from '../../components/RootNavigator';
import wishStyles from '../wishCreating/styles';
import { ResizeMode, Video } from 'expo-av';
import { isVideo } from '../../utils/helpers';
import { FontAwesome6 } from '@expo/vector-icons';
import { FileInterface } from '../wishCreating/interfaces';
import { getLocalUri } from '../../utils/helpers';

type TechFromGalleryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TechFromGallery'>;

interface TechFromGalleryScreenProps {
  navigation: TechFromGalleryScreenNavigationProp;
}

const TechFromGalleryScreen = ({ navigation }: TechFromGalleryScreenProps) => {
  const [files, setFiles] = useState<FileInterface[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [assetCursor, setAssetCursor] = useState<MediaLibrary.AssetRef | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<FileInterface | undefined>();
  const [ showImages, setShowImages ] = useState(true);
  const [ showVideos, setShowVideos ] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        setPermissionGranted(true);
        loadFiles();
      }
    })();
  }, []);

  const loadFiles = async () => {
    if (loading || !hasNextPage) return;

    setLoading(true);

    const assets = await MediaLibrary.getAssetsAsync({
      first: 40,
      mediaType: (showVideos && showImages) ? ["photo", "video"] : (showVideos ? "video" : "photo"),
      after: assetCursor,
      sortBy: [[MediaLibrary.SortBy.creationTime, false]]
    });

    if (assets.assets.length > 0) {
      const assetFiles = await Promise.all(
        assets.assets.map(async (asset) => {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
          const uri = await getLocalUri(assetInfo.localUri || asset.uri);
          return {
            name: asset.filename, 
            type: [asset.mediaType, "/", asset.filename.split(".").at(-1)].join(""), 
            uri: uri
          };
        })
      );
      setFiles((prevFiles) => [...prevFiles, ...assetFiles]);
      setAssetCursor(assets.endCursor);
      setHasNextPage(assets.hasNextPage);
    }

    setLoading(false);
  };

  const reloadFiles = async (mediaType: MediaLibrary.MediaTypeValue | MediaLibrary.MediaTypeValue[] | undefined) => {
    setLoading(true);
    setFiles([]);

    const assets = await MediaLibrary.getAssetsAsync({
      first: 40,
      mediaType: mediaType,
      after: undefined,
      sortBy: [[MediaLibrary.SortBy.creationTime, false]]
    });

    if (assets.assets.length > 0) {
      const assetFiles = await Promise.all(
        assets.assets.map(async (asset) => {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
          const uri = await getLocalUri(assetInfo.localUri || asset.uri);
          return {
            name: asset.filename, 
            type: [asset.mediaType, "/", asset.filename.split(".").at(-1)].join(""), 
            uri: uri
          };
        })
      );

      setFiles([...assetFiles]);
      setAssetCursor(assets.endCursor);
      setHasNextPage(assets.hasNextPage);
    }

    setLoading(false);
  };

  const renderItem = ({ item }: { item: FileInterface }) => (
    <TouchableOpacity style={[authStyles.gridItem, selectedFile === item ? authStyles.selectedGridItem : {}]} onPress={() => { setSelectedFile(item) }}>
      {isVideo(item.uri) ? 
        <><Video source={{uri: item.uri}} style={authStyles.gridImage} resizeMode={"cover" as ResizeMode}/>
        <FontAwesome6 name="play" size={15} color="#B70000" style={wishStyles.videoIcon}/></> : 
        <Image source={{ uri: item.uri }} style={authStyles.gridImage} />
      }
    </TouchableOpacity>
  );

  const { staticData } = useLocalization();

  if (!permissionGranted) {
    return (
      <ScreenContainer>
        <Text>Permission to access the gallery is required.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <BackButton/>
      <View style={wishStyles.galleryNavbar}>
        <SubmitButton onPress={() => {setShowImages(true); setShowVideos(true); reloadFiles(["photo", "video"])}} width={80} style={showImages && showVideos && wishStyles.galleryNavbarActiveButton} textStyle={[wishStyles.galleryNavbarButtonText, showImages && showVideos && wishStyles.galleryNavbarActiveButtonText]}>{staticData.wishCreating.addWishFromGalleryScreen.all}</SubmitButton>
        <SubmitButton onPress={() => {setShowImages(false); setShowVideos(true); reloadFiles("video")}} width={80} style={!showImages && showVideos && wishStyles.galleryNavbarActiveButton} textStyle={[wishStyles.galleryNavbarButtonText, !showImages && showVideos && wishStyles.galleryNavbarActiveButtonText]}>{staticData.wishCreating.addWishFromGalleryScreen.video}</SubmitButton>
        <SubmitButton onPress={() => {setShowImages(true); setShowVideos(false); reloadFiles("photo")}} width={80} style={showImages && !showVideos && wishStyles.galleryNavbarActiveButton} textStyle={[wishStyles.galleryNavbarButtonText, showImages && !showVideos && wishStyles.galleryNavbarActiveButtonText]}>{staticData.wishCreating.addWishFromGalleryScreen.photo}</SubmitButton>
      </View>
      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        contentContainerStyle={authStyles.imageGrid}
        onEndReached={loadFiles}
        onEndReachedThreshold={0.5}
      />
      {selectedFile && <SubmitButton onPress={() => {
        navigation.navigate("TechFileConfirmation", { file: selectedFile });
      }} width={232} style={authStyles.gridButton}>{staticData.wishCreating.addWishFromGalleryScreen.button}</SubmitButton>}
    </ScreenContainer>
  );
};

export default TechFromGalleryScreen;
