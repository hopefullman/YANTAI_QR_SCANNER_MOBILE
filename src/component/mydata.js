
import React,{component,PropTypes} from 'react'
import { Modal,View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView,NativeModules, DeviceEventEmitter,AsyncStorage,ToastAndroid} from 'react-native';
import { Actions,Alert } from 'react-native-router-flux';
import axios from 'axios';
import CheckBox from 'react-native-checkbox';
import {url} from '../config';
import Loading from './Loading';
const scanToastAndroid = NativeModules.ScanToastAndroid;
let Subscription;
let idid;
class mydata extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        GetListByUserInfoIDlist:[],
        newID:'',
        SCANS:'',
        zhuanyizuihouyige:false,
        Loading:true,
        alert:'',
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
        invoiceShipmentListlength:'',
        fendai:'',
        zongdaishu:''
      };
    }

// componentWillMount(){
//   Subscription.remove()
// }
// componentWillReceiveProps(){
//   Subscription.remove()
// }
// shouldComponentUpdate(){
//   Subscription.remove()
// }
    componentWillUnMount(){
      this.listener.remove();
      // this.listenerA.remove();

    }
    
    componentDidMount(){
       // this.listenerA = DeviceEventEmitter.addListener('refresh',()=>{

       // })
      // alert(this.props.userInfoIDD)
      alert(this.props.listindex.id);
      this.setState({
        Loading:false
      })
      axios.get(`${url}/Invoice/get/${this.props.listindex.id}`)
      .then(res=>{
        //alert(res.data.data.memo)
        this.setState({
        CodeList:res.data.data.codeList,
        invoiceShipmentList:res.data.data.invoiceShipmentList,
        count:res.data.data.codeList.length,
        countcounts:res.data.data.groupNoList.length,
        no:res.data.data.no,InvoiceTime:res.data.data.invoiceTime,
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
      .catch(err=>console.log(''));
      //alert('此发货单还没有扫描，按下F5开始扫描')
      // if (Actions.state.index==2) {
        this.listener=DeviceEventEmitter.addListener('EventName', (res) => {
            let counts=new Array();
            this.setState({ obj: res });
            let scanres=this.state.obj.SCAN;
                counts.push(scanres);
            let countsset=new Set(counts);
            let countarray=Array.from(countsset);
            let newcountarray=countarray;
            this.setState({ SCANS: newcountarray });
            if (newcountarray.length==0) {
               this.setState({
                alert:'没有二维码'
              })
              return false;
            }else{
              this.setState({
               alert:'扫到二维码',
               CodeList:newcountarray
              })
                  // this.setState({CodeList:newcountarray});
                    let data={
                               CodeList:this.state.CodeList,
                               id:this.props.listindex.id
                              }
                  if(this.state.CodeList.length==1&&data!=null){
                    if (Actions.state.index==2) {
                    axios.post(`${url}/Invoice/UpdateQRcode`,data)
                      .then(res=>{
                        this.setState({
                                        count:res.data.codeList==null?0:res.data.codeList.length,
                                        countcounts:res.data.groupNoList==null?0:res.data.groupNoList.length
                                    })
                        if (this.state.CodeList.length>=1) {
                            // counts=new Array(1);
                            // scanres='';
                            // countsset=null;
                            // countarray=null;
                            // newcountarray=null;
                            this.setState({
                              CodeList:''
                            })
                        };
                        // this.mydayaUpdateQRcode()
                                  }
                            )
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
      mydayaUpdateQRcode(){
      axios.get(`${url}/Invoice/get/${this.props.listindex.id}`)
      .then(res=>{
        //alert(res.data.data.memo)
        this.setState({
        count:res.data.data.codeList.length,
        countcounts:res.data.data.groupNoList.length
      });})
      .catch(err=>console.log(''));
      }



      cxsx(){
        this.setState({
          Loading:true,
          countcounts:''
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
        no:res.data.data.no,InvoiceTime:res.data.data.invoiceTime,
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
      .catch(err=>console.log(''));
      }
    

    finish(){
      if (this.state.CodeList==null || this.state.CodeList=="") {
          alert("你还没有扫码,暂时无法提交");
          return false;
      }else{
        //alert(this.state.CodeList)
          // let zongzhiliang='';
          let data={
               // CodeList:this.state.CodeList
               id:this.props.listindex.id
            }
          
      axios.post(`${url}/invoice/GetGroupByID`,data)
        .then(res=>{  
                       this.finishok(res)
                      // this.setState({
                      //   pinleizhiliang:res.data
                      // });
                      // for (let i=0;i<res.data.length;i++){
                      //   zongzhiliang+=res.data[i].rule
                      // };
                      // this.setState({zongzhiliang:zongzhiliang});
                    }
              )
        .catch(err=>console.log(' '))          
      }
    }

    finishok(res){
      //alert(2)
      //alert(res)
      // let zongzhiliang=0;
      //   for (let i=0;i<res.data.length;i++){
      //     zongzhiliang+=res.data[i].rule*100/100
      //   };
        this.setState({
          pinleizhiliang:res.data.data,
          zongzhiliang:res.data.quantity,
           modalVisible:true
        });
        // return zongzhiliang;
        
    }
    canclequxiao(){
      // alert(this.props.listindex.id);
      axios.get(`${url}/invoice/DeleteCode?id=${this.props.listindex.id}`)
      .then(res=>{
        if(res.data.codeList.length==0 && res.data.groupNoList.length==0){
          this.setState({
            count:0,
            countcounts:0,
            CodeList:''
          })
            alert("取消完成")
          }else{
            alert("取消失败")
          }
      })
      .catch(err=>console.log(' '))
    }

    quedingtijiao(){
      this.setState({
        modalVisible:false
      })
      // alert(this.props.listindex.id)
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


// 撤销最后一兜
    chexiaozuihouyige(){
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
                zhuanyizuihouyige:false
              }) 
          }else{
            alert(res.data.message);
          }
        })
        .catch(err=>console.log(err))
    }
// 撤销某一兜
    chexiaomouyige(){
      // Subscription.remove()
      let mydataid=this.props.listindex.id;
      let mydatauserInfoID=this.props.userInfoIDD;
      Actions.chexiaomouyige({mydataid,mydatauserInfoID})
      // let data={
      //   userInfoID:this.props.userInfoIDD,
      //   id:this.props.listindex.id,
      //   revokeQRCode:this.state.SCANS.toString()
      // }
       // axios.post(`${url}/invoice/RevokeQRCode`,data)
       //  .then(res=>{
       //    if (res.data.result==true) {
            
       //       this.setState({
       //          // count:this.state.count-1,
       //          countcounts:this.state.countcounts-1,
       //          zhuanyizuihouyige:false
       //        }) 
       //       alert(res.data.message);
       //    }else{
       //      alert(res.data.message);
       //    }          
       //  })
       //  .catch(err=>{console.log(' ')})
    }
// 转移最后一个 弹出list列表
    zhuanyizuihouyige(){
      this.setState({
        zhuanyizuihouyige:true
      })
      let data={
        userInfoID:this.props.userInfoIDD
      }
      axios.post(`${url}/invoice/GetListByUserInfoID`,data)
        .then(res=>{
          this.setState({
            GetListByUserInfoIDlist:res.data
          })
        })
        .catch(err=>{console.log(' ')})
    }

    checkboxx(index,item){
        // let checkboxxid=this.state.GetListByUserInfoIDlist[index].id;
        // let userInfoID=this.props.userInfoIDD;
        // let id=this.props.listindex.id;
        // alert([checkboxxid,id,userInfoID])
        let data={
          userInfoID:this.props.userInfoIDD,
          id:this.props.listindex.id,
          newID:this.state.GetListByUserInfoIDlist[index].id
        }
        axios.post(`${url}/invoice/TransferGroupNo`,data)
        .then(res=>{
          if (res.data.result==true) {
              alert(res.data.message);
               this.setState({
                // count:this.state.count-1,
                countcounts:this.state.countcounts-1,
                zhuanyizuihouyige:false
              }) 
          }else{
              alert(res.data.message);
          }
        })
        .catch(err=>console.log(err))
    }
    quxiaozhuanyi(){
      this.setState({
        zhuanyizuihouyige:false
      })
    }
    quedingzhuanyi(){
        this.setState({
          zhuanyizuihouyige:false
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
                          <View style={{width:80,height:50,marginTop:20,fontSize:20}}>
                            <Button
                            style={{height:50,lineHeight:50}}
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
        this.state.Loading?<Loading/>:
      <ImageBackground style={{width:width}} source={require('../img/back.jpg')} resizeMode='cover' opacity={1}>
            <View style={styles.itemss}>
                <Text style={{width:0.35*width,fontSize:22,textAlign:'center'}}>二维码数</Text>
                <Text style={{width:0.15*width,fontSize:22,textAlign:'left',color:'#f00'}}>{this.state.count}</Text>
                <Text style={{width:0.35*width,fontSize:22,textAlign:'center'}}>网兜数量</Text>
                <Text style={{width:0.15*width,fontSize:22,textAlign:'left',color:'#f00'}}>{this.state.countcounts}</Text>
            </View>
            {jisuandaishu}
            <View style={{width:width}}><Text style={{fontSize:30,color:"#f00",textAlign:'center'}}>{this.state.alert}</Text></View>
            <View style={styles.itemss}>
                <Image source={require('../img/sx.png')} style={{width:30,height:30}}/>
                <Text style={{width:0.85*width,fontSize:24,textAlign:'center',color:'red'}} onPress={this.cxsx.bind(this)}>撤销某一兜后请务必<Text style={{fontSize:30,textAlign:'center',color:'red'}}>点击这里</Text>进行刷新</Text>
            </View>
            <View>
              <View style={styles.items}><Text style={styles.fontwidths}>交货单号</Text><Text style={styles.inputwidth}>
                  {this.state.no}
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

              <View style={styles.items}><Text style={styles.fontwidths}>发货时间</Text><Text style={styles.inputwidth}>
                  {this.state.InvoiceTime}
              </Text></View>

              <View style={styles.items}><Text style={styles.fontwidths}>订单号</Text><Text style={styles.inputwidth}>
                  {this.state.orderNo}
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
                  <Text style={styles.adminbtnntext} onPress={this.chexiaozuihouyige.bind(this)}>撤销最后一兜</Text>
                </View>
                <View style={styles.adminn}>
                    <Text style={styles.adminbtnntext} onPress={this.chexiaomouyige.bind(this)}>撤销某一兜</Text>
                </View>
                <View style={styles.adminn}>
                    <Text style={styles.adminbtnntext} onPress={this.zhuanyizuihouyige.bind(this)}>转移最后一兜</Text>
                </View>
              </View>:null
            }
             
           

            <View style={styles.adminn}>
                <Text style={styles.adminbtnntext} onPress={this.canclequxiao.bind(this)}>取 消 关 联</Text>
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
                              <Text style={{color:'#fff',fontSize:19}}>总 质 量：{this.state.zongzhiliang}</Text>
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
                  visible={this.state.zhuanyizuihouyige}
                  onRequestClose={()=>{console.log(' ')}}
            >
            <ScrollView style={{backgroundColor:'#fff',flex:1}}>
            <View style={{width:width,flexDirection:'row',justifyContent:"center",alignItems:'center'}}><Text style={{color:'red',fontSize:27}}>进行勾选转移前，请您务必仔细查看发货单号！避免转移错误</Text></View>
           {
                this.state.GetListByUserInfoIDlist==[]?<Text>空</Text>:this.state.GetListByUserInfoIDlist.map((item,index)=>{
                  return(
                  <View style={styles.items} key={index}>
                      <CheckBox
                          label=''
                          checkboxStyle={{width:30,height:30,borderColor:'#4ea3f1'}}
                          onChange={this.checkboxx.bind(this,index,item)}
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
      marginTop:10
    },
     items:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:0.07*height
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
      color:'#164d8d',
      width:0.55*width
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
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width:width,
    marginTop:0.02*height
    },
    viewmodalbodytext:{
    fontSize:20,
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

export default mydata







