import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screenContainer: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 30,
        flex: 1,
    },
    submitButton: {
        backgroundColor: "white",
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 1,
        justifyContent: "center",
    },
    submitButtonText: {
        textAlign: "center",
    },
    textInputWithArrow: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        height: 40,
        paddingHorizontal: 24
    }
})

export default styles;