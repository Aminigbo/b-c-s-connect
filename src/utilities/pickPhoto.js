const { launchImageLibrary, launchCamera } = require("react-native-image-picker")
// import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-crop-picker';



export const PickPhoto = ({
    setpreviewDPchnage,
    handleSnapPress,
    Source
}) => {
    // console.log(Source)
    setpreviewDPchnage({
        status: true
    })
    const options = {
        storageOptions: {
            path: "images",
            mediaType: "photo"
        },
        includeBase64: true,
        quality: 0.6,
        multiple: true,
        allowsEditing: true,
        saveToPhotos: true
    }
    launchImageLibrary(options, response => {
        // console.log("ResponseXX", response.assets.id)

        if (response.didCancel) {
            setpreviewDPchnage({
                status: true
            })
            if (handleSnapPress) { handleSnapPress(0) } // hide bottom drawer
        } else if (response.error) {

        } else if (response.customButton) {
            // console.log(response.customButton)
        } else {

            const fileExt = response.assets[0].uri.substring(response.assets[0].uri.lastIndexOf(".") + 1);
            const fileName = `${Math.random()}.${fileExt}`;
            var formData = new FormData();
            formData.append("files", {
                uri: response.assets[0].uri,
                name: fileName,
                type: `image/${fileExt}`
            })
            // const URI = {
            //     uri: response.assets[0].uri,
            //     fileName,
            //     formData
            // }
            // Source.push(URI)

            const source = {
                uri: response.assets[0].uri
            }


            if (handleSnapPress) { handleSnapPress(2) }
            setpreviewDPchnage({
                source,
                fileName,
                formData,
                height: response.assets[0].height,
                width: response.assets[0].width,
                status: true
            })

        }
    })

    // ImagePicker.openPicker({
    //     multiple: true
    // }).then(images => {
    //     console.log(images);
    // });
}