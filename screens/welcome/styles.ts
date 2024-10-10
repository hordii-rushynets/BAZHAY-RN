import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    starsContainer: {
      marginHorizontal: "auto",
    },
    textContainer: {
        flex: 1,
        width: 290,
        alignItems: "center",
        marginTop: 200,
        marginHorizontal: "auto"
    },
    secondTextContainer: {
        flex: 1,
        alignItems: "center",
        marginTop: 200,
        marginHorizontal: "auto"
    },
    title: {
        textAlign: "center"
    },
    text: {
        textAlign: "center",
        marginTop: 20,
    },
    link: {
        alignSelf:  "flex-end",
        textAlign: "right",
        marginTop: 8
    },
    submitButton: {
        marginHorizontal: "auto",
    }
})

export default styles;