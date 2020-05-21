import React, {useState} from 'react';
import { StyleSheet, View, Modal, ImagePickerIOS, Alert,KeyboardAvoidingView } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const CreateEmployee = ({navigation, route}) =>{

        const getDetails = (type)=>{
            if(route.params){

                switch(type){
                    case "name":
                        return route.params.name
                    case "position":
                        return route.params.position
                    case "phone":
                        return route.params.phone
                    case "email":
                        return route.params.email
                    case "salary":
                        return route.params.salary
                    case "picture":
                        return route.params.picture
                }  
            }
            return ""
        }    
     
        const [name, setName] = useState(getDetails("name"))
        const [position, setPosition] = useState(getDetails("position"))
        const [phone, setPhone] = useState(getDetails("phone"))
        const [email, setEmail] = useState(getDetails("email"))
        const [salary, setSalary] = useState(getDetails("salary"))
        const [picture, setPicture] = useState(getDetails("picture"))
        const [modal, setModal] = useState(false)
        const [shift, setShift] = useState(false)

        const submitData = ()=>{
            fetch("http://6d64a3fd.ngrok.io/send-data",{
                method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name,
                    email,
                    salary,
                    picture,
                    phone,
                    position,

                })

            }).then(res=>res.json()).then(employeeSaved=>{
                Alert.alert(`${employeeSaved.name} saved successfully`)
                navigation.navigate("Home")
            }).catch(err=>{
                Alert.alert("Some error try again")
            })
        }

        const pickFromGallery = async()=>{
          const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

          if(granted){
         let data=     await ImagePicker.launchImageLibraryAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:1
              })
              if(!data.cancelled){
                let newfile2 = {
                uri:data.uri,
                type:`test/${data.uri.split(".")[1]}`,
                name:`test.${data.uri.split(".")[1]}`}
                handleUpload(newfile2)
            }

          }else{
                Alert.alert("you need to give this application a permession to gallery")
          }
        }


        const pickFromCamera = async()=>{
          const {granted} = await Permissions.askAsync(Permissions.CAMERA)

          if(granted){
         let data=     await ImagePicker.launchCameraAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:1
              })
              if(!data.cancelled){
                  let newfile = {
                  uri:data.uri,
                  type:`test/${data.uri.split(".")[1]}`,
                  name:`test.${data.uri.split(".")[1]}`}
                  handleUpload(newfile)
              }

          }else{
                Alert.alert("you need to give this application a permession to camera")
          }
        }

        
        const updateDetails = ()=>{
            fetch("http://6d64a3fd.ngrok.io/update",{
                method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    _id:route.params._id,
                    name,
                    email,
                    salary,
                    picture,
                    phone,
                    position,

                })

            }).then(res=>res.json()).then(employeeupdate=>{
                Alert.alert(`${employeeupdate.name} saved successfully \n \t refresh to see result`)
                navigation.navigate("Home")
            }).catch(err=>{
                Alert.alert("Some error try again")
            })
        }


//to use cloudinary:
        const handleUpload = (image)=>{
            const data = new FormData()
            data.append('file', image)
            data.append('upload_preset','employeeApp')
            data.append("cloud_name","suzan98")
            fetch("https://api.cloudinary.com/v1_1/suzan98/image/upload",{
                method:"post",
                body:data
            }).then(res=>res.json()).
            then(data=>{
                console.log(data)
                setPicture(data.url)
                setModal(false)
            }).catch(err=>{
                Alert.alert("Error while uploading")
            })

        }
        
        return(
            <KeyboardAvoidingView behavior="position"  style={styles.root} enabled={shift}>
            <View>
                 <TextInput
                    style={styles.inputstyle}
                    label='Name'
                    theme={theme}
                    onFocus={()=>setShift(false)}
                    value={name}
                    mode='outlined'
                    onChangeText={text =>setName(text)}
                 />
                 <TextInput
                    style={styles.inputstyle}
                    label='Position'
                    theme={theme}
                    onFocus={()=>setShift(false)}
                    value={position}
                    mode='outlined'
                    onChangeText={text =>setPosition(text)}
                 />
            <TextInput
                    style={styles.inputstyle}
                    label='Email'
                    onFocus={()=>setShift(false)}
                    theme={theme}
                    value={email}
                    keyboardType='email-address'
                    mode='outlined'
                    onChangeText={text =>setEmail(text)}
                 />
               
            <TextInput
                    style={styles.inputstyle}
                    label='Phone.No'
                    theme={theme}
                    value={phone}
                    onFocus={()=>setShift(true)}
                    mode='outlined'
                    keyboardType='number-pad'
                    onChangeText={text =>setPhone(text)}
                 />  

             <TextInput
                    style={styles.inputstyle}
                    label='Salary'
                    theme={theme}
                    onFocus={()=>setShift(true)}
                    value={salary}
                    mode='outlined'
                    onChangeText={text =>setSalary(text)}
                 />     

         
             <Button style={styles.inputstyle} 
              icon={picture==""?"upload":"check"} 
              theme={theme}
              mode="contained"
              onPress={() => setModal(true) }>
                upload image
            </Button>

            {route.params?
             <Button style={styles.inputstyle}
             icon="content-save" 
             theme={theme}
             mode="contained"
             onPress={() => updateDetails()}>
               Update
           </Button>
           : <Button style={styles.inputstyle}
           icon="content-save" 
           theme={theme}
           mode="contained"
           onPress={() => submitData()}>
             save
         </Button>
            }
            
            
            <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={()=>
                setModal(false)
            }
            >
                <View style={styles.ModalView} >
                    <View style={styles.modalButtonView}>
                        <Button style={styles.Button} 
                         theme={theme}
                        icon="google-photos" 
                        mode="contained" 
                        onPress={()=>
                            pickFromGallery()}>
                        gallery
                        </Button>

                        <Button  style={styles.Button}
                        icon="camera" 
                        mode="contained" 
                        theme={theme}
                        onPress={()=>
                            pickFromCamera()}>
                        camera
                        </Button>
                    </View>


                    <Button style={styles.inputstyle} 
                        icon="cancel" 
                        mode="outlined"
                        theme={theme}
                        onPress={()=>
                        setModal(false)}>
                        Cancel
                        </Button>
                    
                </View>

            </Modal>
            </View>
            </KeyboardAvoidingView>
            )
}
const theme ={
    colors:{
        primary:"#ff3c00",   
    }

}
const styles = StyleSheet.create({
    root:{
        flex:1,
    },
    inputstyle:{
        margin:5,  
        
    
    },
    
    modalButtonView:{
     flexDirection:'row',
     margin:5,
     justifyContent:'space-around'

     
    },
    Button:{
        margin:5,
        width:160,
        height:60,
        justifyContent:'space-around',
        bottom:2,
        
    },

    ModalView:{
        position: 'absolute',
        bottom:4,
        //left:5,
        alignSelf:'center',
        backgroundColor:"#bdbdbd"
    }



    
})

export default CreateEmployee;