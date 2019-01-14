import React,{component,PropTypes} from 'react'
import {Modal,View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView,NativeModules, DeviceEventEmitter,AsyncStorage,Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {url} from '../config';
import CheckBox from 'react-native-checkbox';
import Loading from './Loading';

let Subscription
const scanToastAndroid = NativeModules.ScanToastAndroid;
class myundata extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        Loading:false,
        modalVisiblemydata:false,
        GetListByUserInfoIDlists:[],
        newID:'',
        SCANSs:'',
        zhuanyizuihouyigee:false,
        alert:'',
        modalheight:1,
        nheight:22,
        CodeList:'', 
        newCodeList:'',
        invoiceShipmentList:'',
        count:0,
        countcounts:0,
        

        obj: '',
        pinleizhiliang:[],
        zongzhiliang:0,
        modalVisible:false,

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

    componentWillUnMount(){
      this.listener.remove()

    }
 
     componentDidMount(){
     
      axios.get(`${url}/Invoice/get/${this.props.listindex.id}`)
      .then(res=>{
        //alert(res.data.data.memo)
        this.setState({
        CodeList:res.data.data.codeList,
        invoiceShipmentList:res.data.data.invoiceShipmentList,
        count:res.data.data.codeList.length,
        countcounts:res.data.data.groupNoList.length,
        no:res.data.data.no,
        InvoiceTime:res.data.data.invoiceTime,
        orderNo:res.data.data.orderNo,
        OrderTime:res.data.data.orderTime,
        CustomerNo:res.data.data.customerNo,
        DealerName:res.data.data.dealerName,
        DealerPostcord:res.data.data.dealerPostcord,
        DealerPlace:res.data.data.dealerPlace,
        ShipmentMode:res.data.data.shipmentMode,
        DeliveryMode:res.data.data.deliveryMode,
        PlateNumber:res.data.data.plateNumber,
        DriverName:res.data.data.driverName,
        DriverPhoneNo:res.data.data.driverPhoneNo,
        fendai:res.data.data.memo,
        zongdaishu:res.data.data.quantity
      });})
      .catch(err=>console.log(' '));
      //alert('此发货单进行了部分扫描，按下F5继续扫描')
      // if (Actions.state.index==2) {
        this.listener=DeviceEventEmitter.addListener('EventName', (res) => {
            let countss=new Array();
            this.setState({ obj: res });
            let scanres=this.state.obj.SCAN;
                countss.push(scanres);
            let countssets=new Set(countss);
            let countarrays=Array.from(countssets);
            let newcountarrays=countarrays;
            //alert(newcountarray)
            this.setState({ SCANSs: newcountarrays });
            if (newcountarrays.length==0) {
             this.setState({
              alert:'没有二维码'
             })
             // this.setState({CodeList:newcountarray});
              return false;
            }else{
              this.setState({
              alert:'扫到二维码',
              CodeList:newcountarrays
             })
                // alert(this.state.CodeList);
                let data={
                 CodeList:this.state.CodeList,
                 id:this.props.listindex.id
                }

                if(this.state.CodeList.length==1&&data!=null){
                  if (Actions.state.index==2) {
                      axios.post(`${url}/Invoice/UpdateQRcode`,data)
                        .then(res=>{
                          // this.myundataUpdateQRcode()
                          this.setState({
                                        count:res.data.codeList==null?0:res.data.codeList.length,
                                        countcounts:res.data.groupNoList==null?0:res.data.groupNoList.length
                                    });
                           if (this.state.CodeList.length>=1) {
                            // countss=new Array(1);
                            // scanres='';
                            // countssets=null;
                            // countarrays=null;
                            // newcountarrays=null;
                            this.setState({CodeList:''})
                        };
                      })
                        .catch(err=>console.log(' '))
                    }
                  
                }
              }
            
            
        });
      // };
      

         if(this.state.invoiceShipmentList==null||this.state.invoiceShipmentList=="") {
              this.setState({
                nheight:22
              })
         }else{
          this.setState({
                nheight:this.state.invoiceShipmentList.length*10+22
              })
         }

      }
      myundataUpdateQRcode(){
        axios.get(`${url}/Invoice/get/${this.props.listindex.id}`)
      .then(res=>{
        //alert(res.data.data.memo)
        this.setState({
        
        count:res.data.data.codeList.length,
        countcounts:res.data.data.groupNoList.length
      });})
      .catch(err=>console.log(' '));
      }


      myundatasx(){
        this.setState({
          Loading:true
        })
      axios.get(`${url}/Invoice/get/${this.props.listindex.id}`)
      .then(res=>{
        //alert(res.data.data.memo)
        this.setState({
        Loading:false,
        CodeList:res.data.data.codeList,
        invoiceShipmentList:res.data.data.invoiceShipmentList,
        count:res.data.data.codeList.length,
        countcounts:res.data.data.groupNoList.length,
        no:res.data.data.no,
        InvoiceTime:res.data.data.invoiceTime,
        orderNo:res.data.data.orderNo,
        OrderTime:res.data.data.orderTime,
        CustomerNo:res.data.data.customerNo,
        DealerName:res.data.data.dealerName,
        DealerPostcord:res.data.data.dealerPostcord,
        DealerPlace:res.data.data.dealerPlace,
        ShipmentMode:res.data.data.shipmentMode,
        DeliveryMode:res.data.data.deliveryMode,
        PlateNumber:res.data.data.plateNumber,
        DriverName:res.data.data.driverName,
        DriverPhoneNo:res.data.data.driverPhoneNo,
        fendai:res.data.data.memo,
        zongdaishu:res.data.data.quantity
      });})
      .catch(err=>console.log(' '));
      }
   deletecode(){     
      axios.get(`${url}/invoice/DeleteCode?id=${this.props.listindex.id}`)
      .then(res=>{
        if(res.data.codeList.length==0 && res.data.groupNoList.length==0){
          this.setState({
            count:0,
            countcounts:0,
            alert:'没有二维码',
            CodeList:''
          })
            alert("取消完成")
          }else{
            alert("取消失败")
          }
      })
      .catch(err=>console.log(' '))
    }
    
    
    finish(){
        let zongzhiliang=0;
        this.setState({
        modalVisible:true
        })
        let data={
            // CodeList:this.state.CodeList
            id:this.props.listindex.id
          }
          axios.post(`${url}/invoice/GetGroupByID`,data)
            .then(res=>{this.setState({pinleizhiliang:res.data.data});
              // for (let i=0;i<res.data.length;i++) {zongzhiliang+=res.data[i].rule*100/100};
              this.setState({zongzhiliang:res.data.quantity});
              // if (res.data.length<5) {
              //   this.setState({modalheight:1})
              // }else if(5<res.data.length<10){
              //   this.setState({modalheight:2})
              // }else if(10<res.data.length<15){
              //   this.setState({modalheight:3})
              // }
          })
            .catch(err=>console.log(' '))
        
    }

    quedingtijiao(){
      this.setState({
        modalVisible:false
      })
      
      axios.get(`${url}/Invoice/AddFlag?id=${this.props.listindex.id}`)
      .then(res=>{
        if(res.data==true){
            alert("提交完成")
          }else{
            alert("提交失败")
          }
      })
      .catch(err=>console.log(" "))
    }
    close(){
      this.setState({
        modalVisible:false
      })
      
    }

    onPressLearnMore(){
      //alert(1)
      if(this.state.fendai.trim()!=''){
        //alert(2)
        let data={
          id:this.props.listindex.id,
          memo:this.state.fendai,
        }
        axios.post(`${url}/invoice/QuantitySum`,data)
          .then(res=>this.setState({
            zongdaishu:res.data.quantity
          })
          ).catch(err=>alert(err))
      }
      
    }


// 撤销最后一兜
    chexiaozuihouyigee(){
      let data={
        UserInfoID:this.props.userInfoIDD,
        id:this.props.listindex.id
      }
       axios.post(`${url}/invoice/TransferGroupNo`,data)
        .then(res=>{
          if(res.data.result==true){
            alert(res.data.message);
            this.setState({
                // count:this.state.count-1,
                countcounts:this.state.countcounts-1,
                zhuanyizuihouyigee:false
              }) 
          }else{
            alert(res.data.message);
          }
        })
        .catch(err=>console.log(err))
    }
// 撤销某一兜
    chexiaomouyigee(){
        // Subscription.remove()
       let myundataid=this.props.listindex.id;
       let myundatauserInfoID=this.props.userInfoIDD;
        Actions.chexiaomouyigee({myundataid,myundatauserInfoID})
      // let data={
      //   userInfoID:this.props.userInfoIDD,
      //   id:this.props.listindex.id,
      //   revokeQRCode:this.state.SCANSs.toString()
      // }
      //  axios.post(`${url}/invoice/RevokeQRCode`,data)
      //   .then(res=>{
      //     if (res.data.result==true) {
      //       alert(res.data.message);
      //       this.setState({
      //           // count:this.state.count-1,
      //           countcounts:this.state.countcounts-1,
      //           zhuanyizuihouyigee:false
      //         }) 
      //     }else{
      //       alert(res.data.message);
      //     }          
      //   })
      //   .catch(err=>{console.log(' ')})
    }
// 转移最后一个 弹出list列表
    zhuanyizuihouyigee(){
      this.setState({
        zhuanyizuihouyigee:true
      })
      let data={
        userInfoID:this.props.userInfoIDD
      }
      axios.post(`${url}/invoice/GetListByUserInfoID`,data)
        .then(res=>{
          this.setState({
            GetListByUserInfoIDlists:res.data
          })
        })
        .catch(err=>{console.log(' ')})
    }

    checkboxxx(index,item){
        // let checkboxxxid=this.state.GetListByUserInfoIDlists[index].id;
        // let userInfoID=this.props.userInfoIDD;
        // let id=this.props.listindex.id;
        // alert([checkboxxid,id,userInfoID])
        let data={
          userInfoID:this.props.userInfoIDD,
          id:this.props.listindex.id,
          newID:this.state.GetListByUserInfoIDlists[index].id
        }
        axios.post(`${url}/invoice/TransferGroupNo`,data)
        .then(res=>{
          if (res.data.result==true) {
              alert(res.data.message);
               this.setState({
                // count:this.state.count-1,
                countcounts:this.state.countcounts-1,
                zhuanyizuihouyigee:false
              }) 
          }else{
              alert(res.data.message);
          }
        })
        .catch(err=>console.log(err))
    }
    quxiaozhuanyi(){
      this.setState({
        zhuanyizuihouyigee:false
      })
    }
    quedingzhuanyi(){
        this.setState({
          zhuanyizuihouyigee:false
        })
    }
  render(){

    let jisuandaishu=<View>
                        <View style={{display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
                          <TextInput
                            style={{width:width-120,borderColor:'#aaa',borderWidth:1,marginTop:20,fontSize:20,marginLeft:10,lineHeight:50}}
                            value={this.state.fendai}
                            underlineColorAndroid='transparent'
                            autoFocus={true}
                            multiline = {true}
                            keyboardType='numeric'
                            placeholder="请输入袋数,以‘+’分隔"
                            onChangeText={(text) => this.setState({fendai:text})}
                          />
                          <View style={{width:80,height:50,marginTop:20,fontSize:26}}>
                            <Button
                            style={{height:50,lineHeight:50,height:50}}
                              onPress={this.onPressLearnMore.bind(this)}
                              title="计算"
                              color="#aaa"
                              accessibilityLabel="Learn more about this purple button"
                            />
                          </View>
                        </View>
                        <View>
                          <Text style={{fontSize:20,marginTop:20,marginLeft:20}}>总袋数：{this.state.zongdaishu}</Text>
                        </View>
                        
                        
                    </View>
    return(
      <ScrollView style={styles.flexbox}>
      {
        this.state.Loading==true?<Loading/>:
        <ImageBackground style={{width:width}} source={require('../img/back.jpg')} resizeMode='cover' opacity={1}>
            <View style={styles.itemss}>
                <Text style={{width:0.35*width,fontSize:25,textAlign:'center'}}>二维码数</Text>
                <Text style={{width:0.15*width,fontSize:25,textAlign:'left',color:'#f00'}}>{this.state.count}</Text>
                 <Text style={{width:0.35*width,fontSize:25,textAlign:'center'}}>网兜数量</Text>
                <Text style={{width:0.15*width,fontSize:25,textAlign:'left',color:'#f00'}}>{this.state.countcounts}</Text>
            </View>

            {jisuandaishu}
             <View style={{width:width}}><Text style={{fontSize:30,color:"#f00",textAlign:'center'}}>{this.state.alert}</Text></View>
            <View>
            <View style={styles.itemss}>
                <Image source={require('../img/sx.png')} style={{width:30,height:30}}/>
                <Text style={{width:0.85*width,fontSize:24,textAlign:'center',color:'red'}} onPress={this.myundatasx.bind(this)}>撤销某一兜后请务必<Text style={{fontSize:30,textAlign:'center',color:'red'}}>点击这里</Text>进行刷新</Text>
            </View>
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
                <View style={{borderBottomWidth:1,borderBottomColor:'#ddd'}}>
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
            
              <View style={styles.adminnmargin}>
                
            </View>
            {
              this.state.countcounts>1?
              <View>
                <View style={styles.adminn}>
                  <Text style={styles.adminbtnntext} onPress={this.chexiaozuihouyigee.bind(this)}>撤销最后一兜</Text>
                </View>
                <View style={styles.adminn}>
                    <Text style={styles.adminbtnntext} onPress={this.chexiaomouyigee.bind(this)}>撤销某一兜</Text>
                </View>
                <View style={styles.adminn}>
                    <Text style={styles.adminbtnntext} onPress={this.zhuanyizuihouyigee.bind(this)}>转移最后一兜</Text>
                </View>
              </View>:null
            }
            <View style={styles.adminn}>
                <Text style={styles.adminbtnntext} onPress={this.deletecode.bind(this)}>取 消 关 联</Text>
            </View>

            <View style={styles.adminn}>
                <Text style={styles.adminbtnntext} onPress={this.finish.bind(this)}>确 定 完 成</Text>
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
                  <View style={{height:0.6*height,backgroundColor:'#000'}}>
                  <ScrollView style={{backgroundColor:'#000'}}>
            
                 {
                              this.state.pinleizhiliang.map((item,index)=>{
                              return (
                              <View style={styles.viewmodalbody} key={index}>
                                <Text style={styles.viewmodalbodytext} numberOfLines={2}>品类{item ? (item.category ? (item.category.describe ? item.category.describe :'') : '') :''}</Text>
                                <Text style={styles.viewmodalbodytext} numberOfLines={2}>质量{item.rule ? item.rule :''}</Text>
                              </View>
                              )
                            })
                              
                            }
                 
                  </ScrollView>
                  </View>
                  <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#fff',fontSize:23}}>总 质 量：{this.state.zongzhiliang}</Text>
                  </View>

                  <View style={styles.viewmodalfoot}>
                    <Text  onPress={this.quedingtijiao.bind(this)} style={styles.viewmodalfoottext}>提 交</Text>
                    <Text  onPress={this.close.bind(this)} style={styles.viewmodalfoottext}>取 消</Text>
                  </View>

                </View>
              </View>  
          </Modal>

          <Modal
                  animationType='slide'
                  transparent={true}
                  visible={this.state.zhuanyizuihouyigee}
                  onRequestClose={()=>{console.log(' ')}}
            >
            <ScrollView style={{backgroundColor:'#fff',flex:1}}>
            <View style={{width:width,flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
              <Text style={{color:'red',fontSize:27}}>进行勾选转移前，请您务必仔细查看发货单号！避免转移错误</Text>
            </View>
           {
                this.state.GetListByUserInfoIDlists==[]?<Text>空</Text>:this.state.GetListByUserInfoIDlists.map((item,index)=>{
                  return(
                  <View style={styles.items} key={index}>
                      <CheckBox
                          label=''
                          checkboxStyle={{width:30,height:30,borderColor:'#4ea3f1'}}
                          onChange={this.checkboxxx.bind(this,index,item)}
                          >
                      </CheckBox>
                          <Text style={styles.font}  numberOfLines={2}>{index+1}.车牌{item.plateNumber}订单{item.no}</Text>
                  </View>
                  )
                })
              }
            
            <View style={styles.adminn}>
                <Text style={styles.adminbtnntext} onPress={this.quxiaozhuanyi.bind(this)}>取消转移</Text>
            </View>

            <View style={styles.adminn}>
                <Text style={styles.adminbtnntext} onPress={this.quedingzhuanyi.bind(this)}>关闭</Text>
            </View>
            
            </ScrollView> 
               
          </Modal>
      </ImageBackground> 
      }
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
      fontSize:23,
      textAlign:'left',
      color:'#164d8d'
    },
    inputwidth:{
      width:0.55*width,
      fontSize:23,
      color:'#164d8d'
    },
    inputwidthcard:{
      fontSize:23,
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
    marginBottom:30,

    },
    adminbtnntext:{
     fontSize:23,
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
    scrollview:{
       width:width,
        height:0.5*height
    },
    viewmodalheadertext:{
    fontSize:23,
    fontWeight: 'bold',
    color:'#fff',
    marginTop:0.05*height
    },
    viewmodalbody:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width:width,
    marginTop:0.02*height
    },
    viewmodalbodytext:{
    fontSize:23,
    color:'#fff',
    marginLeft:5,
    
    },
    viewmodalfoot:{
      width:width,
    display:'flex',
    flexDirection:'row',
    //alignItems:'center',
    //justifyContent:'center',
    // position:'absolute',
    // top:0.75*height,
    marginTop:10,
    justifyContent:"space-between"
    },
    viewmodalfoottext:{
      
      backgroundColor:'#4ea3f1',
      paddingRight:20,
      paddingLeft:20,
      paddingBottom:25,
      paddingTop:25,
      fontSize:23,
      color:'#fff',
    },
    font:{
      width:0.85*width,
      fontSize:27,
      color:'#555'
    }
 
  

}

export default myundata







