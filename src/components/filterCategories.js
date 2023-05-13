import { useCallback } from "react"
import { FAB, Portal, Divider, AnimatedFAB, Chip } from 'react-native-paper';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    FlatList
} from 'react-native';
import { CategoryData } from "../utilities/data";

export default function FilterCategories({ callBack }) {
    const renderItem = useCallback(
        (item) => (
            <Chip style={{ backgroundColor: "lightgrey", margin: 10 }} key={item.name}
                // icon="food" 
                onPress={() => callBack(item)}> {item.name} </Chip>
        ),
        []
    );
    return (
        <>
            <Text style={{
                fontWeight: 900,
                fontSize: 20,
                textAlign: "center"
            }}>
                Filter by categories
            </Text>
            <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: "center" }} >
                {CategoryData.map(renderItem)}
            </View >

        </>
    )
}