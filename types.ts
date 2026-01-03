
export interface FormData {
  // Metadata
  kodePendaftaran: string;
  
  // Section 1: Siswa
  fotoSiswa: string;
  namaLengkap: string;
  namaPanggilan: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  nik: string;
  anakKe: string;
  jumlahSaudara: string;
  tempatLahir: string;
  tanggalLahir: string;
  usia: string;
  kelompok: string;
  beratBadan: string;
  tinggiBadan: string;
  lingkarKepala: string;
  hobi: string;
  citaCita: string;
  isABK: 'Ya' | 'Tidak';
  jenisABK?: string;
  riwayatPenyakit: string;
  isPernahSekolahLain: 'Ya' | 'Tidak';
  namaSekolahAsal?: string;

  // Section 2: Ayah
  namaAyah: string;
  statusAyah: string;
  tempatLahirAyah: string;
  tanggalLahirAyah: string;
  alamatAyah: string;
  waAyah: string;
  pekerjaanAyah: string;
  pendidikanAyah: string;
  penghasilanAyah: string;

  // Section 2: Ibu
  namaIbu: string;
  statusIbu: string;
  tempatLahirIbu: string;
  tanggalLahirIbu: string;
  alamatIbu: string;
  waIbu: string;
  pekerjaanIbu: string;
  pendidikanIbu: string;
  penghasilanIbu: string;

  // Section 3: Wali & Final
  pilihanWali: 'Ayah & Ibu' | 'Ayah' | 'Ibu' | 'Wali' | 'Lainnya';
  namaWali: string;
  hubunganWali: string;
  waWali: string;
  tempatLahirWali: string;
  tanggalLahirWali: string;
  pendidikanWali: string;
  pekerjaanWali: string;
  penghasilanWali: string;
  ukuranSeragam: string;
  noWhatsapp: string;
  alamatRumahSiswa: string;
  metodePembayaran: string;
}

export enum FormStep {
  SISWA = 1,
  ORTU = 2,
  WALI = 3,
  SELESAI = 4
}

export enum AppMode {
  HOME = 'home',
  REGISTER = 'register',
  LOGIN = 'login',
  ADMIN = 'admin',
  PARTICIPANT = 'participant'
}

export interface LoginData {
  loginType: 'participant' | 'admin';
  kodePendaftaran: string;
  password: string;
}
