# devery-rfid-writer
Rfid writer with form constructor.

#### Description: 
Rfid (Radio-frequency identification) chips are widely used in logistics and supply chain visibility. 
This allows to increase efficiency, reduce errors, and improve quality. In chaotic manufacturing, shipping, 
and distribution environments, real-time data on the status of individual items provides insights that turn into actionable measures.

#### Features: 
1. Signup with Metamask and Hard wallet (trezor, ledger)
2. Writing form customization.
3. generating hash for taging Rfid chips.
4. Registering product information on blockchain.
5. QR code generating


#### App model: SAAS
User is allowed to signup with MetaMask or Hard Wallet (ex: Trezor, Ledger)
User is enabled to create a personal app on his/her first registration 'AddApp()';
A new app is being registered on blockchain in parallel with registering User's account on the app.
User is being then proposed to register a brand 'AddBrand()';
A form constuctor is following next. User is allowed to customize dynamically a marking form to mark the products.
Customization is being completed by adding new fields and specifying data type;
After this brand is enabled to mark products. Items' hashes are stored on the app and and are transferred on blockchain  'AddProduct()'.
This step has being commited in order to ensure internal usage and tracking for logistics and warehouse storage when warehouse works with large parties of goods. 
Hence warehouse is allowed to castomize a specific logistic form for marking and tracking supply chains; 
Mentioned process implies generating qr code or hash for further taging nfc.

#### Note:

Encapsulation has been utilized to ensure mechanism of wrapping the data (ex: low level DB) that can be easilly substituted with any other DB. JWT-system 
has been applied to ensure generating login token to interact with distributed systems.Constructor code's structure allows to extend it easilly (for ex with gmaps)
A modern react technologies allow integrating app's parts with any other software.

#### Example:

Warehouse received a party of various flowers from the flowers supplier and aims to customize the form for writing information on flowers it's going to temporarly store.
The form below shows an example of form  for specific needs:
Flower name - string
Country of origin : dropdown menu
Package type - string
Flowers/package - integer
Date of  receipt - calendar
Date of sending - calendar
Temperature of storing - integer

##### For the future the app can be extended with:
Login with existing hard wallets;
UI allowing to control all processes related to data circulation;
Gmaps, calendar, other data types for the list of countries;
Automatically completing forms based on the hashed data.

### Demo
[Look at the app](client/src/components/signup/README.md)
