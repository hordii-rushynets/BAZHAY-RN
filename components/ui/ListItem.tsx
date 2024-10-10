import React from 'react';
import { View } from 'react-native';
import DesignedText from './DesignedText';

type ListItemProps = {
    text: string;
    size: "small" | "medium";
}

function ListItem({ text, size }: ListItemProps) {
    return (
        <View style={{ flexDirection: "row", gap: 4, width: "100%", flexWrap: "wrap" }}>
            <DesignedText size={size}>{"\u2022"}{text}</DesignedText>
        </View>
    );
}

export default ListItem;