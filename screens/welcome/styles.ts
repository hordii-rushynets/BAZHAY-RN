import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        width: 290,
        alignItems: "center",
        marginTop: 200,
        marginHorizontal: "auto"
    },
    title: {
        textAlign: "center"
    },
    text: {
        textAlign: "center",
        marginTop: 16,
    },
    progressBarContainer: {
      width: "100%",
      height: 8,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    line: {
      width: 104,
      height: 2,
      backgroundColor: '#8A8A8A'
    },
    blackLine: {
      backgroundColor: '#000000'
    },
    link: {
        width: "100%",
        textAlign: "right",
        marginTop: 8
    }
})

export default styles;