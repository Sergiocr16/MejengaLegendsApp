import * as firebase from 'firebase'

class FirebaseBasicService {
    static new(childRef,obj){
      let pathName = "/"+childRef+"/active/"+Date.now()+"/"
      obj.status= "activo";
      return firebase.database().ref(pathName).set(obj)
    }

    static newWithKey(childRef, key, obj){
      let pathName = "/"+childRef+"/active/"+key+"/"
      obj.status= "activo";
      return firebase.database().ref(pathName).set(obj)
    }
    static update(childRef,dataId,obj){
      let pathName = "/"+childRef+"/active/"+dataId+"/"
      return firebase.database().ref(pathName).update(obj)
    }
    static findActiveById(childRef,dataId,callback){
        let pathName = "/"+childRef+"/"+"/active/"+dataId
        firebase.database().ref(pathName).on('value', (snapshot) => {
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
    static filterByAttribute(childRef,filter,filterData,callback){
        var ref = firebase.database().ref("/"+childRef+"/");
        ref.orderByChild(filter).equalTo(filterData).on('value', (snapshot) => {
            let data = snapshot.val()
            if(data){
               callback(data)
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
