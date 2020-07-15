//#region [API]
export const API_ENDPOINT="http://localhost:803/api/";

//#region [USER]
export const USER_SERVICE=API_ENDPOINT + "Users";
export const LOGIN =USER_SERVICE+"/Login";
export const REGISTER=USER_SERVICE;
export const RECOVERY=USER_SERVICE + "/RecoveryPassword";
export const CHANGE_PASSWORD=USER_SERVICE + "";
export const CHECKUSER=USER_SERVICE + "/CheckUser";
export const UPDATE=USER_SERVICE+"/UpdateCondition"
export const GETALL= USER_SERVICE;
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

// #endregion

//#endregion