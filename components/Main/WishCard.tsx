import React from "react";
import { Wish } from "../../screens/wishCreating/interfaces";
import { Image, TouchableOpacity, View } from "react-native";
import styles from "../../screens/main/styles"
import DesignedText from "../ui/DesignedText";
import DesignStars from "../ui/icons/DesignStars";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootNavigator";
import { useNavigation } from "@react-navigation/native";
import CopySmall from "../ui/icons/CopySmall";
import { WishService } from "../../screens/wishCreating/services";
import { useAuth } from "../../contexts/AuthContext";
import { useWishCreating } from "../../contexts/WishCreatingContext";

type WishCardProps = {
    wish: Wish;
}

type WishCardNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function WishCard({ wish }: WishCardProps) {
    const navigation = useNavigation<WishCardNavigationProp>();
    const wishService = new WishService();
    const authContext = useAuth();
    const { setWishId, setCopyingMode } = useWishCreating();

    return (
        <TouchableOpacity onPress={() => {navigation.navigate("Wish", { wishId: wish.id || "" })}}>
            <View style={[styles.wishCardImageContainer, { width: 164, aspectRatio: wish.image_size || 3/4 }]} >
                {wish.photo ?
                    <Image source={ {uri: wish.photo} } style={styles.wishCardImage} resizeMode={"cover"}/>
                    :
                    <View style={styles.wishCardStarsContainer}>
                        <DesignStars width={72} height={80}/>
                    </View>
                }
                <View style={styles.buttonsContainer}>
                    {!wish.is_your_wish && <TouchableOpacity onPress={async () => {
                        const copyOfWish: Wish = {
                            name: wish.name,
                            description: wish.description,
                            photo: wish.photo,
                            video: wish.video,
                            link: wish.link,
                            price: wish.price,
                            currency: wish.currency,
                            image_size: wish.image_size
                        }
                        wishService.wishCreate(copyOfWish, authContext).then(createdWish => {
                            if (createdWish.id) {
                                setWishId(createdWish.id);
                                setCopyingMode(true);
                                navigation.navigate("WishCreating", { screen: "WishConfirmation" });
                            }
                        })
                    }}>
                        <View style={styles.smallButton}><CopySmall /></View>
                    </TouchableOpacity>}
                </View>
            </View>
            <View style={styles.wishCardTitle}>
                <DesignedText size="small" numberOfLines={1} ellipsizeMode="tail" style={{flexShrink: 1}}>{wish.name || ""}</DesignedText>
                <DesignedText size="small"> {wish.price || ""} {wish.currency || ""}</DesignedText>
            </View>
        </TouchableOpacity>
    );
}