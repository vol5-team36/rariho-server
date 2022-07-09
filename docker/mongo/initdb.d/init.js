const user = {
    user: 'rariho',
    pwd: 'rariho',
    roles: [{
      role: 'dbOwner',
      db: 'rariho'
    }]
  };
  
  db.createUser(user);
  db.createCollection('Profiles');