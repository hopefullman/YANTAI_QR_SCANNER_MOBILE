import React,{component,PropTypes} from 'react'
import { TouchableOpacity,View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView, AsyncStorage} from 'react-native';
import { Actions,Alert } from 'react-native-router-flux';
import {url} from '../config';
import axios from 'axios';
// import Storage from 'react-native-storage';
class Changepassword extends React.Component{

  constructor(props){
        super(props)
        this.state={
          useradmin:'',
          userpassword:'',
          useralert:'',
          usernewpassword:'',
          userconfirmpassword:'',
          disable:true,
          useid:''
      }
      
  }

  componentDidMount(){
        
  }
    getuser=()=>{
      try{
        this.setState({useralert:''})
        let useradmin=this.state.useradmin;
        let userpassword=this.state.userpassword;

        let usermatchadmin=/^[A-Za-z0-9]{5,20}$/;
        let usermatchpassword=/^[0-9]{5,20}$/;
          
        if (!usermatchadmin.exec(useradmin)) {
            this.setState({useralert:'请正确输入6-20位字母组合的用户名'});
            return false;
        }
        if (!usermatchpassword.exec(userpassword)) {
            this.setState({useralert:'请正确输入6位数字密码'});
            return false;
          }
     
        let userpasswordset=new Set(userpassword)
        if (userpasswordset.size==1) {
            this.setState({useralert:'6位数字密码不能相同'});
            return false;
          }
        let data={
        name:useradmin,
        password:userpassword,
        }
        axios.post(`${url}/UserInfo/Login`,data)
        .then(res=>this.getuserok(res))
        .catch(err=>this.getusererr(err))
      }catch(err){
        console.log(" ")
      }
    }

    getuserok(res){ 
    if (res.data.code==2) {this.setState({disable:false,useid:res.data.data.id})};
    if (res.data.code==1) {this.setState({useralert:'用户名密码不匹配',disable:true});};
    if (res.data.code==0) {this.setState({useralert:'用户名不存在',disable:true}); };             
    }
    getusererr(err){
        console.log(err)
    }

    changepassword=()=>{
    try{
        this.setState({useralert:''})
       
        let usernewpassword=this.state.usernewpassword;
        let userconfirmpassword=this.state.userconfirmpassword;

        let usermatchpassword=/^[0-9]{5,20}$/;
          
        if (!usermatchpassword.exec(usernewpassword)) {
            this.setState({useralert:'请正确输入新的6位数字密码'});
            return false;
        }
   
        let usernewpasswordset=new Set(usernewpassword)
        if (usernewpasswordset.size==1) {
            this.setState({useralert:'6位数字密码不能相同'});
            return false;
          }
        if (usernewpassword!==userconfirmpassword) {
          this.setState({useralert:'两次密码不一致，请检查后再次确认'});
            return false;
        };
       console.log(this.state.useid)
        let data={
          password:usernewpassword,
          id:this.state.useid,
          }
       console.log(data)
        axios.post(`${url}/UserInfo/ChangePassword`,data)
        .then(res=>this.changeok(res))
        .catch(err=>this.changeerr(err))
      }catch(e){
        console.log(e);
      }
      
    }
    changeok(res){
      console.log('change',res)
      if (res.data==true) {
          this.setState({useralert:'修改成功'})
      };
      if (res.data==false) {
          this.setState({useralert:'修改失败，请重新检查后再次输入'})
      };
    }
    changeerr(err){
       console.log(" ");
    }
  render(){
    return(       
      <View >
        
              <View style={styles.items}>
                 <Text style={styles.fonttitle}>请输入以下内容</Text>
              </View>
              <View>
                  <View style={styles.items}><Image style={{width:20,height:20}} source={require('../img/user.png')}/><Text style={styles.font}>用户名</Text><TextInput maxLength={20} style={styles.marginl} onChangeText={(useradmin)=>{this.setState({useradmin:useradmin})}} value={this.state.admin}
                  ></TextInput></View>

                  <View style={styles.items}><Image style={{width:20,height:20}} source={require('../img/password.png')}/><Text style={styles.font}>密 码</Text><TextInput maxLength={20} keyboardType='numeric' secureTextEntry={true} style={styles.marginl} onChangeText={(userpassword)=>{this.setState({userpassword:userpassword})}} ></TextInput></View>


                  <View style={styles.adminn}>
                  <View style={styles.adminbtnn}>
                    <TouchableOpacity onPress={this.getuser.bind(this)}><Text style={{backgroundColor:'#4ea3f1',fontSize:22,color:'#fff',textAlign:"center",paddingTop:10,paddingBottom:10,borderRadius:5}}>确 定</Text></TouchableOpacity>
                  </View>
                  </View>


                  <View style={styles.items}><Image style={{width:20,height:20}} source={require('../img/new.png')}/><Text style={styles.font}>新密码</Text><TextInput maxLength={20} keyboardType='numeric' secureTextEntry={true} style={styles.marginl} onChangeText={(usernewpassword)=>{this.setState({usernewpassword:usernewpassword})}}></TextInput></View>

                  <View style={styles.items}><Image style={{width:20,height:20}} source={require('../img/comfirm.png')}/><Text style={styles.font}>确认密码</Text><TextInput maxLength={20} keyboardType='numeric' secureTextEntry={true} style={styles.marginl} onChangeText={(userconfirmpassword)=>{this.setState({userconfirmpassword:userconfirmpassword})}}></TextInput></View>
                  
              </View>

              <View style={styles.adminn}>
                  <Text style={styles.contentfontred}>{this.state.useralert}</Text>
             </View>

              <View style={styles.adminn}>
                  <View style={styles.adminbtnn}>
                    <TouchableOpacity activeOpacity={0.3} disabled={this.state.disable} 
                     onPress={this.changepassword.bind(this)}
                    ><Text style={{backgroundColor:'#4ea3f1',fontSize:22,color:'#fff',textAlign:'center',paddingTop:10,paddingBottom:10,borderRadius:5}}>确 定 修 改</Text></TouchableOpacity>
                  </View>
             </View>
        
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
      fontSize:24,
      // color:'#2c5c53'
      // backgroundColor:'#f00'
    },
    font:{
      width:width*0.2,
      fontSize:24,
      // color:'#2c5c53',
      textAlign:'left'
    },
    marginl:{
      width:width*0.6,
      fontSize:24
      // color:'#2c5c53'
      
    },
    adminn:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  adminbtnn:{
    width:width*0.4,
    marginTop:30
  },
  contentfontred:{
    color:'#f00'
  }
  

}

export default Changepassword







