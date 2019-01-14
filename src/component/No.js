import React,{component,PropTypes}from 'react'
import {Modal,View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView,NativeModules, DeviceEventEmitter,AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-checkbox';
import axios from 'axios';
import {url} from '../config';
const scanToastAndroid = NativeModules.ScanToastAndroid;
class No extends React.Component{
  constructor(props){
        super(props)
        this.state={
          nheight:15,
          obj:'',
          count:null,
          groupNoList:null,
          CodeList:'',
          id:''
      }
  }

  componentDidMount(){
          // alert(this.props.ID)
          // alert(this.state.CodeList)
          alert('此发货单为空单发货，按下F5扫描')
          const counts=new Array();
          DeviceEventEmitter.addListener('EventName', (res) => {
            this.setState({ obj: res });
            let scanres=this.state.obj.SCAN;
                counts.push(scanres);
            let countsset=new Set(counts);
            let countarray=Array.from(countsset);
            // let countslength=countsset.size;
            this.setState({CodeList:countarray});
            
            if (this.state.id=='') {
            let data={
            qrCodeList:this.state.CodeList,
            CompanyID:this.props.ID
            }
            axios.post(`${url}/RFIDGroup/Add`,data)
            .then(res=>this.setState({count:res.data.qrCodeList.length,groupNoList:res.data.groupNoList.length,id:res.data.id}))
            .catch(err=>alert(err))
            }else{
            let data={
             qrCodeList:this.state.CodeList,
             id:this.state.id
            }
            axios.post(`${url}/RFIDGroup/UpdateQRCode`,data)
            .then(res=>this.setState({count:res.data.qrCodeList.length,groupNoList:res.data.groupNoList.length}))
            .catch(err=>alert(err))
            }
            
        });
        
  }

  render(){
    return(
      <View style={styles.flexbox}>
        <ImageBackground style={{height:this.state.nheight*height*1,width:width}} source={require('../img/back.jpg')} resizeMode='cover' opacity={1}>
        <View style={styles.itemss}>
            <Text style={styles.fontwidths}>二维码数</Text>
            <Text style={{width:0.35*width,fontSize:22,textAlign:'left',color:'#f00'}}>{this.state.count}</Text>
        </View>
        <View style={styles.itemss}>
            <Text style={styles.fontwidths}>网兜数</Text>
            <Text style={{width:0.35*width,fontSize:22,textAlign:'left',color:'#f00'}}>{this.state.groupNoList}</Text>
        </View>
        <View style={styles.adminn}>
            <Text style={styles.adminbtnntext}>确 定 全 部 提 交</Text>
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
    itemss:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:0.1*height,
      marginTop:15
    },
    fontwidths:{
      width:0.35*width,
      fontSize:22,
      textAlign:'left'
    },
    adminn:{
    width:width,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:30
    },
    adminbtnntext:{
     fontSize:22,
     color:'#fff',
     backgroundColor:'#4ea3f1',
     borderRadius:15,
     paddingTop:25,
     paddingBottom:25,
     paddingLeft:70,
     paddingRight:70

  }

}

export default No







