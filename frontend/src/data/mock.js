export const mockUsers = [
  { id: 1, username: 'sumeet', email: 'sumeet@example.com', customLink: 'https://crushcalc.vercel.app/c/sumeet' },
  { id: 2, username: 'alex', email: 'alex@example.com', customLink: 'https://crushcalc.vercel.app/c/alex' },
  { id: 3, username: 'sarah', email: 'sarah@example.com', customLink: 'https://crushcalc.vercel.app/c/sarah' },
];

export const mockSubmissions = [
  { 
    id: 1, 
    username: 'sumeet',
    name1: "Rahul", 
    name2: "Priya", 
    percentage: 87, 
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    ip: "192.168.1.100"
  },
  { 
    id: 2, 
    username: 'sumeet',
    name1: "Amit", 
    name2: "Sneha", 
    percentage: 65, 
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    ip: "10.0.0.15"
  },
  { 
    id: 3, 
    username: 'alex',
    name1: "Jake", 
    name2: "Lisa", 
    percentage: 43, 
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    ip: "172.16.0.25"
  },
];