import Cookies from "js-cookie";

export  const getAuthCookies = () => {
    return Cookies.get("authToken");
};

export const setAuthCookies = (token : string) => {
    Cookies.set("authToken",token,{ expires: 7 });
};

export const removeAuthCookies = () => {
    Cookies.remove("authToken")
}
