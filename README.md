# Discord Notifications - USDT Transfers

Blockchain Discord Bot Notifications for USDT transfers. This project is from a
Moralis Web3 tutorial [found here](https://youtu.be/GiDXKT_AAIs).

## Setup project:

1. Clone project

2. Run the project:

   ```sh
   npm i
   npm start
   ```

3. Run `ngrok`: _(so external service can reach your local project)_

   ```sh
   ngrok http 3000
   ```

   > You should see something like the following; the `Forwarding` url you will
   > want to use is the `https://` version:
   >
   > ```log
   > ngrok by @inconshreveable
   >
   > Session Status                online
   > Account                       Hamster Phomstentein (Plan: Cheesy)
   > [...]
   > Web Interface                 http://127.0.0.1:4040
   > Forwarding                    http://78be-136-175-97-43.ngrok.io -> localhost:3000
   > Forwarding                    https://78be-136-175-97-43.ngrok.io -> localhost:3000
   > ```

4. Test your project is running:

   You can curl _(see below)_ or use a service like Postman to confirm the
   endpoints are functioning. I recommend doing this before you set up an
   external service (like Moralis) to point to your project.

   - **Localhost test:**

     ```sh
     curl --location --request POST 'localhost:3000/webhook' \
     --header 'Content-Type: application/json' \
     --data-raw '{
         "time": "hamster time"
     }'
     ```

   - **Ngrok test:**

     Get your `https` forwarding url from your `ngrok` session, and replace
     `{ngrok_url}` below:

     ```sh
     curl --location --request POST '{ngrok_url}/webhook' \
     --header 'Content-Type: application/json' \
     --data-raw '{
         "time": "hamster time"
     }'
     ```

5. Setup Moralis:

6. Watch the notifications come in