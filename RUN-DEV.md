# Run the app locally

The dev server **must run in your own terminal** so your browser can connect to it.

## Steps

1. **Open a terminal**
   - In Cursor: **Terminal → New Terminal** (or `` Ctrl+` `` / `` Cmd+` ``)
   - Or open **Terminal.app** (Mac) / **Command Prompt** or **PowerShell** (Windows)

2. **Go to the project folder**
   ```bash
   cd /Users/brainequidasol/Documents/GitHub/travel-guide-training-1
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   ```
   If you see "Port 3000 is in use", try:
   ```bash
   npm run dev:host
   ```
   or:
   ```bash
   npx next dev -p 3001
   ```

4. **Wait for**
   ```
   ✓ Ready in ...
   - Local:    http://localhost:3000
   ```

5. **Open in your browser**
   - Click the link or go to **http://localhost:3000** (or the port shown).

## Getting data (Destinations, Tours, Hotels)

The **Destinations**, **Tours**, and **Hotels** pages load data from the **API**. If those pages are empty:

1. **Start the API** (in a second terminal):
   ```bash
   cd /Users/brainequidasol/Documents/GitHub/travel-guide-training-1/api
   npm run start:dev
   ```
   Wait until it says the API is listening (e.g. on port 3001).

2. **Seed the database** (MongoDB must be running; run once or when you want fresh data):
   ```bash
   cd /Users/brainequidasol/Documents/GitHub/travel-guide-training-1/api
   npm run seed
   ```
   Use `NODE_OPTIONS='--max-old-space-size=4096' npm run seed` if the seed runs out of memory.

3. Reload the app in the browser; you should see destinations, tours, and hotels.

## If it still says "refused to connect"

- Make sure the terminal where you ran `npm run dev` is **still open** and the process is running.
- Try **http://127.0.0.1:3000** instead of localhost.
- Quit any other app that might be using port 3000, then run `npm run dev` again.
