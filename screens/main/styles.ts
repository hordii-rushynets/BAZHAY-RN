import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    tabBar: {
      flexDirection: 'row',
      bottom: 48,
      height: 56,
      backgroundColor: 'white',
      borderRadius: 30,
      shadowColor: '#000',
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 10,
      elevation: 10,
      borderColor: '#000',
      borderWidth: 1,
      borderStyle: 'solid',
      marginHorizontal: 16
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      textAlign: 'center',
      marginBottom: 10,
    },
    centerButton: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
    },
});

export default styles