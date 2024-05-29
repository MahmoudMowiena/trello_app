let cards = [
  {
    "id": "1",
    "columnId": "1",
    "title": "Old fashioned recipe for preventing allergies and chemical sensitivities",
    "description": "Card description goes here. It might be long or short.",
    "labels": [
      "red",
      "yellow",
      "green",
      "purple"
    ]
  },
  {
    "id": "2",
    "columnId": "2",
    "title": "Home business advertising ideas",
    "description": "Successful businesses know the importance of building and maintaining good working.",
    "labels": [
      "blue",
      "red",
      "yellow"
    ]
  },
  {
    "id": "card-1716843545446",
    "columnId": "2",
    "title": "Mahmoud",
    "description": "Mowiena",
    "labels": []
  }
]

export const getAllCards = async () => {
  return cards;
};

export const getCardById = async (id: string) => {
  return cards.find((card: any) => card.id === id);
};

export const addCard = async (newCard: any) => {
  cards.push(newCard);
  return newCard;
};

export const updateCard = async (id: string, updatedCard: any) => {
  const cardIndex = cards.findIndex((card: any) => card.id === id);
  if (cardIndex !== -1) {
    cards[cardIndex] = { ...cards[cardIndex], ...updatedCard };
    return cards[cardIndex];
  }
  return null;
};

export const deleteCard = async (id: string) => {
  const newCards = cards.filter((card: any) => card.id !== id);
  cards = newCards;
  return newCards;
};


//kufja4-vopnix-betsiQ
