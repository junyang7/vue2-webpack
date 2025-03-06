export default class Port {

    static #instance;
    static #port;
    static #initPromise;

    constructor() {
        if (Port.#instance) {
            return Port.#instance;
        }
        Port.#port = process.env.VUE_APP_PORT;
        Port.#instance = this;
        Port.#initPromise = this.#initPort();
    }

    async #initPort() {
        try {
            const response = await fetch("/api/port");
            if (response.ok) {
                const port = await response.text();
                if (port) {
                    Port.#port = port;
                }
            }
        } catch (e) {
        }
    }

    static async getPort() {
        if (!Port.#instance) {
            new Port();
        }
        await Port.#initPromise;
        return Port.#port;
    }

}
