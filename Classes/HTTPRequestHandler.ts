import { HTTPCommands, RequestStatus } from "../Types/Enums";
import  Axios, { AxiosResponse }  from "axios";
import { AdminHTTPCLInterface, LogHTTPCInterface, ManagerHTTPCLInterface, ProfileHTTPCInterface } from "../Types/HTTPCommands";
import { HTTPCreateProfile, Profile, Request } from "../Types/Entity";
import { LoginReturn, MakeRequestForm, ResultReturnCheck, ResultReturnMarkRequest, ResultReturnString, TransferProfile, TransferProfileArray, TransferRecords, TransferRequest, TransferRequestArray } from "../Types/dto";
import {ResultReturnStringID} from '../Types/dto';


export default class  HTTPRequestHandler implements ProfileHTTPCInterface, ManagerHTTPCLInterface, AdminHTTPCLInterface, LogHTTPCInterface{
    // Unused =========================================================
    CheckCreds(UserID: string, Authentication: string): boolean {
        throw new Error("Not a useable outside of the server");
    }// Not Used ======================================================

    private PortNumber: number;
    private TargetURL: string;
    private AuthenticationString:string ='';
    private UserID:string = '';
    constructor(InputURL:string, InputPortNumber:number=3001){
        this.PortNumber = InputPortNumber ?? 3001 ;
        this.TargetURL =  InputURL ??  'http://localhost'
    }
    // Internal Commands ===============================================
    private GetRoute(Command:HTTPCommands, ID:string){
        switch(Command){
            case HTTPCommands.CreateProfile:        { return `/Create`;}
            case HTTPCommands.Login:                { return `/Login/${ID}`;}
            case HTTPCommands.LogOut:               { return `/LogOut/${ID}`;}
            case HTTPCommands.ChangeFirstName:      { return `/Profile/${ID}/ChangeFirst`;}
            case HTTPCommands.ChangeLastName:       { return `/Profile/${ID}/ChangeLast`;}
            case HTTPCommands.ChangePassword:       { return `/Profile/${ID}/ChangePassword`;}
            case HTTPCommands.GetManageName:        { return `/Profile/${ID}/Manager`;}
            case HTTPCommands.MakeRequest:          { return `/Request/${ID}`;}
            case HTTPCommands.DeleteRequest:        { return `/Request/${ID}`;}
            case HTTPCommands.GetAllSentRequest:    { return `/Request/${ID}`;}
            case HTTPCommands.ManageChangeRequest:  { return `/Manager/${ID}`;}
            case HTTPCommands.ManagerGetAllRequest: { return `/Manager/${ID}`;}
            case HTTPCommands.AdminGetAllEmployees: { return `/Admin/${ID}`;}
            case HTTPCommands.AdminAssignManager:   { return `/Admin/${ID}/Assign`;}
            case HTTPCommands.AdminRemoveEmployee:  { return `/Admin/${ID}/UnAssign`;}
            case HTTPCommands.AdminDeleteProfile:   { return `/Admin/${ID}`;}
            case HTTPCommands.GetRecords:           { return `/Records`;}
            default:                                { return `/Connect`;}
        }
    }
    private CreateURL(Command:HTTPCommands,ID:string):string{
        return `${this.TargetURL}:${this.PortNumber}${this.GetRoute(Command,ID)}`
    }
    //===================================================================
    private async CreateHTTPRequest(Command:HTTPCommands, body:any, ID:string):Promise<AxiosResponse<any, any>>{
        switch(Command){
            case HTTPCommands.CreateProfile:        { return await Axios.post   (this.CreateURL(Command,ID), body);}
            case HTTPCommands.Login:                { return await Axios.post   (this.CreateURL(Command,ID), body);}
            case HTTPCommands.LogOut:               { return await Axios.patch  (this.CreateURL(Command,ID), body);}
            case HTTPCommands.ChangeFirstName:      { return await Axios.patch  (this.CreateURL(Command,ID), body);}
            case HTTPCommands.ChangeLastName:       { return await Axios.patch  (this.CreateURL(Command,ID), body);}
            case HTTPCommands.ChangePassword:       { return await Axios.patch  (this.CreateURL(Command,ID), body);}
            case HTTPCommands.GetManageName:        { return await Axios.get    (this.CreateURL(Command,ID), body);}
            case HTTPCommands.MakeRequest:          { return await Axios.post   (this.CreateURL(Command,ID), body);}
            case HTTPCommands.DeleteRequest:        { return await Axios.delete (this.CreateURL(Command,ID), body);}
            case HTTPCommands.GetAllSentRequest:    { return await Axios.get    (this.CreateURL(Command,ID), body);}
            case HTTPCommands.ManageChangeRequest:  { return await Axios.patch  (this.CreateURL(Command,ID), body);}
            case HTTPCommands.ManagerGetAllRequest: { return await Axios.get    (this.CreateURL(Command,ID), body);}
            case HTTPCommands.AdminGetAllEmployees: { return await Axios.get    (this.CreateURL(Command,ID), body);}
            case HTTPCommands.AdminAssignManager:   { return await Axios.patch  (this.CreateURL(Command,ID), body);}
            case HTTPCommands.AdminRemoveEmployee:  { return await Axios.patch  (this.CreateURL(Command,ID), body);}
            case HTTPCommands.AdminDeleteProfile:   { return await Axios.delete (this.CreateURL(Command,ID), body);}
            case HTTPCommands.GetRecords:           { return await Axios.get    (this.CreateURL(Command,ID), body);}
            default:                                { return await Axios.get    (this.CreateURL(5000,ID), body);}
        }
    }

    
    // Helper Functions==========================================
    /**Used tp check the connection to the server*/
    async CheckConnection():Promise<boolean>{
        const InputURL:string = `${this.TargetURL}:${this.PortNumber}/Connect`;
        try {
            const ReturnStuff = await Axios.get(InputURL);
            if(   ReturnStuff.status <300  ){ return true};
        } catch (error) {
            return false;
        }
        return false ;
    }
    /**Attempts to login the user*/ 
    async Login(UserID:string, password:string):Promise<LoginReturn> {
        const Command:HTTPCommands=  HTTPCommands.Login ;
        const body:any = {UserID, password, AuthenticationString:''} ; 
        const JsonBody = (await this.CreateHTTPRequest(Command,body, UserID)).data;
        const LoginResult:LoginReturn = JsonBody;
        this.UserID = LoginResult.ReturnProfile?.id ?? 'NullLogin';
        this.AuthenticationString = LoginResult.AuthenticationString ?? '';
        return LoginResult;
        
    }
    /**Attempt to logout the user*/
    async LogOut(UserID?:string, Authentication?:string):Promise<ResultReturnCheck>{
        const body:any =this.AuthenticationString;
        const Command:HTTPCommands=  HTTPCommands.LogOut;
        const JsonBody:ResultReturnCheck = (await this.CreateHTTPRequest(Command,body, this.UserID)).data
        return JsonBody;
    }

    async AdminGetAllEmployees():Promise<TransferProfileArray>{
        throw new Error("Method not implemented.");
    }
    async AdminAssignManager(EmployeeID:string, ManagerID:string):Promise<ResultReturnCheck>{
        throw new Error("Method not implemented.");
    }
    async AdminRemoveEmployeeAssignment(EmployeeID:string, ManagerID:string, AdminID:string):Promise<ResultReturnCheck> {
        throw new Error("Method not implemented.");
    }
    async AdminDeleteProfile(EmployeeID:string):Promise<ResultReturnCheck>  {
        throw new Error("Method not implemented.");
    }
    AdminCreateProfile(ProfileInit: HTTPCreateProfile, ManagerID: string): Promise<TransferProfile> {
        throw new Error("Method not implemented.");
    }
    // Manager functions==================================================================
    async ManagerChangeRequest(ManagerID:string, RequestID:string, Type:RequestStatus, Message:string):Promise<TransferRequest> {
        const Command:HTTPCommands=  HTTPCommands.ManageChangeRequest;
        let body:ResultReturnMarkRequest ;
        switch(Type){
            case RequestStatus.Denied:    { body= { ReturnString:RequestID, Type:RequestStatus.Denied, AuthenticationString: (this.AuthenticationString),Message}; break }
            case RequestStatus.Approved:    {body= { ReturnString:RequestID, Type:RequestStatus.Approved, AuthenticationString: (this.AuthenticationString),Message}; break }
            default:   {  body= { ReturnString:RequestID, Type:RequestStatus.Pending, AuthenticationString: (this.AuthenticationString),Message} ; break }
        }
        const ResultReturnRequest:TransferRequest = (await this.CreateHTTPRequest(Command, body, this.UserID)).data;
        return ResultReturnRequest;
    }
    async ManagerGetAllRequest(ManagerID:string):Promise<TransferRequestArray> {
        const Command:HTTPCommands=  HTTPCommands.ManagerGetAllRequest ;
        const body ={}
        let ResultReturnRequest:TransferRequestArray= (await this.CreateHTTPRequest(Command, body, `${this.UserID}/${this.AuthenticationString}`)).data;
        return ResultReturnRequest
    }
    async ManagerGetRecords(): Promise<TransferRecords> {
        const Command:HTTPCommands=  HTTPCommands.GetRecords ;
        const body={};
        const ReturnRecord:TransferRecords= (await this.CreateHTTPRequest(Command, body, this.UserID)).data;
        return ReturnRecord;
    }
    /**Used to initialize a new account and also login the user*/
    async CreateProfile(ProfileInit:HTTPCreateProfile):Promise<LoginReturn> {
        const Command:HTTPCommands=  HTTPCommands.CreateProfile ;
        const body:HTTPCreateProfile = {... ProfileInit} ; 
        const LoginFound:LoginReturn = (await this.CreateHTTPRequest(Command, body, this.UserID)).data;
        console.log( "Profile Creation return JSON: ",JSON.stringify(LoginFound.ReturnProfile.id));
        this.UserID = LoginFound.ReturnProfile.id ?? ''
        this.AuthenticationString = LoginFound.AuthenticationString?? ''
        return LoginFound;
    }
    /**Used to change first name*/
    async ChangeFirstName( NewFirstName:string, EmployeeID?:string):Promise<ResultReturnString> {
        const Command:HTTPCommands=  HTTPCommands.ChangeFirstName ;
        const body:ResultReturnStringID = {ReturnString:NewFirstName, AuthenticationString: (this.AuthenticationString) }
        const ResultReturnString:ResultReturnString = (await this.CreateHTTPRequest(Command, body, this.UserID)).data;
        return ResultReturnString;
    }
    /**Use tp change last name*/
    async ChangeLastName( NewLastName:string, EmployeeID?:string):Promise<ResultReturnString> {
        const Command:HTTPCommands=  HTTPCommands.ChangeLastName ;
        const body:ResultReturnStringID = {ReturnString: NewLastName, AuthenticationString: (this.AuthenticationString) }
        const ResultReturnString:ResultReturnString = (await this.CreateHTTPRequest(Command, body, this.UserID)).data;
        return ResultReturnString;
    }
    /**Used to change password*/
    async ChangePassword(NewPassword:string, EmployeeID?:string):Promise<ResultReturnString> {
        const Command:HTTPCommands=  HTTPCommands.ChangeLastName ;
        const body:ResultReturnStringID = {ReturnString: NewPassword, AuthenticationString: (this.AuthenticationString) }
        const ResultReturnString:ResultReturnString = (await this.CreateHTTPRequest(Command, body, this.UserID)).data;
        return ResultReturnString;
    }
    /**Use to get manager name*/
    async GetManagerName(ManagerID:string):Promise<ResultReturnString> {
        const Command:HTTPCommands=  HTTPCommands.GetManageName;
        const body:ResultReturnStringID = {ReturnString: ManagerID, AuthenticationString: (this.AuthenticationString) }
        const ResultReturnString:ResultReturnString = (await this.CreateHTTPRequest(Command, body, this.UserID)).data;
        return ResultReturnString;
    }
    async MakeRequest(EmployeeID:string, Amount:number, Message:string):Promise<TransferRequest> {
        const Command:HTTPCommands=  HTTPCommands.MakeRequest ;
        const body:MakeRequestForm = {Amount, Message, AuthenticationString: (this.AuthenticationString)}
        const ResultReturnRequest:TransferRequest = (await this.CreateHTTPRequest(Command, body, this.UserID)).data;
        return ResultReturnRequest;
    }/**use to mark a request s deleted*/
    async DeleteRequest(EmployeeID:string, RequestID:string):Promise<ResultReturnCheck> {
        const Command:HTTPCommands=  HTTPCommands.DeleteRequest;
        const authenticationString = this.AuthenticationString
        const ResultReturn:ResultReturnCheck = (await this.CreateHTTPRequest(Command, {}, `${this.UserID}/${authenticationString}/${RequestID}`)).data;
        return ResultReturn;
    }
    async GetAllSentRequestOfType(IDstring:string, Type:RequestStatus):Promise<TransferRequestArray> {
        const Command:HTTPCommands=  HTTPCommands.GetAllSentRequest ;
        const body ={}
        let ResultReturnRequest:TransferRequestArray;
        switch(Type){
            case 0:{return (await this.CreateHTTPRequest(Command, body, `${this.UserID}/${this.AuthenticationString}/${0}`)).data;}
            case 1:{return  (await this.CreateHTTPRequest(Command, body, `${this.UserID}/${this.AuthenticationString}/${1}`)).data;}
            case 2:{return  (await this.CreateHTTPRequest(Command, body, `${this.UserID}/${this.AuthenticationString}/${2}`)).data;}
            default : {return  (await this.CreateHTTPRequest(Command, body, `${this.UserID}/${this.AuthenticationString}/${4}`)).data;}
        }
    }

}