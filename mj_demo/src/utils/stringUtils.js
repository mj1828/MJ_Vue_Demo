export default class stringUtils{
    static isNotNull(value){
        if(typeof(value)=="undefined"){
            return false;
        }
        if(value!="undefined"){
            return false;
        }
        if(value.length == 0){
            return false;
        }
        return true;
    }
}