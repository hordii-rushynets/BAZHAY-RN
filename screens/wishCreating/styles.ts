import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    addWishPopUpContainer: {
        position: "absolute",
        bottom: 132,
        alignSelf: "center",
        width: 320,
        height: 96,
        justifyContent: "space-between",
    },
    contentPhotoOrVideoContainer: {
        marginTop: "60%",
        width: "100%",
        marginHorizontal: "auto",
        flex: 1,
    },
    addLaterButton: {
        alignSelf: "center",
        marginTop: 300
    },
    linkTitleContainer: {
        width: "100%",
        minWidth: 300,
        marginHorizontal: "auto",
    },
    titleAndInputContainer: {

    },
    titleAndInputContainerWithKeyboard: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        marginHorizontal: "auto",
        flex: 1,
    },
    galleryNavbar: {
        flexDirection: "row",
        alignSelf: "center",
        gap: 8,
        marginVertical: 8
    },
    galleryNavbarButtonText: {
        fontSize: 12,
    },
    galleryNavbarActiveButtonText: {
        color: "white",
    },
    galleryNavbarActiveButton: {
        backgroundColor: "#B70000",
    },
    videoIcon: {
        position: "absolute",
        bottom: 10,
        right: 10
    },
    positionsContainer: {
        flexDirection: "row",
        gap: 16,
        justifyContent: "center",
        marginTop: 56
    },
    position: {
        width: 18,
        height: 32,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 4,
    },
    selectedPosition: {
        backgroundColor: "#B70000",
    },
    scalesContainer: {
        flexDirection: "row",
        gap: 16,
        justifyContent: "center",
        marginTop: 16
    },
    scale: {
        width: 40,
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    selectedScale: {
        backgroundColor: "#B70000",
    },
    selectedScaleText: {
        color: "white"
    },
    editorContainer: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        alignSelf: "center",
        bottom: 150,
    },
    editorImageContainer: {
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 30,
        width: 250,
        height: undefined,
        backgroundColor: "#8A8A8A",
        overflow: "hidden"
    },
    editorImage: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    wishConfirmationTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline"
    },
    wishConfirmationButtonsContainer: {
        gap: 24,
        marginTop: 24,
        height: 460,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    wishConfirmationButtons: {
        gap: 8,
        width: "100%",
    }
});

export default styles