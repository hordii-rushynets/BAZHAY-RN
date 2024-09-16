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
        flex: 1
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
        alignItems: "center",
    },
    wishConfirmationButtonsContainer: {
        gap: 24,
        height: 460,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    wishConfirmationButtons: {
        gap: 8,
        width: "100%",
    },
    videoContainer: {
        width: 279,
        height: 496,
        backgroundColor: "#8A8A8A",
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        borderRadius: 30,
        overflow: "hidden"
    },
    videoEditingText: {
        fontSize: 12
    },
    videoEditingButtonsContainer: {
        flexDirection: "row",
        gap: 8
    },
    videoEditorContainer: {
        gap: 24,
        alignItems: "center",
    },
    videoCropBar: {
        width: "100%",
        height: 40,
        backgroundColor: "#8A8A8A",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        borderRadius: 8,
        alignItems: "center",
        flexDirection: "row"
    },
    cropBar: {
        height: 44,
        width: 16,
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        position: "absolute",
    },
    timerBar: {
        height: 44,
        width: 1,
        backgroundColor: "black",
        position: "absolute"
    },
    videoFramesContainer: {
        flexDirection: "row",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: 8,
    },
    coverBar: {
        width: 34,
        height: 42,
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        borderRadius: 8,
        backgroundColor: "#8A8A8A",
        position: "absolute",
        overflow: "hidden"
    },
    coverBarContainer: {
        alignItems: "center",
        gap: 8
    },
    wishFulfilledButton: {
        width: "100%",
        height: 40,
        flexDirection: "row",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1,
        gap: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: "white",
        marginBottom: 16
    },
    deleteButton: {
        color: "#8A8A8A",
        textDecorationLine: "underline",
    }
});

export default styles