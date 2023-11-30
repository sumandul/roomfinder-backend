const Redis = require("ioredis")


const getRedisUrl = ()=>{
    if(process.env.REDIS_URL){
        return process.env.REDIS_URL

    }
    throw new Error("redis url is not ")
}

export const redis = new Redis(getRedisUrl)