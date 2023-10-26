import { Skeleton, VStack, HStack, Center, } from "native-base";
import { View } from "react-native"
import { Avatar, Divider } from 'react-native-paper';


export function BetheImageSkeleton() {
    return <Skeleton mb="3" mt="7" h="300" w="95%" ml="0" rounded="5" />
}