import { KeyboardAvoidingView, Modal, Pressable, SafeAreaView, TextInput, View } from "react-native"

export default ({textInputModalVisible, albumTitle, setAlbumTitle, onSubmitEditing, onPressBackdrop}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={textInputModalVisible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1}}
      >
        <Pressable 
          onPress={onPressBackdrop}
          style={{flex: 1}}>
          <SafeAreaView style={{width: "100%", position: "absolute", bottom: 0}}>
            <TextInput
              placeholder="앨범명을 입력해주세요"
              value={albumTitle}
              onChangeText={setAlbumTitle}
              onSubmitEditing={onSubmitEditing}
              autoFocus={true}
              style={{width: "100%", padding: 10, borderColor: "lightgrey", borderWidth: 0.5}}
            />
          </SafeAreaView>
        </Pressable>
        
      </KeyboardAvoidingView>
      
      
    </Modal>
  )
}