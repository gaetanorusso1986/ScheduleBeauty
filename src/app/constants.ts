//#region [API]
export const API_ENDPOINT="http://localhost:803/api/";
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
//#endregion

//#region [BEAUTY]
export const BEAUTY_SERVICE=API_ENDPOINT + "Beauty";
export const GETALL_BEAUTY= BEAUTY_SERVICE;
export const GETDETAILS_BEAUTY= BEAUTY_SERVICE;
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
export const SOCIAL_SERVICE=API_ENDPOINT + "Social";
export const REMOVE_SOCIAL =SOCIAL_SERVICE+"/Remove";
export const UPDATE_SOCIAL =SOCIAL_SERVICE+"/Update";
export const GETALL_SOCIAL = SOCIAL_SERVICE+"/GetMany";
//#endregion

//# region [Services]
export const SERVICE=API_ENDPOINT + "Service";
export const REMOVE_SERVICE =SERVICE+"/Remove";
export const UPDATE_SERVICE =SERVICE+"/Update";
////#endregion

//#endregion