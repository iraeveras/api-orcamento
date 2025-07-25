// FILE: src/server.ts
import app from "@/app";

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);    
});