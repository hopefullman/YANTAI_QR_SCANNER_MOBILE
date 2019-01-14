import React,{component,PropTypes} from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView,NativeModules, DeviceEventEmitter,AsyncStorage} from 'react-native';
import { Actions,Alert } from 'react-native-router-flux';
import axios from 'axios';
import {url} from '../config';
import Loading from './Loading';
const scanToastAndroid = NativeModules.ScanToastAndroid;
class Message extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        Text:'未关联发货单',
        CodeList:[],
        loading:true,
        count:null,
        obj: '',
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
      // try{
      //     AsyncStorage.getItem(key,(error,result)=>{
      //         alert(result); 
      //     })
      // }catch(err){

      // }
      
      const counts=new Array();
      DeviceEventEmitter.addListener('EventName', (res) => {
            this.setState({ obj: res });
            let scanres=this.state.obj.SCAN;
                counts.push(scanres);
                alert(counts);

            let countsset=new Set(counts);
            // alert(countsset);
            let countslength=countsset.size;
            this.setState({count:countslength,CodeList:counts});

            // alert(this.props.listindex.id);
            // let key=this.props.listindex.id.toString();
            // let value=countslength.toString();

            // if (!AsyncStorage.getItem(key)) {
            //     AsyncStorage.setItem(key,value,(error)=>{

            //     })
            // }else{
            //   try{
            //     AsyncStorage.getItem(key,(error,result)=>{
            //         alert(result); 
            //         let value=new String(parseInt(countslength)+parseInt(result))
            //     })
            //   }catch(err){

            //   }
            // }
 
        });
        
         this.setState({
              no:this.props.listindex.no,
              InvoiceTime :this.props.listindex.invoiceTime,
              orderNo:this.props.listindex.orderNo,
              OrderTime:this.props.listindex.orderTime,
              CustomerNo:this.props.listindex.customerNo,
              DealerName:this.props.listindex.dealerName,
              DealerPostcord :this.props.listindex.dealerPostcord,
              DealerPlace:this.props.listindex.dealerPlace,
              ShipmentMode:this.props.listindex.shipmentMode,
              DeliveryMode:this.props.listindex.deliveryMode,
              PlateNumber:this.props.listindex.plateNumber,
              DriverName:this.props.listindex.driverName,
              DriverPhoneNo:this.props.listindex.driverPhoneNo,
              ShippingProject:this.props.listindex.shippingProject,
              ShippingMaterials:this.props.listindex.shippingMaterials,
              ShippingNumber:this.props.listindex.shippingNumber,
              ShippingDescribe:this.props.listindex.shippingDescribe
          })


    }


    finish(){
      alert('finish');
      this.setState({
        Text:'已关联发货单'
      })
      let data={
        CodeList:this.state.CodeList
      }
      axios.post(`${url}/Invoice/GetCategoryByCode`,data)
      .then(res=>alert(res))
      .catch(err=>alert(err))
    }
  render(){
    return(       
      <ScrollView style={styles.flexbox}>
      
            <View style={styles.admin}>
                  <View style={styles.adminbtn}>
                    <Button title="扫描二维码" color="#4ea3f1"
                     onPress={() => scanToastAndroid.scanQRCode()}
                     >扫描二维码</Button>
                  </View>
            </View>

            <View style={styles.admin}>
                  <View style={styles.adminbtn}>
                    {this.state.Text}
                  </View>
            </View>

            <View style={styles.itemss}>
                <Text style={styles.fontwidth}>已读取二维码个数</Text>
                <Text style={styles.fontwidth}>{this.state.count}</Text>
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


              <View style={styles.items}><Text style={styles.fontwidths}>装运项目</Text><Text style={styles.inputwidth}>
                  {this.state.ShippingProject}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>装运物料</Text><Text style={styles.inputwidth}>
                  {this.state.ShippingMaterials}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>装运数量</Text><Text style={styles.inputwidth}>
                  {this.state.ShippingNumber}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>装运物料描述</Text><Text style={styles.inputwidth}>
                  {this.state.ShippingDescribe}
              </Text></View>

              
            </View>

            <View style={styles.adminn}>
            <View style={styles.adminbtnn}>
              <Button title="继续扫描" color="#4ea3f1" onPress={() => scanToastAndroid.scanQRCode()}>继续扫描</Button>
            </View>
            </View>
            <View style={styles.adminn}>
              <View style={styles.adminbtnn}>
                <Button title="取消关联" color="#4ea3f1" onPress={()=>alert('好喜欢你')}>取消关联</Button>
              </View>
            </View>
            <View style={styles.adminn}>
              <View style={styles.adminbtnn}>
                <Button title="确定完成" color="#4ea3f1" onPress={this.finish.bind(this)}>确定完成</Button>
              </View>
            </View>
           
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
     fontwidth:{
      width:0.4*width,
      fontSize:16,
      textAlign:'left'
    },
     fontwidths:{
      width:0.3*width,
      fontSize:16,
      textAlign:'left'
    },
    inputwidth:{
      width:0.55*width,
      borderBottomWidth:1,
      borderBottomColor:'#aaa'
    },

    adminn:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:30
    },
    adminbtnn:{
    flex:0.4
    

  },
  adminbtnnleft:{
     

  }
 
  

}

export default Message







