youtube link: https://www.youtube.com/watch?v=06g6YJ6JCJU&t=411&ab_channel=Joshtriedcoding
repo link: https://github.com/joschan21/digitalhippo

## Marketplace

landing page = ui libary
npx shadcn-ui@latest init

themes
button:
npx shadcn-ui@latest add button
buttonVariants() classname

npm i lucide-react

navbar with navitems

react custom hook on click outside
ha kivulre klikkelunk akkor meghivja ezt a fuggvenyt

cart
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add separator

format price util

server.ts adding express
npm i express
npm i --save-dev @types/express
npm i payload
https://www.npmjs.com/package/payload

innentol kezdve ahol dbt hasznalunk importaljuk csak be a getPayloadClient-et

next-utils ts

cross-env

package json
"dev": "cross-env PAYLOAD_CONFIG_PATH=src/payload.config.ts",

slateEditor
npm i @payloadcms/richtext-slate
@payloadcms/bundler-webpack
database adapter
@payloadcms/db-mongodb

de lehet postgresst is hasznalni 

node typscript 
npm install ts-node --save-dev

config mongodb 

Authentication

ha () kozott hozunk letre egy mappat akkor a next route nem veszi figyelembe
signup form
input label shadcn 
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label

npm i react-hook-form @hookform/resolvers zod sonner

import { useForm } from 'react-hook-form';
const {} = useForm()

TRPC
npm i @trpc/client @trpc/next @trpc/react-query @trpc/server @tanstack/react-query

Providers 
trpc client

providelolni a trpct a layoutban

HA GOND VAN npm i @tanstack/react-query@4.36.1

ha request erkezik az expressnek tobabbitja a trpcnek a middleware miatt igy lehe hasznalni a nextjben
route handler 

api [trpc] mappa
route.ts


authrouter

src collection folder

Users.ts 
type of users
admins, Users
user lehet seller v buyer

package.json
script:
 "generate:types": "cross-env PAYLOAD_CONFIG_PATH=src/payload.config.ts payload generate:types",

npm run generate:types

resend.com
uj api keszites majd envbe masol
aztan get-payload
npm i -D nodemailer

transporter definialasa.

verify email

4:15