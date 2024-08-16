import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: "70%",
        width: "100%",
        marginHorizontal: "auto",
        flex: 1,
    },
    titleContainer: {
        width: "82%",
        minWidth: 283,
        marginHorizontal: "auto",
    },
    title: {
        textAlign: "center",
    },
    titleSpan: {
        textAlign: "center",
        marginTop: 16
    },
    inputContainer: {
        marginTop: 32
    },
    dividerContainer: {
        marginTop: 24,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    dividerText: {
        color: "#8A8A8A"
    },
    line: {
        width: "40%",
        height: 1,
        backgroundColor: "#8A8A8A"
    },
    socialLoginContainer: {
        flexDirection: 'row',
        gap: 24,
        justifyContent: "center",
        marginTop: 24,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
    },
    bottomContainer: {
        marginBottom: 0,
        marginTop: "auto"
    }
})

export default styles;