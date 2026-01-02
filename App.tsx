
import React, { useState, useEffect } from 'react';
import { Input, Select } from './components/Input';
import { FormData, FormStep } from './types';
import { 
  API_URL, 
  SCHOOL_LOGO, 
  SCHOOL_ADDRESS,
  SCHOOL_CITY,
  Icons, 
  PENDIDIKAN_OPTIONS, 
  PEKERJAAN_AYAH_OPTIONS,
  PEKERJAAN_IBU_OPTIONS, 
  PENGHASILAN_OPTIONS,
  SERAGAM_OPTIONS,
  METODE_BAYAR_OPTIONS
} from './constants';

const PAYMENT_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXrfT3wQbB_dWccj8AokfSesWSunMBkWPvSQhhOOjzjiK4e14qiFuehIynHlz5sqaLNfqa0SIxnySx/pub?gid=831993778&single=true&output=csv";

interface PaymentItem {
  komponen: string;
  biaya: string;
}

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.SISWA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [yearsState, setYearsState] = useState<number>(0);
  const [paymentInfo, setPaymentInfo] = useState<PaymentItem[]>([]);
  
  const [formData, setFormData] = useState<FormData>({
    kodePendaftaran: '',
    fotoSiswa: '',
    namaLengkap: '',
    namaPanggilan: '',
    jenisKelamin: 'Laki-laki',
    nik: '',
    anakKe: '1',
    jumlahSaudara: '0',
    tempatLahir: '',
    tanggalLahir: '',
    usia: '-',
    kelompok: '-',
    beratBadan: '',
    tinggiBadan: '',
    lingkarKepala: '',
    hobi: '',
    citaCita: '',
    isABK: 'Tidak',
    jenisABK: '-',
    riwayatPenyakit: '',
    isPernahSekolahLain: 'Tidak',
    namaSekolahAsal: '-',
    namaAyah: '',
    statusAyah: 'Hidup',
    tempatLahirAyah: '',
    tanggalLahirAyah: '',
    alamatAyah: '',
    waAyah: '',
    pekerjaanAyah: '',
    pendidikanAyah: '',
    penghasilanAyah: '',
    namaIbu: '',
    statusIbu: 'Hidup',
    tempatLahirIbu: '',
    tanggalLahirIbu: '',
    alamatIbu: '',
    waIbu: '',
    pekerjaanIbu: '',
    pendidikanIbu: '',
    penghasilanIbu: '',
    pilihanWali: 'Kedua orang tua',
    namaWali: '',
    hubunganWali: '',
    waWali: '',
    tempatLahirWali: '',
    tanggalLahirWali: '',
    pendidikanWali: '',
    pekerjaanWali: '',
    penghasilanWali: '',
    ukuranSeragam: '',
    noWhatsapp: '',
    alamatRumahSiswa: '',
    metodePembayaran: ''
  } as any);

  useEffect(() => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    updateField('kodePendaftaran', `PPDB-${randomCode}`);
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      const response = await fetch(PAYMENT_CSV_URL);
      const csvText = await response.text();
      const rows = csvText.split('\n').filter(row => row.trim() !== '');
      const data = rows.slice(1).map(row => {
        const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        return {
          komponen: columns[0]?.replace(/"/g, '').trim() || '',
          biaya: columns[1]?.replace(/"/g, '').trim() || ''
        };
      }).filter(item => item.komponen !== '');
      setPaymentInfo(data);
    } catch (err) {
      console.error("Gagal mengambil data pembayaran:", err);
    }
  };

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (formData.tanggalLahir) {
      const birthDate = new Date(formData.tanggalLahir);
      const targetDate = new Date('2026-06-01');
      
      let years = targetDate.getFullYear() - birthDate.getFullYear();
      let months = targetDate.getMonth() - birthDate.getMonth();
      
      if (months < 0) { 
        years--; 
        months += 12; 
      }
      
      setYearsState(years);
      const usiaStr = `${years} Thn ${months} Bln`;
      updateField('usia', usiaStr);

      if (years < 3) {
        updateField('kelompok', 'Belum Cukup Umur');
      } else if (years === 3) {
        updateField('kelompok', 'Kelompok Bermain (KB)');
      } else if (years === 4) {
        updateField('kelompok', 'TK A');
      } else if (years === 5) {
        updateField('kelompok', 'TK B');
      } else if (years >= 6) {
        updateField('kelompok', '-');
      }
    }
  }, [formData.tanggalLahir]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran foto maksimal 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => updateField('fotoSiswa', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!isAgreed) return;
    setIsSubmitting(true);
    setError(null);
    
    try {
      fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(formData),
      });

      setTimeout(() => {
        setCurrentStep(FormStep.SELESAI);
        setIsSubmitting(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2500);

    } catch (err: any) {
      setError("Terjadi kendala saat mengirim data. Silakan coba beberapa saat lagi.");
      setIsSubmitting(false);
    }
  };

  const nextStep = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setCurrentStep(prev => prev + 1); };
  const prevStep = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setCurrentStep(prev => prev - 1); };

  const handleDownload = () => {
    const element = document.querySelector('.document-card');
    if (!element) return;
    const opt = {
      margin: 0.2,
      filename: `PPDB_${formData.namaLengkap.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    // @ts-ignore
    html2pdf().set(opt).from(element).save();
  };

  const handleWhatsAppConfirm = () => {
    const message = `Assalamualaikum Admin TK IT Harvysyah, saya konfirmasi pendaftaran PPDB Online.\n\nNama: ${formData.namaLengkap}\nID: ${formData.kodePendaftaran}\nKelompok: ${formData.kelompok}`;
    window.open(`https://wa.me/6281370014330?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (currentStep === FormStep.SELESAI) {
    const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
             <button onClick={() => window.location.reload()} className="text-slate-500 font-bold flex items-center gap-2 px-4 py-2 hover:bg-slate-50 rounded-xl transition-all"><Icons.ArrowLeft className="w-4 h-4" /> Beranda</button>
             <div className="flex gap-2">
                <button onClick={handleWhatsAppConfirm} className="bg-[#00c853] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-100 active:scale-95 transition-all"><Icons.Whatsapp className="w-4 h-4" /> Konfirmasi</button>
                <button onClick={handleDownload} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-100 active:scale-95 transition-all"><Icons.Download className="w-4 h-4" /> PDF</button>
             </div>
          </div>

          <div className="document-card bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100">
             <div className="text-center border-b border-slate-50 pb-8 mb-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-white p-2 rounded-2xl shadow-md border border-slate-100 flex items-center justify-center">
                   <img src={SCHOOL_LOGO} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-2xl font-black text-slate-900">TK AL HIKMAH</h1>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{SCHOOL_ADDRESS}</p>
             </div>
             
             <div className="text-center mb-10">
                <h2 className="text-sm font-black text-slate-800 tracking-widest uppercase mb-3">KARTU PENDAFTARAN ONLINE</h2>
                <div className="inline-block bg-indigo-50 px-6 py-2 rounded-2xl border border-indigo-100">
                   <span className="text-lg font-black text-indigo-600 tracking-wider">{formData.kodePendaftaran}</span>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10">
                <div className="space-y-4">
                   <div className="w-full aspect-[3/4] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center">
                      {formData.fotoSiswa ? <img src={formData.fotoSiswa} className="w-full h-full object-cover" /> : <Icons.User className="w-10 h-10 text-slate-200" />}
                   </div>
                   <div className="bg-indigo-600 text-white text-center py-3 rounded-2xl">
                      <p className="text-[8px] font-bold opacity-70 uppercase">Kelompok</p>
                      <p className="text-lg font-black">{formData.kelompok}</p>
                   </div>
                </div>
                <div className="space-y-6">
                   <div>
                      <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-3 border-l-4 border-indigo-500 pl-3">Biodata Siswa</h3>
                      <div className="grid grid-cols-1 gap-3">
                         {[
                            { label: 'Nama Lengkap', value: formData.namaLengkap },
                            { label: 'NIK', value: formData.nik },
                            { label: 'Tempat, Tgl Lahir', value: `${formData.tempatLahir}, ${formData.tanggalLahir}` },
                            { label: 'Usia (Per Juni 2026)', value: formData.usia },
                            { label: 'Ukuran Seragam', value: formData.ukuranSeragam },
                         ].map((item, i) => (
                            <div key={i} className="flex justify-between border-b border-slate-50 pb-1">
                               <span className="text-[11px] text-slate-400 font-bold">{item.label}</span>
                               <span className="text-[11px] text-slate-800 font-black text-right">{item.value}</span>
                            </div>
                         ))}
                      </div>
                   </div>
                   <div>
                      <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-3 border-l-4 border-indigo-500 pl-3">Informasi Kontak</h3>
                      <p className="text-sm font-black text-slate-800">{formData.noWhatsapp}</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{formData.alamatRumahSiswa}</p>
                   </div>
                </div>
             </div>

             <div className="mt-16 flex flex-col items-end text-right">
                <p className="text-[11px] font-bold text-slate-800">{SCHOOL_CITY}, {today}</p>
                <p className="text-[11px] font-bold text-slate-800 pr-4 mt-1">Panitia PPDB,</p>
                
                <div className="relative w-40">
                   <img 
                      src="https://down-id.img.susercontent.com/file/sg-11134201-7rd3t-lwgurx61vx1y34" 
                      alt="Stempel" 
                      className="absolute -top-10 -left-6 w-28 h-28 object-contain opacity-80 mix-blend-multiply pointer-events-none z-0"
                   />
                   
                   <div className="h-16 flex items-end justify-center w-full pb-1 relative z-10">
                      <p className="text-[11px] font-black text-slate-900 underline">Ratna Dewi</p>
                   </div>
                   <p className="text-[11px] font-black uppercase text-slate-900 border-t border-slate-900 pt-1 w-full text-center relative z-10">Kepala TK Al Hikmah</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* HEADER WITH BRIGHT BACKGROUND IMAGE */}
      <div 
        className="relative pt-12 pb-48 px-6 rounded-b-[70px] shadow-2xl overflow-hidden bg-slate-200 bg-cover bg-center"
        style={{ backgroundImage: "url('https://scontent.fkno6-1.fna.fbcdn.net/v/t39.30808-6/480472989_609561611706339_5955230405620444034_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHJWVzQCX2NEKifaOzK8EqMb0AYr3PzC9tvQBivc_ML2ycRRI5jfNq3IDSG5e9tdTmffoqd-FggWkyiveD9F2cr&_nc_ohc=CjD2JKnieF4Q7kNvwEDads3&_nc_oc=AdnEhgOl9pR1Gi0Q04YYTIn4iV9mm-lp0cf-LWlyyNwAxW2aaLZGiMZ-3vpV-yyGOaej81BoPHOsI1GOOCyut_0M&_nc_zt=23&_nc_ht=scontent.fkno6-1.fna&_nc_gid=pcr_5ada9Pj0MmjFJtBGig&oh=00_AfrYGXYCn2jlKYCKlUbh_oTMAtBP8BtbgU1DiwWXIYS6VA&oe=695DDB13')" }}
      >
        {/* ENHANCED LIGHT OVERLAY FOR TEXT READABILITY */}
        <div className="absolute inset-0 bg-black/15 z-0" />
        
        {/* BOTTOM BLENDING GRADIENT */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent z-0" />
        
        <div className="relative z-10 flex flex-col items-center">
          {/* PREMIUM LARGE LOGO FRAME */}
          <div className="relative group mb-10 transition-transform duration-700 hover:rotate-3">
             {/* OUTER GLOW */}
             <div className="absolute inset-0 bg-white/40 blur-[50px] rounded-full scale-125 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="absolute -inset-2 bg-gradient-to-tr from-white/20 to-white/60 blur-xl rounded-[3rem] opacity-50"></div>
             
             {/* MAIN CONTAINER */}
             <div className="relative w-40 h-40 md:w-48 md:h-48 bg-white/95 backdrop-blur-md p-6 rounded-[3rem] shadow-[0_25px_60px_rgba(0,0,0,0.25)] border-[6px] border-white ring-1 ring-black/5 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] group-hover:-translate-y-2">
                {/* SUBTLE GLOSS EFFECT OVER LOGO */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none z-10"></div>
                <img 
                  src={SCHOOL_LOGO} 
                  alt="Logo" 
                  className="w-full h-full object-contain relative z-0 transition-transform duration-500 group-hover:scale-110" 
                />
             </div>
          </div>
          
          <div className="text-center space-y-1 w-full max-w-2xl">
            <p className="text-white text-[12px] md:text-[13px] font-black tracking-[0.5em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">TK IT HARVYSYAH</p>
            {/* ADDRESS LINE - FORCED TO SINGLE LINE ON DESKTOP, RESPONSIVE ON MOBILE */}
            <p className="text-white text-[8px] md:text-[10px] font-bold tracking-[0.1em] uppercase opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mx-auto mb-2 whitespace-nowrap overflow-hidden text-ellipsis px-4">{SCHOOL_ADDRESS}</p>
            
            <h1 className="text-white text-4xl md:text-5xl font-black tracking-widest uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">PPDB ONLINE</h1>
            
            <div className="flex justify-center pt-2">
              <div className="bg-white/95 backdrop-blur-md px-8 py-2.5 rounded-full shadow-2xl border border-white transform transition-transform hover:scale-105">
                <span className="text-indigo-600 text-[11px] md:text-[12px] font-black tracking-[0.25em] uppercase">TA 2026/2027</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto -mt-24 px-4 relative z-20">
        <div className="glass rounded-[40px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white mb-8">
          <div className="flex justify-between items-center px-6 relative">
            <div className="absolute top-1/2 left-14 right-14 h-[2px] bg-slate-100 -translate-y-1/2">
               <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${((currentStep - 1) / 2) * 100}%` }} />
            </div>
            {[1, 2, 3].map((step) => (
              <div key={step} className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm relative z-10 transition-all ${
                currentStep === step ? 'bg-indigo-600 text-white shadow-xl scale-110' 
                : currentStep > step ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 border border-slate-100'
              }`}>
                {currentStep > step ? '✓' : step}
              </div>
            ))}
          </div>
        </div>

        {currentStep === FormStep.SISWA && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
             <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 flex flex-col items-center">
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" id="photo-upload" />
                <label htmlFor="photo-upload" className="cursor-pointer group relative">
                   <div className="w-44 h-56 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] overflow-hidden flex flex-col items-center justify-center group-hover:border-indigo-400 transition-all">
                      {formData.fotoSiswa ? <img src={formData.fotoSiswa} className="w-full h-full object-cover" /> : <div className="text-center"><Icons.Camera className="mx-auto text-slate-300 mb-2" /><span className="text-[10px] font-black text-slate-300 uppercase">Upload Foto</span></div>}
                   </div>
                </label>
                <p className="text-[9px] text-slate-400 mt-4 font-bold tracking-widest uppercase">Pas Foto Resmi 3x4</p>
             </div>

             <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 space-y-6">
                <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest mb-2 flex items-center gap-2"><div className="w-2 h-2 bg-indigo-600 rounded-full" /> Identitas Dasar</h3>
                <Input label="Nama Lengkap" placeholder="Sesuai Akta Kelahiran" value={formData.namaLengkap} onChange={e => updateField('namaLengkap', e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Nama Panggilan" value={formData.namaPanggilan} onChange={e => updateField('namaPanggilan', e.target.value)} />
                   <Select label="Jenis Kelamin" value={formData.jenisKelamin} onChange={e => updateField('jenisKelamin', e.target.value)} options={[{label:'Laki-laki',value:'Laki-laki'},{label:'Perempuan',value:'Perempuan'}]} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Tempat Lahir" value={formData.tempatLahir} onChange={e => updateField('tempatLahir', e.target.value)} />
                   <Input label="Tgl Lahir" type="date" value={formData.tanggalLahir} onChange={e => updateField('tanggalLahir', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Usia (Per Juni 2026)" value={formData.usia} readOnly className="bg-white font-bold" />
                   <Input label="Kelompok" value={formData.kelompok} readOnly className="bg-white font-black text-indigo-600" />
                </div>
                
                <div className="p-4 rounded-2xl border flex gap-3 items-start transition-all bg-indigo-50 border-indigo-100">
                   <Icons.Info className="w-4 h-4 mt-0.5 shrink-0 text-indigo-500" />
                   <p className="text-[11px] font-bold leading-relaxed text-indigo-700">
                      Silakan masukkan tanggal lahir untuk menentukan kelompok pendaftaran secara otomatis.
                   </p>
                </div>

                <div className="space-y-4">
                  <Input label="NIK (16 Digit)" value={formData.nik} onChange={e => updateField('nik', e.target.value.replace(/\D/g, ''))} maxLength={16} />
                  <p className="text-[10px] text-rose-600 mt-[-10px] ml-1 font-black italic">
                    Jumlah angka diinput: {formData.nik.length} / 16
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <Input label="Hobi" value={formData.hobi} onChange={e => updateField('hobi', e.target.value)} placeholder="Contoh: Menggambar, Berenang" />
                   <Input label="Cita-Cita" value={formData.citaCita} onChange={e => updateField('citaCita', e.target.value)} placeholder="Contoh: Polisi, Dokter" />
                </div>
             </div>

             <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 space-y-6">
                <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest mb-2 flex items-center gap-2"><div className="w-2 h-2 bg-indigo-600 rounded-full" /> Data Fisik & Kondisi</h3>
                <div className="grid grid-cols-3 gap-4">
                   <Input label="Anak Ke" type="number" value={formData.anakKe} onChange={e => updateField('anakKe', e.target.value)} />
                   <Input label="Jml Saudara" type="number" value={formData.jumlahSaudara} onChange={e => updateField('jumlahSaudara', e.target.value)} />
                   <Input label="Berat (Kg)" type="number" value={formData.beratBadan} onChange={e => updateField('beratBadan', e.target.value)} suffix="Kg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Tinggi (Cm)" type="number" value={formData.tinggiBadan} onChange={e => updateField('tinggiBadan', e.target.value)} suffix="Cm" />
                   <Input label="Lingkar Kepala" type="number" value={formData.lingkarKepala} onChange={e => updateField('lingkarKepala', e.target.value)} suffix="Cm" />
                </div>

                <div className="pt-4 border-t border-slate-50 space-y-4">
                   <Input label="Riwayat Penyakit" value={formData.riwayatPenyakit} onChange={e => updateField('riwayatPenyakit', e.target.value)} placeholder="Contoh: Alergi debu, Asma, atau - jika tidak ada" />
                   
                   <div className="space-y-4">
                      <Select 
                        label="Anak Berkebutuhan Khusus (ABK)" 
                        value={formData.isABK} 
                        onChange={e => updateField('isABK', e.target.value)} 
                        options={[{label:'Tidak',value:'Tidak'},{label:'Ya',value:'Ya'}]} 
                      />
                      
                      {formData.isABK === 'Ya' && (
                          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <Input 
                                label="Jenis ABK" 
                                value={formData.jenisABK === '-' ? '' : formData.jenisABK} 
                                onChange={e => updateField('jenisABK', e.target.value)} 
                                placeholder="Contoh: Autisme, ADHD, Tunawicara, dll" 
                            />
                          </div>
                      )}
                   </div>

                   <div className="space-y-4 pt-2 border-t border-slate-50">
                      <Select 
                        label="Pernah Bersekolah di TK/KB Lain?" 
                        value={formData.isPernahSekolahLain} 
                        onChange={e => updateField('isPernahSekolahLain', e.target.value)} 
                        options={[{label:'Tidak',value:'Tidak'},{label:'Ya',value:'Ya'}]} 
                      />
                      
                      {formData.isPernahSekolahLain === 'Ya' && (
                          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <Input 
                                label="Nama Sekolah Asal" 
                                value={formData.namaSekolahAsal === '-' ? '' : formData.namaSekolahAsal} 
                                onChange={e => updateField('namaSekolahAsal', e.target.value)} 
                                placeholder="Masukkan nama sekolah sebelumnya" 
                            />
                          </div>
                      )}
                   </div>
                </div>
             </div>

             <button onClick={nextStep} className="w-full py-6 rounded-3xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all bg-slate-900 text-white shadow-xl hover:bg-indigo-600">Lanjut: Data Orang Tua <Icons.ArrowRight /></button>
          </div>
        )}

        {currentStep === FormStep.ORTU && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4">
             <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 space-y-6">
                <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Data Ayah</h3>
                <Input label="Nama Lengkap Ayah" value={formData.namaAyah} onChange={e => updateField('namaAyah', e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                   <Select label="Status Ayah" value={formData.statusAyah} onChange={e => updateField('statusAyah', e.target.value)} options={[{label:'Hidup',value:'Hidup'},{label:'Meninggal',value:'Meninggal'}]} />
                   <Input label="WhatsApp Ayah" value={formData.waAyah} onChange={e => updateField('waAyah', e.target.value)} placeholder="08..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Tempat Lahir" value={formData.tempatLahirAyah} onChange={e => updateField('tempatLahirAyah', e.target.value)} />
                   <Input label="Tgl Lahir" type="date" value={formData.tanggalLahirAyah} onChange={e => updateField('tanggalLahirAyah', e.target.value)} />
                </div>
                <Select label="Pekerjaan" value={formData.pekerjaanAyah} onChange={e => updateField('pekerjaanAyah', e.target.value)} options={PEKERJAAN_AYAH_OPTIONS} />
                <div className="grid grid-cols-2 gap-4">
                   <Select label="Pendidikan" value={formData.pendidikanAyah} onChange={e => updateField('pendidikanAyah', e.target.value)} options={PENDIDIKAN_OPTIONS} />
                   <Select label="Penghasilan" value={formData.penghasilanAyah} onChange={e => updateField('penghasilanAyah', e.target.value)} options={PENGHASILAN_OPTIONS} />
                </div>
             </div>

             <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 space-y-6">
                <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"><div className="w-2 h-2 bg-rose-500 rounded-full" /> Data Ibu</h3>
                <Input label="Nama Lengkap Ibu" value={formData.namaIbu} onChange={e => updateField('namaIbu', e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                   <Select label="Status Ibu" value={formData.statusIbu} onChange={e => updateField('statusIbu', e.target.value)} options={[{label:'Hidup',value:'Hidup'},{label:'Meninggal',value:'Meninggal'}]} />
                   <Input label="WhatsApp Ibu" value={formData.waIbu} onChange={e => updateField('waIbu', e.target.value)} placeholder="08..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Tempat Lahir" value={formData.tempatLahirIbu} onChange={e => updateField('tempatLahirIbu', e.target.value)} />
                   <Input label="Tgl Lahir" type="date" value={formData.tanggalLahirIbu} onChange={e => updateField('tanggalLahirIbu', e.target.value)} />
                </div>
                <Select label="Pekerjaan" value={formData.pekerjaanIbu} onChange={e => updateField('pekerjaanIbu', e.target.value)} options={PEKERJAAN_IBU_OPTIONS} />
                <div className="grid grid-cols-2 gap-4">
                   <Select label="Pendidikan" value={formData.pendidikanIbu} onChange={e => updateField('pendidikanIbu', e.target.value)} options={PENDIDIKAN_OPTIONS} />
                   <Select label="Penghasilan" value={formData.penghasilanIbu} onChange={e => updateField('penghasilanIbu', e.target.value)} options={PENGHASILAN_OPTIONS} />
                </div>

                <div className="pt-6 border-t border-slate-50 space-y-6">
                   <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full" /> Tinggal Bersama</h3>
                   <Select 
                      label="Anak Tinggal Bersama" 
                      value={formData.pilihanWali} 
                      onChange={e => updateField('pilihanWali', e.target.value)} 
                      options={[
                        {label: 'Kedua orang tua', value: 'Kedua orang tua'},
                        {label: 'Ayah', value: 'Ayah'},
                        {label: 'Ibu', value: 'Ibu'},
                        {label: 'Wali', value: 'Wali'}
                      ]} 
                   />

                   {/* DATA WALI (CONDITIONAL) */}
                   {formData.pilihanWali === 'Wali' && (
                      <div className="mt-8 p-8 bg-slate-50/50 rounded-[32px] border border-slate-100 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                         <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full" /> Data Wali
                         </h3>
                         <Input label="Nama Lengkap Wali" value={formData.namaWali} onChange={e => updateField('namaWali', e.target.value)} />
                         <div className="grid grid-cols-2 gap-4">
                            <Input label="Hubungan Keluarga" placeholder="Contoh: Kakek, Paman, dll" value={formData.hubunganWali} onChange={e => updateField('hubunganWali', e.target.value)} />
                            <Input label="WhatsApp Wali" value={formData.waWali} onChange={e => updateField('waWali', e.target.value)} placeholder="08..." />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <Input label="Tempat Lahir Wali" value={formData.tempatLahirWali} onChange={e => updateField('tempatLahirWali', e.target.value)} />
                            <Input label="Tgl Lahir Wali" type="date" value={formData.tanggalLahirWali} onChange={e => updateField('tanggalLahirWali', e.target.value)} />
                         </div>
                         <Select label="Pendidikan Terakhir" value={formData.pendidikanWali} onChange={e => updateField('pendidikanWali', e.target.value)} options={PENDIDIKAN_OPTIONS} />
                         <div className="grid grid-cols-2 gap-4">
                            <Select label="Pekerjaan" value={formData.pekerjaanWali} onChange={e => updateField('pekerjaanWali', e.target.value)} options={PEKERJAAN_AYAH_OPTIONS} />
                            <Select label="Penghasilan" value={formData.penghasilanWali} onChange={e => updateField('penghasilanWali', e.target.value)} options={PENGHASILAN_OPTIONS} />
                         </div>
                      </div>
                   )}
                </div>
             </div>

             <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 bg-white py-5 rounded-3xl font-bold text-slate-400 border border-slate-100">Kembali</button>
                <button onClick={nextStep} className="flex-[2] bg-indigo-600 text-white py-5 rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl">Tahap Akhir</button>
             </div>
          </div>
        )}

        {currentStep === FormStep.WALI && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4">
             <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 space-y-6">
                <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"><div className="w-2 h-2 bg-indigo-600 rounded-full" /> Kontak & Domisili</h3>
                <Input label="WhatsApp Utama (Untuk Notifikasi)" placeholder="08xxx" value={formData.noWhatsapp} onChange={e => updateField('noWhatsapp', e.target.value)} />
                <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Alamat Lengkap Domisili Siswa</label>
                   <textarea className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" rows={3} value={formData.alamatRumahSiswa} onChange={e => updateField('alamatRumahSiswa', e.target.value)} />
                </div>

                <div className="pt-4 border-t border-slate-50">
                   <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Jenis Pembayaran</h3>
                   
                   <div className="overflow-hidden border border-slate-100 rounded-2xl mb-6">
                      <table className="w-full text-left text-[11px]">
                         <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                               <th className="px-4 py-3 font-black text-slate-400 uppercase tracking-widest">No</th>
                               <th className="px-4 py-3 font-black text-slate-400 uppercase tracking-widest">Komponen Biaya</th>
                               <th className="px-4 py-3 font-black text-slate-400 uppercase tracking-widest text-right">Biaya</th>
                            </tr>
                         </thead>
                         <tbody>
                            {paymentInfo.length > 0 ? paymentInfo.map((item, idx) => (
                               <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                                  <td className="px-4 py-3 text-slate-400 font-bold">{idx + 1}</td>
                                  <td className="px-4 py-3 text-slate-800 font-bold">{item.komponen}</td>
                                  <td className="px-4 py-3 text-slate-900 font-black text-right">{item.biaya}</td>
                               </tr>
                            )) : (
                               <tr><td colSpan={3} className="px-4 py-6 text-center text-slate-400 font-bold italic uppercase tracking-widest">Memuat rincian biaya...</td></tr>
                            )}
                         </tbody>
                      </table>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <Select label="Ukuran Seragam" value={formData.ukuranSeragam} onChange={e => updateField('ukuranSeragam', e.target.value)} options={SERAGAM_OPTIONS} />
                      <Select label="Metode Bayar" value={formData.metodePembayaran} onChange={e => updateField('metodePembayaran', e.target.value)} options={METODE_BAYAR_OPTIONS} />
                   </div>

                   {formData.metodePembayaran && (
                      <div className="mt-6 p-6 rounded-3xl bg-indigo-50 border border-indigo-100 animate-in fade-in zoom-in-95 duration-300">
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                               {formData.metodePembayaran === 'Transfer Bank' ? <Icons.Star className="text-indigo-600" /> : <Icons.User className="text-indigo-600" />}
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Instruksi Pembayaran</p>
                               <p className="text-[12px] font-black text-indigo-900 mb-2">{formData.metodePembayaran}</p>
                               <p className="text-[11px] font-bold text-indigo-700/80 leading-relaxed uppercase tracking-wider">
                                  {formData.metodePembayaran === 'Transfer Bank' 
                                    ? "Silakan lakukan transfer ke Bank Syariah Indonesia (BSI) No. Rekening: 7111002221 a.n TK Al Hikmah. Mohon simpan bukti transfer untuk dikirimkan melalui WhatsApp Konfirmasi."
                                    : "Pembayaran dapat dilakukan secara tunai di kantor administrasi sekolah setiap hari kerja (Senin-Jumat) pukul 08.00 - 14.00 WIB."
                                  }
                               </p>
                            </div>
                         </div>
                      </div>
                   )}
                </div>
             </div>

             <div className={`p-6 rounded-[32px] border transition-all flex items-center gap-5 cursor-pointer ${isAgreed ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-100'}`} onClick={() => setIsAgreed(!isAgreed)}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${isAgreed ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-transparent'}`}>✓</div>
                <p className="text-[11px] font-bold text-slate-600 leading-tight">Saya menyatakan data di atas benar & siap mengikuti prosedur pendaftaran di TK Al Hikmah.</p>
             </div>

             {error && <div className="bg-rose-50 text-rose-600 p-5 rounded-3xl text-[11px] font-bold border border-rose-100">{error}</div>}

             <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 bg-white py-5 rounded-3xl font-bold text-slate-400 border border-slate-100">Kembali</button>
                <button onClick={handleSubmit} disabled={isSubmitting || !isAgreed} className={`flex-[2] py-5 rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl text-white transition-all ${isSubmitting || !isAgreed ? 'bg-slate-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                   {isSubmitting ? 'Mengirim Data...' : 'Kirim Pendaftaran'}
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
