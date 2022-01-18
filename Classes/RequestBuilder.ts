import { Request,  Profile} from "../Types/Entity";
import RequestManager from './RequestManager';
import { v4 } from "uuid";

export default class RequestBuilder{
    private BuildRequest:Request;
    constructor(ManagerID:string, EmployeeID:string, Amount:number){
        const TempRequestMan:RequestManager = new RequestManager({  Amount, RequestStatus:0, PostDate:  (new Date).getMilliseconds()})
        this.BuildRequest = TempRequestMan.DeconstructObject();
        this.BuildRequest.id = `${ManagerID}~${EmployeeID}~${v4()}`
    }
    public AttachMessage(InputFile:any){
        this.BuildRequest.File=InputFile;
    }
    public DeconstructRequest():Request{
        return this.BuildRequest;
    }
}