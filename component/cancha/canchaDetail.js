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
import EditCancha from './editCancha';
import CanchaService from '../../services/cancha';
import SoundManager from '../../services/soundManager';
import RenderIf from '../app/renderIf';

export default class CanchaDetail extends Component {
  constructor(props){
    super(props)
    this.state ={
      scene: 'canchaDetail',
      wantToDelete:false,
      editButtonVisibility:false,
      deleteButtonVisibility:false
    }
  }
  componentDidMount(){
    if(this.props.user.rol == "admin" || this.props.user.rol == "superAdmin"){
        this.setState({editButtonVisibility:true,deleteButtonVisibility:true})
    }else{
      this.setState({editButtonVisibility:false,deleteButtonVisibility:false})
    }
  }

 setScenecanchaDetail =()=>{
   SoundManager.playBackBtn();
   this.setState({scene:'canchaDetail'})
 }
  showScene = () => {
    switch (this.state.scene) {
      case 'canchaDetail':
        return this.showCanchaDetail()
        break;
        case 'editcancha':
          return <EditCancha canchas={this.props.canchas} complejo={this.props.complejo} cancha={this.props.cancha} back={()=>{this.setScenecanchaDetail()}} />
          break;
      default:

    }
  }

 setWantToDelete = () =>{
   this.setState({wantToDelete:!this.state.wantToDelete})
 }
 delete = () => {
   CanchaService.delete(this.props.canchas,this.props.cancha,this.props.complejo.uid);
   ToastAndroid.show('Cancha eliminada correctamente', ToastAndroid.LONG);
   this.props.back();
 }

  showButtonOptions = () =>{
    if(!this.state.wantToDelete){
  return  <View style={{flex:1,flexDirection:'row'}}>
    {RenderIf(this.state.deleteButtonVisibility === true,
      <TouchableOpacity style={styles.buttonEliminar} onPress={()=>{
        SoundManager.playPushBtn();
        this.setWantToDelete();
        }}><Text style={styles.textButton}>
        <Icon name="times" size={15} color="#FFFFFF"/> Eliminar</Text>
    </TouchableOpacity>
    )}
    {RenderIf(this.state.editButtonVisibility === true,
    <TouchableOpacity style={styles.button} onPress={()=>{
      SoundManager.playPushBtn();
      this.setState({scene:'editcancha'})}}><Text style={styles.textButton}>
      <Icon name="pencil" size={15} color="#FFFFFF"/> Editar</Text>
    </TouchableOpacity>
    )}
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

  showImage = () => {
    if(this.props.cancha.image !== undefined){
     return   <Image style={styles.profileImage} borderRadius={10} source={{uri: this.props.cancha.image}}>
       </Image>
    }else{
    return    <Image style={styles.profileImage} borderRadius={10} source={{uri: 'http://www.dendrocopos.com/wp-content/themes/invictus/images/dummy-image.jpg'}}>
      </Image>
  }
  }
  showEdit = () => {
    if(true){
    return
    <View style={{flex:1, alignItems:'flex-end'}}>
    <TouchableOpacity style={styles.button} onPress={()=>{
      SoundManager.playPushBtn();
      this.setState({scene:'editcancha'})}}><Text style={styles.textButton}><Icon name="pencil" size={15} color="#FFFFFF"/> Editar</Text></TouchableOpacity>
    </View>
   }
  return null;
  }

  showBackButton= () =>{
    if(this.props.showBackButton == true){
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

  showCanchaDetail = () => {
    return (
      <FadeInView style={styles.container} duration={600}>
        <View style={styles.infoContainer}>
          <View style={styles.mainName}>
              <Text style={styles.whiteFont}>CANCHA NÚMERO {this.props.cancha.numero}</Text>
          </View>
          <View style={styles.subtitle}>
              <Text style={styles.whiteFont2}>Información básica</Text>
          </View>
         <View style={styles.basicInfo}>
            <View style={{flex:1,alignItems:'center'}}>
               {this.showImage(this.props.cancha)}
              <View style={[styles.circularIcon,{margin:-30}]}>
                   <Icon name={"futbol-o"}  size={25} color="#424242" />
              </View>
            </View>
            <View style={{flex:3,padding:10}}>
              <ScrollView>
                  <View style={styles.info}>
                     <Text style={[styles.flexStart,{flex:1}]}>Número</Text>
                     <Text style={[styles.flexEnd,{flex:5}]}>{this.props.cancha.numero}</Text>
                  </View>
                  <View style={styles.info}>
                     <Text style={styles.flexStart}>Gramilla</Text>
                     <Text style={styles.flexEnd}>{this.props.cancha.gramilla}</Text>
                  </View>
                  <View style={styles.info}>
                     <Text style={styles.flexStart}>Techada</Text>
                     <Text style={styles.flexEnd}>{this.props.cancha.techo}</Text>
                  </View>
                  <View style={styles.info}>
                     <Text style={styles.flexStart}>Complejo</Text>
                     <Text style={styles.flexEnd}>{this.props.cancha.complejo.nombre}</Text>
                  </View>
                  <View style={styles.info}>
                     <Text style={styles.flexStart}>Provincia</Text>
                     <Text style={styles.flexEnd}>{this.props.cancha.provincia}</Text>
                  </View>
                  <View style={styles.info}>
                     <Text style={styles.flexStart}>Cantón</Text>
                     <Text style={styles.flexEnd}>{this.props.cancha.canton}</Text>
                  </View>
                </ScrollView>
              </View>
          </View>
  </View>
       {this.showBackButton()}

      </FadeInView>
    )
  }
      render(){
        return (
          <View style={styles.container}>
            {this.showScene()}
          </View>
        )
      }
    }

    const styles = StyleSheet.create({
    info:{
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
     backgroundColor:'#BBDEFB',
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
     alignItems:'center',
     justifyContent:'center',
     padding:10,
     borderRadius:9,
     backgroundColor:'#F4511E',
     flex:3,
     marginBottom:4,
     marginRight:4
   },
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
   }

    })
