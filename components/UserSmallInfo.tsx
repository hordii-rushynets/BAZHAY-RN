import React from "react";
import { Image, View } from "react-native";
import DesignedText from "./ui/DesignedText";
import Profile from "./ui/icons/Profile";
import styles from "../screens/styles";

type UserSmallInfoProps = {
    avatar: string;
    name: string;
    nickname: string;
}

export function UserSmallInfo({ avatar, name, nickname }: UserSmallInfoProps) {
  return (
    <View style={styles.userSmallInfoContainer}>
        <View style={styles.userSmallInfoAvatarContainer}>
            {avatar ? <Image source={{ uri: avatar }} style={styles.wishImage}/> : <Profile />}
        </View>
        <View>
            <DesignedText size="small">{name || ""}</DesignedText>
            <DesignedText size="small" isUppercase={false}>@{nickname || ""}</DesignedText>
        </View>
    </View>
  );
}
