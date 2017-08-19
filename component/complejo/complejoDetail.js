import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid
} from 'react-native'
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../app/loading';
import EditComplejo from '../complejo/editComplejo';
import CanchasMenu from '../cancha/canchasMenu'
import ComplejoService from '../../services/complejo';
import SoundManager from '../../services/soundManager';
export default class ComplejoDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      scene: 'complejoInformation',
      currentCancha: null,
      wantToDelete:false,
      canchas:[]
    }
  }

  setWantToDelete = () =>{
    this.setState({wantToDelete:!this.state.wantToDelete})
  }
  showButtonOptions = () => {
    if(!this.state.wantToDelete){
  return  <View style={{flex:1,flexDirection:'row'}}>
    <TouchableOpacity style={styles.buttonEliminar} onPress={()=>{
      SoundManager.playPushBtn();
      this.setWantToDelete();
      }}><Text style={styles.textButton}>
      <Icon name="times" size={15} color="#FFFFFF"/> Eliminar</Text>
   </TouchableOpacity>
   <TouchableOpacity style={styles.button} onPress={()=>{
     SoundManager.playPushBtn();
     this.setState({scene:'editComplejo'})}}><Text style={styles.textButton}>
     <Icon name="pencil" size={15} color="#FFFFFF"/> Editar</Text>
  </TouchableOpacity>
  </View>
}else{
  return <View style={{flex:1,flexDirection:'row'}}>
    <TouchableOpacity style={styles.buttonConfirm} onPress={()=>{
      SoundManager.playPushBtn();
      this.delete()
     }}><Text style={styles.textButton}>
      <Icon name="check" size={15} color="#FFFFFF"/> Eliminar</Text>
   </TouchableOpacity>
   <TouchableOpacity style={styles.buttonEliminarAccept} onPress={()=>{
     SoundManager.playPushBtn();
     this.setWantToDelete();
    }}><Text style={styles.textButton}>
      <Icon name="times" size={15} color="#FFFFFF"/> Cancelar</Text>
  </TouchableOpacity>
  </View>
}
  }
  delete = () => {
    ComplejoService.delete(this.props.complejo.uid);
    ToastAndroid.show('Complejo eliminada correctamente', ToastAndroid.LONG);
    this.props.back();
  }
  showImage = () => {
    if(this.props.complejo.image !== undefined){
     return   <Image style={styles.profileImage} borderRadius={10} source={{uri: this.props.complejo.image}}>
       </Image>
    }else{
    return    <Image style={styles.profileImage} borderRadius={10} source={{uri: 'http://www.dendrocopos.com/wp-content/themes/invictus/images/dummy-image.jpg'}}>
      </Image>
  }
  }

  setComplejoInformationScene = () => {
    SoundManager.playBackBtn();
    this.setState({scene:'complejoInformation'})
  }
  setSceneCanchas = () => {
    SoundManager.playPushBtn();
    this.setState({scene:'menuCanchas'})
  }
  showScene(){
    switch (this.state.scene) {
      case 'complejoInformation':
        return this.complejoInformation();
        break;
      case 'loading':
        return (<Loader/>)
        break;
      case 'menuCanchas':
       return (<CanchasMenu canchas={this.state.canchas} back={()=>{this.setComplejoInformationScene()}} complejo={this.props.complejo}/>)
      break;
          case 'editComplejo':
          return (<EditComplejo complejo={this.props.complejo} back={()=> this.setSceneComplejoDetail()} style={{flex:1}}/>);
            break;
      default:
    }
  }
 setSceneComplejoDetail = () => {
   this.setState({scene:'complejoInformation'});
   SoundManager.playBackBtn();
 }
  showComodidades = () => {
    if(this.props.complejo.comodidades!==undefined){
    return this.props.complejo.comodidades.map( (val, key) => {
        return (<View key={key}>
        <View style={{margin:3,padding:2,backgroundColor:"#E0E0E0",borderRadius:5,justifyContent:'center',alignItems:'center'}}>
        <Icon name={val.icono} size={15} color="#1565C0"/>
        <Text style={{textAlign:'center',color:"#1565C0",textAlign:'center'}}>{val.nombre}</Text>
        </View>
        </View>)
    });
  }else{
    return <View>
    <View style={{margin:3,padding:2,backgroundColor:"#E0E0E0",borderRadius:5,justifyContent:'center',alignItems:'center'}}>
    <Text style={{textAlign:'center',color:"#1565C0",textAlign:'center'}}>Ninguna</Text>
    </View>
    </View>
  }
  }

  showBackButton= () =>{
    if(true){
      return (
<View style={{flex:1,flexDirection:'row'}}>
      <TouchableOpacity onPress={this.props.back} style={{flex:1, alignItems:'flex-start'}}>
        <View style={styles.buttonBackPadre}>
          <View style={styles.buttonBackHijo}/>
            <Text style={{ backgroundColor: 'transparent',fontSize: 16,color:'white'}}>
                <Icon name="chevron-left" size={15} color="#FFFFFF"/> Atrás
            </Text>
        </View>
     </TouchableOpacity>
     <View style={{flex:0.4,alignItems:'flex-end'}}>
     {this.showButtonOptions()}
     </View>
    </View>
  )
    }
    return null;
  }
      complejoInformation(){
        return (
          <FadeInView style={styles.container} duration={600}>
            <View style={styles.infoContainer}>
            <View style={styles.mainName}>
                <Text style={styles.whiteFont}>{this.props.complejo.nombre.toUpperCase()}</Text>
            </View>
            <View style={styles.subtitle}>
                <Text style={styles.whiteFont2}>Información básica</Text>
            </View>
             <View style={styles.basicInfo}>
                <View style={{flex:1,alignItems:'center'}}>
                <View style={{flex:6,alignItems:'center'}}>
                   {this.showImage()}
                  <View style={[styles.circularIcon,{margin:-30}]}>
                       <Icon name={"bank"}  size={24} color="#424242" />
                  </View>
                    </View>
                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity style={[styles.button,{paddingVertical:7,alignItems:'center',justifyContent:'center'}]} onPress={this.setSceneCanchas} ><Text style={styles.textButton}><Icon name="eye" size={15} color="#FFFFFF"/> Ver Canchas</Text></TouchableOpacity>
                      </View>
                </View>
                <View style={{flex:3,padding:10}}>
                  <View style={{flex:2}}>
                      <View style={{flex:1}}>
                      <View style={styles.info}>
                         <Text style={[styles.flexStart,{flex:1}]}>Nombre</Text>
                         <Text style={[styles.flexEnd,{flex:5}]}>{this.props.complejo.nombre}</Text>
                      </View>
                      <View style={styles.info}>
                         <Text style={styles.flexStart}>Provincia</Text>
                         <Text style={styles.flexEnd}>{this.props.complejo.provincia}</Text>
                      </View>
                      <View style={styles.info}>
                         <Text style={styles.flexStart}>Canton</Text>
                         <Text style={styles.flexEnd}>{this.props.complejo.canton}</Text>
                      </View>
                      </View>
                      <View style={{flex:0.7}}>
                         <Text style={{marginBottom:5}}>Comodidades</Text>
                         <View style={{flex:1,flexDirection:'column'}}>
                         <ScrollView horizontal={true}>
                         {this.showComodidades()}
                         </ScrollView>
                         </View>
                      </View>
                    </View>
                  </View>
              </View>
          </View>
             {this.showBackButton()}
          </FadeInView>
        )
      }

      delete(){
        ComplejoService.deleteComplejo(this.props.complejo.uid);
        this.props.back();
     }

     editComplejo(){
      this.setState({scene:'editComplejo'})
   }

      render(){
        return (
        <FadeInView style={{flex:1}} duration={30}>
            {this.props.children}
            {this.showScene()}
        </FadeInView>
        )
    }

}

    const styles = StyleSheet.create({
      buttonConfirm:{
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        borderRadius:9,
        backgroundColor:'#388E3C',
        flex:3,
        marginBottom:4,
        marginRight:4
      },
      buttonEliminar:{
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        borderRadius:9,
        backgroundColor:'#512DA8',
        flex:3,
        marginBottom:4,
        marginRight:4
      },
      buttonEliminarAccept:{
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        borderRadius:9,
        backgroundColor:'#D32F2F',
        flex:3,
        marginBottom:4,
        marginRight:4
      },
    info:{
     borderBottomWidth:1,
     borderBottomColor:'#9E9E9E',
     margin:5,
     flexDirection:'row',
   },
   comodidades:{
    borderBottomWidth:1,
    borderBottomColor:'#9E9E9E',
    margin:5,
    flexDirection:'row',
  },
   flexStart:{
     textAlign:'left',
     color:'black',
     flex:1
   },
   flexEnd:{
     textAlign:'right',
     flex:1
   },
    buttonBackPadre: {
    width: 150,
    height: 50,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    position: 'relative',
    paddingVertical:4,
    paddingHorizontal:15,
   },
   buttonBackHijo:{
     width: 120,
     height: 140,
     position: 'absolute',
     right: 40,
     top: -30,
     backgroundColor: '#1565C0',
     transform: [{
       rotate: '138deg',
     }]
   },
   boldFont:{
     fontWeight:'bold',
     fontSize:20,
   },
   basicInfo:{
     flex:1,
     flexDirection:'row',
     padding:10
   },
   container:{
     flex:1,
     borderRadius:20,
   },
   mainName:{
     backgroundColor:'#1565C0',
     padding:7
   },
   subtitle:{
     backgroundColor:'#42A5F5',
     padding:8
   },
   whiteFont2:{
     color:'#1A237E',
   },
   whiteFont:{
     color:'white',
     textAlign:'left'
   },
   infoContainer:{
     flex:10,
     backgroundColor:'white',
     borderRadius:10,
     margin:20
   },
   title:{
     fontSize:20,
     color:'white',
     marginVertical:10
   },
   subTitle:{
     fontSize:15,
     color:'white',
   },
   profileImage:{
     height:130,
     width:130,
     borderWidth:2,
     borderColor:'white'
   },
   whiteFont:{
     color:'white',
     textAlign:'center'
   },
   button:{
     marginRight:5,
     marginBottom:5,
     paddingHorizontal:10,
     paddingVertical:4,
     borderRadius:9,
     backgroundColor:'#F4511E',
     flex:3,
   },
   textButton: {
     textAlign:'center',
     color:'white',
     fontSize:15,
   },
   circularIcon:{
     borderWidth:1,
     borderColor:'rgba(0,0,0,0.2)',
     alignItems:'center',
     justifyContent:'center',
     width:50,
     height:50,
     backgroundColor:'#EEEEEE',
     borderRadius:100,
   },
   redButton:{
     margin:10,
     backgroundColor:'red',
     paddingVertical:5,
     paddingHorizontal:10,
     borderRadius:20
   },
   canchasList:{
    flexDirection:'row',
    flex:10,
  },
  canchasContainer:{
    display:'flex',
    flex:10,
    backgroundColor:'#F8F8F8',
    margin:10,
    width:150,
    borderRadius:15,
     overflow: 'hidden',
  },
  canchasName: {
    margin:1,
    fontSize: 13,
    alignSelf: 'center',
    color: '#0D47A1'
  },
  capacidad:{
    backgroundColor:'#FDD835',
    padding:1,
    borderRadius:5,
    borderWidth:1,
    borderColor:'white',
    height:25,
    color:'white',
    paddingHorizontal:10,
    fontWeight:'bold',
    textAlign:'center'
  },
  gramilla: {
    margin:1,
    fontSize: 10,
    alignSelf: 'center',
    color: 'black'
  }
    })
