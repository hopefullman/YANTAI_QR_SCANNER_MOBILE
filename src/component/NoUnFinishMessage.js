import React,{component,PropTypes} from 'react'
import {Modal,View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView,NativeModules, DeviceEventEmitter,AsyncStorage} from 'react-native';
import { Actions,Alert } from 'react-native-router-flux';
import axios from 'axios';
import {url} from '../config';
import Loading from './Loading';
const scanToastAndroid = NativeModules.ScanToastAndroid;
class NoUnFinishMessage extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        nheight:22,
        CodeList:this.props.listindex.codeList,
        id:'',
        loading:true,
        count:'',
        countcounts:'',
        obj: '',
        modalVisible:false,
        pinleizhiliang:[],
        zongzhiliang:'',
        groupNoList:'',
        groupList:'',
        groupLists:''
      }
    }
 
    componentDidMount(){
      axios.get(`${url}/RFIDGroup/get/${this.props.listindex.id}`)
      .then(res=>{this.setState({groupLists:res.data.data.qrCodeList,groupList:res.data.data.qrCodeList.length,groupNoList:res.data.data.groupNoList.length});})
      .catch(err=>alert(err))
      alert('此空发货单已进行了部分扫描，按下F5可以继续扫描')
      const counts=new Array();
      DeviceEventEmitter.addListener('EventName', (res) => {
            this.setState({ obj: res ,groupList:''});
            let scanres=this.state.obj.SCAN;
                counts.push(scanres);
            let countsset=new Set(counts);
            let countarray=Array.from(countsset);
            let newcountarray=countarray
            this.setState({CodeList:newcountarray});
            let data={
             qrCodeList:this.state.CodeList,
             id:this.props.listindex.id
            }
            axios.post(`${url}/RFIDGroup/UpdateQRCode`,data)
            .then(res=>this.setState({groupList:res.data.qrCodeList.length,groupNoList:res.data.groupNoList.length}))
            .catch(err=>alert(err))
        });
                  
    }
    
    finish(){
      // alert(this.state.groupLists)
      let zongzhiliang=null;
      let data={
          CodeList:this.state.groupLists
        }
        axios.post(`${url}/invoice/GetGroupByCode`,data)
        .then(res=>{this.setState({ modalVisible:true,pinleizhiliang:res.data});for (let i=0;i<res.data.length;i++) {zongzhiliang+=res.data[i].rule};this.setState({zongzhiliang:zongzhiliang});})
        .catch(err=>alert(err))
    }
    close(){
      this.setState({
        modalVisible:false
      })
    }
  render(){
    return(
      <ScrollView style={styles.flexbox}>
      <ImageBackground style={{height:this.state.nheight*0.1*height,width:width}} source={require('../img/back.jpg')} resizeMode='cover' opacity={1}>
            <View style={styles.itemss}>
                <Text style={styles.fontwidths}>已读取二维码个数</Text>
                <Text style={styles.fontwidths}>{this.state.groupList}</Text>
            </View>
          
            <View style={styles.itemss}>
                <Text style={styles.fontwidths}>网兜数量</Text>
                <Text style={styles.fontwidths}>{this.state.groupNoList}</Text>
            </View>
                
            <View style={styles.adminnmargin}>
                
            </View>

            <View style={styles.adminn}>
                <Text style={styles.adminbtnntext} onPress={this.finish.bind(this)}>确定完成</Text>
            </View>


            <Modal
                  animationType='slide'
                  transparent={true}
                  visible={this.state.modalVisible} 
                  onRequestClose={()=>{console.log(' ')}}
            >
              <View style={styles.modal}>
                <View style={styles.viewmodal}>

                  <View style={styles.viewmodalheader}>
                    <Text style={styles.viewmodalheadertext}>扫描结果如下</Text>
                  </View>
                
                  {
                    this.state.pinleizhiliang.map((item,index)=>{
                    return (
                    <View style={styles.viewmodalbody} key={index}>
                      <Text style={styles.viewmodalbodytext} numberOfLines={2}>品类{item.category.describe}</Text>
                      <Text style={styles.viewmodalbodytext} numberOfLines={2}>质量{item.rule}</Text>
                    </View>
                    )
                  })
                    
                  }
                
                  <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#fff',fontSize:19}}>总 质 量：{this.state.zongzhiliang}</Text>
                  </View>

                  <View style={styles.viewmodalfoot}>
                    <Text  onPress={this.close.bind(this)} style={styles.viewmodalfoottext}>关 闭</Text>
                  </View>

                </View>
              </View>  
          </Modal>
         
      </ImageBackground>     
      </ScrollView>
      )
      
}
}
const {width, height} = Dimensions.get('window')
const styles={
    admin:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20
    },
    adminbtn:{
      flex:0.8
    },
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
     items:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:0.1*height
    },
     fontwidths:{
      width:0.35*width,
      fontSize:20,
      textAlign:'left',
      color:'#164d8d'
    },
    inputwidth:{
      width:0.55*width,
      fontSize:20,
      color:'#164d8d'
    },
    inputwidthcard:{
      fontSize:20,
      width:0.55*width,
      color:'#164d8d'
    },
    adminnmargin:{
      marginTop:30
    },
    adminn:{
    width:width,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:30
    },
    adminbtnntext:{
     fontSize:20,
     color:'#fff',
     backgroundColor:'#4ea3f1',
     borderRadius:15,
     paddingTop:25,
     paddingBottom:25,
     paddingLeft:70,
     paddingRight:70

  },
  modal:{
    width:width,
    height:height,
    backgroundColor:'#000',
    opacity:0.9
    },
    viewmodal:{
    width:width,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
    },
    viewmodalheader:{
    alignItems:'center',
    width:width    
    },
    viewmodalheadertext:{
    fontSize:19,
    fontWeight: 'bold',
    color:'#fff',
    marginTop:0.05*height
    },
    viewmodalbody:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:width,
    marginTop:0.02*height
    },
    viewmodalbodytext:{
    fontSize:17,
    color:'#fff',
    marginLeft:5
    },
    viewmodalfoot:{
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:0.75*height
    },
    viewmodalfoottext:{
      backgroundColor:'#4ea3f1',
      paddingRight:60,
      paddingLeft:60,
      paddingBottom:25,
      paddingTop:25,
      fontSize:20,
      color:'#fff',
      fontWeight:'bold',
      borderRadius:5
    }
 
  

}

export default NoUnFinishMessage







