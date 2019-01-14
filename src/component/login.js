import React,{component,PropTypes}from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,TouchableNativeFeedback,AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-checkbox';
import axios from 'axios';
import {url} from '../config';
class Login extends React.Component{
  constructor(props){
        super(props)
        this.state={
          admin:'',
          password:'',
          alert:'',
          showhide:true,
          autoFocus:false,
          checked:false,
          checkboxshow:false
      }
  }

  componentDidMount(){
    
    
          // AsyncStorage.getItem('admin',(error,result)=>{
          //   this.setState({admin:result})
          // })
          // AsyncStorage.getItem('password',(error,result)=>{
          //   this.setState({password:result})
          // })
          // // alert(this.state.admin)
          // if (this.state.admin=="" || this.state.password=="") {
          //     this.setState({checked:false})
          // };
        
  }

  login(){
    try{
        this.setState({alert:''})
        let admin=this.state.admin;
        let password=this.state.password;

        let matchadmin=/^[0-9A-Za-z]{5,20}$/;
        let matchpassword=/^[0-9]{5,20}$/;

        if (!matchadmin.exec(admin)) {
            this.setState({alert:'请正确输入5-20位数字字母组合的用户名'});
            return false;
        }else{
        if (!matchpassword.exec(password)) {
            this.setState({alert:'请正确输入5位数字密码'});
            return false;
          }else{
            // 这里判断重复密码 666666
            let passwordset=new Set(password)
            if (passwordset.size==1) {
                this.setState({alert:'6位数字密码不能相同'});
                return false;
              }
          }
        }

        let data={
          name:admin,
          password:password,
          }
        axios.post(`${url}/UserInfo/Login`,data)
        .then(res=>this.loginok(res))
        .catch(err=>this.loginerr(err))
      }catch(e){
        console.log(e);
      }
    }
  
    loginok(res){
    
    if (res.data.code==2) {
      
      for (let i=0;i<res.data.data.rights.length;i++) {

        if (res.data.data.rights[i].softName=='装车发运软件（烟台）') {
         
          let ID=res.data.data.companyID;
          let renyuandengluid=res.data.data.id;
          Actions.Shipment({ID,renyuandengluid});

          }else if(res.data.data.rights[i].softName=='装车发运软件（秦皇岛）'){
            
            let ID=res.data.data.companyID;
            let renyuandengluid=res.data.data.id;
            Actions.Shipment({ID,renyuandengluid});
          }
      }
    };

    if (res.data.code!=2){
      this.setState({alert:'请正确输入用户名或者密码'});
      return false;
    }    
  }

    loginerr(err){
      console.log("err",err)
    }



  changepassword(){
     Actions.Changepassword()
  }
  // checkbox(){
  //   this.setState({
  //     checked:!this.state.checked
  //   })
  
  //   if(this.state.checked==true){
  //       AsyncStorage.setItem('admin',this.state.admin,(error)=>{
  //       })
  //       AsyncStorage.setItem('password',this.state.password,(error)=>{
  //       })
  //     }else{
  //        AsyncStorage.removeItem('admin',(error,result)=>{
  //         })
  //         AsyncStorage.removeItem('password',(error,result)=>{
  //         })
  //     }
 
  // }
  render(){
    let {admin,password,alert,showhide,autoFocus}=this.state
    return(


      <View style={styles.flexbox}>
    {/*<Text>{url}</Text>*/}
      
        <ImageBackground style={{height:height,width:width}} source={require('../img/back1.jpg')} resizeMode='cover' opacity={1}>
     
        <View style={styles.loginn} >
          <Image style={{height:0.2*height,width:0.4*width}} source={require('../img/logo.png')} ></Image>
         </View>
       
        
        <View style={styles.login}>
          <View>
           <Text style={styles.hfont}>美盛智能物流追踪系统</Text>
          </View>
          <View>
           <Text style={styles.hfont}>装车发运软件</Text>
          </View>
        </View>  

        <View style={styles.admin}>
           <View><Text style={styles.textfont}>账号:</Text></View>
           <View><TextInput autoFocus={this.state.autoFocus} placeholder='admin' placeholderTextColor="#888" maxLength={20} style={styles.contentfont}  onChangeText={(admin)=>{this.setState({admin:admin})}} value={admin} 
           ></TextInput></View>
        </View>

        <View style={styles.admin}>
           <View><Text style={styles.textfont}>密码:</Text></View>
           <View><TextInput placeholder='password' placeholderTextColor="#888" maxLength={20} keyboardType='numeric' style={styles.contentfont}  secureTextEntry={true} onChangeText={(password)=>{this.setState({password:password})}} value={password} 
           ></TextInput></View>
        </View>
        
        <View style={styles.admin}>
      {/*
          <CheckBox
              label='记住密码'
              checked={this.state.checked}
              labelStyle={{color:'#3a88f9',fontSize:25}}
              checkboxStyle={{width:20,height:20,borderColor:'#4ea3f1'}}
              onChange={ this.checkbox.bind(this)}>
          </CheckBox>
          */}
        </View>
        

        <View style={styles.admin}>
        <Text style={styles.contentfontred}>{this.state.alert}</Text>
        </View>

        <View style={styles.admin}>
            <View style={styles.adminbtn}>
              <TouchableNativeFeedback onPress={this.login.bind(this)}><Text style={styles.adminbtntext} >登  录</Text></TouchableNativeFeedback>
            </View>
        </View>

        <View style={styles.admin}>
        <View style={styles.password}>
          <Text  style={{color:"#095194",fontSize:25}} onPress={this.changepassword.bind(this)}>修改密码</Text>
        </View>
        </View>

        <View style={styles.copyright}>
          <Text  style={{color:"#eee",textAlign:'center',fontWeight:'bold'}} numberOfLines={2}>Copyright © 2017 Xiaoyu Video Communications (beijing). Technology Co.Ltd </Text>
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
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginTop:0.012*height,
    marginBottom:0.02*height

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
    justifyContent:'center',
    alignItems:'center',
    fontSize:28
    // color:'#13ad9b' 
  },
  admin:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  contentfont:{
    width:0.5*width,
     fontSize:25
    // color:'#13ad9b'
  },
  contentfontred:{
    color:'#f00',
    fontSize:20
  },
  textfont:{
    fontSize:25
    // color:'#13ad9b' 
  },
  adminbtn:{
    marginTop:width*0.06,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  adminbtntext:{
    color:'#fff',
    paddingLeft:width*0.145,
    paddingRight:width*0.145,
    paddingBottom:width*0.035,
    paddingTop:width*0.035,
    letterSpacing:15,
    borderRadius:12,
    backgroundColor:'#4ea3f1',
    fontSize:25
  },
  password:{
    width:width*0.5,
    marginTop:30,
    alignItems:'center'
  },
  copyright:{
    position:'absolute',
    top:0.9*height,
    width:width
  }

}

export default Login







