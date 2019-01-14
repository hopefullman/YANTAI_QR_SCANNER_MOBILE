import React from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView} from 'react-native';
import { Actions,Alert } from 'react-native-router-flux';

class Shipment extends React.Component{
  xiangxi(){
    alert('Alert Title')
  }
  tishi(){
   alert('Alert Title')
  }
  render(){
    return(       
      <ScrollView style={styles.flexbox}>
        
              <View>
                  <View style={styles.items}><Text style={styles.font}>产品名称</Text><TextInput style={styles.marginl}>硫酸铵</TextInput></View>
                  <View style={styles.items}><Text style={styles.font}>产品规格</Text><TextInput style={styles.marginl}>15-15-15</TextInput></View>
                  <View style={styles.items}><Text style={styles.font}>产品质量</Text><TextInput style={styles.marginl}>50公斤</TextInput></View>
                  <View style={styles.items}><Text style={styles.font}>发货量</Text><TextInput style={styles.marginl}>30吨</TextInput></View>
                  <View style={styles.items}><Text style={styles.font}>需求公司</Text><TextInput style={styles.marginl}>大世界</TextInput></View>
                  <View style={styles.items}><Text style={styles.font}>发货地</Text><TextInput style={styles.marginl}>黑龙江齐齐哈尔</TextInput></View>
              </View>
              <View style={styles.adminn}>
                  <View style={styles.adminbtnn}>
                    <Button title="确 定" color="#4ea3f1" onPress={()=>alert('好喜欢你！')}>确 定</Button>
                  </View>
             </View>
       
      </ScrollView>
      )
      
}
}
const {width, height} = Dimensions.get('window')
const styles={
    flexbox:{
     flex:1
    },
    items:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:0.1*height
    },
    font:{
      fontSize:18
      // color:'#2c5c53'
    },
    marginl:{
      fontSize:18,
      marginLeft:5
      // color:'#2c5c53'
      
    },
      Imag:{
    width:width,
    height:height,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
    adminn:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  adminbtnn:{
    flex:0.3
  }
  

}

export default Shipment







