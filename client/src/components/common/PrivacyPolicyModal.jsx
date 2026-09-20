import React from 'react';
import { Modal } from './Modal';
import { ShieldCheck, Cookie, Lock, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

export const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Kebijakan Privasi & Cookie"
      maxWidth="max-w-2xl"
    >
      <div className="flex flex-col gap-5 text-[#111111] text-xs sm:text-sm leading-relaxed mt-2">
        {/* Intro Banner */}
        <div className="bg-[#0789D8]/5 border border-[#0789D8]/15 p-4 rounded-2xl flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#0789D8]/10 text-[#0789D8] shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-[#0789D8] text-sm mb-1">
              Privasi Anda Terjaga Penuh di NEMU
            </h4>
            <p className="text-[#7C8387] text-xs leading-relaxed">
              NEMU (Visual Reference Intelligence) berkomitmen melindungi privasi kreator, desainer, dan pengguna kami. Dokumen ini menjelaskan bagaimana data dan cookie dikelola dengan transparan.
            </p>
          </div>
        </div>

        {/* Section 1: Cookie Policy */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-bold text-sm text-[#111111]">
            <Cookie className="w-4 h-4 text-[#E53935]" />
            <h5>1. Penggunaan Cookie & Penyimpanan Sesi</h5>
          </div>
          <p className="text-[#7C8387] text-xs leading-relaxed">
            NEMU <strong>hanya menggunakan Cookie Esensial (Strictly Necessary Cookies)</strong> yang mutlak dibutuhkan agar sistem dapat beroperasi dengan baik:
          </p>
          <ul className="space-y-1.5 pl-2 text-xs text-[#525B60]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#42A95C] shrink-0 mt-0.5" />
              <span><strong>Token Sesi Tamu (Guest Session):</strong> Mengingat sisa kredit pemindaian gratis Anda (3 kuota) saat belum memiliki akun.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#42A95C] shrink-0 mt-0.5" />
              <span><strong>Token Autentikasi Pengguna:</strong> Menjaga sesi login Anda tetap aktif dan aman tanpa perlu login ulang setiap membuka halaman.</span>
            </li>
          </ul>
          <div className="bg-[#F7F8F8] border border-[#DDE2E4] p-3 rounded-xl flex items-center gap-2 text-[11px] text-[#7C8387]">
            <EyeOff className="w-4 h-4 text-[#7C8387] shrink-0" />
            <span>
              <strong>Bebas Pelacak Iklan:</strong> NEMU <u>tidak menggunakan</u> cookie pelacak pihak ketiga (seperti Facebook Pixel, TikTok Pixel, atau Google Ads Retargeting) untuk memata-matai aktivitas penjelajahan Anda.
            </span>
          </div>
        </div>

        {/* Section 2: Data Processing */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-bold text-sm text-[#111111]">
            <Lock className="w-4 h-4 text-[#0789D8]" />
            <h5>2. Pengolahan & Keamanan Gambar</h5>
          </div>
          <p className="text-[#7C8387] text-xs leading-relaxed">
            Setiap gambar referensi visual yang Anda unggah diproses melalui jaringan kecerdasan buatan multimodal (AI Vision) khusus untuk mengekstraksi Visual DNA (nama gaya, palet warna, jenis font, dan komposisi desain). Gambar disimpan secara aman di cloud storage terenkripsi dan hanya dapat diakses melalui riwayat akun Anda.
          </p>
        </div>

        {/* Section 3: Data Rights */}
        <div className="flex flex-col gap-2">
          <h5 className="font-bold text-sm text-[#111111]">3. Hak Pengguna</h5>
          <p className="text-[#7C8387] text-xs leading-relaxed">
            Anda memiliki kendali penuh atas data Anda di NEMU. Anda dapat menghapus riwayat analisis atau meminta penutupan akun dan penghapusan data kapan saja.
          </p>
        </div>

        {/* Footer Button */}
        <div className="pt-3 border-t border-[#DDE2E4] flex justify-end">
          <Button variant="primary" size="sm" onClick={onClose}>
            Saya Paham
          </Button>
        </div>
      </div>
    </Modal>
  );
};
