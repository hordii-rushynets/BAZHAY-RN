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
    backButtonContainer: {
      position: 'absolute',
      left: 20,
      top: 64
    },
    settingsContainer: {
      position: "absolute",
      top: 64,
      right: 20,
      gap: 24,
      alignItems: 'center',
      justifyContent: "center"
    },
    addressesContainer: {
      flexDirection: "row",
      gap: 16,
      marginVertical: 24
    },
    avatarContainer: {
      alignSelf: "center",
      marginTop: 28,
      width: 120,
      height: 120,
      borderColor: "black",
      borderRadius: 60,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    },
    avatar: {
      width: "100%",
      height: "100%",
    },
    smallAvatarContainer: {
      width: 40,
      height: 40
    },
    profileInfoContainer: {
      alignItems: "center",
      marginTop: 16,
    },
    grayText: {
      color: "#8A8A8A",
      marginTop: 4,
    },
    descriptionContainer: {
      marginTop: 8,
      gap: 8,
      alignItems: "center"
    },
    subscribersContainer: {
      flexDirection: "row",
      marginTop: 12,
      gap: 24
    },
    subcribeContainer: {
      flexDirection: "row",
      gap: 8
    },
    profileWishesContainer: {
      marginTop: 16,
      paddingTop: 40,
    },
    closedSortingContainer: {
      height: 32,
      width: 64,
      backgroundColor: "white",
      borderRadius: 30,
      borderWidth: 1,
      borderColor: "black",
      borderStyle: "solid",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      right: 0,
      shadowColor: "black",
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
      shadowOffset: { width: -2, height: 2 },
    },
    openSortingContainer: {
      backgroundColor: "white",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "black",
      borderStyle: "solid",
      position: "absolute",
      top: 0,
      right: 0,
      paddingVertical: 8,
      paddingHorizontal: 24,
      zIndex: 999,
    },
    sortingTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    sortingChoice: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
      alignItems: "center"
    },
    sortingChoices: {
      gap: 4,
    },
    wishCardImageContainer: {
      width: 164,
      height: undefined,
      borderColor: "black",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 20,
      marginHorizontal: 8,
      marginTop: 8
    },
    wishCardImage: {
      borderRadius: 20,
      width: "100%",
      height: "100%"
    },
    wishCardTitle: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignSelf: "center",
      width: 164
    },
    wishesContainer: {
      alignItems: "center",
      gap: 12
    },
    wishCardStarsContainer: {
      position: "absolute",
      height: "100%",
      width: 72,
      alignSelf: "center",
      justifyContent: "center",
    },
    premiumProfileAdvertContainer: {
      width: 343,
      marginTop: 32,
      paddingHorizontal: 16,
      paddingVertical: 32,
      gap: 16,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "black",
      borderStyle: "solid",
      borderRadius: 30,
      alignSelf: "center"
    },
    premiumProfileAdvertText: {
      textAlign: "center",
    },
    premiumProfileAdvertButton: {
      borderColor: "#B70000",
    },
    premiumProfileAdvertButtonText: {
      color: "#B70000"
    },
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    forYouTabContainer: {
      gap: 20,
      marginTop: 24,
    },
    articleCardImageContainer: {
      width: 304,
      height: 160,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 30,
      overflow: "hidden",
    },
    articleCardImage: {
      width: "100%",
      height: "100%"
    },
    articleCardContainer: {
      gap: 8,
      marginHorizontal: 8
    },
    articleCardText: {
      marginLeft: 10
    },
    dotContainer: {
      position: "relative",
      justifyContent: "center",
    },
    dot: {
      width: 3.6,
      height: 3.6,
      marginHorizontal: 2
    },
    dotActive: {
      backgroundColor: "black"
    },
    brandCardImageContainer: {
      width: 80,
      height: 80,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 80,
      marginHorizontal: 8,
      overflow: "hidden"
    },
    brandCardContainer: {
      alignItems: "center",
      gap: 8
    },
    brandsTabContainer: {
      gap: 16,
      marginVertical: 24
    },
    homeWishesContainer: {
      paddingBottom: 100
    },
    buttonsContainer: {
      position: "absolute",
      top: 16,
      right: 16,
    },
    smallButton: {
      width: 32,
      height: 32,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "black",
      borderRadius: 32,
      shadowColor: "black",
      shadowOpacity: 0.25,
      shadowRadius: 2,
      elevation: 2,
      shadowOffset: { width: -2, height: 2 },
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white"
    },
    subscriptionsChoosing: {
      width: "100%",
      height: 32,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 30,
      flexDirection: "row",
      alignItems: "center"
    },
    subscriptionsOption: {
      width: "50%",
      alignItems: "center",
      justifyContent: "center",
      height: 32,
    },
    subscriptionsOptionActive: {
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 30,
      shadowColor: "black",
      shadowOpacity: 0.25,
      shadowRadius: 2,
      elevation: 2,
      shadowOffset: { width: -2, height: 2 },
      backgroundColor: "white",
    },
    userInfoContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    usersContainer: {
      paddingTop: 16,
      gap: 16,
    },
    addFriendsButton: {
      flexDirection: "row",
      gap: 9,
      alignItems: "center",
      marginTop: 32
    },
});

export default styles