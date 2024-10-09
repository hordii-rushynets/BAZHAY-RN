import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    settingsContainer: {
        marginTop: 24,
        gap: 24
    },
    settingsBlockContainer: {
        gap: 16
    },
    settingsButtonsContainer: {
        gap: 8
    },
    settingsBottomLogo: {
        alignSelf: "center",
        alignItems: "center",
    },
    settingsBottomText: {
        color: "#B70000"
    },
    premiumAdvertText: {
        textAlign: "center"
    },
    premiumAdvertButton: {
        alignSelf: "center"
    },
    deleteAccountContentContainer: {
        marginVertical: "auto",
        gap: 39
    },
    deleteAccountTextContainer: {
        gap: 16
    },
    deleteAccountText: {
        textAlign: "center"
    },
    deleteAccountButtons: {
        gap: 8
    },
    deleteButton: {
        color: "#8A8A8A",
        textDecorationLine: "underline",
        textAlign: "center"
    },
    languagesContainer: {
        marginTop: 24,
        gap: 16,
    },
    languageContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    languageInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16
    },
    profileUpdateTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    profileUpdateAvatar: {
        alignSelf: "center",
        marginTop: -60
    },
    updateProfileContent: {
        marginTop: 32,
        overflow: "visible",
    },
    updateProfileContentContainer: {
        gap: 32,
        paddingBottom: 20,
    },
    updateProfileBlockContainer: {
        gap: 8
    },
    centerContent: {
        marginVertical: "auto",
        alignItems: "center",
    },
    premiumButtonsContainer: {
        marginTop: 24,
        gap: 16
    },
    addressTopText: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    infoBlockContainer: {
        position: "absolute",
        width: 280,
        top: 30,
        right: 0,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: "white",
        alignItems: "center",
        zIndex: 1
    },
    addressInputContainer: {
        gap: 8,
    },
    questionButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        height: "auto",
        alignItems: "flex-start",
    },
    questionBlock: {
        marginTop: 24,
        gap: 16
    },
    questionButtonBottom: {
        alignSelf: "center",
        width: "100%",
        position: "absolute",
        bottom: 188
    }
});

export default styles