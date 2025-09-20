export declare const env: {
    PORT: number;
    MONGO_URI: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    ACCESS_TTL: string;
    REFRESH_TTL: string;
    CORS_ORIGIN: string;
    COOKIE_DOMAIN: string;
    NODE_ENV: "development" | "production" | "test";
};
export declare const isDevelopment: boolean;
export declare const isProduction: boolean;
export declare const isTest: boolean;
export declare const envWithComputed: {
    isDevelopment: boolean;
    isProduction: boolean;
    isTest: boolean;
    PORT: number;
    MONGO_URI: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    ACCESS_TTL: string;
    REFRESH_TTL: string;
    CORS_ORIGIN: string;
    COOKIE_DOMAIN: string;
    NODE_ENV: "development" | "production" | "test";
};
//# sourceMappingURL=env.d.ts.map