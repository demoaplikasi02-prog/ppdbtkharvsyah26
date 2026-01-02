
import React from 'react';

/**
 * KONFIGURASI UTAMA APLIKASI
 */

// 1. URL Apps Script Terbaru Anda
export const API_URL = "https://script.google.com/macros/s/AKfycbw3hWiiEdYkLRVIRW2UQWyfcGvvgtSc_AyiEZCABOPSu8qhuBLrKDxMHUhCd3y8b9pHrA/exec";

// 2. Logo Sekolah (TK Al Hikmah)
export const SCHOOL_LOGO = "https://iili.io/fhLGgpI.png";

// 3. Alamat Sekolah
export const SCHOOL_ADDRESS = "Jln. Mesjid I Dsn 1. Desa Sekip. Kec Lubuk Pakam";

// 4. Kota Sekolah
export const SCHOOL_CITY = "Lubuk Pakam";

/**
 * ICON COMPONENTS
 */
export const Icons = {
  User: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Calendar: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
  ),
  MapPin: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Phone: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  ArrowRight: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  ArrowLeft: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
  ),
  Camera: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
  ),
  Upload: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
  ),
  Download: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
  ),
  Info: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  ),
  Hash: (props: any) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
  ),
  Palette: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.707-.484 2.103-1.206.35-.639.303-1.41-.125-2.011-.114-.171-.309-.37-.507-.568-.211-.211-.446-.446-.61-.751-.172-.318-.197-.685-.095-1.026.113-.338.35-.593.637-.733.247-.12.517-.183.8-.183h3.8c1.326 0 2.403-1.077 2.403-2.403 0-5.523-4.477-10-10-10z"/></svg>
  ),
  Star: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  Whatsapp: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>
  )
};

export const PENDIDIKAN_OPTIONS = [
  { label: 'Pilih', value: '' },
  { label: 'SD', value: 'SD' },
  { label: 'SMP', value: 'SMP' },
  { label: 'SMA/SMK', value: 'SMA/SMK' },
  { label: 'Diploma (D1-D4)', value: 'Diploma (D1-D4)' },
  { label: 'Sarjana (S1)', value: 'Sarjana (S1)' },
  { label: 'Magister (S2)', value: 'Magister (S2)' },
  { label: 'Doktor (S3)', value: 'Doktor (S3)' },
  { label: 'Tidak Sekolah', value: 'Tidak Sekolah' },
];

export const PEKERJAAN_AYAH_OPTIONS = [
  { label: 'Pilih', value: '' },
  { label: 'Tidak Bekerja', value: 'Tidak Bekerja' },
  { label: 'PNS/TNI/Polri', value: 'PNS/TNI/Polri' },
  { label: 'Karyawan Swasta', value: 'Karyawan Swasta' },
  { label: 'Wiraswasta/Pedagang', value: 'Wiraswasta/Pedagang' },
  { label: 'Buruh Harian Lepas', value: 'Buruh Harian Lepas' },
  { label: 'Guru/Dosen', value: 'Guru/Dosen' },
  { label: 'Lainnya', value: 'Lainnya' },
];

export const PEKERJAAN_IBU_OPTIONS = [
  { label: 'Pilih', value: '' },
  { label: 'Tidak Bekerja', value: 'Tidak Bekerja' },
  { label: 'Ibu Rumah Tangga', value: 'Ibu Rumah Tangga' },
  { label: 'PNS/TNI/Polri', value: 'PNS/TNI/Polri' },
  { label: 'Karyawan Swasta', value: 'Karyawan Swasta' },
  { label: 'Wiraswasta/Pedagang', value: 'Wiraswasta/Pedagang' },
  { label: 'Lainnya', value: 'Lainnya' },
];

export const PENGHASILAN_OPTIONS = [
  { label: 'Pilih', value: '' },
  { label: 'Tidak berpenghasilan', value: 'Tidak berpenghasilan' },
  { label: 'Kurang dari Rp 1.000.000', value: 'Kurang dari Rp 1.000.000' },
  { label: 'Rp 1.000.000 - Rp 2.500.000', value: 'Rp 1.000.000 - Rp 2.500.000' },
  { label: 'Rp 2.500.000 - Rp 5.000.000', value: 'Rp 2.500.000 - Rp 5.000.000' },
  { label: 'Lebih dari Rp 5.000.000', value: 'Lebih dari Rp 5.000.000' },
];

export const SERAGAM_OPTIONS = [
  { label: 'Pilih', value: '' },
  { label: 'S (Kecil)', value: 'S' },
  { label: 'M (Sedang)', value: 'M' },
  { label: 'L (Besar)', value: 'L' },
  { label: 'XL (Ekstra Besar)', value: 'XL' },
];

export const METODE_BAYAR_OPTIONS = [
  { label: 'Pilih', value: '' },
  { label: 'Transfer Bank', value: 'Transfer Bank' },
  { label: 'Tunai/Cash (Sekolah)', value: 'Tunai' },
];
