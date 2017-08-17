import * as firebase from 'firebase'

class FirebaseBasicService {
    static new(childRef,obj){
      var uid = Date.now()
      let pathName = "/"+childRef+"/active/"+uid+"/"
      obj.status= "activo";
      obj.uid = uid;
      return firebase.database().ref(pathName).set(obj)
    }
    static newWithCallback(childRef,obj,callback){
      let id = Date.now();
      let pathName = "/"+childRef+"/active/"+id+"/"
      obj.uid = id;
      firebase.database().ref(pathName).set(obj);
      callback(obj);
    }
    static newWithKey(childRef, key, obj){
      let pathName = "/"+childRef+"/active/"+key+"/"

      firebase.database().ref(pathName).set(obj)
    }
    static updateWithoutActive(childRef,dataId,obj){
      let pathName = "/"+childRef+"/"+dataId+"/"
      return firebase.database().ref(pathName).set(obj)

    }
    static update(childRef,key,obj){
      let pathName = "/"+childRef+"/active/"+key+"/"
      return firebase.database().ref(pathName).update(obj)
    }
    static updateWithoutActive(childRef,dataId,obj){
      let pathName = "/"+childRef+"/"+dataId+"/"
      return firebase.database().ref(pathName).update(obj)
    }
    static findActiveById(childRef,dataId,callback){
        let pathName = "/"+childRef+"/"+"/active/"+dataId
        firebase.database().ref(pathName).once('value', (snapshot) => {
            let data = snapshot.val()
            if(data){
               callback(data)
            }
        })
    }
    static findInactiveById(childRef,dataId,callback){
        let pathName = "/"+childRef+"/"+"/inactive/"+dataId
        firebase.database().ref(pathName).on('value', (snapshot) => {
            let data = snapshot.val()
            if(data){
               callback(data)
            }
        })
    }

    static findActiveById(childRef,dataId,callback,error){
        let pathName = "/"+childRef+"/"+"/active/"+dataId
        firebase.database().ref(pathName).on('value', (snapshot) => {
            let data = snapshot.val()
            if(data){
               callback(data)
            }else{
              error()
            }
        })
    }
    static filterByAttribute(childRef,filter,filterData,callback){
        var ref = firebase.database().ref("/"+childRef+"/");
        ref.orderByChild(filter).equalTo(filterData).on('value', (snapshot) => {
            let data = snapshot.val()
            if(data){
               callback(Object.values(data).sort(function(a,b) { return parseFloat(a.nombre) - parseFloat(b.nombre) } ).reverse())
            }
        })
    }
    static filterByAttribute(childRef,filter,filterData,callback,error){
        var ref = firebase.database().ref("/"+childRef+"/");
        ref.orderByChild(filter).equalTo(filterData).on('value', (snapshot) => {
            let data = snapshot.val()
            if(data){
               callback(Object.values(data).sort(function(a,b) { return parseFloat(a.nombre) - parseFloat(b.nombre) } ).reverse())
            }else{
              error()
            }
        })
    }
    static filterByAttribute(childRef,filter,filterData,callback,error){
        var ref = firebase.database().ref("/"+childRef+"/");
        ref.orderByChild(filter).equalTo(filterData).on('value', (snapshot) => {
            let data = snapshot.val()
            if(data){
               callback(Object.values(data).sort(function(a,b) { return parseFloat(a.nombre) - parseFloat(b.nombre) } ).reverse())
            }else{
              error()
            }
        })
    }

    static orderByAttribute(childRef,filter,callback){
        var ref = firebase.database().ref("/"+childRef+"/");
        ref.orderByChild(filter).limitToFirst(50).on('value', (snapshot) => {
            let data = snapshot.val()
            if(data){
               callback(Object.values(data).sort(function(a,b) { return parseFloat(a.score) - parseFloat(b.score) } ).reverse())
            }
        })
    }
    static orderByAttribute(childRef,filter,callback,error){
        var ref = firebase.database().ref("/"+childRef+"/");
        ref.orderByChild(filter).limitToFirst(50).on('value', (snapshot) => {
            let data = snapshot.val()
            if(data){
               callback(Object.values(data).sort(function(a,b) { return parseFloat(a.score) - parseFloat(b.score) } ).reverse())
            }else{
              error()
            }
        })
    }
    static getAll(childRef,callback){
        return firebase.database().ref("/"+childRef+"/active/").once('value').then(function(snapshot) {
             callback(snapshot.val());


    });


    }
    static deleteForever(childRef,dataId){
      let pathName = "/"+childRef+"/"+dataId+"/"
      return firebase.database().ref(pathName).remove()
    }
    static setInactive(childRef,dataId,obj){
      let pathName = "/"+childRef+"/"+dataId+"/"
      return firebase.database().ref(pathName).update({
        status: "inactive"
      })
    }
    static setActive(childRef,dataId,obj){
      let pathName = "/"+childRef+"/"+dataId+"/"
      return firebase.database().ref(pathName).update({
        status: "active"
      })
    }
}

module.exports = FirebaseBasicService
