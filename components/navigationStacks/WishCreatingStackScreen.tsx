import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddWishTitleScreen from '../../screens/wishCreating/AddWishTitleScreen';
import AddWishPhotoOrVideoScreen from '../../screens/wishCreating/AddWishPhotoOrVideoScreen';
import AddWishPriceScreen from '../../screens/wishCreating/AddWishPriceScreen';
import AddWishLinkScreen from '../../screens/wishCreating/AddWishLinkScreen';
import AddWishDescriptionScreen from '../../screens/wishCreating/AddWishDescriptionScreen';
import AddWishVisibilityScreen from '../../screens/wishCreating/AddWishVisibilityScreen';
import AddWishFromGalleryScreen from '../../screens/wishCreating/AddWishFromGalleryScreen';
import ImageResizeScreen from '../../screens/wishCreating/ImageResizeScreen';
import WishImageConfirmationScreen from '../../screens/wishCreating/WishImageConfirmationScreen';
import WishConfirmationScreen from '../../screens/wishCreating/WishConfirmationScreen';
import VideoEditScreen from '../../screens/wishCreating/VideoEditScreen';
import { FileInterface } from '../../screens/wishCreating/interfaces';


export type WishCreatingStackParamList = {
  AddWishTitle: undefined;
  AddWishPhotoOrVideo: undefined;
  AddWishPrice: undefined;
  AddWishLink: undefined;
  AddWishDescription: undefined;
  AddWishVisibility: undefined;
  AddWishFromGallery: undefined;
  ImageResize: { image: FileInterface };
  WishImageConfirmation: { image: FileInterface, ratio: { width: number, height: number }};
  WishConfirmation: undefined;
  VideoEdit: { video: FileInterface };
};

const WishCreatingStack = createStackNavigator<WishCreatingStackParamList>();

const WishCreatingStackScreen: React.FC = () => (
  <WishCreatingStack.Navigator screenOptions={{ headerShown: false }}>
    <WishCreatingStack.Screen name="AddWishTitle" component={AddWishTitleScreen}/>
    <WishCreatingStack.Screen name="AddWishPhotoOrVideo" component={AddWishPhotoOrVideoScreen} />
    <WishCreatingStack.Screen name="AddWishPrice" component={AddWishPriceScreen}/>
    <WishCreatingStack.Screen name="AddWishLink" component={AddWishLinkScreen}/>
    <WishCreatingStack.Screen name="AddWishDescription" component={AddWishDescriptionScreen}/>
    <WishCreatingStack.Screen name="AddWishVisibility" component={AddWishVisibilityScreen}/>
    <WishCreatingStack.Screen name="AddWishFromGallery" component={AddWishFromGalleryScreen}/>
    <WishCreatingStack.Screen name="ImageResize" component={ImageResizeScreen}/>
    <WishCreatingStack.Screen name="WishImageConfirmation" component={WishImageConfirmationScreen}/>
    <WishCreatingStack.Screen name="WishConfirmation" component={WishConfirmationScreen}/>
    <WishCreatingStack.Screen name="VideoEdit" component={VideoEditScreen}/>
  </WishCreatingStack.Navigator>
);

export default WishCreatingStackScreen;
