import React,{component,PropTypes} from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView,AsyncStorage} from 'react-native';
import { Actions,Alert } from 'react-native-router-flux';
import axios from 'axios';
import {url} from '../config';
import Loading from './Loading';
class AllMessage extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        nheight:20,
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
        ShippingDescribe:'',
        fendai:'',
        zongdaishu:''
      };
    }
 
    componentDidMount(){
      //alert('此发货单已经扫描完成')

        axios.get(`${url}/Invoice/get/${this.props.listindex.id}`)
        .then(res=>{this.setState({CodeList:res.data.data.codeList,invoiceShipmentList:res.data.data.invoiceShipmentList,count:res.data.data.codeList.length,countcounts:res.data.data.groupNoList.length,no:res.data.data.no,InvoiceTime:res.data.data.invoiceTime,orderNo:res.data.data.orderNo,OrderTime:res.data.data.orderTime,CustomerNo:res.data.data.customerNo,DealerName:res.data.data.dealerName,DealerPostcord:res.data.data.dealerPostcord,DealerPlace:res.data.data.dealerPlace,ShipmentMode:res.data.data.shipmentMode,DeliveryMode:res.data.data.deliveryMode,PlateNumber:res.data.data.plateNumber,DriverName:res.data.data.driverName,DriverPhoneNo:res.data.data.driverPhoneNo,fendai:res.data.data.memo,
        zongdaishu:res.data.data.quantity});})
        .catch(err=>alert(err));
         if (this.state.invoiceShipmentList==null||this.props.listindex.invoiceShipmentList=="") {
              this.setState({
                nheight:22
              })
         }else{
          this.setState({
                nheight:this.state.invoiceShipmentList.length*10+22
              })
         }

      //console.log(this.props.IDquanbu)
         // this.setState({
         //      no:this.props.listindex.no,
         //      InvoiceTime :this.props.listindex.invoiceTime,
         //      orderNo:this.props.listindex.orderNo,
         //      OrderTime:this.props.listindex.orderTime,
         //      CustomerNo:this.props.listindex.customerNo,
         //      DealerName:this.props.listindex.dealerName,
         //      DealerPostcord :this.props.listindex.dealerPostcord,
         //      DealerPlace:this.props.listindex.dealerPlace,
         //      ShipmentMode:this.props.listindex.shipmentMode,
         //      DeliveryMode:this.props.listindex.deliveryMode,
         //      PlateNumber:this.props.listindex.plateNumber,
         //      DriverName:this.props.listindex.driverName,
         //      DriverPhoneNo:this.props.listindex.driverPhoneNo
         //  })
         // if (this.props.listindex.invoiceShipmentList==null||this.props.listindex.invoiceShipmentList=="") {
         //      this.setState({
         //        nheight:20
         //      })
         // }else{
         //  this.setState({
         //        nheight:this.props.listindex.invoiceShipmentList.length*4+16
         //      })
         // }
    }


   
  render(){

    let jisuandaishu=<View>
                          <Text style={{fontSize:20,marginTop:20,marginLeft:20}}>总袋数：{this.state.zongdaishu}</Text>
                        </View>
    return(       
      <ScrollView style={styles.flexbox}>
      <ImageBackground style={{height:this.state.nheight*0.1*height,width:width}} source={require('../img/back.jpg')} resizeMode='cover' opacity={1}>
            <View style={styles.itemss}>
                <Text style={styles.fontwidth}>已读取二维码个数</Text>
                <Text style={styles.fontwidth}>{this.props.listindex.codeList.length}</Text>
            </View>

            {jisuandaishu}
            
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
              {/*
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
              */}

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
                            <View key={index} style={{borderBottomWidth:2,borderBottomColor:'#164d8d'}}>
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
            <View style={styles.adminn}>
            </View>
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
     fontwidth:{
      width:0.4*width,
      fontSize:20,
      textAlign:'left',
      color:'#164d8d'
    },
     fontwidths:{
      width:0.3*width,
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
      color:'#164d8d',
      width:0.55*width
    },
    adminn:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:50,
    marginBottom:30
    },
    adminbtnn:{
    flex:0.4
    

  },
  adminbtnnleft:{
     

  }
 
  

}

export default AllMessage







