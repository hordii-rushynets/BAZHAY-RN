import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wishImageContainer: {
      width: undefined,
      height: 343,
      borderColor: "black",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 30,
      alignSelf: "center",
    },
    wishImage: {
      borderRadius: 30,
      width: "100%",
      height: "100%"
    },
    wishStarsContainer: {
      position: "absolute",
      height: "100%",
      width: 160,
      alignSelf: "center",
      justifyContent: "center",
    },
    userSmallInfoContainer: {
        flexDirection: "row",
        gap: 8,
    },
    userSmallInfoAvatarContainer: {
        alignSelf: "center",
        width: 40,
        height: 40,
        borderColor: "black",
        borderRadius: 60,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    userSmallInfoText: {
      justifyContent: "center",
    },
    wishContentContainer: {
        gap: 16
    },
    wishBottomButtonsContainer: {
        flexDirection: "row",
        gap: 16
    },
    wishBottom: {
        gap: 8,
    },
    popUpMessageContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
    popUpMessage: {
      width: 280,
      height: "auto",
      backgroundColor: "white",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 30,
      padding: 24,
      gap: 24,
      alignItems: "center"
    },
    popUpMessageText: {
      textAlign: "center",
    },
    smallText: {
      fontSize: 12
    },
    popUpMessageButton: {
      minWidth: 200,
      width: "auto",
      paddingHorizontal: 20
    },
    giftButton: {
      height: 40,
      paddingHorizontal: 20,
      backgroundColor: "#B70000",
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: 'black',
      shadowOffset: { width: -2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
      borderRadius: 80,
      top: 323,
      right: 40
    },
    giftButtonText: {
      color: "white"
    },
    smallButton: {
      width: 40,
      height: 40
    }
});

export default styles