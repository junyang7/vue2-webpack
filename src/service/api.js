import Axios from "@/tool/axios";

export default class Api {

    static #api = {
        health: "/api/health",
    }

    static async Health(request = {}) {
        return Axios.Post(Api.#api.health, request)
    }

}
