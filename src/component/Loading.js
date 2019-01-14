import React from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView,Animated} from 'react-native';
import { Actions,Alert } from 'react-native-router-flux';
const circle = require('../img/xz.png');
class Loading extends React.Component{
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
        this.state = {
        };
    }
     componentDidMount(){
        this.spin();
    }
    spin = () => {
        this.spinValue.setValue(0)
        Animated.timing(this.spinValue,{
          toValue: 10,
          duration: 5000
       }).start(() => this.spin())
    }
  render(){
    const { user, pwd, fadeAnim} = this.state;
        
        const spin = this.spinValue.interpolate({
            inputRange: [0, 10],
            outputRange: ['0deg', '360deg'] 
          })
    return(       
      
        <View style={styles.v}>
          <Animated.Image style={[styles.circle,{transform:[{rotate: spin }]}]} source={circle}/>
          <Text style={styles.c}>网络不给力...加载中...</Text>
        </View>
      )
      
}
}
const {width, height} = Dimensions.get('window');
const styles={
      v:{
        width:width,
        height:0.6*height,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
      },
      c:{
        fontSize:16,
        color:'#f00'

      },
      circle:{
        width: 60,
        height: 65
     }
  }
export default Loading







