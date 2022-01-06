import { Request } from './Entity';

export default class SingleRequest{
    private SRequest:Request;
    constructor(InitRequest:Request){
        this.SRequest = InitRequest;
    }

    public GetRequestID():string{
        return this.SRequest.id
    }

    public GetManagerID():string{
        return this.SRequest.ManagerID
    }
    public GetEmployeeID():String{
        return this.SRequest.EmployeeID
    }

    public GetAmount():number{
        return this.SRequest.Amount;
    }

    public GetPostDate():Date{
        return this.SRequest.PostDate
    }

    public GetModifyDate():Date{
        if(this.SRequest.ModifiedDate){return this.SRequest.ModifiedDate}
        else{return new Date()}
    }

    public SetModifyDate(NewDate:Date){
        this.SRequest.ModifiedDate = NewDate;
    }

    public GetFile():any{
        return this.SRequest.File
    }

    public GetStatus(){
        return this.SRequest.RequestStatus;
    }

    public SetStatusDenied(){
        this.SRequest.RequestStatus=1;
    }

    public SetStatusApproved(){
        this.SRequest.RequestStatus=2;
    }



}