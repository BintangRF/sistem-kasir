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

#### Konfigurasi:

Buat file `.env` di folder `web` dengan konfigurasi berikut:

```env
VITE_API_URL=http://localhost:5000
```

---

### 2. Server (Backend)

Backend dikembangkan dengan:

- Node.js (Express)
- MySQL (sebagai database)

#### Konfigurasi:

- Buat file `.env` di folder `server` dengan konfigurasi berikut:

```env
DB_HOST=db
DB_USER=root
DB_PASSWORD=root
DB_NAME=kasir
```

---

## ▶️ Menjalankan dengan Docker Compose

Pastikan file `docker-compose.yml`, `Dockerfile` untuk `web` dan `server`, serta `.env` sudah disiapkan.

Jalankan aplikasi dengan:

```bash
docker compose up -d --build
```

Akses:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

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
