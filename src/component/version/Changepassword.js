import React from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView} from 'react-native';
import { Actions,Alert } from 'react-native-router-flux';

class Changepassword extends React.Component{

  render(){
    return(       
      <View >
        <ImageBackground style={{height:height,width:width}} source={require('../img/back.jpg')} resizeMode='cover' opacity={0.6}>
              <View style={styles.items}>
                 <Text style={styles.fonttitle}>请输入以下内容</Text>
              </View>
              <View>
                  <View style={styles.items}><Text style={styles.font}>用户名</Text><TextInput style={styles.marginl}></TextInput></View>
                  <View style={styles.items}><Text style={styles.font}>密 码</Text><TextInput style={styles.marginl}></TextInput></View>
                  <View style={styles.items}><Text style={styles.font}>新密码</Text><TextInput style={styles.marginl}></TextInput></View>
                  <View style={styles.items}><Text style={styles.font}>确认密码</Text><TextInput style={styles.marginl}></TextInput></View>
                  
              </View>
              <View style={styles.adminn}>
                  <View style={styles.adminbtnn}>
                    <Button title="确 定" color="#13ad9b" onPress={()=>alert('好喜欢你！')}>确 定</Button>
                  </View>
             </View>
        </ImageBackground>
      </View>
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
    fonttitle:{
      width:width*0.9,
      fontSize:19,
      // color:'#2c5c53'
      // backgroundColor:'#f00'
    },
    font:{
      width:width*0.2,
      fontSize:16,
      // color:'#2c5c53',
      textAlign:'left'
    },
    marginl:{
      width:width*0.7,
      fontSize:16
      // color:'#2c5c53'
      
    },
    adminn:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  adminbtnn:{
    flex:0.3,
    marginTop:30
  }
  

}

export default Changepassword







