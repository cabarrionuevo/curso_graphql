const User = require('../models/user');

module.exports = {

    Query:{

        async getUsers(){
            const usaurios = await User.find();
            return usaurios;
        },
        async getUser(obj, {id}){
            return await User.findById(id);
            // return usaurio;
        }

    },
    Mutation: {
        async singUp(obj, { input }){
            const usuarito = new User(input);
            await usuarito.save();
            return usuarito;
        }
    }
}