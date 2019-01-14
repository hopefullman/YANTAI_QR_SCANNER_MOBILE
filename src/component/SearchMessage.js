import React,{component,PropTypes} from 'react'
import {Modal,View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView,NativeModules, DeviceEventEmitter,AsyncStorage} from 'react-native';
import { Actions,Alert } from 'react-native-router-flux';
import axios from 'axios';
import {url} from '../config';
import Loading from './Loading';
const scanToastAndroid = NativeModules.ScanToastAndroid;
class SearchMessage extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        loading:true,
        nheight:22,
        CodeList:'',
        newCodeList:'',
        invoiceShipmentList:'',
        count:null,
        countcounts:'',

        obj: '',
        modalVisible:false,
        pinleizhiliang:[],
        zongzhiliang:'',

        no :'',
        InvoiceTime :'',
        orderNo:'',
        OrderTime:'',
        CustomerNo:'',
        DealerName:'',
        DealerPostcord :'',
        DealerPlace:'',
        ShipmentMode:'',
        DeliveryMode:'',
        PlateNumber:[],
        DriverName:'',
        DriverPhoneNo:'',

        ShippingProject:'',
        ShippingMaterials:'',
        ShippingNumber:'',
        ShippingDescribe:''
      };
    }
 
    componentDidMount(){
      // alert(this.props.listindex.id)
      axios.get(`${url}/Invoice/get/${this.props.listindex.id}`)
      .then(res=>{this.setState({CodeList:res.data.data.codeList,invoiceShipmentList:res.data.data.invoiceShipmentList,count:res.data.data.codeList.length,countcounts:res.data.data.groupNoList.length,no:res.data.data.no,InvoiceTime:res.data.data.invoiceTime,orderNo:res.data.data.orderNo,OrderTime:res.data.data.orderTime,CustomerNo:res.data.data.customerNo,DealerName:res.data.data.dealerName,DealerPostcord:res.data.data.dealerPostcord,DealerPlace:res.data.data.dealerPlace,ShipmentMode:res.data.data.shipmentMode,DeliveryMode:res.data.data.deliveryMode,PlateNumber:res.data.data.plateNumber,DriverName:res.data.data.driverName,DriverPhoneNo:res.data.data.driverPhoneNo});})
      .catch(err=>alert(err));
      const counts=new Array();
      DeviceEventEmitter.addListener('EventName', (res) => {
            this.setState({ obj: res ,count:''});
            let scanres=this.state.obj.SCAN;
                counts.push(scanres);
            let countsset=new Set(counts);
            let countarray=Array.from(countsset);
            let newcountarray=countarray
            // alert(newcountarray.length)
            // let countslength=parseInt(countsset.size)+parseInt(this.state.count);
            this.setState({CodeList:newcountarray});
            let data={
             CodeList:this.state.CodeList,
             id:this.props.listindex.id
            }
            axios.post(`${url}/Invoice/UpdateQRcode`,data)
            .then(res=>{this.setState({count:res.data.codeList.length,countcounts:res.data.groupNoList.length});})
            .catch(err=>alert(err))
        });
         if (this.state.invoiceShipmentList==null||this.state.invoiceShipmentList=="") {
              this.setState({
                nheight:22
              })
         }else{
          this.setState({
                nheight:this.state.invoiceShipmentList.length*10+22
              })
         }
                  
    }
    
    finish(){
      let zongzhiliang=null;
      this.setState({
      modalVisible:true
      })
      let data={
          CodeList:this.state.CodeList
        }
      axios.post(`${url}/invoice/GetGroupByCode`,data)
      .then(res=>{this.setState({pinleizhiliang:res.data});for (let i=0;i<res.data.length;i++) {zongzhiliang+=res.data[i].rule};this.setState({zongzhiliang:zongzhiliang});})
      .catch(err=>alert("您的网络不好"))
    }
    close(){
      this.setState({
        modalVisible:false
      })
      axios.get(`${url}/Invoice/AddFlag?id=${this.props.listindex.id}`)
      .then(res=>alert("关联成功"))
      .catch(err=>alert("您的网络不好"))
    }
  render(){
    return(
      <ScrollView style={styles.flexbox}>
      <ImageBackground style={{height:this.state.nheight*0.16*height,width:width}} source={require('../img/back.jpg')} resizeMode='cover' opacity={1}>
            <View style={styles.itemss}>
                <Text style={styles.fontwidths}>二维码数</Text>
                <Text style={{width:0.35*width,fontSize:22,textAlign:'left',color:'#f00'}}>{this.state.count}</Text>
            </View>
          
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:15}}>
                <Text style={styles.fontwidths}>网兜数量</Text>
                <Text style={{width:0.35*width,fontSize:22,textAlign:'left',color:'#f00'}}>{this.state.countcounts}</Text>
            </View>
          


            <View>
              <View style={styles.items}><Text style={styles.fontwidths}>交货单号</Text><Text style={styles.inputwidth}>
                  {this.state.no}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>发货时间</Text><Text style={styles.inputwidth}>
                  {this.state.InvoiceTime}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>订单号</Text><Text style={styles.inputwidth}>
                  {this.state.orderNo}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>订单日期</Text><Text style={styles.inputwidth}>
                  {this.state.OrderTime}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>客户编号</Text><Text style={styles.inputwidth}>
                  {this.state.CustomerNo}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>经销商名称</Text><Text style={styles.inputwidth}>
                  {this.state.DealerName}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>经销商邮编</Text><Text style={styles.inputwidth}>
                  {this.state.DealerPostcord}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>经销商地址</Text><Text style={styles.inputwidth}>
                  {this.state.DealerPlace}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>装运方式</Text><Text style={styles.inputwidth}>
                  {this.state.ShipmentMode}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>交货方式</Text><Text style={styles.inputwidth}>
                  {this.state.DeliveryMode}
              </Text></View>


              <View style={styles.items}><Text style={styles.fontwidths}>车牌号</Text><Text style={styles.inputwidth}>
                  {this.state.PlateNumber}
              </Text></View>


              <View style={styles.items}><Text style={styles.fontwidths}>司机名</Text><Text style={styles.inputwidth}>
                  {this.state.DriverName }
              </Text></View>
               <View style={styles.items}><Text style={styles.fontwidths}>司机电话</Text><Text style={styles.inputwidth}>
                  {this.state.DriverPhoneNo }
              </Text></View>

              {
                (this.state.invoiceShipmentList==null||this.state.invoiceShipmentList=="")?
                <View style={{borderBottomWidth:2,borderBottomColor:'#164d8d'}}>
                    <View style={styles.items}><Text style={styles.fontwidths}>装运项目</Text><Text style={styles.inputwidthcard}>
                    您没有填写
                    </Text></View>
                    <View style={styles.items}><Text style={styles.fontwidths}>装运物料</Text><Text style={styles.inputwidthcard}>
                    您没有填写
                    </Text></View>
                    <View style={styles.items}><Text style={styles.fontwidths}>装运数量</Text><Text style={styles.inputwidthcard}>
                    您没有填写
                    </Text></View>
                    <View style={styles.items}><Text style={styles.fontwidths}>装运物料描述</Text><Text style={styles.inputwidthcard}>
                    您没有填写
                    </Text></View>
                    </View>:this.state.invoiceShipmentList.map((item,index)=>{
                            return(
                            <View key={index} style={{borderBottomWidth:1,borderBottomColor:'#ddd'}}>
                              <View style={styles.items}><Text style={styles.fontwidths}>装运项目</Text><Text style={styles.inputwidthcard}>
                              {item.project}
                              </Text></View>
                              <View style={styles.items}><Text style={styles.fontwidths}>装运物料</Text><Text style={styles.inputwidthcard}>
                              {item.materialNo}
                              </Text></View>
                              <View style={styles.items}><Text style={styles.fontwidths}>装运数量</Text><Text style={styles.inputwidthcard}>
                              {item.quantity}  
                              </Text></View>
                              <View style={styles.items}><Text style={styles.fontwidths}>装运物料描述</Text><Text style={styles.inputwidthcard}>
                              {item.describe}  
                              </Text></View>
                            </View>
                            )
                          })
              }

              
            </View>
            
            <View style={styles.adminnmargin}>
                
            </View>

            <View style={styles.adminn}>
                <Text style={styles.adminbtnntext} onPress={()=>alert('成功')}>取消关联</Text>
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
      fontSize:22,
      textAlign:'left',
      color:'#164d8d'
    },
    inputwidth:{
      width:0.55*width,
      fontSize:22,
      color:'#164d8d'
    },
    inputwidthcard:{
      fontSize:22,
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
     fontSize:22,
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
    fontSize:20,
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
    fontSize:20,
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
      fontSize:22,
      color:'#fff',
      fontWeight:'bold',
      borderRadius:5
    }
 
  

}

export default SearchMessage







