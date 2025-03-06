export default class Common {

    static PAGE = {
        CURRENT: 1,
        SIZE: 20,
        TOTAL: 0,
        OFFSET: 0
    }

    static METHOD = {
        GET: "GET",
        POST: "POST",
    }

    static CONTENT_TYPE = {
        X_WWW_FORM_URLENCODED: "application/x-www-form-urlencoded",
        FORM_DATA: "multipart/form-data",
        JSON: "application/json",
    }

}
