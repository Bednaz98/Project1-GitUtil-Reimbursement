
import { RequestStatus} from './Enums';

export interface Profile{
    FirstName:string
    LastName:string
    id?:string
    Password?:string
    ManagerID?:string
    EmployeeArray?:string[]
    SendRequestIDArray?:string[]
}

export interface Request{
    id?:string
    ManagerID:string
    EmployeeID:string
    Amount:number
    RequestStatus:RequestStatus
    PostDate:Date
    ModifiedDate?:Date
    File?:any
}