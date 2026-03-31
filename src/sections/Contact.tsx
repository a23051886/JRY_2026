import { useState, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { Phone, MapPin, Send, Check, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    phone: '',
    email: '',
    message: '',
    agree: false,
  });

  const [titleInViewRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [formInViewRef, formInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) return;

    setIsSubmitting(true);

    try {
      const submissionData = {
        project: '仁愛玉璽',
        name: formData.name.trim(),
        gender: formData.gender === 'male' ? '男' : '女',
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('signups')
        .insert([submissionData]);

      if (error) throw error;

      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Submission error:', error);
      alert('送出失敗: ' + (error.message || '未知錯誤'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-light to-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Title */}
        <div
          ref={titleInViewRef}
          className={`text-center mb-16 transition-all duration-1000 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <span className="text-gold text-sm tracking-[0.3em] mb-4 block">CONTACT</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary mb-4">
            預約賞屋
          </h2>
          <p className="text-text-secondary">誠摯邀請您親臨鑑賞</p>
        </div>

        {/* Content grid */}
        <div
          ref={formInViewRef}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto transition-all duration-1000 delay-300 ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {/* Left: Contact info */}
          <div className="space-y-8">
            <div className="p-8 border border-gold/30 bg-dark/50">
              <h3 className="font-serif text-2xl text-text-primary mb-6">聯絡資訊</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/30">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <span className="text-gold/60 text-xs tracking-[0.15em] block mb-1">服務專線</span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <span className="text-text-primary text-lg">(02) 2236-1566</span>
                      <span className="hidden sm:block text-gold/30">|</span>
                      <span className="text-text-primary text-lg">0982-311-237</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/30">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <span className="text-gold/60 text-xs tracking-[0.15em] block mb-1">接待中心</span>
                    <span className="text-text-primary">台北市文山區木柵路一段 83 號一樓</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Business hours */}
            <div className="p-8 border border-gold/20 bg-dark/30">
              <h4 className="font-serif text-lg text-text-primary mb-4">接待時間</h4>
              <div className="space-y-4 text-text-secondary text-sm">
                <div className="flex justify-between items-center border-b border-gold/10 pb-2">
                  <span>週一至週五</span>
                  <span className="text-text-primary">09:00 - 12:00 / 13:30 - 18:00</span>
                </div>
                <div className="bg-gold/5 p-3 text-xs border border-gold/10 italic">
                  ※ 例假日及國定假日未營業
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="p-6 bg-gold/5 border-l-2 border-gold">
              <p className="text-text-secondary text-sm leading-relaxed">
                ※ 為提供您專屬的賞屋服務，建議提前預約，
                我們將安排專人為您詳細介紹。
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="p-8 border border-gold/30 bg-dark/50">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 flex items-center justify-center border border-gold bg-gold/10 mb-6">
                  <Check className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-2xl text-text-primary mb-4">預約成功</h3>
                <p className="text-text-secondary mb-6">
                  感謝您的預約，我們將盡快與您聯繫確認賞屋時間。
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      gender: 'male',
                      phone: '',
                      email: '',
                      message: '',
                      agree: false,
                    });
                  }}
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  再次預約
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-text-secondary text-sm">
                      貴賓大名 <span className="text-gold">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      className="bg-transparent border-0 border-b border-gold/30 rounded-none focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0 text-text-primary placeholder:text-text-secondary/50"
                      placeholder="請輸入姓名"
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label className="text-text-secondary text-sm">稱謂</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => handleChange('gender', value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" className="border-gold/50 text-gold" />
                        <Label htmlFor="male" className="text-text-secondary cursor-pointer">先生</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" className="border-gold/50 text-gold" />
                        <Label htmlFor="female" className="text-text-secondary cursor-pointer">小姐</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-text-secondary text-sm">
                    手機號碼 <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                    className="bg-transparent border-0 border-b border-gold/30 rounded-none focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0 text-text-primary placeholder:text-text-secondary/50"
                    placeholder="請輸入手機號碼"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-text-secondary text-sm">
                    電子信箱
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-transparent border-0 border-b border-gold/30 rounded-none focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0 text-text-primary placeholder:text-text-secondary/50"
                    placeholder="請輸入電子信箱"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-text-secondary text-sm">
                    備註訊息
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={4}
                    className="bg-transparent border border-gold/30 rounded-none focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0 text-text-primary placeholder:text-text-secondary/50 resize-none"
                    placeholder="請輸入您想了解的資訊或希望的賞屋時間"
                  />
                </div>

                {/* Agreement */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agree"
                    checked={formData.agree}
                    onCheckedChange={(checked) => handleChange('agree', checked as boolean)}
                    className="border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:border-gold mt-1"
                  />
                  <Label htmlFor="agree" className="text-text-secondary text-sm cursor-pointer leading-relaxed flex items-center flex-wrap">
                    我已詳閱並同意
                    <button type="button" onClick={() => setShowPrivacy(true)} className="text-gold hover:underline mx-1">隱私權政策</button>
                    同意貴公司收集及使用本人的個人資料。
                  </Label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!formData.agree || isSubmitting}
                  className={`w-full py-4 flex items-center justify-center gap-2 border transition-all duration-500 ${formData.agree
                    ? 'border-gold text-gold hover:bg-gold hover:text-dark'
                    : 'border-gold/30 text-gold/30 cursor-not-allowed'
                    }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>送出預約</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Disclaimer */}
                <p className="text-text-secondary/50 text-xs text-center">
                  ※ 網站內容為3D渲染情境示意圖，實際以現場公布為準，113建字第0069號。
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 left-0 w-px h-48 bg-gradient-to-b from-gold/30 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-px h-48 bg-gradient-to-t from-gold/30 to-transparent" />

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/90 backdrop-blur-sm">
          <div className="bg-dark/95 border border-gold/30 p-6 sm:p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl">
            <button
              type="button"
              onClick={() => setShowPrivacy(false)}
              className="absolute top-4 right-4 text-text-secondary hover:text-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="font-serif text-2xl text-gold mb-6 pb-4 border-b border-gold/20">個人資料保護政策暨隱私權聲明</h3>
            <div className="space-y-4 text-text-secondary text-sm leading-relaxed">
              <p>歡迎您瀏覽使用本網站，琢樸建設有限公司（以下稱「本公司」）尊重並保護您的隱私權。為了幫助您瞭解本網站如何蒐集、處理及利用您的個人資料，請您於填寫個人資料前，請務必詳細閱讀本網站的「隱私權聲明」。若您勾選「同意」，即表示您並同意本公司依下列條款蒐集、處理、使用您於本網站提供之個人資料。</p>
              <p><strong className="text-text-primary block mb-1">一、適用範圍</strong>本公司「隱私權聲明」適用於您使用本網站各項服務需填寫之資料，所涉及之個人資料蒐集、處理與利用行為。您瞭解此一同意符合個人資料保護法及相關法規之要求，具有書面同意本公司蒐集、處理及利用您的個人資料之效果。</p>
              <p><strong className="text-text-primary block mb-1">二、個人資料的蒐集、處理及利用方式</strong>當您使用本網站時，本公司為了解使用者需求與喜好，以便提供更好的服務，需請您提供以下個人資料：姓名、出生年月日、連絡方式(包括但不限於電話號碼、E-MAIL或居住地址)或其他得以直接或間接識別您個人之資料，並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本公司不會將個人資料用於其他用途。</p>
              <p><strong className="text-text-primary block mb-1">三、第三人使用個人資料之限制</strong>本公司絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。</p>
              <p><strong className="text-text-primary block mb-1">四、cookie 之運用</strong>基於網站內部管理之需要及提供最佳個人化服務，本公司網站將在您的瀏覽器中寫入 cookies 並讀取記錄瀏覽者的 IP 位址、上網時間以及在各項資訊查閱之次數，進行網站流量和網路行為調查之總量分析，不會對「個別」瀏覽者進行分析。</p>
            </div>
            <div className="mt-8 pt-6 border-t border-gold/20 flex justify-center">
              <button
                type="button"
                onClick={() => setShowPrivacy(false)}
                className="px-8 py-3 bg-gold text-dark hover:bg-gold/80 transition-colors font-medium tracking-widest"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
