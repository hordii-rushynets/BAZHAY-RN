import { Dimensions, StyleSheet } from "react-native";

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
        shadowRadius: 4,
        elevation: 4,
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
        alignItems: "flex-start",
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
        flexDirection: "row",
        alignContent: "center",
        gap: 8,
    },
    textInputWithArrowError: {
        marginTop: 5,
        marginLeft: 10,
        color: "#B70000"
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
    },
    progressBarContainer: {
      width: "100%",
      height: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16
    },
    line: {
      flex: 1,
      height: 2,
      backgroundColor: '#8A8A8A'
    },
    blackLine: {
      backgroundColor: '#000000'
    },
    backButtonContainer: {
        height: 32,
        marginBottom: 16,
        padding: 8,
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    checkbox: {
        width: 16,
        height: 16,
        borderColor: "#000000",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    dropdownContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      borderRadius: 30,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#000',
      gap: 16
    },
    dropdownVisibleContiner: {
      height: "auto",
      zIndex: 9999,
      borderRadius: 20,
      paddingVertical: 8
    },
    dropdownButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
    },
    dropdownItem: {
      paddingRight: 24,
      flexDirection: 'row',
      alignItems: 'center'
    },
    textFieldInputContainer: {
      flexDirection: "column",
      width: "100%",
      gap: 16,
      justifyContent: "space-between",
    },
    textFieldInput: {
      borderRadius: 30,
      borderWidth: 1,
      borderColor: "black",
      borderStyle: "solid",
      height: 104,
      textTransform: "uppercase",
      fontFamily: "Inter-V",
      paddingHorizontal: 24,
      paddingVertical: 8,
      width: "100%",
      textAlignVertical: 'top',
    },
    textFieldInputBottomContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between"
    },
    imageButtonContainer: {
      borderColor: "black",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 20,
      width: undefined,
      height: 250,
      backgroundColor: "#8A8A8A",
    },
    imageButtonImageContainer: {
      overflow: "hidden"
    },
    imageButton: {
      width: '100%',
      height: '100%',
      borderRadius: 20,
    },
    imageButtonPen: {
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 32,
      borderWidth: 1,
      borderColor: "black",
      borderStyle: "solid",
      position: "absolute",
      bottom: 8,
      right: -16
    },
    buttonWithArrow: {
      flexDirection: "row",
      backgroundColor: "white",
      borderRadius: 30,
      borderWidth: 1,
      borderColor: "black",
      borderStyle: "solid",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
      shadowColor: 'black',
      shadowOffset: { width: -2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
    },
    buttonWithArrowText: {
      flexDirection: "row",
      gap: 16,
      alignItems: "center",
      justifyContent: "center"
    },
    profileButtonWithArrowText: {
      flexDirection: "column",
      gap: 2,
      justifyContent: "center",
    },
    loadingContainer: {
      position: "absolute",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height,
      zIndex: 999 
    },
    loadingLogoContainer: {
      marginVertical: "auto",
      alignSelf: "center",
    },
    messageWithTwoButtonsContainer: {
      height: Dimensions.get("screen").height, 
      width: Dimensions.get("screen").width,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      position: "absolute",
      zIndex: 100,
      alignItems: "center",
      justifyContent: "center"
    },
    messageWithTwoButtons: {
      width: 280,
      height: 144,
      backgroundColor: "white",
      paddingVertical: 32,
      paddingHorizontal: 16,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 30,
      gap: 16,
      shadowColor: 'black',
      shadowOffset: { width: -2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
    },
    messageContainer: {
      position: "absolute",
      top: 72,
      width: "90%",
      alignSelf: "center",
      shadowColor: 'black',
      shadowOffset: { width: -2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 30,
      backgroundColor: "white",
    }
})

export default styles;