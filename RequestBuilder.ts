import { Request,  Profile} from "./Entity";
import  ProfileManager from './ProfileManager';
import RequestManager from './RequestManager';
import { v4 } from "uuid";

export default class RequestBuilder{
    private BuildRequest:Request;
    constructor(ManagerID:string, EmployeeID:string, Amount:number){
        this.BuildRequest = { ManagerID, EmployeeID, id: `${ManagerID}${EmployeeID}#${v4}`, Amount, RequestStatus:0, PostDate: (new Date()), ModifiedDate:(new Date()) }
    }

    public AttachMessage(InputFile:any){
        this.BuildRequest.File=InputFile;
    }

    public DeconstructRequest():Request{
        return this.BuildRequest;
    }
}