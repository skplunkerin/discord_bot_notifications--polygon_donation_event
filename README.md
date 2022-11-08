# Discord Notifications - Polygon donation event

Blockchain Discord Bot Notifications for Polygon event (donation). This project
is from a Moralis Web3 tutorial [found here](https://youtu.be/GiDXKT_AAIs).

## Setup project:

1. Clone project and setup ENV:

   - Copy `.env-sample` as `.env`, and enter your info for each ENV variable:

     - `MORALIS_APIKEY`:

       Can be found by logging into your Moralis account and going to the
       [Web3 APIs](https://admin.moralis.io/web3apis) page.

     - `DISCORD_BOT_TOKEN`:

       If you don't already know your Discord Bots token, you'll need to reset
       it by:

       - Go to your discord bot _([discord applications](https://discord.com/developers/applications/), click on your bot,_
         _then click on `Bot` in the side menu)_
       - Click `Reset Token` to get a new token
       - Click `Copy`

     - `DISCORD_CHANNEL_ID`:

       For your Discord server, right-click the channel you want the bot to
       message in, and click `Copy ID`.

       - **NOTE:** if you don't see that option:
         - Go to your Discord settings -> Advanced
         - Toggle on `Developer Mode`

2. Setup your Discord bot and server:

   _(Check [the tutorial video](https://www.youtube.com/watch?v=GiDXKT_AAIs&t=689s) for exact steps)_

   - Go to: https://discord.com/developers and setup your new application

3. Run the project:

   ```sh
   npm i
   npm start
   ```

4. Run `ngrok`: _(so external service can reach your local project)_

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

5. Test your project is running:

   > **IMPORTANT:** The project rejects invalid requests _(requests not from_ > _your Moralis stream)_;
   >
   > To test this using the below `cURL` _(or Postman)_, comment out the
   > `Moralis.Streams.verifySignature({...})` section in `index.js`.

   You can curl _(see below)_ or use a service like Postman to confirm the
   endpoints are functioning. I recommend doing this before you set up an
   external service (like Moralis) to point to your project.

   - **Localhost test:**

     > _Replace `{{CHECK webhook-body_sample.json FOR EXAMPLE PAYLOAD}}` with_ > _the actual example payload._

     ```sh
     curl --location --request POST 'localhost:3000/webhook' \
     --header 'Content-Type: application/json' \
     --data-raw '{{CHECK webhook-body_sample.json FOR EXAMPLE PAYLOAD}}'
     ```

   - **Ngrok test:**

     > _Replace `{{CHECK webhook-body_sample.json FOR EXAMPLE PAYLOAD}}` with_ > _the actual example payload._

     Get your `https` forwarding url from your `ngrok` session, and replace
     `{ngrok_url}` below:

     ```sh
     curl --location --request POST '{ngrok_url}/webhook' \
     --header 'Content-Type: application/json' \
     --data-raw '{{CHECK webhook-body_sample.json FOR EXAMPLE PAYLOAD}}'
     ```

6. Setup Moralis:

   1. Go to your [Moralis Dashboard](https://admin.moralis.io/)

      _You can create a Moralis account here: https://admin.moralis.io/register_

   2. Go to [Streams](https://admin.moralis.io/streams):

      - Navigate to `"New Stream"` -> `"Create From Scratch"`

   3. Fill in the following **Stream Details**:

      ```yml
      # This will be for an example Polygon donation contract
      ## To find this manually:
      ##   - Go to Polygonscan (using this contract as example: https://mumbai.polygonscan.com/address/0xbd317b46a004ccf0e1773dbfcee89e77e32d2db9#code)
      ##   - copy the `Contract` address
      ##     (0xbD317B46A004CCF0e1773DBFcEE89E77e32D2dB9)
      Address: "0xbD317B46A004CCF0e1773DBFcEE89E77e32D2dB9"

      Listen to all addresses: false

      Description: "Polygon new donations"

      # This is the `https` Ngrok url you got from previous steps.
      ## IMPORTANT: Don't forget to append the `/webhook` to the end!
      Webhook URL: "https://{your-ngrok-subdomain}.ngrok.io/webhook"

      Select Networks:
        - "Polygon Mumbai"

      Address Activity:
        - "Native Transactions (txs)"

      Event Emittance: true

      # (Application Binary Interface)
      # You will need this in order to select options under the next step for
      # "Select Topic0"
      ## Find this on the contract Polygonscan page:
      ##   - Go to Polygonscan (using this contract as example: https://mumbai.polygonscan.com/address/0xbd317b46a004ccf0e1773dbfcee89e77e32d2db9#code)
      ##  - Scroll down and select the `Contract` tab
      ##  - Scroll down to the `Contract ABI` section
      ##  - Click the "Copy ABI to clipboard" icon
      ABI: [excluded for brevity]
      Select Topic0:
        - "Donate(address,uint256)"

      # This is where you can add filtering before results hit your project.
      # NOTE: leave this blank for now.
      ## Filters: https://github.com/MoralisWeb3/streams-beta#filter-streams
      Advanced Options (optional): NULL
      ```

   4. Create Stream and test:

      - Create Stream:

        Click `Create Stream` to finish creating the stream

      - Test:

        - on the contract Polygonscan page ([using this contract as example](https://mumbai.polygonscan.com/address/0xbd317b46a004ccf0e1773dbfcee89e77e32d2db9#code)):

          1. Scroll to top and select the `Contract` tab
          1. Click the `Write Contract` button
          1. In your personal wallet (MetaMask, WalletConnect):

             _(I'll be displaying steps for MetaMask)_

             - switch to the account you want to test with
             - switch to the `Polygon Mumbai` test network, or add it if needed:
               - Scroll down to the footer of [the Polygonscan page](https://mumbai.polygonscan.com/address/0xbd317b46a004ccf0e1773dbfcee89e77e32d2db9#code)
               - Click the `Add Mumbai Network` button
               - In MetaMask click `Approve`
               - Allow this site to switch the network?
                 - Click `Switch network`
             - Get Test MATIC:

               If you don't already have a MATIC balance to test with:

               1. You can use a Mumbai Faucet to get test MATIC:

                  **NOTE:** in the tutorial they send `2 MATIC`, but you likely
                  won't have enough MATIC to send that; try sending something
                  like `0.01 MATIC` so you can test this as much as possible.

                  _(A "faucet" is a service that will send a small amount of_
                  _a test token for free; they're not the most reliable, they_
                  _typically limit the amount they will send you every X hours,_
                  _and they usually send you VERY little. So make sure in your_
                  _tests that you pay close attention to how much MATIC you're_
                  _using.)_

                  - Some Mumbai MATIC faucets you can use:

                    _(paste your wallet address you're testing with, and they_
                    _will send you some test MATIC.)_

                    - Alchemy's faucet: https://mumbaifaucet.com/
                    - Polygon's faucet: https://faucet.polygon.technology/

          1. Click `Connect to Web3`:

             - Select your wallet

               _(I'll be displaying steps for MetaMask)_

             - Select the account you want to use
             - Click `Next`
             - Click `Connect`
             - Reload page and click `Connect to Web3` again
             - Select `OK` for the popup:

               > "Please take note that this is a beta version feature and is
               > provided on an "as is" and "as available" basis. PolygonScan
               > does not give any warranties and will not be liable for any
               > loss, direct or indirect through continued use of this feature."

          1. You should now see:

             `Connected - Web3[{your-account-address-here}]

          1. Expand `1. newDonation`:

             - Enter an amount in the `newDonation` field

               _(**NOTE:** see above "Get Test MATIC" step if you don't_
               _already have a test balance to work with.)_

             - Click `Write`

        - You should see items streaming in when the transaction finishes

   5. When done:

      - Pause Stream:

        When done testing, `Pause Stream` by hovering over the 3 dots (...) icon

      - Activate Stream:

        To start stream, `Activate Stream` by hovering over the 3 dots (...)
        icon
