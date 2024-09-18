import React from "react";
import { Image, View } from "react-native";
import DesignedText from "./ui/DesignedText";
import Profile from "./ui/icons/Profile";
import styles from "../screens/styles";
import UserSmallAvatar from "./ui/icons/UserSmallAvatar";

type UserSmallInfoProps = {
    avatar: string;
    name: string;
    nickname: string;
    size?: "small" | "big";
}

export function UserSmallInfo({ avatar, name, nickname, size = "small" }: UserSmallInfoProps) {
  return (
    <View style={styles.userSmallInfoContainer}>
        <View style={[styles.userSmallInfoAvatarContainer, size === "big" ? { width: 56, height: 56 } : {}]}>
            {avatar ? <Image source={{ uri: avatar }} style={styles.wishImage}/> : size === "small" ? <Profile /> : <UserSmallAvatar />}
        </View>
        <View style={styles.userSmallInfoText}>
            <DesignedText size="small">{name || ""}</DesignedText>
            <DesignedText size="small" isUppercase={false}>@{nickname || ""}</DesignedText>
        </View>
    </View>
  );
}
