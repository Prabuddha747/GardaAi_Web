import React, { useState } from 'react';
import { X, CheckCircle2, GraduationCap, MapPin, Mail, Phone, Building } from 'lucide-react';

interface SchoolWorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchoolWorkshopModal: React.FC<SchoolWorkshopModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    institutionName: '',
    cityOrDistrict: 'Patna',
    contactPerson: '',
    role: 'Teacher',
    phone: '',
    email: '',
    estimatedStudents: '100-200',
    preferredDates: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#fdfbf7] text-[#1c1917] rounded-2xl overflow-hidden shadow-2xl border border-[#ded8c9] max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-[#ea580c] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            <h2 className="font-editorial text-2xl font-bold tracking-tight">
              Bring GardaAI to Your School
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-black/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-stone-900">
                Aapka request receive ho gaya!
              </h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                Hamari GardaAI outreach team (Prince Singh / Vivek Kumar) aapko 24
                ghante ke andar WhatsApp ya phone pe contact karegi session schedule
                karne ke liye.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-[#f95716] text-white font-semibold rounded-xl text-sm hover:bg-[#ea4805] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-[#ea580c] mb-1">
                  Free Grassroots Workshop Request
                </p>
                <p className="text-stone-600 text-xs mb-4">
                  Age-appropriate, non-technical AI sessions designed for Bihar's
                  classrooms. We bring projector guides, offline prompt cards,
                  and hands-on exercises in simple Hinglish.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  School / College / Institution Name *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Raj High School, Gaya"
                    value={formData.institutionName}
                    onChange={(e) =>
                      setFormData({ ...formData, institutionName: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#ded8c9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f95716]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    District / City (Bihar) *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Patna, Muzaffarpur, Gaya"
                      value={formData.cityOrDistrict}
                      onChange={(e) =>
                        setFormData({ ...formData, cityOrDistrict: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#ded8c9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f95716]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#ded8c9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f95716]"
                  >
                    <option value="Principal">School Principal / Headmaster</option>
                    <option value="Teacher">Teacher / Faculty</option>
                    <option value="Student Rep">Student Representative</option>
                    <option value="NGO Partner">Community / NGO Partner</option>
                    <option value="Parent">Parent / Local Organizer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPerson: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#ded8c9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f95716]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#ded8c9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f95716]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                    <input
                      type="email"
                      placeholder="principal@school.org"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#ded8c9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f95716]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Expected Number of Students
                  </label>
                  <select
                    value={formData.estimatedStudents}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        estimatedStudents: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#ded8c9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f95716]"
                  >
                    <option value="50-100">50 - 100 students</option>
                    <option value="100-250">100 - 250 students</option>
                    <option value="250-500">250 - 500 students</option>
                    <option value="500+">500+ students (Entire campus)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Kuch khas zarurat ya details? (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Computer lab available hai, class 9-12 ke students ke liye session chahiye."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#ded8c9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f95716]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-stone-600 text-sm font-medium hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#f95716] hover:bg-[#ea4805] text-white font-semibold rounded-xl text-sm shadow-sm transition-all cursor-pointer"
                >
                  Submit Workshop Request →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
