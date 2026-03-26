# Rate-Limit API Prod Readiness TODO

## Approved Plan Steps:

### 1. Create TODO.md [✅ COMPLETE]

### 2. Update package.json with secure deps and run npm install
- Fix bcryptjs to ^2.4.3
- Add helmet, cors, express-rate-limit, express-validator, morgan
- execute_command: npm install

### 3. Improve src/models/User.js (add required/unique)

### 4. Fix src/middleware/rateLimit.middleware.js (userId → mongoose.Types.ObjectId)

### 5. Update src/config/db.js (remove console.log)

### 6. Update src/server.js 
- Add helmet, cors, morgan
- Global error handler
- Uncaught exception handling
- Env var validation

### 7. Add .env.example

### 8. Test locally
- execute_command: npm run dev
- Manual endpoint tests (register/login/protected/etc.)
- Check no crashes, all 200/401/403/429 as expected

### 9. Render deploy instructions in README.md

### 10. attempt_completion

Progress: 1/10

