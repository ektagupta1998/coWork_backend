export const getPaginatedResults = async (Model, searchFields, query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  let filter = {...query};
  if (query.search) {
    const searchRegex = new RegExp(query.search, "i");
    // filter = {
    //   $or: searchFields.map((field) => ({ [field]: searchRegex })),
    // };
    filter.$or = searchFields.map((field) => ({ [field]: searchRegex }));
    delete filter.search;
  }

  console.log("Filter after processing:", filter);

  const total = await Model.countDocuments(filter);
  const results = await Model.find(filter).skip(skip).limit(limit);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    results,
  };
};
