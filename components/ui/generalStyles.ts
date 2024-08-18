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
    textInputWithArrowContainer: {
        flexDirection: "row",
        width: "100%",
        gap: 16,
        justifyContent: "space-between",
    },
    textInputWithArrow: {
        flex: 1,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        height: 40,
        textTransform: "uppercase",
        fontFamily: "Inter-V",
        paddingHorizontal: 24,
        width: "100%",
    },
    arrowContainer: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        alignItems: "center",
        justifyContent: "center",
    },
    centerContainer: {
        marginHorizontal: "auto",
        marginVertical: "auto",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default styles;