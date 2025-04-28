This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Member of team

| Nama                    | NIM                   |
|--------------------------|------------------------|
| Kosmas Rio Legowo        | 23/512012/PA/21863      |
| Wibi Laksono Wijaya      | 23/512527/PA/21885      |
| Bagus Cipta Pratama      | 23/516539/PA/22097      |
| Ahmad Zainurafi Alfikri  | 23/521008/PA/22397      |

Rules if you wanna commit a change on your job:

| Menambahkan sesuatu  | Mengupdate sesuatu  | Menghapus sesuatu  |
|-----------|-----------|-----------|
| Add    | Update    | Delete    |
| Ex = Add : file navbar.js    | Ex = Update : File navbar.js (Perbarui variable warna)     | Ex = Delete : File navbar.js   |


## Getting Started

First, clone the repositories:

```bash
git clone https://github.com/WibiLaksono/kuding-fix.git
#and
cd kuding-fix
```

Second, Install dependecies if you on kuding-fix now: 

```bash
npm instal
#and
npm install axios
```

third, Install dependecies on server : 

```bash
cd server
#and
npm install
#and
npm init -y
#and
npm install express cors dotenv
#and
npm install mysql2 sequelize dotenv cors express

```

Fourth, add env on server folder:

```bash
cd server
#and
#create .env
```

Fifth, run the development server:

```bash
cd server
# and
node server.js
```

Sixth, run the web :

```bash
cd kuding-fix
#or if you on server
cd ..
#and
npm run dev
#open localhost routes
http://localhost:{port}
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
