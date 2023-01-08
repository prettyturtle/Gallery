import { View, Text, TouchableOpacity } from "react-native"
import { SimpleLineIcons } from "@expo/vector-icons"

const headerHeight = 50

export default ({ selectedAlbum, onPressAddAlbum, onPressHeader, isDropdownOpen, albums, onPressAlbum, onLongPressAlbum }) => {

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressHeader}
        style={{
          height: headerHeight,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          borderBottomColor: "lightgrey",
          borderBottomWidth: 0.5
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          {selectedAlbum.title}
        </Text>
        <SimpleLineIcons name={isDropdownOpen ? "arrow-up" : "arrow-down"} size={12} color="black" style={{ marginLeft: 8 }} />
        <TouchableOpacity
          onPress={onPressAddAlbum}
          style={{
            position: "absolute",
            right: 0,
            height: headerHeight,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10
          }}
        >
          <Text style={{ fontSize: 12 }}>앨범 추가</Text>
        </TouchableOpacity>


      </TouchableOpacity>
      {isDropdownOpen && (
        <View
          style={{
            position: "absolute",
            top: headerHeight,
            width: "100%",
          }}
        >
          {albums.map(album => {
            const isSelectedAlbum = album.id === selectedAlbum.id
            return (
              <TouchableOpacity
                activeOpacity={1}
                onLongPress={() => onLongPressAlbum(album.id)}
                key={album.id}
                onPress={() => onPressAlbum(album)}
                style={{
                  paddingVertical: 10,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ffff",
                  borderBottomColor: "lightgrey",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text style={{ fontWeight: isSelectedAlbum ? "bold" : "normal" }}>{album.title}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      )}
    </View>
  )
}