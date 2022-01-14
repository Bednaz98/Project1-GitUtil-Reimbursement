import { Profile, Request } from '../Types/Entity';
import DataProcessor from './DataProcessor';
DataProcessor

export default class SingleRequest {
    private SRequest:Request;
    constructor(InitRequest:Request){
        this.SRequest = InitRequest;
    }
    DeconstructObject():Request {
        return {
            id: this.GetRequestID(),
            Amount: this.GetAmount(),
            RequestStatus: this.GetStatus(),
            PostDate: this.GetPostDate(),
            ModifiedDate: this.GetModifyDate(),
            File: this.GetFile()
            }
    }

    public GetRequestID():string{
        return this.SRequest?.id || 'INVALID-REQUEST'
    }

    public GetManagerID():string{
        const Proc:DataProcessor = new DataProcessor()
        return Proc.ExtractRequestIDs(  this.SRequest.id)[0]
    }
    public GetEmployeeID():string{
        const Proc:DataProcessor = new DataProcessor()
        return Proc.ExtractRequestIDs(  this.SRequest.id)[1]
    }

    public GetAmount():number{
        return this.SRequest?.Amount || 0;
    }

    public GetPostDate():number{
        return this.SRequest?.PostDate || Math.round(Date.now() / 1000);
    }

    public GetModifyDate():number{
        return this.SRequest?.ModifiedDate || Math.round(Date.now() / 1000);
    }

    public SetModifyDate(NewDate:number){
        if( NewDate >   Math.round(Date.now() / 1000)  ){this.SRequest.ModifiedDate = NewDate}
        else { this.SRequest.ModifiedDate = Math.round(Date.now() / 1000)}
    }

    public GetFile():any{
        return this.SRequest?.File
    }

    public GetStatus(){ return this.SRequest?.RequestStatus || 0; }

    // Status Changes=====================================
    public SetStatusDenied(){ this.SRequest.RequestStatus=1; }
    public SetStatusApproved(){ this.SRequest.RequestStatus=2; }
    public SetStatusDeleted(){ this.SRequest.RequestStatus=3; }


}