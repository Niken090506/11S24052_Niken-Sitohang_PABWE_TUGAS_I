# Task Manager Sederhana (JavaScript + AI Generatif)

Tugas I – 11S3133 Pengembangan Aplikasi Berbasis Web. Program task manager berbasis Node.js yang dikembangkan dengan bantuan AI generatif sebagai asisten pemrograman. Dokumen proposal lengkap ada di folder `docs/`.

## Fitur
- Tambah tugas dengan judul, prioritas (`high`/`medium`/`low`), dan tenggat (`YYYY-MM-DD`)
- Tandai tugas selesai, hapus tugas
- Daftar tugas dengan filter status dan pengurutan prioritas
- Validasi input dan pesan error yang jelas
- Data disimpan di `tasks.json`

## Menjalankan
Butuh Node.js 18 atau lebih baru. Tidak ada dependensi eksternal.

```bash
node src/cli.js add "Belajar JavaScript" --priority high --due 2026-10-25
node src/cli.js list --sort priority
node src/cli.js done 1
node src/cli.js remove 1
```

## Menjalankan tes
```bash
npm test
```

## Struktur
```
src/taskManager.js   logika inti (versi 2, setelah perbaikan)
src/storage.js       baca/tulis tasks.json
src/cli.js           antarmuka baris perintah
test/                unit test (node:test)
docs/                proposal, gambar, log tes v1 & v2, arsip kode v1
```

## Riwayat pengembangan dengan AI
Versi 1 kode dari AI (`docs/history/taskManager.v1.js`) gagal 6 dari 8 tes (`docs/test-run-v1.txt`). Setelah dievaluasi dan diperbaiki, versi 2 lulus 8 dari 8 (`docs/test-run-v2.txt`). Penjelasan lengkap ada di dokumen proposal.
