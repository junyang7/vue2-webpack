import Port from "@/tool/port";

export default class BaseUrl {
    static async Get() {
        const port = await Port.getPort();
        const protocol = process.env.VUE_APP_PROTOCOL || "http";
        const host = process.env.VUE_APP_HOST || "127.0.0.1";
        return `${protocol}://${host}:${port}`;
    }
};
