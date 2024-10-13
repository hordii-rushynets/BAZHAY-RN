import React, { useState } from "react";
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
import { useLocalization } from "../../contexts/LocalizationContext";
import Gift from "../ui/icons/Gift";
import { usePopUpWithTwoOptionsContext } from "../../contexts/PopUpWithTwoOptionsContext";
import { useMessageContext } from "../../contexts/MessageContext";
import Stick from "../ui/icons/Stick";
import Fulfilled from "../ui/icons/Fulfilled";
import NotFulfilled from "../ui/icons/NotFulfilled";

type WishCardProps = {
    wish: Wish;
}

type WishCardNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function WishCard({ wish }: WishCardProps) {
    const navigation = useNavigation<WishCardNavigationProp>();
    const wishService = new WishService();
    const authContext = useAuth();
    const { isGuest } = useAuth();
    const { setWishId, setCopyingMode } = useWishCreating();
    const { localization, staticData } = useLocalization();
    const { setIsOpen, setText, setOnAccept, setOnCancel } = usePopUpWithTwoOptionsContext();
    const { setIsOpen: setMessageOpen, setText: setMessageText } = useMessageContext();
    const [isReserved, setIsReserved] = useState<boolean>();
    const [isFulfilled, setIsFulfilled] = useState<boolean>();
    const [isCandidate, setIsCandidate] = useState<boolean>();

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
                    {!wish.is_your_wish && !isGuest && <TouchableOpacity onPress={async () => {
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
                            if (createdWish.premiumError) {
                              navigation.navigate("WishCreating", { screen: "Premium" });
                              return;
                            }
                            if (createdWish.id) {
                                setWishId(createdWish.id);
                                setCopyingMode(true);
                                navigation.navigate("WishCreating", { screen: "WishConfirmation" });
                            }
                        })
                    }}>
                        <View style={styles.smallButton}><CopySmall /></View>
                    </TouchableOpacity>}
                    {!wish.is_fulfilled && !wish.is_your_wish && !isGuest && wish.is_user_create && !(wish.is_reservation || isReserved) && !(wish.is_me_candidates_to_reservation || isCandidate) &&
                        <TouchableOpacity onPress={() => {
                            setText(
                                <DesignedText size="small" style={{ textAlign: "center" }}>{staticData.doYouWantToFulfillWish.firstPart} <DesignedText size="small" italic={true}>{staticData.doYouWantToFulfillWish.italicPart}</DesignedText> {staticData.doYouWantToFulfillWish.secondPart}</DesignedText>
                            );
                            setOnCancel(() => () => {
                                setIsOpen(false);
                            });
                            setOnAccept(() => () => {
                                wishService.reserveWish(wish.id || "", authContext).then(success => {
                                    if (success) {
                                        setIsOpen(false);
                                        if (wish.author?.is_premium) {
                                            setIsCandidate(true);
                                            setMessageText(staticData.fulfillWishPremiumMessage);
                                            setMessageOpen(true);
                                        }
                                        else {
                                            setIsReserved(true);
                                            setMessageText(staticData.fulfillWishNotPremiumMessage);
                                            setMessageOpen(true);
                                        }
                                    }
                                });
                            });
                            setIsOpen(true);
                        }}>
                            <View style={styles.smallButton}><Gift /></View>
                        </TouchableOpacity>
                    }
                    {!wish.is_fulfilled && !isGuest && wish.is_user_create && (wish.is_reservation || isReserved) && !(wish.is_me_candidates_to_reservation || isCandidate) &&
                        <TouchableOpacity onPress={() => {
                            if (wish.is_reserved_by_me) {
                                setMessageText(staticData.firstTypeReservationButton);
                                setMessageOpen(true);
                            }
                            else if (wish.is_your_wish && wish.author?.is_premium) {
                                wishService.getReservations(wish.id || "", authContext).then(reservation => {
                                    if (reservation.wish) {
                                        setMessageText(`${staticData.secondTypeReservationButton}${reservation.selected_user?.username}`);
                                        setMessageOpen(true);
                                    }
                                })
                            }
                            else if (wish.is_your_wish && !wish.author?.is_premium) {
                                setMessageText(staticData.thirdTypeReservationButton);
                                setMessageOpen(true);
                            }
                            else {
                                setMessageText(staticData.fourthTypeReservationButton);
                                setMessageOpen(true);
                            }
                        }}>
                            <View style={[styles.smallButton, { alignItems: "flex-start", justifyContent: "flex-start", paddingLeft: 8.5, paddingTop: 2}]}><Stick /></View>
                        </TouchableOpacity>
                    }
                    {(wish.is_fulfilled || isFulfilled) && wish.is_user_create &&
                        <TouchableOpacity onPress={() => {
                            setMessageText(staticData.fulfilledMessage);
                            setMessageOpen(true);
                        }}>
                            <View style={styles.smallButton}><Fulfilled /></View>
                        </TouchableOpacity>
                    }
                    {!(wish.is_fulfilled || isFulfilled) && wish.is_your_wish &&
                        <TouchableOpacity onPress={() => {
                            setText(
                                <DesignedText size="small" style={{ textAlign: "center" }}><DesignedText size="small" bold={true}>{staticData.doesHelped.bold}</DesignedText> {staticData.doesHelped.first} <DesignedText size="small" italic={true}>{staticData.doesHelped.italic}</DesignedText> {staticData.doesHelped.second}</DesignedText>
                            )
                            setOnCancel(() => () => {
                                setIsOpen(false);
                            });
                            setOnAccept(() => () => {
                                wishService.markWishAsFulfilled(wish?.id || "", authContext).then(success => {
                                  if (success) {
                                    setIsOpen(false);
                                    setMessageText(staticData.yourWishFulfilled);
                                    setMessageOpen(true);
                                    setIsFulfilled(true);
                                  }
                                });
                            });
                            setIsOpen(true);
                        }}>
                            <View style={styles.smallButton}><NotFulfilled /></View>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <View style={styles.wishCardTitle}>
                <DesignedText size="small" numberOfLines={1} ellipsizeMode="tail" style={{flexShrink: 1}}>{wish[`name_${localization}` as keyof Wish] as string || wish.name || ""}</DesignedText>
                <DesignedText size="small"> {wish.price || ""} {wish.currency || ""}</DesignedText>
            </View>
        </TouchableOpacity>
    );
}