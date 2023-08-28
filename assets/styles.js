import { StyleSheet } from "react-native";
import { Color } from "../src/components/theme";
const Colors = Color()
export const Style = StyleSheet.create({
    boldText: {
        fontWeight: 500,
        fontSize: 15,
        color: Colors.dark,
    },
    boldText2: {
        fontWeight: 600,
        fontSize: 17,
        color: Colors.dark,
    },
 
    TextLink: {
        fontWeight: 400,
        fontSize: 15,
        color: Colors.primary,
    },

    LabelText: {
        fontWeight: 300,
        fontSize: 15,
        color: Colors.grey,
    },

    Text: {
        fontWeight: 300,
        fontSize: 15,
        color: Colors.dark,
    }

});