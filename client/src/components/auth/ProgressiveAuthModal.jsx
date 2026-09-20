import React, { useState, useEffect } from "react";
import {
  Sparkles,
  CheckCircle2,
  Lock,
  Mail,
  User,
  ArrowLeft,
  RotateCcw,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { useAuth } from "../../context/AuthContext";
import { useAnalysis } from "../../context/AnalysisContext";
import { useClerk } from "@clerk/react";

export const ProgressiveAuthModal = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    login,
    register,
    sendOtp,
  } = useAuth();
  const { activeAnalysis } = useAnalysis();
  const clerk = useClerk();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [regStep, setRegStep] = useState("form"); // 'form' | 'otp'
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isRegister = authModalTab === "register";

  // Cooldown countdown timer
  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Reset modal state when closed or tab switched
  const handleTabSwitch = (tab) => {
    setAuthModalTab(tab);
    setRegStep("form");
    setOtp("");
    setError("");
    setShowPassword(false);
  };

  const handleClose = () => {
    setAuthModalOpen(false);
    setRegStep("form");
    setOtp("");
    setError("");
    setShowPassword(false);
  };

  // 1-Click Direct Google OAuth (Skips intermediate Clerk modal directly to accounts.google.com)
  const handleGoogleAuth = async () => {
    setError("");
    setIsLoading(true);
    try {
      // Pastikan Clerk client sudah terinisialisasi
      if (!clerk.loaded) {
        let attempts = 0;
        while (!clerk.loaded && attempts < 30) {
          await new Promise((r) => setTimeout(r, 100));
          attempts++;
        }
      }

      const client = clerk.client || window.Clerk?.client;
      const redirectOptions = {
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: window.location.pathname === "/dashboard" ? "/dashboard" : "/",
      };

      // Direct OAuth via Clerk client
      if (isRegister && client?.signUp?.authenticateWithRedirect) {
        await client.signUp.authenticateWithRedirect(redirectOptions);
      } else if (client?.signIn?.authenticateWithRedirect) {
        await client.signIn.authenticateWithRedirect(redirectOptions);
      } else if (client?.signUp?.authenticateWithRedirect) {
        await client.signUp.authenticateWithRedirect(redirectOptions);
      } else if (typeof clerk.authenticateWithRedirect === "function") {
        await clerk.authenticateWithRedirect(redirectOptions);
      } else {
        throw new Error("Layanan Google OAuth sedang memuat. Silakan coba sesaat lagi.");
      }
    } catch (err) {
      console.warn("[Direct Google Auth attempt notice, trying fallback]:", err);
      try {
        const client = clerk.client || window.Clerk?.client;
        const redirectOptions = {
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: window.location.pathname === "/dashboard" ? "/dashboard" : "/",
        };

        // Fallback ke flow alternatif (signIn <-> signUp)
        if (isRegister && client?.signIn?.authenticateWithRedirect) {
          await client.signIn.authenticateWithRedirect(redirectOptions);
          return;
        } else if (!isRegister && client?.signUp?.authenticateWithRedirect) {
          await client.signUp.authenticateWithRedirect(redirectOptions);
          return;
        }
      } catch (fallbackErr) {
        console.error("[Google Auth Fallback Error]:", fallbackErr);
      }

      console.error("[Google Auth Error]:", err);
      setError(
        err?.errors?.[0]?.longMessage ||
          err?.message ||
          "Gagal menghubungkan ke Google. Silakan coba lagi.",
      );
      setIsLoading(false);
    }
  };

  // Step 1: Request OTP Code
  const handleRequestOtp = async (e) => {
    if (e) e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nama lengkap wajib diisi.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Alamat email valid wajib diisi.");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendOtp(email.trim(), name.trim());
      setRegStep("otp");
      setResendCooldown(45);
    } catch (err) {
      setError(err.message || "Gagal mengirim kode OTP. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP & Complete Registration
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError("");

    const cleanOtp = otp.replace(/\D/g, "").trim();
    if (cleanOtp.length !== 6) {
      setError("Masukkan 6 digit kode OTP yang diterima.");
      return;
    }

    setIsLoading(true);
    try {
      await register(
        name.trim(),
        email.trim(),
        password,
        activeAnalysis?._id,
        cleanOtp,
      );
      handleClose();
    } catch (err) {
      setError(err.message || "Verifikasi gagal. Pastikan kode OTP benar.");
    } finally {
      setIsLoading(false);
    }
  };

  // Standard Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email.trim(), password);
      handleClose();
    } catch (err) {
      setError(
        err.message || "Login gagal. Periksa kembali email dan password Anda.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={authModalOpen}
      onClose={handleClose}
      maxWidth="max-w-sm sm:max-w-md"
    >
      <div className="flex flex-col gap-3.5">
        {/* Header Icon & Title */}
        <div className="text-center flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-[#0789D8]/10 text-[#0789D8] flex items-center justify-center mb-1.5 shadow-2xs">
            {isRegister && regStep === "otp" ? (
              <KeyRound className="w-4.5 h-4.5" />
            ) : (
              <Sparkles className="w-4.5 h-4.5" />
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-[#111111] tracking-tight leading-tight">
            {isRegister
              ? regStep === "otp"
                ? "Verifikasi Email Anda"
                : "Simpan & Kelola Referensimu"
              : "Masuk ke Akun NEMU"}
          </h3>
          <p className="text-[11px] text-[#7C8387] mt-0.5 leading-normal max-w-xs">
            {isRegister
              ? regStep === "otp"
                ? `Masukkan 6-digit kode OTP yang kami kirimkan ke ${email}`
                : "Gabung untuk simpan arsip desain & dapatkan +2 kredit ekstra."
              : "Masuk untuk mengakses referensi visual yang tersimpan."}
          </p>
        </div>

        {/* Tab Toggle (only visible on step 1) */}
        {regStep === "form" && (
          <div className="grid grid-cols-2 gap-1 p-0.5 bg-[#F7F8F8] rounded-xl border border-[#DDE2E4]">
            <button
              type="button"
              onClick={() => handleTabSwitch("register")}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isRegister
                  ? "bg-white text-[#111111] shadow-xs"
                  : "text-[#7C8387] hover:text-[#111111]"
              }`}
            >
              Buat Akun (+2)
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch("login")}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                !isRegister
                  ? "bg-white text-[#111111] shadow-xs"
                  : "text-[#7C8387] hover:text-[#111111]"
              }`}
            >
              Masuk
            </button>
          </div>
        )}

        {/* Bonus +2 Credits Callout */}
        {isRegister && regStep === "form" && (
          <div className="bg-[#C8FF3D]/25 border border-[#9ecc23]/40 rounded-xl px-3 py-2 flex items-center gap-2.5 text-left shadow-2xs">
            <span className="w-6 h-6 rounded-lg bg-[#111111] text-[#C8FF3D] flex items-center justify-center font-black text-xs shrink-0">
              +2
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#111111] leading-tight">
                Bonus +2 Kredit Ekstra
              </span>
              <span className="text-[11px] text-[#444444] leading-tight">
                Daftar sekarang untuk membuka 2 kredit ekstra & simpan riwayat!
              </span>
            </div>
          </div>
        )}

        {/* Active Analysis Preservation Notice */}
        {isRegister && regStep === "form" && activeAnalysis && (
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0789D8]/10 border border-[#0789D8]/20 text-[11px] text-[#0789D8]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0789D8] shrink-0" />
            <span>
              Hasil analisis aktif kamu akan otomatis tersimpan ke akun baru!
            </span>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="p-2.5 rounded-xl bg-[#D94B4B]/10 border border-[#D94B4B]/20 text-[#D94B4B] text-[11px] font-medium leading-relaxed">
            {error}
          </div>
        )}

        {/* 1-Click Google Sign-In via Clerk (Direct to accounts.google.com, no Clerk form) */}
        {regStep === "form" && (
          <div className="flex flex-col gap-2.5 pt-0.5">
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white hover:bg-[#F7F8F8] text-[#111111] font-bold text-xs rounded-xl border border-[#DDE2E4] shadow-2xs hover:shadow-xs transition-all cursor-pointer group disabled:opacity-60"
            >
              <svg
                className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>
                {isLoading ? "Menghubungkan ke Google..." : "Lanjutkan dengan Google"}
              </span>
            </button>

            <div className="relative flex items-center justify-center my-0.5">
              <div className="w-full border-t border-[#DDE2E4]"></div>
              <span className="bg-white px-2.5 text-[10px] uppercase font-bold tracking-wider text-[#7C8387] absolute">
                atau manual dengan email
              </span>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* CASE A: REGISTER STEP 1 (Input Form) */}
        {/* ---------------------------------------------------- */}
        {isRegister && regStep === "form" && (
          <form onSubmit={handleRequestOtp} className="flex flex-col gap-2.5">
            <Input
              label="Nama Lengkap"
              placeholder="Elena Vance"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Alamat Email"
              type="email"
              placeholder="desainer@studio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="p-1 text-[#7C8387] hover:text-[#111111] transition-colors cursor-pointer rounded focus:outline-none"
                  title={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full mt-1.5 py-2.5 text-xs font-bold shadow-xs"
            >
              Lanjut (Kirim Kode OTP) →
            </Button>
          </form>
        )}

        {/* ---------------------------------------------------- */}
        {/* CASE B: REGISTER STEP 2 (OTP Verification) */}
        {/* ---------------------------------------------------- */}
        {isRegister && regStep === "otp" && (
          <form
            onSubmit={handleVerifyAndRegister}
            className="flex flex-col gap-3"
          >
            {/* Target Email Banner with "Ubah Email" back button */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7F8F8] border border-[#DDE2E4] text-xs">
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-[#0789D8] shrink-0" />
                <span className="font-semibold text-[#111111] truncate">
                  {email}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRegStep("form");
                  setError("");
                }}
                className="text-[11px] font-semibold text-[#0789D8] hover:text-[#0878B8] flex items-center gap-1 cursor-pointer shrink-0 ml-2"
              >
                <ArrowLeft className="w-3 h-3" /> Ubah
              </button>
            </div>

            {/* 6-Digit OTP Box */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#444444] uppercase tracking-wider text-center">
                Kode Verifikasi 6-Digit
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="••••••"
                autoFocus
                className="w-full py-3 text-center font-mono font-bold text-2xl tracking-[12px] bg-[#F7F8F8] border-2 border-[#DDE2E4] focus:border-[#0789D8] focus:bg-white rounded-xl outline-none transition-all placeholder:text-[#BAC0C3] placeholder:tracking-[8px]"
                required
              />
            </div>

            {/* Resend OTP Cooldown */}
            <div className="flex items-center justify-between text-[11px] text-[#7C8387] pt-0.5">
              <span>Tidak menerima email?</span>
              <button
                type="button"
                disabled={resendCooldown > 0 || isLoading}
                onClick={handleRequestOtp}
                className={`font-semibold flex items-center gap-1 ${
                  resendCooldown > 0
                    ? "text-[#94A3B8] cursor-not-allowed"
                    : "text-[#0789D8] hover:text-[#0878B8] cursor-pointer"
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                {resendCooldown > 0
                  ? `Kirim ulang (${resendCooldown}s)`
                  : "Kirim Ulang"}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full mt-1 py-2.5 text-xs font-bold shadow-xs"
            >
              Verifikasi & Buat Akun (+2)
            </Button>
          </form>
        )}

        {/* ---------------------------------------------------- */}
        {/* CASE C: LOGIN FORM */}
        {/* ---------------------------------------------------- */}
        {!isRegister && (
          <form onSubmit={handleLogin} className="flex flex-col gap-2.5">
            <Input
              label="Alamat Email"
              type="email"
              placeholder="desainer@studio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="p-1 text-[#7C8387] hover:text-[#111111] transition-colors cursor-pointer rounded focus:outline-none"
                  title={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full mt-1.5 py-2.5 text-xs font-bold shadow-xs"
            >
              Masuk Sekarang
            </Button>
          </form>
        )}

        {/* Compact Trust Footer */}
        <p className="text-center text-[11px] text-[#7C8387] pt-0.5">
          100% gratis selama masa beta • Simpan riwayat tanpa batas
        </p>
      </div>
    </Modal>
  );
};
