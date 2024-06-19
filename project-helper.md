Sure! Let's build a simple Node.js project using the Clean Architecture principles. We'll create a basic user management system with the following components:

1. **Entities**: Core business logic and objects.
2. **Use Cases**: Application-specific business rules.
3. **Controllers**: Interface adapters for handling HTTP requests.
4. **Frameworks & Drivers**: External systems like databases and web frameworks.

### Project Structure

```
clean-architecture-example/
├── src/
│   ├── controllers/
│   │   └── userController.js
│   ├── entities/
│   │   └── user.js
│   ├── frameworks/
│   │   ├── db/
│   │   │   └── mongoose/
│   │   │       └── userModel.js
│   │   └── express/
│   │       └── server.js
│   ├── useCases/
│   │   ├── user/
│   │   │   ├── createUser.js
│   │   │   ├── deleteUser.js
│   │   │   ├── getUser.js
│   │   │   ├── getUsers.js
│   │   │   └── updateUser.js
│   └── index.js
└── package.json
```

### Step 1: Initialize the Project

```sh
mkdir clean-architecture-example
cd clean-architecture-example
npm init -y
npm install express mongoose
```

### Step 2: Define the Entity

**`src/entities/user.js`**:

```javascript
class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

module.exports = User;
```

### Step 3: Define the Use Cases

**`src/useCases/user/createUser.js`**:

```javascript
const User = require("../../entities/user");

class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(data) {
    const { name, email } = data;
    const user = new User(null, name, email);
    return await this.userRepository.save(user);
  }
}

module.exports = CreateUser;
```

**`src/useCases/user/getUser.js`**:

```javascript
class GetUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    return await this.userRepository.getById(id);
  }
}

module.exports = GetUser;
```

**`src/useCases/user/getUsers.js`**:

```javascript
class GetUsers {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    return await this.userRepository.getAll();
  }
}

module.exports = GetUsers;
```

**`src/useCases/user/updateUser.js`**:

```javascript
class UpdateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id, data) {
    return await this.userRepository.update(id, data);
  }
}

module.exports = UpdateUser;
```

**`src/useCases/user/deleteUser.js`**:

```javascript
class DeleteUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    return await this.userRepository.delete(id);
  }
}

module.exports = DeleteUser;
```

### Step 4: Define the Repository Interface

**`src/frameworks/db/mongoose/userModel.js`**:

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
```

**`src/frameworks/db/mongoose/userRepository.js`**:

```javascript
const UserModel = require("./userModel");

class UserRepository {
  async save(user) {
    const userModel = new UserModel(user);
    return await userModel.save();
  }

  async getById(id) {
    return await UserModel.findById(id);
  }

  async getAll() {
    return await UserModel.find();
  }

  async update(id, data) {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}

module.exports = UserRepository;
```

### Step 5: Define the Controllers

**`src/controllers/userController.js`**:

```javascript
const UserRepository = require("../frameworks/db/mongoose/userRepository");
const CreateUser = require("../useCases/user/createUser");
const GetUser = require("../useCases/user/getUser");
const GetUsers = require("../useCases/user/getUsers");
const UpdateUser = require("../useCases/user/updateUser");
const DeleteUser = require("../useCases/user/deleteUser");

const userRepository = new UserRepository();

const userController = {
  async createUser(req, res) {
    const createUser = new CreateUser(userRepository);
    const user = await createUser.execute(req.body);
    res.status(201).json(user);
  },

  async getUser(req, res) {
    const getUser = new GetUser(userRepository);
    const user = await getUser.execute(req.params.id);
    res.status(200).json(user);
  },

  async getUsers(req, res) {
    const getUsers = new GetUsers(userRepository);
    const users = await getUsers.execute();
    res.status(200).json(users);
  },

  async updateUser(req, res) {
    const updateUser = new UpdateUser(userRepository);
    const user = await updateUser.execute(req.params.id, req.body);
    res.status(200).json(user);
  },

  async deleteUser(req, res) {
    const deleteUser = new DeleteUser(userRepository);
    await deleteUser.execute(req.params.id);
    res.status(204).end();
  },
};

module.exports = userController;
```

### Step 6: Set Up the Server

**`src/frameworks/express/server.js`**:

```javascript
const express = require("express");
const mongoose = require("mongoose");
const userController = require("../../controllers/userController");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.post("/users", userController.createUser);
app.get("/users", userController.getUsers);
app.get("/users/:id", userController.getUser);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/taskmanager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
```

### Step 7: Main Entry Point

**`src/index.js`**:

```javascript
require("./frameworks/express/server");
```

### Running the Application

To run the application, use the following commands:

```sh
node src/index.js
```

### Explanation of Clean Architecture in This Project

1. **Entities**: The `User` class in `src/entities/user.js` represents the core business logic and is independent of any framework or database.
2. **Use Cases**: The use cases in `src/useCases/user/` handle the application's specific business rules. Each use case (e.g., `createUser`, `getUser`) interacts with the repository and implements the business logic.
3. **Controllers**: The `userController.js` in `src/controllers/` acts as an interface adapter. It handles HTTP requests, invokes the appropriate use case, and returns the response.
4. **Frameworks & Drivers**: The `express` server setup in `src/frameworks/express/server.js` and the MongoDB models in `src/frameworks/db/mongoose/` are external systems. They implement the specific details of how the application interacts with the outside world.

This structure ensures that the core business logic is decoupled from external concerns, making the codebase easier to maintain, test, and extend.
