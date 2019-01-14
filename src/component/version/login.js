import React,{component,PropTypes}from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,TouchableNativeFeedback} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {url} from '../config'
class Login extends React.Component{
  constructor(props){
        super(props)
        this.state={
          admin:null,
          password:null
      }
  }
  // static PropTypes={
  //   value:PropTypes.string.isRequire
  // }

  componentDidMount(){

  }


  login(){
    
    let admin=this.state.admin;
    let password=this.state.password;
    // let passwordnum=parseInt(password);
    // let passwordarr=passwordnum.split("")
    // console.log(passwordarr)

    let password1=parseInt(password.charAt(0));
    let password2=parseInt(password.charAt(1));
    let password3=parseInt(password.charAt(2));
    let password4=parseInt(password.charAt(3));
    let password5=parseInt(password.charAt(4));
    let password6=parseInt(password.charAt(5));
    if (password1==password2==password3==password4==password5==password6) {alert("dashabi")};
    
    // for (let i in password) {
    // array.push(password[i]); 
    // }



    // console.log(array)
    // console.log(password instanceof String)
    // let fpassword=Array.from(password)
    // console.log(fpassword)
    // let spassword=new Set(fpassword);
    // if(spassword.length>1){
    //     alert('ok')
    // }




    // alert(admin);
    // alert(password);
    // let data={
    //   UserName:admin,
    //   Password:password,
    //   }
      // axios.post(`${url}/UserService/Login`,data)
      // .then(res=>this.loginok(res))
      // .catch(err=>this.errback(err))

  }
  // loginok(res){
  //   Actions.Shipment()
  // }
  // errback(err){
  //   console.log(" ")
  // }



  changepassword(){
     Actions.Changepassword()
  }
  render(){
    return(


      <View style={styles.flexbox}>
        <ImageBackground style={{height:height,width:width}} source={require('../img/back.jpg')} resizeMode='cover' opacity={1}>
        <View style={styles.loginn}>
          <Image style={{height:0.2*height,width:0.4*width}} source={require('../img/logo.png')} ></Image>
        </View>
        <View style={styles.login}>
          <View>
           <Text style={styles.hfont}>美盛智能物流追踪系统</Text>
          </View>
        </View>  

        <View style={styles.admin}>
           <View><Text style={styles.textfont}>账号:</Text></View>
           <View><TextInput placeholder='admin' placeholderTextColor="#888" maxLength={10} style={styles.contentfont}  onChangeText={(admin)=>{this.setState({admin:admin})}} value={this.state.admin}></TextInput></View>
        </View>

        <View style={styles.admin}>
           <View><Text style={styles.textfont}>密码:</Text></View>
           <View><TextInput placeholder='password' placeholderTextColor="#888" maxLength={6} keyboardType='numeric' style={styles.contentfont}  secureTextEntry={true} onChangeText={(password)=>{this.setState({password:password})}} value={this.state.password}></TextInput></View>
        </View>

        <View style={styles.admin}>
            <View style={styles.adminbtn}>
              <Button title="登  录" color="#4ea3f1" onPress={this.login.bind(this)}>登  录</Button>
            </View>
        </View>

        <View style={styles.admin}>
        <View style={styles.password}>
          <Text  style={{color:"#095194"}} onPress={this.changepassword.bind(this)}>修改密码</Text>
        </View>
        </View>

        <View style={styles.copyright}>
          <Text  style={{color:"#eee",textAlign:'center'}} numberOfLines={2}>Copyright © 2017 Xiaoyu Video Communications (beijing). Technology Co.Ltd </Text>
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
  login:{
    width:width,
    height:50,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:0.01*height
  },
  loginn:{
    width:width,
    height:0.2*height,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:0.12*height
  },
  hfont:{
    fontSize:22
    // color:'#13ad9b' 
  },
  admin:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  contentfont:{
    width:0.5*width
    // color:'#13ad9b'
  },
  textfont:{
    fontSize:16
    // color:'#13ad9b' 
  },
  adminbtn:{
    flex:0.3,
    marginTop:15
  },
  password:{
    width:width*0.5,
    marginTop:15,
    alignItems:'center'
  },
  copyright:{
    width:width,
    marginTop:0.15*height
  }

}

export default Login







