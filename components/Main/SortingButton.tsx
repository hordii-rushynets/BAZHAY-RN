import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import UpDownArrow from "../ui/icons/UpDownArrow";
import styles from "../../screens/main/styles";
import DesignedText from "../ui/DesignedText";
import Checkmark from "../ui/icons/Checkmark";

type SortingButtonProps = { 
    sortings: {[key: string]: string};
    setSortings: (value: {[key: string]: string}) => void;
}

export default function SortingButton({ sortings, setSortings }: SortingButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

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
                <DesignedText size={"small"}>сортувати за</DesignedText>
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
                    <DesignedText size="small">пріорітетом</DesignedText>
                    <View style={(sortings["price"] !== "" || sortings["created"] !== "") && { opacity: 0 }}><Checkmark/></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortingChoice} onPress={() => {
                    setSortings({
                        ...sortings,
                        "price": sortings["price"] !== "min" ? "min" : "",
                    });
                }}>
                    <DesignedText size="small">Найменшою вартістю</DesignedText>
                    <View style={sortings["price"] !== "min" && { opacity: 0 }}><Checkmark/></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortingChoice} onPress={() => {
                    setSortings({
                        ...sortings,
                        "price": sortings["price"] !== "max" ? "max" : "",
                    });
                }}>
                    <DesignedText size="small">Найбільшою вартістю</DesignedText>
                    <View style={sortings["price"] !== "max" && { opacity: 0 }}><Checkmark/></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortingChoice} onPress={() => {
                    setSortings({
                        ...sortings,
                        "created": sortings["created"] !== "later" ? "later" : "",
                    });
                }}>
                    <DesignedText size="small">останнім додаванням</DesignedText>
                    <View style={sortings["created"] !== "later" && { opacity: 0 }}><Checkmark/></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortingChoice} onPress={() => {
                    setSortings({
                        ...sortings,
                        "created": sortings["created"] !== "faster" ? "faster" : "",
                    });
                }}>
                    <DesignedText size="small">доданим раніше</DesignedText>
                    <View style={sortings["created"] !== "faster" && { opacity: 0 }}><Checkmark/></View>
                </TouchableOpacity>
            </View>
        </View>
    );
}