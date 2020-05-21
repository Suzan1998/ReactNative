import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,Image ,FlatList, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';
//import { item } from 'react-native-paper';

const Home = ({navigation}, route)=>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)

    const fetchData=()=>{
        fetch("http://6d64a3fd.ngrok.io/")
        .then(res=>res.json())
        .then(results=>{
            setData(results)
            setLoading(false)
        }).catch(err=>{
            Alert.alert("Something went wrong!!")
        })
    }
    useEffect(()=>{
        fetchData()

    },[])


    const renderlist =((item)=>{
        return(
                <Card style={styles.mycard}
                onPress={()=>navigation.navigate("Profile",{item})}
                >
                    <View style={styles.cardview}>
                        <View style={styles.textview}>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text style={styles.text}>{item.position}</Text>
                        </View>
                    <Image 
                    style={{width:80,height:80,borderRadius:50}}
                    source={{uri:item.picture}}
                    
                    />
                    </View>
                </Card>
        )
    })

    return(
        <View style={{flex:1}}>
          <FlatList
              data={data}
              renderItem= {({item})=>{
             return renderlist(item)
              }}
              keyExtractor={item=> `${item._id}`}
              onRefresh={()=>fetchData()}
              refreshing={loading}
              />
           
            <FAB onPress={()=>navigation.navigate("CreateEmp")}
              style={styles.fab}
              large
              icon="plus"
              theme={{colors:{accent:'#272429'}}}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    mycard:{
      margin:5,
     // padding:5,
     backgroundColor:'#c1cccc',
     justifyContent:'flex-end',
     alignItems:'flex-end',
      
    },
    cardview:{
        flexDirection:"row",
        padding:6,
    },
    textview:{
        flexDirection:'column',
        margin:10,
    },
    text:{
       fontSize:18,
    },
    fab:{
        position: 'absolute',
        margin: 16,
        right: 265,
        bottom: 20,

    },
  });
export default Home;