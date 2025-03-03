import {createClient} from 'redis';

async function connectRedis(): Promise<ReturnType<typeof createClient>> {
    const redis = createClient({url: process.env.REDIS_URI});
    await redis.connect();

    redis.on('error', (err) => {
        console.log('Redis error', err);
    });

    return redis;
}

function mustGetEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}
export {
    connectRedis, mustGetEnv
}