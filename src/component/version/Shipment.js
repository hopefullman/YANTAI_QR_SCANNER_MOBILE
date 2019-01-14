import React from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView,Modal,Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Shipment extends React.Component{
 constructor(props) {
            super(props);
            this.state={
                    isModal:false,
                    str:''
                    };
            }
   showalert(){
    this.setState({
      str:'fheflefefwefewf'
    })
    let aa=this.state.str
    Alert.alert('详细内容如下',aa,[{text:"取消"},{text:"确认"}]);
  }


  Code(){
    Actions.Message()
  }



   xiangxi(){
    Actions.Xiangxi()
  }

  
  render(){
    return(       
        
      <ScrollView style={styles.flexbox}>
       // <ImageBackground style={{height:'auto',width:width}} source={require('../img/back.jpg')} resizeMode='cover'  opacity={0.5}>
          <View style={styles.items}>
              <Text style={{fontSize:17,color:'#266c5f'}}>搜索：</Text>
              <TextInput placeholder=' 填写发运单号' style={styles.contentfont} placeholderTextColor='#266c5f' ></TextInput>
              <Button title="确定" color="#266c5f" onPress={()=>alert('123')}>确定</Button>
          </View>

          <View style={styles.items}>
              <Text style={styles.bigfont}  numberOfLines={1}>待发运列表
              </Text>
          </View>


          <View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
          <View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
         <View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
<View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
<View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>

<View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
<View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
<View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
<View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
          <View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
          <View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
          <View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
          <View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
          <View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
          <View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
          <View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
          <View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
          <View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
          <View style={styles.items}>
              <Text style={styles.font} onPress={this.Code.bind(this)} numberOfLines={1}>1.河北农资冀C2546850吨
              </Text>
              <Text style={styles.fontxiangxi} onPress={this.showalert.bind(this)} numberOfLines={1}>详细
              </Text>
          </View>
          
          <View style={[styles.itemsbottom,styles.itemss]}>
            <View>
            <Text style={styles.bigfont}>最近发货清单</Text>
            </View>
            <View style={styles.margintop}>  
            <Text style={styles.smallfont}  onPress={this.xiangxi.bind(this)} numberOfLines={3}>河北农资冀C25468三公司需要50吨河北农资冀C25468三公司需要50吨
            </Text>
            </View>
          </View>
        // </ImageBackground>
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
      fontSize:15,
      color:'#27524a'
      
    },
    bigfont:{
      width:0.8*width,
      fontSize:20,
      color:'#27524a'
      
    },
    smallfont:{
      width:0.8*width,
      fontSize:15,
      color:'#27524a'
      
    },
    fontxiangxi:{
      fontSize:15,
      color:'#266c5f'
      
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
    fontSize:16,
    color:'#27524a'
  },
  margintop:{
    marginTop:20
  }
  

}

export default Shipment







