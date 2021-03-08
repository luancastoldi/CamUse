import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


export default function Home() {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={() => {

            }}>
                <Text>TIRAR FOTO</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => {

            }}>
                <Text>QR CODE</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
