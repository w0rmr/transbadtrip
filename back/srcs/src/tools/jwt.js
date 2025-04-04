const jsonwebtoken = require('jsonwebtoken');

// importent to see later 
// It seems curious to me how in all articles explaining JWT,
//  they often overlook the most important aspect—scopes to protect each endpoint and its read/writes.
//   The obvious choice is to include them in the JWT,
//    but in a system with 50 microservices,
//     it's not efficient to always send such a long JWT.
//      In the end, defining a profile, sending only the profile ID in the JWT,
//       and projecting profiles in each microservice might be more efficient
//       . There are various ways to handle this,
//        including using an API gateway to manage it and only sending the necessary info to microservices later through headers.

class JWT {
    constructor(key, time, algorithm = 'HS256') {
        this.key = key;
        this.time = time;
        this.algorithm = algorithm;
    }

    generate(userId,is2FAVerified) {
        const data = {
            time: Date.now(),
            userId: userId,
            is2FAVerified:is2FAVerified
        };
        return jsonwebtoken.sign(data, this.key, { expiresIn: this.time, algorithm: this.algorithm });
    }

    async verify(token) {
        try {
            // console.log(token);
            const decoded = jsonwebtoken.verify(token, this.key, { algorithms: [this.algorithm] });
            return({
                userId:decoded.userId,
                is2FAVerified:decoded.is2FAVerified,
            });
        } catch (error) {
            // console.log('error',error);
            throw new Error('Invalid or expired token');
        }
    }
}
const JWT_KEY = process.env.JWT_KEY;
// const JWT_HASHING_ALGO = ;
// const JWT_EXP_TIME = process.env.JWT_EXP_TIME;



const jwt = new JWT(JWT_KEY,'24h','HS256');

module.exports = {jwt};