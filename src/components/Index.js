import React, { useState, useEffect, useRef } from 'react'
import { Text, StyleSheet, View, SafeAreaView, Image, TouchableOpacity, Modal } from 'react-native'
import { Camera } from 'expo-camera'
import { MaterialIcons } from '@expo/vector-icons'

export default function Index() {

    const camRef = useRef(null)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        (async () => {
             const { status } = await Camera.requestPermissionsAsync();
             setHasPermission(status === 'granted');
        })(); 
     }, []);  

    if(hasPermission === null){
        return <View/>
    }
    if(hasPermission === false){
        return <Text>Acesso Negado !</Text>
    }

    async function takePicture(){
        if(camRef){
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri)
            setOpen(true);
            // console.log(data)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera
                style={{flex: 1}}
                type={type}
                ref={camRef}
                >
                <View style={styles.flip}>
                    <TouchableOpacity
                    style={{marginBottom: 30}}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        )
                    }}>
                    <MaterialIcons name="flip-camera-android" size={30} color="white" />          
                    </TouchableOpacity>

                <TouchableOpacity
                onPress={() =>{
                    takePicture()
                }}>
                    <MaterialIcons name="camera-alt" size={30} color="white" />
                </TouchableOpacity>
                </View>            
            </Camera>

        { capturedPhoto &&
        <Modal
        animationType="slide"
        transparent={false}
        visible={open}
         > 
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20}}>
            <TouchableOpacity onPress={() => {
                setOpen(false)
            }}>
                    <MaterialIcons name="close" size={30} color="black" />
            </TouchableOpacity>
         </View>

        <Image
            style={{width: '100%', height: 300, marginBottom: 100}}
            source={{uri: capturedPhoto}}
        
        />

         </Modal> }

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    flip: {
        flexDirection: 'column',
        marginTop: 300,
    }
})

