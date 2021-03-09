import React, { useState, useEffect, useRef } from 'react'
import { Text, StyleSheet, View, SafeAreaView, Image, TouchableOpacity, Modal } from 'react-native'
import { Camera } from 'expo-camera'
import { MaterialIcons } from '@expo/vector-icons'
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export default function Index() {

    const camRef = useRef(null)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [open, setOpen] = useState(false);

    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const [ativado, setAtivado] = useState("blue")

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />
    }
    if (hasPermission === false) {
        return <Text>Acesso Negado !</Text>
    }

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri)
            setOpen(true);
            // console.log(data)
        }
    }

    async function savePhoto(){
        const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
        .then(() =>{
            alert('Salvado :)')
        })
        .catch(error => {
            console.log('err', error)
        })
    }

    async function onFlash(){
        if(flash === Camera.Constants.FlashMode.on){
            setFlash(Camera.Constants.FlashMode.off)
            setAtivado("blue")
        }else{
                setFlash(Camera.Constants.FlashMode.on)
                  setAtivado("yellow")
            }
        }
    return (
        <SafeAreaView style={styles.container}>
            <Camera
                style={{ flex: 1, width: 400 }}
                type={type}
                ref={camRef}
                flashMode={flash}
                
            >
            </Camera>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white' }}>
                <TouchableOpacity
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        )
                    }}>
                    <MaterialIcons name="flip-camera-android" size={60} color="blue" />
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => {
                        takePicture()
                    }}>
                    <MaterialIcons name="camera-alt" size={60} color="blue" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        onFlash()
                    }}>
                   <MaterialIcons name="flash-on" size={60} color={ativado} />
                </TouchableOpacity>
            </View>

            { capturedPhoto &&
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={open}
                >
                    <View style={styles.photoOk}>

                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <TouchableOpacity
                                onPress={() => savePhoto()}>
                                <MaterialIcons name="file-download" size={50} color="blue" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setOpen(false)
                                }}>
                                <MaterialIcons name="close" size={50} color="red" />
                            </TouchableOpacity>
                        </View>
                        <Image
                            style={styles.imageRight}
                            source={{ uri: capturedPhoto }}
                        />
                    </View>
                </Modal>}

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
    },
    photoOk: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 40
    },
    imageRight: {
        width: '130%',
        height: '100%',
        borderColor: 'blue',
        borderWidth: 3,
        borderRadius: 7
    }
})

