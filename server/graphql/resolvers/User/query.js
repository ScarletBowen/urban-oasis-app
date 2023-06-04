const models = require("../../../models");

async function getUserList(root, args, { user }) {
  try {
    if (!user) throw new Error("You are not authenticated!");
    const { search, pagination, sort } = args;
    var query = {
      offset: 0,
      limit: 5,
      raw: true,
      //this is done to flaten out the join command
      attributes: ["firstName", "lastName", "email"],
    };
    //by defaults query is paginated to limit 5 items
    if (pagination) {
      query.limit = pagination.items;
      query.offset = pagination.items * (pagination.page - 1);
    }
    if (search) {
      query.where = {
        [Op.or]: [
          search.firstName ? { firstName: search.firstName } : null,
          search.lastName ? { lastName: search.lastName } : null,
        ],
      };
    }
    if (sort) {
      query.order = [[sort, "ASC"]];
    }
    return await models.User.findAll(query);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getUserList,
};
