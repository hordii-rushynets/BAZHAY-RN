import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    topBrand: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 26,
      paddingTop: 30,
      overflow: "visible"
    },
    grayBackground: {
      backgroundColor: "#8A8A8A",
      flex: 1
    },
    brandContentContainer: {
      paddingHorizontal: 16,
      paddingBottom: 30,
      backgroundColor: "white",
      marginTop: 60,
      flex: 1
    },
    avatarContainer: {
      marginTop: -90,
      backgroundColor: "white",
    },
    articleImageContainer: {
      width: "100%",
      height: 174,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "black",
      borderRadius: 30,
      overflow: "hidden"
    },
    brandInfoContainer: {
      gap: 16,
      alignItems: "center",
      paddingHorizontal: 24,
      marginBottom: 16
    },
    brandNameContainer: {
      gap: 4,
      alignItems: "center",
    },
    textCenter: {
      textAlign: "center",
    },
    wishesContainer: {
      
    }
});

export default styles