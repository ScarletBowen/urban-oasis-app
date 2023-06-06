const models = require("../../../models");

const placesFunc = {

savePlace: async (parent, { placeId }, context) => {
    if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedPlaces: input } },
            { new: true, runValidators: true }
        );
        return updatedUser;
    }
    throw new AuthenticationError('You need to be logged in');
},

removePlace: async (parent, { placeId }, context) => {
    if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedPlaces: { placeId } } },
            { new: true }
        );
        return updatedUser;
    }
    throw new AuthenticationError('You need to be logged in');
}
};

module.exports = placesFunc;