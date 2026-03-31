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
        project: '‰ªÅÊ??âÁíΩ',
        name: formData.name.trim(),
        gender: formData.gender === 'male' ? '?? : 'Â•?,
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
      alert('?ÅÂá∫Â§±Ê?: ' + (error.message || '?™Áü•?ØË™§'));
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
      className="relative min-h-[100dvh] w-full py-32 overflow-hidden"
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
            ?êÁ?Ë≥ûÂ?
          </h2>
          <p className="text-text-secondary">Ë™†ÊëØ?ÄË´ãÊÇ®Ë¶™Ëá®?ëË?</p>
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
              <h3 className="font-serif text-2xl text-text-primary mb-6">?ØÁµ°Ë≥áË?</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/30">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <span className="text-gold/60 text-xs tracking-[0.15em] block mb-1">?çÂ?Â∞àÁ?</span>
                    <span className="text-text-primary text-lg">(02) 2236-1566</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/30">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <span className="text-gold/60 text-xs tracking-[0.15em] block mb-1">?•Â?‰∏≠Â?</span>
                    <span className="text-text-primary">?∞Â?Â∏ÇÊ?Â±±Â??®ÊüµË∑Ø‰?ÊÆ?83 ?ü‰?Ê®?/span>
                  </div>
                </div>

              </div>
            </div>

            {/* Business hours */}
            <div className="p-8 border border-gold/20 bg-dark/30">
              <h4 className="font-serif text-lg text-text-primary mb-4">?•Â??ÇÈ?</h4>
              <div className="space-y-4 text-text-secondary text-sm">
                <div className="flex justify-between items-center border-b border-gold/10 pb-2">
                  <span>?±‰??≥ÈÄ±‰?</span>
                  <span className="text-text-primary">09:00 - 12:00 / 13:30 - 18:00</span>
                </div>
                <div className="bg-gold/5 p-3 text-xs border border-gold/10 italic">
                  ??‰æãÂ??•Â??ãÂ??áÊó•?™Á?Ê•?                </div>
              </div>
            </div>

            {/* Note */}
            <div className="p-6 bg-gold/5 border-l-2 border-gold">
              <p className="text-text-secondary text-sm leading-relaxed">
                ???∫Ê?‰æõÊÇ®Â∞àÂ±¨?ÑË?Â±ãÊ??ôÔ?Âª∫Ë≠∞?êÂ??êÁ?Ôº?                ?ëÂÄëÂ?ÂÆâÊ?Â∞à‰∫∫?∫ÊÇ®Ë©≥Á¥∞‰ªãÁ¥π??              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="p-8 border border-gold/30 bg-dark/50">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 flex items-center justify-center border border-gold bg-gold/10 mb-6">
                  <Check className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-2xl text-text-primary mb-4">?êÁ??êÂ?</h3>
                <p className="text-text-secondary mb-6">
                  ?üË??®Á??êÁ?ÔºåÊ??ëÂ??°Âø´?áÊÇ®?ØÁπ´Á¢∫Ë?Ë≥ûÂ??ÇÈ???                </p>
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
                  ?çÊ¨°?êÁ?
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-text-secondary text-sm">
                      Ë≤¥Ë?Â§ßÂ? <span className="text-gold">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      className="bg-transparent border-0 border-b border-gold/30 rounded-none focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0 text-text-primary placeholder:text-text-secondary/50"
                      placeholder="Ë´ãËº∏?•Â???
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label className="text-text-secondary text-sm">Á®±Ë?</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => handleChange('gender', value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" className="border-gold/50 text-gold" />
                        <Label htmlFor="male" className="text-text-secondary cursor-pointer">?àÁ?</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" className="border-gold/50 text-gold" />
                        <Label htmlFor="female" className="text-text-secondary cursor-pointer">Â∞èÂ?</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-text-secondary text-sm">
                    ?ãÊ??üÁ¢º <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                    className="bg-transparent border-0 border-b border-gold/30 rounded-none focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0 text-text-primary placeholder:text-text-secondary/50"
                    placeholder="Ë´ãËº∏?•Ê?Ê©üË?Á¢?
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-text-secondary text-sm">
                    ?ªÂ?‰ø°ÁÆ±
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-transparent border-0 border-b border-gold/30 rounded-none focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0 text-text-primary placeholder:text-text-secondary/50"
                    placeholder="Ë´ãËº∏?•ÈõªÂ≠ê‰ø°ÁÆ?
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-text-secondary text-sm">
                    ?ôË®ªË®äÊÅØ
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={4}
                    className="bg-transparent border border-gold/30 rounded-none focus:border-gold focus-visible:ring-0 focus-visible:ring-offset-0 text-text-primary placeholder:text-text-secondary/50 resize-none"
                    placeholder="Ë´ãËº∏?•ÊÇ®?≥‰?Ëß??Ë≥áË??ñÂ??õÁ?Ë≥ûÂ??ÇÈ?"
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
                    ?ëÂ∑≤Ë©≥Èñ±‰∏¶Â???                    <button type="button" onClick={() => setShowPrivacy(true)} className="text-gold hover:underline mx-1">?±Á?Ê¨äÊîøÁ≠?/button>
                    ÔºåÂ??èË≤¥?¨Âè∏?∂È??ä‰Ωø?®Êú¨‰∫∫Á??ã‰∫∫Ë≥áÊ???                  </Label>
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
                      <span>?ÅÂá∫?êÁ?</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Disclaimer */}
                <p className="text-text-secondary/50 text-xs text-center">
                  ??Á∂≤Á??ßÂÆπ??DÊ∏≤Ê??ÖÂ?Á§∫Ê??ñÔ?ÂØ¶È?‰ª•Áèæ?¥ÂÖ¨Â∏ÉÁÇ∫Ê∫ñÔ?113Âª∫Â?Á¨?069?ü„Ä?                </p>
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
            <h3 className="font-serif text-2xl text-gold mb-6 pb-4 border-b border-gold/20">?ã‰∫∫Ë≥áÊ?‰øùË≠∑?øÁ??®Èö±ÁßÅÊ??≤Ê?</h3>
            <div className="space-y-4 text-text-secondary text-sm leading-relaxed">
              <p>Ê≠°Ë??®ÁÄèË¶Ω‰ΩøÁî®?¨Á∂≤Á´ôÔ??¢Ê®∏Âª∫Ë®≠?âÈ??¨Âè∏Ôºà‰ª•‰∏ãÁ®±?åÊú¨?¨Âè∏?çÔ?Â∞äÈ?‰∏¶‰?Ë≠∑ÊÇ®?ÑÈö±ÁßÅÊ??ÇÁÇ∫‰∫ÜÂπ´?©ÊÇ®?≠Ëß£?¨Á∂≤Á´ôÂ?‰ΩïË??Ü„ÄÅË??ÜÂ??©Áî®?®Á??ã‰∫∫Ë≥áÊ?ÔºåË??®ÊñºÂ°´ÂØ´?ã‰∫∫Ë≥áÊ??çÔ?Ë´ãÂ?ÂøÖË©≥Á¥∞Èñ±ËÆÄ?¨Á∂≤Á´ôÁ??åÈö±ÁßÅÊ??≤Ê??ç„ÄÇËã•?®Âãæ?∏„ÄåÂ??è„ÄçÔ??≥Ë°®Á§∫ÊÇ®‰∏¶Â??èÊú¨?¨Âè∏‰æù‰??óÊ?Ê¨æË??Ü„ÄÅË??Ü„ÄÅ‰Ωø?®ÊÇ®?ºÊú¨Á∂≤Á??ê‰?‰πãÂÄã‰∫∫Ë≥áÊ???/p>
              <p><strong className="text-text-primary block mb-1">‰∏Ä?ÅÈÅ©?®Á???/strong>?¨ÂÖ¨?∏„ÄåÈö±ÁßÅÊ??≤Ê??çÈÅ©?®Êñº?®‰Ωø?®Êú¨Á∂≤Á??ÑÈ??çÂ??ÄÂ°´ÂØ´‰πãË??ôÔ??ÄÊ∂âÂ?‰πãÂÄã‰∫∫Ë≥áÊ??êÈ??ÅË??ÜË??©Áî®Ë°åÁÇ∫?ÇÊÇ®?≠Ëß£Ê≠§‰??åÊ?Á¨¶Â??ã‰∫∫Ë≥áÊ?‰øùË≠∑Ê≥ïÂ??∏È?Ê≥ïË?‰πãË?Ê±ÇÔ??∑Ê??∏Èù¢?åÊ??¨ÂÖ¨?∏Ë??Ü„ÄÅË??ÜÂ??©Áî®?®Á??ã‰∫∫Ë≥áÊ?‰πãÊ??ú„Ä?/p>
              <p><strong className="text-text-primary block mb-1">‰∫å„ÄÅÂÄã‰∫∫Ë≥áÊ??ÑË??Ü„ÄÅË??ÜÂ??©Áî®?πÂ?</strong>?∂ÊÇ®‰ΩøÁî®?¨Á∂≤Á´ôÊ?ÔºåÊú¨?¨Âè∏?∫‰?Ëß?Ωø?®ËÄÖÈ?Ê±ÇË??úÂ•ΩÔºå‰ª•‰æøÊ?‰æõÊõ¥Â•ΩÁ??çÂ?ÔºåÈ?Ë´ãÊÇ®?ê‰?‰ª•‰??ã‰∫∫Ë≥áÊ?ÔºöÂ??ç„ÄÅÂá∫?üÂπ¥?àÊó•?ÅÈÄ?µ°?πÂ?(?ÖÊã¨‰ΩÜ‰??êÊñº?ªË©±?üÁ¢º?ÅE-MAIL?ñÂ?‰ΩèÂú∞?Ä)?ñÂÖ∂‰ªñÂ?‰ª•Áõ¥?•Ê??ìÊé•Ë≠òÂà•?®ÂÄã‰∫∫‰πãË??ôÔ?‰∏¶Âú®Ë©≤ÁâπÂÆöÁõÆ?ÑÁ??çÂÖß?ïÁ??äÂà©?®ÊÇ®?ÑÂÄã‰∫∫Ë≥áÊ?ÔºõÈ?Á∂ìÊÇ®?∏Èù¢?åÊ?ÔºåÊú¨?¨Âè∏‰∏çÊ?Â∞áÂÄã‰∫∫Ë≥áÊ??®Êñº?∂‰??®ÈÄî„Ä?/p>
              <p><strong className="text-text-primary block mb-1">‰∏â„ÄÅÁ¨¨‰∏â‰∫∫‰ΩøÁî®?ã‰∫∫Ë≥áÊ?‰πãÈ???/strong>?¨ÂÖ¨?∏Á?‰∏çÊ??ê‰??Å‰∫§?õ„ÄÅÂá∫ÁßüÊ??∫ÂîÆ‰ªª‰??®Á??ã‰∫∫Ë≥áÊ?Áµ¶ÂÖ∂‰ªñÂÄã‰∫∫?ÅÂ?È´î„ÄÅÁ?‰∫∫‰?Ê•≠Ê??¨Â?Ê©üÈ?Ôºå‰??âÊ?Âæã‰??öÊ??àÁ?Áæ©Â??ÖÔ?‰∏çÂú®Ê≠§È???/p>
              <p><strong className="text-text-primary block mb-1">?õ„ÄÅcookie ‰πãÈ???/strong>?∫ÊñºÁ∂≤Á??ßÈÉ®ÁÆ°Á?‰πãÈ?Ë¶ÅÂ??ê‰??Ä‰Ω≥ÂÄã‰∫∫?ñÊ??ôÔ??¨ÂÖ¨?∏Á∂≤Á´ôÂ??®ÊÇ®?ÑÁÄèË¶Ω?®‰∏≠ÂØ´ÂÖ• cookies ‰∏¶Ë??ñË??ÑÁÄèË¶Ω?ÖÁ? IP ‰ΩçÂ??Å‰?Á∂≤Ê??ì‰ª•?äÂú®?ÑÈ?Ë≥áË??•Èñ±‰πãÊ¨°?∏Ô??≤Ë?Á∂≤Á?ÊµÅÈ??åÁ∂≤Ë∑ØË??∫Ë™ø?•‰?Á∏ΩÈ??ÜÊ?Ôºå‰??ÉÂ??åÂÄãÂà•?çÁÄèË¶Ω?ÖÈÄ≤Ë??ÜÊ???/p>
            </div>
            <div className="mt-8 pt-6 border-t border-gold/20 flex justify-center">
              <button
                type="button"
                onClick={() => setShowPrivacy(false)}
                className="px-8 py-3 bg-gold text-dark hover:bg-gold/80 transition-colors font-medium tracking-widest"
              >
                ?ëÁü•?ì‰?
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
