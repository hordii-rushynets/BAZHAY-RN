import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import UpDownArrow from "../ui/icons/UpDownArrow";
import styles from "../../screens/main/styles";
import DesignedText from "../ui/DesignedText";
import Checkmark from "../ui/icons/Checkmark";
import { useLocalization } from "../../contexts/LocalizationContext";

type SortingButtonProps = { 
    sortings: {[key: string]: string};
    setSortings: (value: {[key: string]: string}) => void;
}

export default function SortingButton({ sortings, setSortings }: SortingButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { staticData } = useLocalization();

    if (!isOpen) {
        return (
            <TouchableOpacity style={styles.closedSortingContainer} onPress={() => {
                setIsOpen(true)
            }}>
                <UpDownArrow />
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.openSortingContainer}>
            <View style={styles.sortingTop}>
                <DesignedText size={"small"}>{staticData.main.sortingButton.topText}</DesignedText>
                <TouchableOpacity onPress={() => {setIsOpen(false)}}><UpDownArrow /></TouchableOpacity>
            </View>
            <View style={styles.sortingChoices}>
                <TouchableOpacity style={styles.sortingChoice} onPress={() => {
                    setSortings({
                        ...sortings,
                        "price": "",
                        "created": ""
                    });
                }}>
                    <DesignedText size="small">{staticData.main.sortingButton.priority}</DesignedText>
                    <View style={(sortings["price"] !== "" || sortings["created"] !== "") && { opacity: 0 }}><Checkmark/></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortingChoice} onPress={() => {
                    setSortings({
                        ...sortings,
                        "price": sortings["price"] !== "min" ? "min" : "",
                    });
                }}>
                    <DesignedText size="small">{staticData.main.sortingButton.ascendingPrice}</DesignedText>
                    <View style={sortings["price"] !== "min" && { opacity: 0 }}><Checkmark/></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortingChoice} onPress={() => {
                    setSortings({
                        ...sortings,
                        "price": sortings["price"] !== "max" ? "max" : "",
                    });
                }}>
                    <DesignedText size="small">{staticData.main.sortingButton.descendingPrice}</DesignedText>
                    <View style={sortings["price"] !== "max" && { opacity: 0 }}><Checkmark/></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortingChoice} onPress={() => {
                    setSortings({
                        ...sortings,
                        "created": sortings["created"] !== "later" ? "later" : "",
                    });
                }}>
                    <DesignedText size="small">{staticData.main.sortingButton.descendingDate}</DesignedText>
                    <View style={sortings["created"] !== "later" && { opacity: 0 }}><Checkmark/></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortingChoice} onPress={() => {
                    setSortings({
                        ...sortings,
                        "created": sortings["created"] !== "faster" ? "faster" : "",
                    });
                }}>
                    <DesignedText size="small">{staticData.main.sortingButton.ascendingDate}</DesignedText>
                    <View style={sortings["created"] !== "faster" && { opacity: 0 }}><Checkmark/></View>
                </TouchableOpacity>
            </View>
        </View>
    );
}