const { User } = require('../models');

const { AuthenicationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id:context.user._id}).select('-__v -password')
                return userData;
            }
            throw new AuthenicationError('Not logged in!');
        }
    }
}
