import { Text } from "react-native-paper"

export const SmallText = ({
    Text, color
}) => {
    return (
        <Text style={{
            color: color,
            fontSize:14
        }} >{Text}</Text>
    )
}