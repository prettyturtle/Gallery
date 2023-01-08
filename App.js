import { StatusBar } from 'expo-status-bar';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { useGallery } from './src/hook/use-gallery';
import MyDropDownPicker from './src/MyDropDownPicker';
import TextInputModal from './src/TextInputModal';
import BigImageModal from './src/BigImageModal';
import { useRewardAd } from './src/hook/use-reward-ad';
import { useEffect } from 'react';
import ImageList from './src/ImageList';



export default function App() {

    const {
        images,
        imagesWithAddButton,
        pickImage,
        deleteImage,
        selectedAlbum,
        textInputModalVisible,
        openTextInputModal,
        closeTextInputModal,
        albumTitle,
        setAlbumTitle,
        addAlbum,
        resetAlbumTitle,
        isDropdownOpen,
        openDropdown,
        closeDropdown,
        albums,
        selectAlbum,
        deleteAlbum,
        bigImageModalVisible,
        openBigImageModal,
        closeBigImageModal,
        selectImage,
        selectedImage,
        moveToPreviousImage,
        moveToNextImage,
        showPreviousArrow,
        showNextArrow
    } = useGallery()

    const {
        loadRewardAd,
        // isLoaded,
        isRewarded,
        isClosed,
        resetValue
    } = useRewardAd()

    const onPressOpenGallery = async () => {
        await pickImage()
    }
    const onLongPressImage = (imageID) => deleteImage(imageID)

    const onPressWatchAd = () => {
        loadRewardAd()
    }

    const onPressAddAlbum = () => {
        if (albums.length >= 2) {
            Alert.alert("광고를 시청해야 앨범을 추가할 수 있습니다.", "", [
                {
                    style: "cancel",
                    text: "닫기"
                },
                {
                    text: "광고 시청",
                    onPress: onPressWatchAd
                }
            ])
        } else {
            openTextInputModal()
        }
        
    }
    const onSubmitEditing = () => {
        if (!albumTitle) {
            return
        }
        // 1. 앨범에 타이틀 추가
        addAlbum()
        // 2. modal 닫기 && TextInput의 value 초기화
        closeTextInputModal()
        resetAlbumTitle()
    }
    const onPressTextInputModalBackdrop = () => closeTextInputModal()
    const onPressBigImageModalBackdrop = () => closeBigImageModal()

    const onPressHeader = () => {
        if (isDropdownOpen) {
            closeDropdown()
            return
        }
        openDropdown()
    }

    const onPressAlbum = (album) => selectAlbum(album)

    const onLongPressAlbum = (albumID) => deleteAlbum(albumID)

    const onPressLeftArrow = () => {
        moveToPreviousImage()
    }
    const onPressRightArrow = () => {
        moveToNextImage()
    }

    const onPressImage = (image) => {
        selectImage(image)
        openBigImageModal()
    }

    useEffect(() => {
        if (isRewarded && isClosed) {
            openTextInputModal()
            resetValue()
        }
    }, [isRewarded, isClosed])


    

    return (
        <SafeAreaView style={styles.container}>
            {/* 앨범 DropDown, 앨범 추가 버튼 */}
            <MyDropDownPicker
                isDropdownOpen={isDropdownOpen}
                onPressHeader={onPressHeader}
                selectedAlbum={selectedAlbum}
                onPressAddAlbum={onPressAddAlbum}
                albums={albums}
                onPressAlbum={onPressAlbum}
                onLongPressAlbum={onLongPressAlbum}
            />
            
            {/* 앨범을 추가하는 TextInputModal */}
            <TextInputModal
                textInputModalVisible={textInputModalVisible}
                albumTitle={albumTitle}
                setAlbumTitle={setAlbumTitle}
                onSubmitEditing={onSubmitEditing}
                onPressBackdrop={onPressTextInputModalBackdrop}
            />

            {/* 이미지를 크게 보는 모달 */}
            <BigImageModal
                bigImageModalVisible={bigImageModalVisible}
                onPressBackdrop={onPressBigImageModalBackdrop}
                selectedImage={selectedImage}
                onPressLeftArrow={onPressLeftArrow}
                onPressRightArrow={onPressRightArrow}
                showPreviousArrow={showPreviousArrow}
                showNextArrow={showNextArrow}
            />

            {/* 이미지 리스트 */}
            <ImageList
                imagesWithAddButton={imagesWithAddButton}
                onPressOpenGallery={onPressOpenGallery}
                onPressImage={onPressImage}
                onLongPressImage={onLongPressImage}
            />

            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});
