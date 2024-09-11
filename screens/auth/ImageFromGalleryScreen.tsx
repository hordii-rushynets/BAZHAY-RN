import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import ScreenContainer from '../../components/ui/ScreenContainer';
import BackButton from '../../components/ui/buttons/BackButton';
import styles from "./styles"
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';
import { useLocalization } from '../../contexts/LocalizationContext';

type ImageFromGalleryScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'ImageFromGallery'>;

interface ImageFromGalleryScreenProps {
  navigation: ImageFromGalleryScreenNavigationProp;
}

const ImageFromGalleryScreen = ({ navigation }: ImageFromGalleryScreenProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [assetCursor, setAssetCursor] = useState<MediaLibrary.AssetRef | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        setPermissionGranted(true);
        loadImages();
      }
    })();
  }, []);

  const loadImages = async () => {
    if (loading || !hasNextPage) return;

    setLoading(true);

    const assets = await MediaLibrary.getAssetsAsync({
      first: 40,
      mediaType: ['photo'],
      after: assetCursor,
      sortBy: [[MediaLibrary.SortBy.creationTime, false]]
    });

    if (assets.assets.length > 0) {
      const assetUris = await Promise.all(
        assets.assets.map(async (asset) => {
          // Get asset info to handle iOS URIs
          const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
          return assetInfo.localUri || asset.uri; // Use localUri if available
        })
      );

      setImages((prevImages) => [...prevImages, ...assetUris]);
      setAssetCursor(assets.endCursor);
      setHasNextPage(assets.hasNextPage);
    }

    setLoading(false);
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={[styles.gridItem, selectedImage === item ? styles.selectedGridItem : {}]} onPress={() => { setSelectedImage(item) }}>
      <Image source={{ uri: item }} style={styles.gridImage} />
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
      <BackButton link={"AccountFillAvatar"}/>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        contentContainerStyle={styles.imageGrid}
        onEndReached={loadImages}
        onEndReachedThreshold={0.5}
      />
      {selectedImage && <SubmitButton onPress={() => {navigation.navigate("AvatarConfirmation", { image: selectedImage })}} width={232} style={styles.gridButton}>{staticData.auth.imageFromGalleryScreen.continueButton}</SubmitButton>}
    </ScreenContainer>
  );
};

export default ImageFromGalleryScreen;
