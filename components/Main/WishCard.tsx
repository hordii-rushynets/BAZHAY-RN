import React, { useEffect, useState } from "react";
import { Wish } from "../../screens/wishCreating/interfaces";
import { Image, TouchableOpacity, View } from "react-native";
import * as ImageManipulator from 'expo-image-manipulator';
import styles from "../../screens/main/styles"
import DesignedText from "../ui/DesignedText";
import BigLogo from "../ui/icons/BigLogo";
import DesignStars from "../ui/icons/DesignStars";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootNavigator";
import { useNavigation } from "@react-navigation/native";

type WishCardProps = {
    wish: Wish;
}

type WishCardNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function WishCard({ wish }: WishCardProps) {
    const navigation = useNavigation<WishCardNavigationProp>();

    return (
        <TouchableOpacity onPress={() => {navigation.navigate("Wish", { wishId: wish.id || "" })}}>
            <View style={[styles.wishCardImageContainer, { width: 164, aspectRatio: wish.image_size }]} >
                {wish.photo && <Image source={ {uri: wish.photo} } style={styles.wishCardImage} resizeMode={"cover"}/>}
                <View style={styles.wishCardStarsContainer}>
                    <DesignStars width={72} height={80}/>
                </View>
            </View>
            <View style={styles.wishCardTitle}>
                <DesignedText size="small" numberOfLines={1} ellipsizeMode="tail" style={{flexShrink: 1}}>{wish.name || ""}</DesignedText>
                <DesignedText size="small"> {wish.price || ""} {wish.currency || ""}</DesignedText>
            </View>
        </TouchableOpacity>
    );
}