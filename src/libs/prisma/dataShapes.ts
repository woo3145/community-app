export const getProfileInclude = () => {
  return {
    job: true,
    interestTags: true,
  };
};

export const getPostInclude = () => {
  return {
    tags: true,
    user: {
      select: {
        profile: {
          include: getProfileInclude(),
        },
      },
    },
    likes: {
      select: {
        userId: true,
      },
    },
    comments: {
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        comments: true,
        likes: true,
      },
    },
  };
};

export const getCommentInclude = () => {
  return {
    user: {
      select: {
        profile: {
          include: getProfileInclude(),
        },
      },
    },
  };
};
