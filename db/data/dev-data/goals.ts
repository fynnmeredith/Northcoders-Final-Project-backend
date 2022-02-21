const goalData = [{
    objective: 'Run 120km',
    description: 'Getting in shape',
    start_date: new Date(2022, 1, 7),
    end_date: new Date(2022, 2, 6),
    type: 'progress',
    status: 'active',
    owner: 'jeff',
    target_value: 120,
    unit: 'km',
    progress: [[new Date(2022, 1, 8), 10], [new Date(2022, 1, 8), 20], [new Date(2022, 1, 10), 30], [new Date(2022, 1, 15), 40], [new Date(2022, 1, 17), 50]]
  },
  { 
    objective: 'Write novella',
    description: "Complete the novella I've been working on",
    start_date: new Date(2022, 1, 9),
    end_date: new Date(2022, 2, 4),
    type: 'boolean',
    status: 'active',
    owner: 'jeff'
  },
  { 
    objective: 'Save £800',
    description: 'Save for holiday',
    start_date: new Date(2022, 0, 7),
    end_date: new Date(2022, 4, 6),
    type: 'progress',
    status: 'active',
    owner: 'mary',
    target_value: 800,
    unit: '£',
    progress: [[new Date(2022, 0, 29), 200]]
  },
  { 
    objective: 'Redecorate bedroom',
    description: "Spruce up the abode",
    start_date: new Date(2022, 1, 21),
    end_date: new Date(2022, 2, 14),
    type: 'boolean',
    status: 'active',
    owner: 'mahmood'
  },
  { 
    objective: 'Achieve 100m freestyle PB',
    description: "Meet me, I swim like a fish",
    start_date: new Date(2022, 0, 1),
    end_date: new Date(2022, 5, 30),
    type: 'boolean',
    status: 'active',
    owner: 'stuart'
  },
  { 
    objective: 'Complete triathlon',
    description: "Triple threat",
    start_date: new Date(2022, 0, 1),
    end_date: new Date(2022, 11, 31),
    type: 'boolean',
    status: 'active',
    owner: 'betty'
  },
  { 
    objective: 'Learn to play "Smells Like Teen Spirit" on guitar',
    description: 'Trying to start a Nirvana cover band',
    start_date: new Date(2022, 1, 1),
    end_date: new Date(2022, 1, 28),
    type: 'boolean',
    status: 'completed',
    owner: 'dmitri',
    finish_date: new Date(2022, 1, 14)
  }
]

export { goalData }