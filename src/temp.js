export function getUser() {
  return {
    username: "kat",
  };
}

export function getBoards() {
  return [
    {
      title: "card 1",
      description: "card 1",
      color: "red",
      id: 1,
    },
    {
      title: "card 2",
      description: "card 2",
      color: "blue",
      id: 2,
    },
    {
      title: "card 3",
      description: "card 3",
      color: "green",
      id: 3,
    },
  ];
}

export function createBoard(noteData) {
  return {
    id: 1,
    title: "card 1",
    description: noteData,
    color: "red",
  };
}
