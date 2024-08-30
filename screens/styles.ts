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
    wishContentContainer: {
        gap: 16
    },
    wishBottomButtonsContainer: {
        flexDirection: "row",
        gap: 16
    },
    wishBottom: {
        gap: 8,
    }
});

export default styles