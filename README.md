# Program Kasir

Program ini adalah sistem kasir sederhana yang terdiri dari dua bagian utama:

- **Frontend (web)** menggunakan **React**, **Vite**, **Tailwind CSS**, dan **Ant Design**.
- **Backend (server)** menggunakan **Express.js** dan **MySQL**.

## Struktur Folder

```

program-kasir/
├── web/       # Frontend (React + Vite)
└── server/    # Backend (Express + MySQL)

```

---

## 📦 Instalasi dan Menjalankan Aplikasi

### 1. Web (Frontend)

Frontend dikembangkan dengan:

- React + Vite
- Tailwind CSS
- Ant Design (antd)

#### Cara Menjalankan:

Buat file `.env` di folder `web` dengan konfigurasi berikut:

```env
VITE_API_URL=http://localhost:5000
```

Lalu jalankan perintah berikut:

```bash
cd web
npm install           # Menginstal semua dependensi
npm run dev           # Menjalankan development server
```

Frontend akan berjalan di `http://localhost:5173` secara default.

> **Credential login**:
> Username: `admin`
> Password: `password123`

---

### 2. Server (Backend)

Backend dikembangkan dengan:

- Node.js (Express)
- MySQL (sebagai database)

#### Prasyarat:

- Node.js dan npm
- MySQL Server aktif
- Buat file `.env` di folder `server` dengan konfigurasi berikut:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=kasir
```

#### Cara Menjalankan:

```bash
cd server
npm install            # Menginstal semua dependensi
node server.js         # Menjalankan server Express
```

Backend akan berjalan di `http://localhost:5000` (atau port lain jika ditentukan di `.env`).

---

## ⚙️ Fungsi Singkat Aplikasi

Aplikasi kasir ini memiliki beberapa fitur utama:

- **Manajemen Menu & Kategori**

  - Tabel `category` digunakan untuk menyimpan kategori menu seperti makanan, minuman, dll.
  - Tabel `item` menyimpan detail item seperti nama item, harga, dan kategori.

- **Transaksi Penjualan**

  - Tabel `transaction` menyimpan informasi transaksi yang dilakukan, termasuk nama pembeli, total harga, dan waktu transaksi.
  - Tabel `transactionItem` menyimpan daftar item yang dibeli dalam setiap transaksi, beserta jumlah dan harganya.

Dengan struktur ini, aplikasi dapat digunakan untuk:

- Menambahkan dan mengelola item menu.
- Mencatat dan menampilkan riwayat transaksi.
- Melihat detail setiap transaksi beserta item yang dibeli.

---

## 📌 Catatan Tambahan

- Pastikan database MySQL sudah dibuat sebelum menjalankan server.
- Pastikan koneksi frontend dan backend sudah disesuaikan (CORS & endpoint API).
- Gunakan tool seperti [Postman](https://www.postman.com/) atau fitur bawaan frontend untuk melakukan testing API.
