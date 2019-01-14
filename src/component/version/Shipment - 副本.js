import React,{component,PropTypes}from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView,Modal,Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {url} from '../config';
import Loading from './Loading';
class Shipment extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        loading:true,
        isModal:false,
        show:false,
        showsearch:false,
        list:[],
        searchlist:[],
        text:'',
        str:'',
        showmessage:''
      };
    }
 
    componentDidMount(){
      // 列表获取
      let idid=this.props.ID
      let timestamp = Date.parse(new Date());

      axios.get(`${url}/invoice/GetListNoGroup?id=${idid}&&timestamp=${timestamp}`)
      .then(res=>{this.setState({list:res.data,loading:false});if (res.data.length==0) {this.setState({showmessage:'待发运列表为空'})};})
      .catch(err=>console.log(err))

    }
    // 搜索模块
    sousuo(){
    let text=this.state.text;
    let textexec=/^[0-9]{1,20}$/;
    if (!textexec.exec(text)) {
        this.setState({
          show:false,
          showsearch:true
        })
        return false;
    };
    if (text.length>0) {
       this.setState({
      show:true
      })
    };
    if (text.length==0) {
       this.setState({
      show:false,
      showsearch:true
      })
    };
    axios.get(`${url}/invoice/Query?query=${text}`)
      .then(res=>this.sousuook(res))
      .catch(err=>console.log(err))
    }
    sousuook(res){
      console.log('cx',res)
      this.setState({
        showsearch:false,
        searchlist:res.data
      })
      console.log(this.state.searchlist)
    }

    // 详细按钮跳转
    QRcode(){
      Actions.Message()
    }
 
  render(){
    return(
          <ScrollView style={styles.flexbox}>
          {
            this.state.loading?  <Loading/>:
            <ScrollView>
              {/*搜索模块*/}
              <View style={styles.items}>
                    <Text style={{fontSize:17}}>搜索:</Text>
                    <TextInput placeholder=' 填写发运单号' style={styles.contentfont}  onChangeText={(text)=>{this.setState({text:text})}} ></TextInput>
                    <Button title="确定"  onPress={this.sousuo.bind(this)}>确定</Button>
              </View>
              {/*待发运列表*/}
              <View style={styles.items}>
                  <Text style={styles.bigfont}  numberOfLines={1}>待发运列表
                  </Text>
              </View>
              {/*查询为空是显示信息
              <View style={styles.items}>
              <Text style={styles.font}  numberOfLines={3}>{this.state.showmessage}</Text>
              </View>
              */}
              {/*遍历列表*/}
              {
                this.state.show?null:
                this.state.list.map((item,index)=>{
                    return (
                  <View style={styles.items} key={index}>
                    <Text style={styles.font}  numberOfLines={1}>{index+1}.待发运列表:{item.no}
                    </Text>
                    <Text style={styles.fontxiangxi} onPress={this.QRcode.bind(this)} numberOfLines={1}>详细
                    </Text>
                  </View> ) } )
              }
              {/*搜索结果*/}
              {
                this.state.showsearch?null:
                this.state.searchlist.map((item,index)=>{
                    return (
                  <View style={styles.items} key={index}>
                    <Text style={styles.font} numberOfLines={1}>{index+1}.待发运列表:{item.no}
                    </Text>
                    <Text style={styles.fontxiangxi} onPress={this.QRcode.bind(this)} numberOfLines={1}>详细
                    </Text>
                  </View> ) } )
              }

            </ScrollView> 
          }   
          </ScrollView>
          )
        }
      }
const {width, height} = Dimensions.get('window')
const styles={
    flexbox:{
     flex:1
    },
     vertical:{
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
     
    },
    items:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:0.08*height
      
    },
    itemss:{
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      height:0.2*height
    },
    font:{
      width:0.7*width,
      fontSize:15
      // color:'#27524a'
      
    },
    bigfont:{
      width:0.8*width,
      fontSize:20
      // color:'#27524a'
      
    },
    smallfont:{
      width:0.8*width,
      fontSize:15
      // color:'#27524a'
      
    },
    fontxiangxi:{
      fontSize:15,
      color:'#4ea3f1'
      
    },
    itemsbottom:{
      marginTop:height*0.1

    },
    borde:{
      borderBottomWidth:1,
      borderBottomColor:'#2c5c53'
    },
    contentfont:{
    width:0.5*width,
    fontSize:16
    // color:'#27524a'
  },
  margintop:{
    marginTop:20
  }
  

}

export default Shipment







