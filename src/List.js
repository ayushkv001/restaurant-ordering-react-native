import { useState } from "react";
import { Button, View,Text ,StyleSheet, ScrollView,TextInput} from "react-native";


export default function List(){
    const [list,setList] = useState([]);    
    const [number, onChangeNumber] = useState('');
    const [text, onChangeText] = useState('');
    const [phone, onChangePhone] = useState('');
    const [orders, onChangeOrders] = useState('');
    const [visible,setVisible]  = useState(false);
    const [orderID,setOrderID] = useState(1);

    const handlesubmit = () => {
        setList(old => [...old,{
            table_id:number,
            name:text,
            phone:phone,
            order:orders,
            stat:false,
            issue_id:orderID
        }]);

        setVisible(false)
        setOrderID(i => i+1)
        onChangeNumber('')
        onChangeOrders('')
        onChangePhone('')
        onChangeText('')
    }

    const onAdd = () => {
        setVisible(!visible) //to view form
    }

    const onDone =  (data) => {
        const newState = list.map(obj => {
            if(obj.issue_id == data){
                return {...obj,stat:true}
            };
            return obj;
        })

        setList(newState)
    } 

    const onRemove = (data) => {
        const newState = list.filter(obj => {
            return obj.issue_id!==data;
        })

        setList(newState)
    }

    return <View style={styles.container}>
        <Text style={styles.header}>Restaurent Orders  <Button  onPress={onAdd} title="ADD" color="blue"/></Text>
        <View style={{display:visible?"block":"none",justifyContent:'center',alignItems:'center',width:'100%',marginBottom:5}}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                keyboardType="numeric"
                placeholder="Table NO."
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                keyboardType="default"
                placeholder="Name"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePhone}
                value={phone}
                keyboardType="numeric"
                placeholder="Phone"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeOrders}
                value={orders}
                keyboardType="default"
                placeholder="Order"
            />
            <Button onPress={handlesubmit} title="Submit" color="red"/>
        </View>
        <Text style={styles.header2}>OrderID TableID</Text>
        <ScrollView style={styles.container2}>
        {
            list.map(({table_id,issue_id,stat,order,name,phone,key}) => {
                if(stat==false)
                return <Text key={key} style={stat?styles.two:styles.one}>     {issue_id}            {table_id}                 {stat?"COMPLETED":<><Button title="Remove" onPress={() => onRemove(issue_id)}/> <Button onPress={() => onDone(issue_id)} title="Done"/></>} </Text>
                else
                return null
            })
        }
        <Text></Text>
        {
            list.map(({table_id,issue_id,stat,order,name,phone,key}) => {
                if(stat==true)
                return <Text key={key} style={stat?styles.two:styles.one}>     {issue_id}            {table_id}                {stat?"COMPLETED":<><Button title="Remove" onPress={() => onRemove(issue_id)}/> <Button onPress={() => onDone(issue_id)} title="Done"/></>}  </Text>
                else
                return null
            })
        }
        </ScrollView>
    </View>
};


const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"flex-start",
      flexDirection:"column",
      alignItems:"flex-start",
      paddingTop:35,
      width:'100%'
    },
    header:{
        width:'100%',
        marginHorizontal:'20%',
        fontSize:20,
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'row',
        height:40,
        color:'red',
        fontWeight:'bold'
    },
    one:{
        fontSize:20,
        width:'100%',
        justifyContent:'center',
        alignContent:'center',
        height:39
    },
    two:{
        backgroundColor:"lightgreen",
        fontSize:20,
        height:34,
        width:'100%',
        justifyContent:'center',
        alignContent:'center',
        marginBottom:5
    },
    header2:{
        fontSize:20
    },
    container2:{
        width:'100%'
    }
})
