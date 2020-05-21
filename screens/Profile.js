import React, {useState} from 'react';
import { StyleSheet, Text, View, Modal, Image, Linking, Platform, Alert } from 'react-native';
import {Title, Card, Button,} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialIcons, Entypo } from '@expo/vector-icons';


const Profile =(props,route)=>{

    const {_id,name,position,email,salary,phone,picture} = props.route.params.item
    const deleteEmployee =()=>{
        fetch("http://6d64a3fd.ngrok.io/delete",
        {
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
             _id
             })
        
        }).then(res=>res.json()).then(deletedEmp=>{
            Alert.alert(`${deletedEmp.name} is Fired `)
            props.navigation.navigate("Home")
        
    })/*.catch(err=>{
        Alert.alert("Error while deleting")
    })*/
}
    const openDial=()=>{
        if(Platform.OS === "android"){
            Linking.openURL(`tel:${phone}`)
            
        }else{
            Linking.openURL(`telprompt:${phone}`)
        }

    }


    

    return (
        <View style={styles.root}>
            <LinearGradient
            colors={["#ff3f00","#db4c1d","#ff7d52","#ff774a"]}
            style={{height:"25%"}}
            />
            <View style={{alignSelf:'center',}}>
                <Image style={{width:150, height:150, borderRadius:75, marginTop:-80 }}
                source={{uri:picture}}> 
                </Image>
            </View>
            
            <View style={{alignSelf:'center', alignItems:'center'}}>
                <Title>{name}</Title>
    <Text style={{fontSize:18, marginTop:-5, marginBottom:10}}>{position}</Text>

            </View>
            <Card style={styles.cardview}  onPress={() =>{
                Linking.openURL(`mailto:${email}`)
            }}>
                <View style={styles.carddata}>
        <Text style={styles.textst}>{email}</Text>
                <MaterialIcons style={{margin:3}} name="email" size={32} color="#ff3c00" />
                </View>

            </Card>

            <Card style={styles.cardview} onPress={() =>{
                openDial()
            }}>
                <View style={styles.carddata}>
        <Text style={styles.textst}>{phone}</Text>
                < Entypo style={{margin:3}} name="phone" size={32} color="#ff3c00" />
                </View>

            </Card>
            <Card style={styles.cardview}>
                <View style={styles.carddata}>
        <Text style={styles.textst}>{salary}</Text>
                <MaterialIcons style={{margin:3}} name="attach-money" size={32} color="#ff3c00" />
                </View>

            </Card>

            <View style={styles.buttonviewstyle}>

            <Button style={styles.buttonstyle}
             theme={theme}
              icon="delete" 
              mode="contained"
              onPress={() =>deleteEmployee() }>
                  fire emp
            </Button>    
            <Button style={styles.buttonstyle}
             theme={theme}
              icon="account-edit" 
              mode="contained"
              onPress={() =>{
                   props.navigation.navigate("CreateEmp", {_id,name,position,email,salary,phone,picture}
                   ) 
                }}>
                  edit pro
            </Button>

            </View>
           
        </View>
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

cardview:{
    margin:3,
    
    
},
carddata:{
flexDirection:'row',
justifyContent:'flex-end',
},
textst:{
    margin:8,
    fontSize:17,
},
buttonviewstyle:{
    flexDirection:'row',
    justifyContent:'space-around',
},
buttonstyle:{
    margin:10,
    padding:10,
}

})




export default Profile;