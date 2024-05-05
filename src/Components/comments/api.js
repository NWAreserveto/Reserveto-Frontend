export const getComments = async () => {
    return [
      {
        id: "1",
        body: "ممنون",
        username: "Jack",
        userId: "1",
        barberId: 2,
        parentId: null,
        createdAt: "2020-08-16T23:00:33.010+02:00",
      },
      {
        id: "2",
        body: "سلام از آرایشگر بسیار راضی بودم",
        username: "John",
        userId: "2",
        barberId: 2,
        parentId: null,
        createdAt: "2020-08-16T23:00:33.010+02:00",
      },
      {
        id: "3",
        body: "خواهش میکنم",
        username: "John",
        userId: "2",
        barberId: 2,
        parentId: "1",
        createdAt: "2023-08-16T23:00:33.010+02:00",
      },
      {
        id: "4",
        body: "اینقد دروغ نگو",
        username: "John",
        userId: "2",
        barberId: 2,
        parentId: "2",
        createdAt: "2023-08-16T23:00:33.010+02:00",
      },
    ];
  };

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    barberId: 2,
    username: "John",
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};