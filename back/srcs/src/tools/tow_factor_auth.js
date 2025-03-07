// https://docs.npmjs.com/configuring-two-factor-authentication
//https://rahulomnitrics.medium.com/integrate-google-authenticator-app-with-nodejs-two-factor-authentication-77426e2353dc


const speakeasy = require('speakeasy'); // https://www.npmjs.com/package/speakeasy
const QRcode = require('qrcode'); // https://www.npmjs.com/package/qrcode
const {prisma} = require('../user/db');

class Tow_Facor_auth{
    
    static async activate(params){
        try{
            const {userId } = params.request.user;
            if(params.data.activate = true){
                await prisma.user.update({
                    where: {id:userId},
                    data: {tfa:true},
                });}
            else{
                await prisma.user.update({
                    where: {id:userId},
                    data: {tfa:false},
                });
            }
            return reply.code(200).send({suc:'goodtrip'});
            
        }catch(err){
            console.log("bad trip err ",err);
            return params.reply.code(89).send({error:'bad trip',err});
        }
    }

    static  async generate(params) {
        // generate secret 
        // save to databse 
    }

    static Verify(params){

    }
}

module.exports = {Tow_Facor_auth};