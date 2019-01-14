import React, { Component } from 'react';
import { Platform,StyleSheet,Text,View } from 'react-native';
import { Scene, Router ,Actions } from 'react-native-router-flux';
import Login from './component/login';
import Changepassword from './component/Changepassword';
import Shipment from './component/Shipment';
import SearchMessage from './component/SearchMessage';
import AllMessage from './component/AllMessage';
import Message from './component/Message';
import UnFinishMessage from './component/UnFinishMessage';
import FinishMessage from './component/FinishMessage';
import myundata from './component/myundata';
import mydata from './component/mydata';
import chexiaomouyige from './component/chexiaomouyige';
import chexiaomouyigee from './component/chexiaomouyigee';
import No from './component/No';
import NoUnFinishMessage from './component/NoUnFinishMessage';

class Route extends Component{

  tuichu=()=>{
    Actions.Login()
  }
  render() {
    return (
    <Router >
	    <Scene key='Route'>
	        <Scene hideNavBar key='Login' component={Login} title="用户登录"  titleStyle={{color:'#eee'}} initial={true}/>

          <Scene key='Changepassword' component={Changepassword} title="修改密码"  titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} rightTitle="退出" onRight={() => this.tuichu()} />

	        <Scene key='Shipment' component={Shipment} title="发货清单" titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} rightTitle="退出" onRight={() => this.tuichu()} />

          <Scene key='SearchMessage' component={SearchMessage} title="搜索详细" titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} rightTitle="退出" onRight={() => this.tuichu()} />
  
          <Scene key='AllMessage' component={AllMessage} title="全部发货单" titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} rightTitle="退出" onRight={() => this.tuichu()} />

          <Scene key='Message' component={Message} title="待发货扫描" titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} rightTitle="退出" onRight={() => this.tuichu()} />

          <Scene key='UnFinishMessage' component={UnFinishMessage} title="未完成扫描" titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} rightTitle="退出" onRight={() => this.tuichu()} />

          <Scene key='FinishMessage' component={FinishMessage} title="已完成列表" titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} rightTitle="退出" onRight={() => this.tuichu()} />

          <Scene key='No' component={No} title="空单扫描" titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} rightTitle="退出" onRight={() => this.tuichu()} />

          <Scene key='NoUnFinishMessage' component={NoUnFinishMessage} title="空单扫描详细" titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} rightTitle="退出" onRight={() => this.tuichu()} />

          <Scene key='mydata' component={mydata} title="我的待发运" titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} rightTitle="退出" onRight={() => this.tuichu()} />

          <Scene key='myundata' component={myundata} title="我的未完成" titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} rightTitle="退出" onRight={() => this.tuichu()} />

          <Scene key='chexiaomouyige' component={chexiaomouyige} hideNavBar title="撤销" titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} rightTitle="退出" onRight={() => this.tuichu()} />

          <Scene key='chexiaomouyigee'  component={chexiaomouyigee} hideNavBar title="撤销" titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} rightTitle="退出" onRight={() => this.tuichu()} />

	    </Scene>
    </Router>
    );
  }
}
const styles={

}
export default Route

