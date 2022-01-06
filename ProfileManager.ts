import {Profile} from './Entity';



export default class ProfileManager{
    private MProfile:Profile;
    constructor(InitProfile:Profile){
        this.MProfile =InitProfile 
    }

    public GetID():string{
        if(this.MProfile.id===''){
            const NewID:string = `${this.MProfile.FirstName}${this.MProfile.LastName}`;
            this. MProfile.id=NewID;
            return NewID;
        }
        else{ return this.MProfile.id }
    }

    public GetProfileName():string{
        return `${this.MProfile.FirstName} ${this.MProfile.LastName}`
    }

    public GetManagerID():string{
        return this.MProfile?.ManagerID
    }

    public GetEmployeeArray():string[]{
        return this.MProfile?.EmployeeArray
    }

    public GetRequestArray(){
        return this.MProfile?.SendRequestIDArray;
    }

}