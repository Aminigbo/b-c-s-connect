import { Text, View } from "react-native" 

// const Colors = Color()

export function BoldText4({
    text,
    color,
    style
}) {
    return (<>
        <Text style={[style, {
            color: color,
            fontWeight: 900,
            fontSize: 30,
            marginBottom: 10
        }]} >
            {text}
        </Text>
    </>)
}

export function BoldText3({
    text,
    color,
    style
}) {
    return (<>
        <Text style={[style, {
            color: color,
            fontWeight: 700,
            fontSize: 20,
            marginBottom: 10
        }]} >
            {text}
        </Text>
    </>)
}




export function BoldText1({
    text,
    color,
    style
}) {
    return (<>
        <Text style={[style, {
            color: color,
            fontWeight: 300,
            fontSize: 14,
            marginBottom: 10
        }]} >
            {text}
        </Text>
    </>)
}

export function BoldText2({
    text,
    color,
    style
}) {
    return (<>
        <Text style={[style, {
            color: color,
            fontWeight: 900,
            fontSize: 15,
            marginBottom: 10
        }]} >
            {text}
        </Text>
    </>)
}