"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  const handleClose = () => {
    onClose();
    window.setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-brand-dark/50 backdrop-blur-sm"
            onClick={handleClose}
            aria-label="إغلاق"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="glass-card relative w-full rounded-t-3xl p-6 sm:max-w-md sm:rounded-3xl sm:p-7 shadow-2xl"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 left-4 rounded-lg p-1.5 text-brand-text-light transition hover:bg-brand-bg hover:text-brand-dark"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-brand-accent" />
                <h3 className="mb-2 text-xl font-bold text-brand-dark">
                  تم استلام طلبك
                </h3>
                <p className="mb-6 text-sm text-brand-text-light">
                  سيتواصل معك فريقنا خلال أقرب وقت ممكن.
                </p>
                <button type="button" onClick={handleClose} className="btn-brand">
                  حسناً
                </button>
              </div>
            ) : (
              <>
                <h3
                  id="contact-title"
                  className="mb-1 pr-2 text-xl font-bold text-brand-dark"
                >
                  طلب عرض سعر فوري
                </h3>
                <p className="mb-6 text-sm text-brand-text-light">
                  اترك بياناتك وسنتواصل معك لتأكيد المقاسات والأسعار.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5" dir="rtl">
                  <div>
                    <label className="mb-1.5 block text-xs text-brand-text-light">
                      الاسم
                    </label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="الاسم الكامل"
                      className="input-brand"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-brand-text-light">
                      رقم الجوال
                    </label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="09xxxxxxxx"
                      dir="ltr"
                      className="input-brand text-left"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-brand-text-light">
                      المدينة
                    </label>
                    <input
                      required
                      name="city"
                      type="text"
                      placeholder="طرابلس"
                      className="input-brand"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-brand-text-light">
                      ملاحظات المشروع
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="نوع المشروع، عدد الفتحات، موعد التركيب..."
                      className="input-brand resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-brand mt-2 w-full disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    {loading ? "جاري الإرسال..." : "إرسال الطلب"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
