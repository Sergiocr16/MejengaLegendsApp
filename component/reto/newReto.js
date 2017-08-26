import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  DatePickerAndroid,
  TimePickerAndroid,
  ToastAndroid,
  Picker
} from 'react-native'
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import SoundManager from '../../services/soundManager';
import Reto from '../../services/reto';
import Complejo from '../../services/complejo';
import Cancha from '../../services/cancha';
import Partido from '../../services/partido';
import Loader from '../app/loading';
import TeamDetail from '../team/teamDetail';
import ComplejoDetail from '../complejo/complejoDetail';
import PlayersByTeam from '../team/playersByTeam';
const AnimatedIcon = Animatable.createAnimatableComponent(Icon)
var moment = require('moment');
moment.locale('es');
export default class NewReto extends Component {
  constructor(props){
    super(props)
    this.state ={
      scene: 'newReto',
      sceneIn: 'loading',
      selectedDate:false,
      badTime:false,
      fecha:new Date(),
      definedDate: false,
      hourSelected: 13,
      minuteSelected: 0,
      retosDisponibles: [],
      complejo: {}
    }
  }

  componentDidMount(){

    setTimeout(()=>{
      // Reto.getAll((retos)=>{
      //   this.setState({retos})
      // },()=>{
      //   this.setState({retos:[]})
      // })
      this.setState({sceneIn:'retosDisponibles',complejo:this.props.complejos[0]})
    },2000)
  }
 setSceneTeamDetail =()=>{
   SoundManager.playBackBtn();
   this.setState({scene:'teamDetail'})
 }
 setSceneNewReto = ()=>{
   SoundManager.playPushBtn()
    this.setState({scene:'newReto'})
 }
 showDefinedDateText = () => {
   if(this.state.definedDate){
     return  <Text style={{fontSize:17,marginBottom:5,textAlign:'center'}}>{moment(this.state.fecha).format('ll hh:mm a')}</Text>
   }else{
     return <Text style={{fontSize:17,marginBottom:5,textAlign:'center'}}>Selecciona la fecha del reto</Text>
   }
 }
 openTimePicker = async (option) =>{
   try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: this.state.hourSelected,
        minute: this.state.minuteSelected,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        var fecha = this.state.fecha;
        if(minute===0){
        fecha.setHours(hour);
        fecha.setMinutes(minute);
        fecha.setSeconds(0);
       this.setState({fecha,definedDate:true,hourSelected:hour,minuteSelected:minute});
     }else{
       this.setState({badTime:true})
    ToastAndroid.show("Por favor selecciona horas en punto.", ToastAndroid.LONG);
     }
      }
     } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
     }
  }
  openDatePicker = async () =>{
     try {
       const {action, year, month, day} =  await DatePickerAndroid.open({
         date: new Date(),
         minDate: new Date(),
         mode: 'default',
       });
      if (action !== DatePickerAndroid.dismissedAction) {
          var fecha = new Date(year,month,day);
         this.setState({fecha,selectedDate:true})
        }
     } catch ({code, message}) {
       console.warn('Cannot open date picker', message);
     }
   }

  showScene = () => {
    switch (this.state.scene) {
      case 'newReto':
        return this.showMainView()
        break;
      case 'teamDetail':
        return <TeamDetail team={this.props.team}  showBackButton={true} back={()=>{this.setSceneNewReto()}} />
        break;
      case 'complejoDetail':
        return <ComplejoDetail complejo={this.state.complejo}  showBackButton={true} back={()=>{this.setSceneNewReto()}} />
        break;
      default:

    }
  }

  showResults = (retos) => {
    if(retos.length==0){
      return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:20}}>No se ha encontrado ningún reto disponible.</Text></View>
    }else{
      return retos;
    }
  }
  showSceneIn = () => {
    switch (this.state.sceneIn) {
      case 'loading':
        return <View style={styles.centerItems}>
        <AnimatedIcon animation="rotate" iterationCount="infinite" name="futbol-o" size={65} color="grey" ></AnimatedIcon>
        </View>
        break;
      case 'createReto':
        return this.showCreatePropuestaReto()
        break;
      case 'retosDisponibles':
        return this.showRetosDisponibles()
        break;
      default:
    }
  }

 showRetosDisponibles = () => {
   var retos = [];
   return <View style={{flex:1}}>
    {this.showResults(retos)}
   </View>
 }

  showImage = () => {
    if(this.props.team.image !== undefined){
     return   <Image style={styles.profileImage} borderRadius={10} source={{uri: this.props.team.image}}>
       </Image>
    }else{
    return    <Image style={styles.profileImage} borderRadius={10} source={{uri: 'http://www.dendrocopos.com/wp-content/themes/invictus/images/dummy-image.jpg'}}>
      </Image>
  }
  }

 showCreatePropuestaReto = () => {
   let complejosPicker = this.props.complejos.map( (s, i) => {
      return <Picker.Item  key={i} value={s} label={s.nombre} />
    });
   return <View style={{flex:1,justifyContent:'center',alignItems:'center',borderRadius:10,padding:10,borderWidth:1,borderColor:'#EEEEEE'}}>
   <ScrollView>
   <View style={{flex:1,marginBottom:5}}>
    <Text style={{fontSize:17}}>Selecciona el complejo donde quieres jugar</Text>
    <View style={{flex:1,flexDirection:'row'}}>
    <View style={{flex:1}}>
   <Picker selectedValue={this.state.complejo}
     onValueChange={ (complejo) => (this.setState({complejo})) } >
     {complejosPicker}
     </Picker>
     </View>
     <View style={{flex:1,justifyContent:'center'}}>
    <TouchableOpacity style={[styles.buttonComplejoDetail]} onPress={()=>{this.setState({scene:'complejoDetail'}); SoundManager.playPushBtn()}} ><Text style={styles.textButton}><Icon name="eye" size={15} color="#FFFFFF"/> Ver {this.state.complejo.nombre}</Text></TouchableOpacity>
      </View>
    </View>
   </View>
    {this.showDefinedDateText()}
   <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
   <TouchableOpacity style={{backgroundColor:'#1565C0',padding:5,margin:20,borderRadius:4}} onPress={this.openDatePicker}><Text style={{color:'white'}}>Define la fecha</Text></TouchableOpacity>
   <TouchableOpacity style={{backgroundColor:'#1565C0',padding:5,margin:20,borderRadius:4}} onPress={this.openTimePicker} disabled={!this.state.selectedDate}><Text style={{color:'white'}}>Define la hora</Text></TouchableOpacity>
   </View>
   </ScrollView>
    </View>
 }

validateDateInCommplejoSchedule = () => {
  var horas = this.state.fecha.getHours();
  var minutes = this.state.fecha.getMinutes();
  var horasAbreComplejo = this.state.complejo.horario.horaAbre.split(" ")[1]==="pm" ? parseInt(this.state.complejo.horario.horaAbre.split(":")[0])+12:parseInt(this.state.complejo.horario.horaAbre.split(":")[0]);
  var minutosAbreComplejo = this.state.complejo.horario.horaAbre.split(":")[1].split(" ")[0];
  var horasCierraComplejo = this.state.complejo.horario.horaCierra.split(" ")[1]==="pm" ? parseInt(this.state.complejo.horario.horaCierra.split(":")[0])+12:parseInt(this.state.complejo.horario.horaCierra.split(":")[0]);
  var minutosCierraComplejo = this.state.complejo.horario.horaCierra.split(":")[1].split(" ")[0];
  var horarioAbreDeHoy = new Date();
  var horarioCierraDeHoy = new Date();
  var horarioSeleccionado = new Date();
  horarioAbreDeHoy.setHours(horasAbreComplejo);
  horarioAbreDeHoy.setMinutes(minutosAbreComplejo);
  horarioAbreDeHoy.setSeconds(0);
  horarioCierraDeHoy.setHours(horasCierraComplejo);
  horarioCierraDeHoy.setMinutes(minutosCierraComplejo);
  horarioCierraDeHoy.setSeconds(0);
  horarioSeleccionado.setHours(horas);
  horarioSeleccionado.setMinutes(minutes);
  horarioSeleccionado.setSeconds(0);
  if(horarioAbreDeHoy.getTime()<=horarioSeleccionado.getTime() && horarioSeleccionado.getTime()<=horarioCierraDeHoy.getTime()){
    return true;
  }else{
    ToastAndroid.show("Debes seleccionar una fecha dentro del horario del complejo seleccionado", ToastAndroid.LONG);
    return false;
  }
}

verificarPartidos = () => {
  var canchasDisponibles = [];
  this.state.canchas.map((cancha)=>{
    if(cancha.matches.length==0){
    canchasDisponibles.push({numero: cancha.numero,canchaGUID:cancha.uid,numeroPartidos:cancha.matches.length})
    }else{
      var canchaLibre = true;
    cancha.matches.map((partido)=>{
     var fechaPartido = new Date(partido.fecha);
     var fechaSeleccionada = new Date(moment(this.state.fecha).format('LL hh:mm:ss'));
     if(fechaPartido.getTime()===fechaSeleccionada.getTime()){
       canchaLibre = false;
     }
    })
    if(canchaLibre){
      canchasDisponibles.push({numero: cancha.numero,canchaGUID:cancha.uid, numeroPartidos:cancha.matches.length})
    }
   }
  })
  this.setState({canchasDisponibles})
  setTimeout(()=>{this.creacionReto()},200)
}

createMatchesByCanchas = () => {
  var canchasFinal = [];
  Complejo.getCanchasByComplejo(this.state.complejo.uid,(canchas)=>{
    var recorrido = 0
    canchas.map((cancha)=>{
      Cancha.getMatchesByCancha(cancha.uid,(matches)=>{
        cancha.matches = matches;
        canchasFinal.push(cancha)
        recorrido++;
        if(recorrido==canchas.length){
          this.setState({canchas:canchasFinal})
            setTimeout(()=>{this.verificarPartidos()},200)
        }
      },()=>{
        cancha.matches = [];
        canchasFinal.push(cancha)
        recorrido++;
        if(recorrido==canchas.length){
          this.setState({canchas:canchasFinal})
          setTimeout(()=>{this.verificarPartidos()},200)
        }
      })

    })
  },()=>{
    canchas:[];
  })
}

obtenerCanchaMenosConcurrida = () => {
  var mejorCancha;
  var menorNumero = 0;
  this.state.canchasDisponibles.map((cancha)=>{
   if(cancha.numeroPartidos >= menorNumero){
     menorNumero=cancha.numeroPartidos;
     mejorCancha = cancha;
   }
  })
  return mejorCancha;
}

creacionReto = () => {
  if(this.state.canchasDisponibles.length>0){
  var canchaParaReto = this.obtenerCanchaMenosConcurrida()
  var reto = {equipo:{nombre:this.props.team.nombre,equipoGUID:this.props.team.uid},
              fecha:moment(this.state.fecha).format('LL hh:mm:ss'),
              complejo:{nombre:this.state.complejo.nombre,complejoGUID:this.state.complejo.uid},
              cancha:{ numero: canchaParaReto.numero , canchaGUID: canchaParaReto.canchaGUID},
              uid: Date.now()}
  Reto.crearSolicitudReto(reto,()=>{
    var partidos = []
     Cancha.getMatchesByCanchaOnce(reto.cancha.canchaGUID,(partidosCancha)=>{
         console.log(partidosCancha)
       partidos = partidosCancha;
       partidos.push(reto)
       Partido.crearPartidoApartirDeReto(reto.cancha,partidos)
     },()=>{
       console.log("ERROR")
       partidos.push(reto)
      Partido.crearPartidoApartirDeReto(reto.cancha,partidos)
     })
     ToastAndroid.show("Se ha creado el reto en "+this.state.complejo.nombre+" en la siguiente fecha: "+moment(this.state.fecha).format("LL hh:mm a"), 4000);
     this.props.back();
  })
}else{
  this.setState({sceneIn:'createReto'})
   ToastAndroid.show("Todos los espacios reservados para esta fecha, porfavor selecciona otra fecha u hora", ToastAndroid.LONG);
}
}

submitCrearReto = () => {
    SoundManager.playPushBtn();
     if(this.state.definedDate){
       if(this.validateDateInCommplejoSchedule()){
         this.setState({sceneIn:'loading'})
         this.createMatchesByCanchas();
   }
   }else{
     ToastAndroid.show("Debes seleccionar una fecha para tu reto", ToastAndroid.LONG);
   }
}

 showAction = () => {
   if(this.state.sceneIn === 'createReto') {
       return <TouchableOpacity style={[styles.button,{marginRight:5,marginBottom:5,backgroundColor:'purple'}]} onPress={this.submitCrearReto}><Text style={styles.textButton,{fontSize:20,color:'white',padding:5}}><Icon name="futbol-o" size={20} color="#FFFFFF"/> ¡CREAR RETO!</Text></TouchableOpacity>
    }else{
      if(this.state.sceneIn!=='loading'){
      return <TouchableOpacity style={[styles.button,{marginRight:5,marginBottom:5}]} onPress={()=>{
        SoundManager.playPushBtn();
        this.setState({sceneIn:'createReto'})}}><Text style={styles.textButton}><Icon name="futbol-o" size={15} color="#FFFFFF"/> Crear propuesta de reto</Text></TouchableOpacity>
     }
    }
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
     <View style={{flex:1, alignItems:'flex-end'}}>
     {this.showAction()}
    </View>
    </View>
  )
    }
    return null;
  }
  showLema = (lema) =>{
    if(lema==""){
      return "No definido";
    }else{
      return '"'+lema+'"';
    }
  }

  showTitleSearching = () => {
    if(this.state.sceneIn !== 'createReto'){
      return <View style={styles.info}>
      <Text style={styles.flexStart}>Buscando retos en complejos de</Text>
      <Text style={styles.flexEnd}>{this.props.team.provincia}, {this.props.team.canton}</Text>
     </View>
    }
    return null;
  }
  showMainView = () => {
    return (
      <FadeInView style={styles.container} duration={600}>
        <View style={styles.infoContainer}>
          <View style={styles.mainName}>
              <Text style={styles.whiteFont}>Buscando reto para {this.props.team.nombre}</Text>
          </View>
          <View style={styles.subtitle}>
              <Text style={styles.whiteFont2}>Configuración de busqueda</Text>
          </View>
         <View style={styles.basicInfo}>
            <View style={{flex:1,alignItems:'center'}}>
               {this.showImage()}
              <View style={[styles.circularIcon,{margin:-30}]}>
                   <Icon name={"shield"}  size={40} color="#424242" />
              </View>
               <Text style={[styles.boldFont,{marginTop:30,color:'#FFB300'}]}>{this.props.team.copas} <Icon name="trophy" size={20} color="#FFB300" /></Text>
              <TouchableOpacity style={[styles.button,{marginTop:10, paddingVertical:7}]} onPress={()=>this.setSceneTeamDetail()} ><Text style={styles.textButton}><Icon name="eye" size={15} color="#FFFFFF"/> Ver {this.props.team.nombre}</Text></TouchableOpacity>
            </View>
            <View style={{flex:3}}>
              <ScrollView style={{flex:1}}>
                  {this.showTitleSearching()}
                  <View style={{flex:1,padding:20}}>
                  {this.showSceneIn()}
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
     flexDirection:'column',
   },
   flexStart:{
     textAlign:'center',
     color:'black',
     flex:1
   },
   buttonTextReady: {
     fontSize: 18,
     color: 'white',
     alignSelf: 'center'
   },
   buttonReady: {
     height: 36,
     marginTop:10,
     backgroundColor: '#48BBEC',
     borderColor: '#48BBEC',
     borderWidth: 1,
     borderRadius: 8,
     marginBottom: 10,
     alignSelf: 'stretch',
     justifyContent: 'center'
   },
   flexEnd:{
     textAlign:'center',
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
   centerItems:{
      alignItems:'center',
      justifyContent:'center',
     flex:1
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
     textAlign:'center'
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
   profileImage:{   height:110,
      width:130,
     borderWidth:2,
     borderColor:'white'
   },
   whiteFont:{
     color:'white',
     textAlign:'center'
   },
   buttonEdit:{
     marginRight:5,
     marginBottom:5,
     paddingHorizontal:10,
     paddingVertical:4,
     alignItems:'center',
     justifyContent:'center',
     borderRadius:9,
     backgroundColor:'#F4511E',
     flex:3,
   },
   button:{
     alignItems:'center',
     justifyContent:'center',
     paddingHorizontal:10,
     borderRadius:9,
     backgroundColor:'#F4511E',
     flex:3,
   },
   buttonComplejoDetail:{
     alignItems:'center',
     justifyContent:'center',
     paddingVertical:3,
     borderRadius:9,
     backgroundColor:'#F4511E',
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
