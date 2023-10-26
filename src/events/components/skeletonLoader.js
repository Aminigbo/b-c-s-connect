import { Skeleton, VStack, HStack, Center, } from "native-base";
import { View } from "react-native"
import { Avatar, Divider } from 'react-native-paper';


export function EventListSkeletonLoader() {
    return <>
        <View style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 6
        }}>
            <Skeleton h="7" mr="4" w="7" ml="3" rounded="5" />

            <VStack p="3" style={{ flex: 1 }} >
                <Skeleton mt="-1" h="3" w="40%" mb="5" rounded="5" />
                <Skeleton mb="3" h="1" w="90%" rounded="5" />
                <Skeleton mb="3" h="1" w="82%" rounded="5" />
                <Skeleton mb="3" h="1" w="67%" rounded="5" />
                <Skeleton mb="3" h="1" w="77%" rounded="5" />
                <Skeleton mb="3" h="1" w="77%" rounded="5" />
                <Skeleton mb="3" h="1" w="95%" rounded="5" />
                <Skeleton mb="3" h="1" w="20%" rounded="5" />
                <Skeleton mb="3" mt="2" h="180" w="100%" rounded="5" />
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                    // backgroundColor: "green"
                }}>
                    <Skeleton h="1" w="40%" rounded="5" />
                    <Skeleton h="1" w="20%" rounded="5" />
                </View>
                <Divider style={{ marginVertical: 20, backgroundColor: "lightgrey" }} />
            </VStack>
        </View>




        <View style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 6
        }}>
            <Skeleton h="7" mr="4" w="7" ml="3" rounded="5" />

            <VStack p="3" style={{ flex: 1 }} >
                <Skeleton mt="-1" h="3" w="40%" mb="5" rounded="5" />
                <Skeleton mb="3" h="1" w="90%" rounded="5" />
                <Skeleton mb="3" h="1" w="82%" rounded="5" />
                <Skeleton mb="3" h="1" w="67%" rounded="5" />
                <Skeleton mb="3" h="1" w="77%" rounded="5" />
                <Skeleton mb="3" h="1" w="77%" rounded="5" />
                <Skeleton mb="3" h="1" w="95%" rounded="5" />
                <Skeleton mb="3" h="1" w="20%" rounded="5" />
                <Skeleton mb="3" mt="2" h="180" w="100%" rounded="5" />
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                    // backgroundColor: "green"
                }}>
                    <Skeleton h="2" w="40%" rounded="5" />
                    <Skeleton h="2" w="20%" rounded="5" />
                </View>
                <Divider style={{ marginVertical: 20, backgroundColor: "lightgrey" }} />
            </VStack>
        </View>
    </>
}


export function SingleEventSkeletonLoader() {
    return <>
        <VStack p="5" style={{ flex: 1 }} >
            <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginBottom:29

                // backgroundColor: "green"
            }}>
                <Skeleton h="4" w="4" rounded="5" />
                <Skeleton h="2" ml="3" w="45%" rounded="5" />
            </View>

            {[40, 75, 70, 55].map((e, index) => {
                return <>
                    <View key={index} style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between", 
                        marginTop:20
                    }}>
                        <Skeleton h="1" w={e} rounded="5" />
                        <Skeleton h="1" w={e-10} rounded="5" />
                    </View>
                </>
            })}

            <Skeleton mb="3" mt="7" h="370" w="100%" rounded="5" />

            <Skeleton mb="3" mt="30" h="1" w="90%" rounded="5" />
            <Skeleton mb="3" h="1" w="82%" rounded="5" />
            <Skeleton mb="3" h="1" w="100%" rounded="5" />
            <Skeleton mb="3" h="1" w="90%" rounded="5" />
            <Skeleton mb="3" h="1" w="77%" rounded="5" /> 
            <Skeleton startColor="lightgrey" mt="5" rounded="8" />

        </VStack>
    </>
}