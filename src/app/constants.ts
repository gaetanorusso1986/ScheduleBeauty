//#region [API]
export const API_ENDPOINT="http://localhost:598/api/";
//export const API_ENDPOINT="http://reservationsapp-001-site1.itempurl.com/api/";
//export const API_ENDPOINT="http://10.0.2.2:803/api/";// Android localhost
//#region [USER]
export const USER_SERVICE=API_ENDPOINT + "Users";
export const LOGIN =USER_SERVICE+"/Login";
export const REGISTER=USER_SERVICE;
export const RECOVERY=USER_SERVICE + "/RecoveryPassword";
export const CHANGE_PASSWORD=USER_SERVICE + "/ChangePassword";
export const CHECKUSER=USER_SERVICE + "/CheckUser";
export const UPDATE=USER_SERVICE+"/UpdateCondition"
export const GETALL= USER_SERVICE;
export const UPDATEUSER =USER_SERVICE+"/Update";
export const GETCUSTOMERS =USER_SERVICE+"/GetCustomersbyId";
export const CONFIRMUSER =USER_SERVICE+"/ConfermaUser";
export const INVITOUSER =USER_SERVICE+"/InvitoUtente";


//#endregion

//#region [BEAUTY]
export const BEAUTY_SERVICE=API_ENDPOINT + "Beauty";
export const GETALL_BEAUTY= BEAUTY_SERVICE;
export const GETDETAILS_BEAUTY= BEAUTY_SERVICE;
export const UPDATEBEAUTY =BEAUTY_SERVICE+"/Update";
export const LOGINFROMBEAUTY =BEAUTY_SERVICE+"/LoginFromBeauty";
//#endregion

// #region [Disponibilità]
export const AVAILABILITY_SERVICE=API_ENDPOINT + "Availability";
export const GETALLFROMDATE= AVAILABILITY_SERVICE+"/GetAvailability";

// #endregion
// #region [Reservations]
export const RESERVATIONS_SERVICE=API_ENDPOINT + "Reservations";
export const MYBOOKING=RESERVATIONS_SERVICE + "/GetMyBooking";
export const MYBOOKINGDETAIL=RESERVATIONS_SERVICE + "/GetMyBooking";
export const REMOVE=RESERVATIONS_SERVICE + "/Remove";
export const GETALLRESERVATION=RESERVATIONS_SERVICE +"/GetReservations";

// #endregion

//# region [Social]
export const SOCIAL=API_ENDPOINT + "Social";
export const REMOVE_SOCIAL =SOCIAL+"/Remove";
export const UPDATE_SOCIAL =SOCIAL+"/Update";
export const GETALL_SOCIAL = SOCIAL+"/GetMany";
//#endregion

//# region [Services]
export const SERVICE=API_ENDPOINT + "ServiceBeauty";
export const REMOVE_SERVICE =SERVICE+"/Remove";
export const UPDATE_SERVICE =SERVICE+"/Update";
export const GETALL_SERVICE = SERVICE+"/GetMany";
////#endregion

//# region [Holidays]
export const HOLIDAYS=API_ENDPOINT + "Holidays";
export const REMOVE_HOLIDAY =HOLIDAYS+"/Remove";
export const UPDATE_HOLIDAY =HOLIDAYS+"/Update";
export const GETALL_HOLIDAY= HOLIDAYS+"/GetMany";
export const SEARCHDAY_HOLIDAY= HOLIDAYS+"/SearchDay";
export const GETSINGLEBYFK_HOLIDAY= HOLIDAYS+"/GetSingleByFk";

//#endregion
//# region [Operators]
export const OPERATORS=API_ENDPOINT + "Operator";
export const GETOPERATORSBYBEAUTY= OPERATORS+"/GetOperatorsByBeauty";
export const GETALL_OPERATORS= OPERATORS
//#endregion
//#endregion