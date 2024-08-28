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
        width: "100%",
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
})

export default styles;