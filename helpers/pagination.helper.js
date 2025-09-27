export const getPaginatedResults = async (Model, searchFields, query) => {
    console.log("Model:", Model);
    console.log("searchFields:", searchFields);
    console.log("query:", query);
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  let filter = {};
  if (query.search) {
    const searchRegex = new RegExp(query.search, "i");
    filter = {
      $or: searchFields.map((field) => ({ [field]: searchRegex })),
    };
  }

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
