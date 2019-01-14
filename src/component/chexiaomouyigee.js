
import React,{component,PropTypes} from 'react'
import { Modal,View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView,NativeModules, DeviceEventEmitter,AsyncStorage,ToastAndroid} from 'react-native';
import { Actions,Alert } from 'react-native-router-flux';
import axios from 'axios';
import CheckBox from 'react-native-checkbox';
import {url} from '../config';
import Loading from './Loading';
const scanToastAndroid = NativeModules.ScanToastAndroid;
let myundataSubscription;

class chexiaomouyigee extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        chexiao:'撤销某一兜',
        newID:'',
        myundataSCANS:'',
        zhuanyizuihouyige:false,
        Loading:true,
        alert:'',
        nheight:22,
        myundataCodeList:'',        
        myundataobj: ''
      };
    }
    componentWillUnMount(){
      this.listeneree.remove()
    }
 
    componentDidMount(){
      // alert([this.props.myundatauserInfoID,this.props.myundataid]); 
      // if (Actions.state.index==3) {
              this.listeneree=DeviceEventEmitter.addListener('EventName', (res) => {
            const myundatacounts=new Array();
            this.setState({ myundataobj: res });
            let myundatascanres=this.state.myundataobj.SCAN;
                myundatacounts.push(myundatascanres);
            let myundatacountsset=new Set(myundatacounts);
            let myundatacountarray=Array.from(myundatacountsset);
            let newmyundatacountarray=myundatacountarray;
            this.setState({ myundataSCANS: newmyundatacountarray });
             // alert(this.state.myundataSCANS)
            if (newmyundatacountarray.length==0) {
               this.setState({
                alert:'没有二维码'
              })
              return false;
            }else{
              this.setState({
               alert:'扫到二维码'
              })
              let data={
                  userInfoID:this.props.myundatauserInfoID,
                  id:this.props.myundataid,
                  revokeQRCode:this.state.myundataSCANS.toString()
              }
              this.setState({myundataCodeList:newmyundatacountarray});
              if(this.state.myundataCodeList.length==1&&data!=null){
                 if (Actions.state.index==3) {
                 axios.post(`${url}/invoice/RevokeQRCode`,data)
                  .then(res=>{
                    if (res.data.result==true){
                       alert(res.data.message);
                       if (this.state.myundataCodeList.length>=1) {
                            this.setState({
                              myundataCodeList:''
                            })
                        };
                        // Actions.popTo('myundata');
                        // Actions.refresh(); 
                    }else{
                      alert(res.data.message);
                      if (this.state.myundataCodeList.length>=1) {
                            this.setState({
                              myundataCodeList:''
                            })
                        };
                        // Actions.popTo('myundata');
                        // Actions.refresh(); 
                    }          
                  })
                  .catch(err=>{console.log(' ')})
               }
            }
          }
            
        });
      // };     

      }
    
  render(){ 
    return(
      <View style={styles.flexbox}>
          <View><Text style={{color:'#f00',fontSize:23}}>对准网兜中要撤销的二维码进行扫描，即可自动撤销该网兜</Text></View>
          <View><Text style={{color:'red',fontSize:23}}>{this.state.alert}</Text></View>       
      </View>
      )  
}
}
const {width, height} = Dimensions.get('window')
const styles={
    flexbox:{
     flex:1,
     flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
    },
    adminbtnntext:{
      marginTop:20,
     fontSize:22,
     color:'#fff',
     textAlign:'center',
     backgroundColor:'#4ea3f1',
     borderRadius:15,
     paddingTop:25,
     paddingBottom:25,
     paddingLeft:70,
     paddingRight:70

  }
 
  

}

export default chexiaomouyigee







