/**
 * Ratgeber auf Türkisch. Inhaltliche Vorgabe: QUELLE.md.
 * [[Wort]] = deutsches Fachwort, bleibt deutsch (so steht es im Brief).
 * Türkische Endung nach dem Fachwort mit typografischem Apostroph: [[Jobcenter]]’dan.
 * FAQ-Antworten ohne HTML — sie landen 1:1 im FAQPage-Schema.
 */
module.exports = {
  ui: {
    locale: 'tr_TR',
    start: 'Ana sayfa',
    ratgeber: 'Rehber',
    testen: 'Ücretsiz dene',
    kurzTitel: 'Kısaca en önemli bilgiler',
    faqTitel: 'Sık sorulan sorular',
    ctaKnopf: 'Ücretsiz dene',
    deHinweis: 'Resmi kelimeleri, örneğin [[Frist]] (süre), Almanca bırakıyoruz ve Türkçe açıklıyoruz. Böylece onları mektubunuzda kolayca bulursunuz.',
    mehrTitel: 'Diğer Türkçe rehberler',
    andereSprachen: 'Bu metin başka dillerde:',
    ratgeberTitel: 'Rehber: Alman resmi dairelerinden gelen mektuplar',
  },

  artikel: {
    // ───────────────────────────────────────────────────────────────
    'behoerdenbrief-verstehen': {
      titel: 'Almanca resmi mektubu anlamak: Ne yazıyor, ne yapmalı?',
      beschreibung: 'Alman devlet dairesinden mektup geldi ve anlamadınız mı? Basit Türkçe ile: süreyi (Frist) nasıl bulursunuz, Bescheid ne demek, ne zaman cevap verilir?',
      ogTitel: 'Alman devlet dairesinden mektup: Nasıl anlaşılır?',
      ogBeschreibung: 'Kim yazıyor, ne zamana kadar, ne yapmanız gerekiyor? Adım adım, en önemli Almanca kelimelerle.',
      kurztitel: 'Resmi mektubu anlamak',
      karte: 'Kim yazıyor, ne zamana kadar, ne yapmanız gerekiyor? Adım adım, en önemli Almanca kelimelerle.',
      brot: 'Mektubu anlamak',
      kicker: 'Rehber · Resmi mektuplar',
      h1a: 'Alman devlet dairesinden mektup mu geldi?',
      h1b: 'Adım adım anlayın',
      intro: [
        '[[Jobcenter]]’dan, vergi dairesinden ([[Finanzamt]]) veya yabancılar dairesinden ([[Ausländerbehörde]]) bir mektup geldi ve ne yazdığını anlamadınız mı? Bu çok normal. Resmi yazıların Almancası ([[Amtsdeutsch]]) Almanlar için bile zordur.',
        'En önemli kural: <strong>Mektubu bir kenara bırakmayın.</strong> Mektupta çoğu zaman bir süre vardır. Süre geçerse, durumu düzeltmek zor olabilir. Aşağıda mektubu adım adım nasıl okuyacağınızı anlatıyoruz.',
      ],
      kurz: [
        'Önce <strong>kimin yazdığına</strong> ve <strong>mektubun konusuna</strong> ([[Betreff]]) bakın.',
        '<strong>Süreyi veya randevu tarihini</strong> bulun: [[bis]], [[innerhalb]], [[spätestens]] gibi kelimeleri arayın.',
        'Kendinize sorun: <strong>Benden ne istiyorlar</strong> ve <strong>ne zamana kadar</strong>?',
        'Mektubu <strong>görmezden gelmeyin</strong>: Kaçırılan bir süre en pahalı hatadır.',
      ],
      abschnitte: [
        {
          h2: 'Mektubu 6 adımda okuyun',
          html: `<ol>
      <li><strong>Gönderen.</strong> Hangi daire veya kurum yazıyor? Örneğin [[Jobcenter]] (sosyal yardım ve iş bulma dairesi), [[Finanzamt]] (vergi dairesi), [[Ausländerbehörde]] (yabancılar dairesi), [[Familienkasse]] (çocuk parası ödeyen kurum) veya [[Krankenkasse]] (sağlık sigortası). Adı genellikle en üstte yazılıdır.</li>
      <li><strong>Konu.</strong> Metnin üstünde kalın yazılmış bir satır vardır. Buna [[Betreff]] (konu) denir. Mektubun ne hakkında olduğunu gösterir.</li>
      <li><strong>Süre veya randevu.</strong> Tarihleri ve [[bis]] (… tarihine kadar), [[innerhalb]] (… içinde), [[spätestens]] (en geç) kelimelerini arayın. Tarihi bir yere yazın.</li>
      <li><strong>Sizden ne isteniyor?</strong> Belge mi göndermelisiniz? Bir randevuya ([[Termin]]) mi gitmelisiniz? Para mı ödemelisiniz? Mektubun en önemli kısmı budur.</li>
      <li><strong>[[Rechtsbehelfsbelehrung]].</strong> Bu bölüm bir kararın ([[Bescheid]]) en altında yer alır. Karara nasıl ve ne zamana kadar itiraz edebileceğinizi anlatır.</li>
      <li><strong>[[Aktenzeichen]].</strong> Bu, dosya numaranızdır. Bir yere yazın. Daireye yazarken veya telefon ederken bu numarayı her zaman belirtin.</li>
    </ol>`,
        },
        {
          h2: 'Her mektuba cevap vermem gerekir mi?',
          html: `<p>Hayır. Mektup sadece bilgi veriyorsa, cevap vermeniz gerekmez. Ama mektupta bir <strong>süre</strong>, sizden bir <strong>istek</strong> veya bir <strong>randevu tarihi</strong> varsa, harekete geçmelisiniz. Bu yüzden her mektupta bir süre olup olmadığına bakın.</p>
    <p>Daireye cevap genellikle Almanca yazılır. Cevap yazmak size zor geliyorsa, bir danışma merkezinden yardım isteyin (aşağıya bakın).</p>`,
        },
        {
          h2: 'Mektuplardaki önemli kelimeler ve anlamları',
          html: `<ul>
      <li>[[Bescheid]] — dairenin resmi kararı. Örneğin para veya başvurunuz hakkında.</li>
      <li>[[Frist]] — süre veya son tarih: Bu tarihe kadar bir şey yapmanız gerekir.</li>
      <li>[[Antrag]] — başvuru: daireye yazılı bir istek, örneğin para almak için.</li>
      <li>[[Unterlagen]], [[Nachweis]] — bir şeyi kanıtlayan belgeler.</li>
      <li>[[Mitwirkungspflicht]] — daireye yardım etme göreviniz. Örneğin belgeleri zamanında göndermek.</li>
      <li>[[Anhörung]] — daire karar vermeden önce sizin görüşünüzü sorar. Durumunuzu anlatabilirsiniz.</li>
      <li>[[Rechtsbehelfsbelehrung]] — karara nasıl ve ne zamana kadar itiraz edebileceğinizi anlatır.</li>
      <li>[[Widerspruch]] — itiraz: Daireden kararı bir kez daha kontrol etmesini istersiniz.</li>
      <li>[[Bestandskraft]], [[bestandskräftig]] — karar kesinleşti, çünkü itiraz süresi geçti.</li>
      <li>[[Aktenzeichen]] — dosya numaranız.</li>
    </ul>`,
        },
        {
          h2: 'Mektubu yine de anlamıyorsam ne yapmalıyım?',
          html: `<p>Endişelenmeyin, yardım var. Mektubu basit kelimelerle açıklatabilirsiniz. Örneğin mektubun fotoğrafını BehördenKlar’a yükleyin. Ya da ücretsiz bir danışma merkezine sorun. Önemli olan şu: Mektubu bir kenara koymayın, <strong>zamanında harekete geçin</strong>.</p>`,
        },
        {
          h2: 'Ücretsiz yardımı nerede bulurum?',
          html: `<ul>
      <li><strong>[[Migrationsberatung für Erwachsene (MBE)]]</strong> — yetişkin göçmenler için danışmanlık. Ücretsizdir ve çoğu zaman birçok dilde yapılır. Türkçe konuşan biri olup olmadığını sorabilirsiniz.</li>
      <li><strong>[[Jugendmigrationsdienst (JMD)]]</strong> — genç göçmenler için danışmanlık.</li>
      <li>[[Caritas]], [[Diakonie]], [[AWO]] ve [[DRK]] gibi sosyal kuruluşlar da ücretsiz danışmanlık yapar.</li>
    </ul>`,
        },
      ],
      faq: [
        {
          f: 'Alman devlet dairesinden gelen mektubu anlamazsam ne yapmalıyım?',
          a: 'Önce mektubun konusunu ([[Betreff]]) okuyun ve bir tarih veya süre ([[Frist]]) arayın. Sonra mektubu basit kelimelerle açıklatın: örneğin fotoğrafla BehördenKlar ile veya ücretsiz bir danışma merkezinde ([[Migrationsberatung]]). En kötüsü hiçbir şey yapmamaktır, çünkü süre geçebilir.',
        },
        {
          f: 'Resmi daireden gelen her mektuba cevap vermem gerekir mi?',
          a: 'Hayır. Mektup sadece bilgi veriyorsa cevap gerekmez. Ama mektupta bir süre, belge isteği veya randevu ([[Termin]]) varsa, zamanında harekete geçmelisiniz.',
        },
        {
          f: '[[Rechtsbehelfsbelehrung]] ne demek?',
          a: 'Bir kararın ([[Bescheid]]) sonundaki bölümdür. Karara nasıl, ne zamana kadar ve nereye itiraz edebileceğinizi (örneğin [[Widerspruch]] ile) anlatır. İtiraz süresi de orada yazılıdır.',
        },
        {
          f: 'Almanca mektubu Türkçe açıklatabilir miyim?',
          a: 'Evet. BehördenKlar mektubu basit Türkçe ile açıklar: Fotoğraf veya PDF yüklersiniz, mektupta ne yazdığını, varsa sürenin ne zaman bittiğini ve ne yapmanız gerektiğini görürsünüz. 2 mektup ücretsiz, hesap açmadan. Ücretsiz danışma merkezleri de yardım eder. Daireye cevap genellikle Almanca yazılır.',
        },
      ],
      hinweis: 'Bu metin genel bilgi verir ve hukuki danışmanlık yerine geçmez. Önemli kararlar için bir danışma merkezine veya avukata başvurun.',
      ctaTitel: 'Mektubu anlamadınız mı? Bir fotoğraf yeter',
      ctaText: 'BehördenKlar mektubunuzu basit Türkçe ile açıklar: ne yazıyor, süre varsa ne zaman bitiyor, ne yapmanız gerekiyor — madde madde. Zor kelimeler açıklanır. Son tarihi tek tuşla telefonunuzun takvimine ekleyebilirsiniz. 2 mektup ücretsiz, hesap açmadan, doğrudan tarayıcıda.',
    },

    // ───────────────────────────────────────────────────────────────
    'jobcenter-mitwirkungsaufforderung': {
      titel: 'Jobcenter’dan mektup: Mitwirkungsaufforderung ne demek?',
      beschreibung: 'Jobcenter’dan mektup geldi ve içinde “Mitwirkung” mu yazıyor? Basit Türkçe ile: ne demek, süre bitmeden ne yapmalısınız, cevap vermezseniz ne olur?',
      ogTitel: 'Jobcenter’dan mektup: Mitwirkungsaufforderung ne demek?',
      ogBeschreibung: 'Mektup ne anlama geliyor, süre bitmeden ne yapmalısınız ve cevap vermezseniz ne olur?',
      kurztitel: '[[Jobcenter]] mektubu: [[Mitwirkungsaufforderung]]',
      karte: '[[Jobcenter]] belge mi istiyor? Süre bitmeden ne yapmalısınız, cevap vermezseniz ne olur?',
      brot: 'Jobcenter',
      kicker: 'Rehber · Jobcenter',
      h1a: '[[Jobcenter]]’dan mektup geldi:',
      h1b: '[[Mitwirkungsaufforderung]] ne demek?',
      intro: [
        '[[Jobcenter]]’dan mektup geldi ve içinde [[Mitwirkung]] ya da [[Mitwirkungsaufforderung]] kelimesi mi geçiyor? Bu, kısaca “bize belge veya bilgi gönderin” demektir. Korkmayın. Bu mektup genellikle panik sebebi değildir. Ama <strong>zamanında cevap vermeniz</strong> gerekir.',
        'Burada basit Türkçe ile anlatıyoruz: Bu mektup ne demek ve şimdi ne yapmalısınız?',
      ],
      kurz: [
        '[[Jobcenter]] sizden <strong>belge veya bilgi</strong> istiyor.',
        'Mektupta bir <strong>süre</strong> ([[Frist]]) var: Bu tarihe kadar cevap vermelisiniz.',
        '<strong>Cevap vermezseniz</strong>, paranız azaltılabilir veya durdurulabilir.',
        'Belgeleri gönderirseniz, her şey genellikle eskisi gibi devam eder.',
      ],
      abschnitte: [
        {
          h2: '[[Mitwirkungsaufforderung]] nedir?',
          html: `<p>[[Jobcenter]] size para öder, örneğin [[Bürgergeld]] veya [[Grundsicherung]] (sosyal yardım). Bunun için durumunuzu bilmesi gerekir. Bu yüzden bazen sizden belge ister. İşte buna [[Mitwirkungsaufforderung]] denir. Türkçesi “işbirliği çağrısı”, yani: “Bize yardım edin, belgeleri gönderin.”</p>
    <p>Bu kural kanunda yazılıdır ([[§ 60 SGB I]]): Yardım alan herkes daireyle işbirliği yapmak zorundadır. Bu mektubu yardım alan herkes alabilir — size karşı kişisel bir şey değildir.</p>`,
        },
        {
          h2: 'Bu mektup neden geldi?',
          html: `<p>Sık görülen sebepler:</p>
    <ul>
      <li>Ödeme süreniz yakında bitiyor. Paranın devam etmesi için yeni bir onay gerekiyor ([[Weiterbewilligung]]).</li>
      <li>Dosyanızda <strong>belgeler eksik</strong>.</li>
      <li>Bir şey değişti: kira, gelir veya evde yaşayan kişiler. [[Jobcenter]] bunu kontrol etmek istiyor.</li>
    </ul>`,
        },
        {
          h2: 'Şimdi ne yapmalısınız? Adım adım',
          html: `<ol>
      <li><strong>Süreyi bulun.</strong> Mektupta bir tarih yazılıdır. Bu tarihe kadar cevap vermelisiniz. Tarihi bir yere yazın.</li>
      <li><strong>Belgeleri toplayın.</strong> Hangi belgelerin gerektiği mektupta yazılıdır. Örneğin banka hesap dökümleri ([[Kontoauszüge]]), kira sözleşmesi ([[Mietvertrag]]) veya doldurulmuş formlar.</li>
      <li><strong>Zamanında teslim edin.</strong> Belgeleri [[Jobcenter]]’a kendiniz götürün, postayla gönderin veya internetten yükleyin (birçok [[Jobcenter]]’da <strong>jobcenter.digital</strong> üzerinden).</li>
      <li><strong>Kanıtı saklayın.</strong> Belgelerin fotoğrafını çekin veya fotokopisini alın. Teslim ettiğinizi gösteren belgeyi de saklayın.</li>
    </ol>`,
        },
        {
          h2: 'Hiçbir şey yapmazsam ne olur?',
          html: `<p><strong>Önemli bir sebep olmadan</strong> zamanında cevap vermezseniz, [[Jobcenter]] <strong>ödemenin tamamını veya bir kısmını vermeyebilir ya da durdurabilir</strong> ([[§ 66 SGB I]]). Yani belgeler gelene kadar daha az para alabilirsiniz veya hiç para alamayabilirsiniz. Bu yüzden süre çok önemlidir.</p>
    <p>Belgeleri sonradan gönderirseniz, ödeme <strong>genellikle</strong> devam eder.</p>`,
        },
        {
          h2: 'Süre yetmiyor veya mektubu anlamıyorum',
          html: `<ul>
      <li><strong>Süre çok mu kısa?</strong> <strong>Süre bitmeden</strong> [[Jobcenter]]’a haber verin ve <strong>yazılı olarak</strong> daha fazla zaman isteyin. Sebebini kısaca yazın.</li>
      <li><strong>Yakınınızda yardım:</strong> Ücretsiz danışma merkezleri — örneğin [[Migrationsberatung für Erwachsene (MBE)]], [[Caritas]], [[Diakonie]] veya [[AWO]] — mektubu anlamanıza ve formları doldurmanıza yardım eder.</li>
      <li><strong>Mektup anlaşılmıyor mu?</strong> Basit kelimelerle açıklatın — nasıl yapılacağını aşağıda bulabilirsiniz.</li>
    </ul>`,
        },
      ],
      faq: [
        {
          f: '[[Jobcenter]]’dan gelen [[Mitwirkungsaufforderung]] ne demek?',
          a: '[[Jobcenter]], ödeme hakkınızı kontrol etmek için sizden belge veya bilgi istiyor. Kanuna göre ([[§ 60 SGB I]]) daireyle işbirliği yapmak ve istenen belgeleri mektupta yazan tarihe kadar göndermek zorundasınız.',
        },
        {
          f: '[[Jobcenter]]’a cevap vermezsem ne olur?',
          a: 'Önemli bir sebep olmadan zamanında cevap vermezseniz, [[Jobcenter]] ödemenin tamamını veya bir kısmını vermeyebilir ya da durdurabilir ([[§ 66 SGB I]]). Belgeleri sonradan gönderirseniz, ödeme genellikle devam eder.',
        },
        {
          f: 'Belgeleri süre içinde gönderemezsem ne yapmalıyım?',
          a: 'Süre bitmeden [[Jobcenter]]’a haber verin ve yazılı olarak daha fazla zaman isteyin. Sebebini kısaca yazın. Ücretsiz bir danışma merkezi bu konuda size yardım edebilir.',
        },
        {
          f: 'Belgeleri internetten gönderebilir miyim?',
          a: 'Evet, belgeleri çoğu zaman jobcenter.digital üzerinden yükleyebilirsiniz. Belgeleri kendiniz de götürebilir veya postayla gönderebilirsiniz. Her zaman bir kopya ve teslim ettiğinizi gösteren bir kanıt saklayın.',
        },
      ],
      hinweis: 'Bu metin genel bilgi verir ve hukuki danışmanlık yerine geçmez. Önemli kararlar için (örneğin itiraz, [[Widerspruch]]) bir danışma merkezine veya avukata başvurun.',
      ctaTitel: 'Mektubunuzu Türkçe açıklatın',
      ctaText: 'Mektubun fotoğrafını veya PDF dosyasını BehördenKlar’a yükleyin. [[Jobcenter]]’ın ne istediğini, hangi tarihe kadar istediğini ve hangi belgelerin gerektiğini basit Türkçe ile, liste hâlinde görürsünüz. 2 mektup ücretsiz, hesap açmadan.',
    },

    // ───────────────────────────────────────────────────────────────
    'auslaenderbehoerde-termin-aufenthaltstitel': {
      titel: 'Yabancılar Dairesinden mektup: randevu ve oturum uzatma',
      beschreibung: 'Yabancılar Dairesinden (Ausländerbehörde) mektup mu geldi? Randevuya (Termin) ne götürülür, oturum izni nasıl uzatılır, Fiktionsbescheinigung nedir?',
      ogTitel: 'Ausländerbehörde’den mektup: randevu ve oturum uzatma',
      ogBeschreibung: 'Randevuya hangi belgeleri götürmeli, oturum izni nasıl uzatılır ve Fiktionsbescheinigung nedir?',
      kurztitel: '[[Ausländerbehörde]]’den mektup',
      karte: 'Randevuya ne götürülür, oturum izni nasıl uzatılır, [[Fiktionsbescheinigung]] nedir?',
      brot: 'Ausländerbehörde',
      kicker: 'Rehber · Ausländerbehörde',
      h1a: '[[Ausländerbehörde]]’den mektup:',
      h1b: 'randevu ve oturum uzatma',
      intro: [
        '[[Ausländerbehörde]]’nin Türkçesi Yabancılar Dairesidir. Birçok kişi buna kısaca [[Ausländeramt]] der. Bazı yerlerde adı farklıdır: [[Landesamt für Einwanderung]], [[Migrationsamt]] veya [[Amt für Migration]]. Çoğu zaman şehrin veya ilçenin ([[Kreis]]) bir bölümüdür.',
        'Oradan gelen mektup çoğu zaman bir <strong>randevu davetidir</strong> ([[Termin]]). Almanya’da birçok kişi Türkçe konuşurken de “termin” der. Genellikle konu, oturum izninizin ([[Aufenthaltstitel]]) uzatılmasıdır. En önemlisi: <strong>Randevuya zamanında gidin</strong> ve <strong>bütün belgelerin aslını</strong> götürün.',
      ],
      kurz: [
        'Çoğu zaman konu, oturum izninizin ([[Aufenthaltstitel]]) <strong>uzatılmasıdır</strong>.',
        'Mektupta <strong>tarih, saat, adres</strong> ve <strong>belge listesi</strong> vardır.',
        'Belgelerin <strong>aslını</strong> götürün — eksik belge her şeyi geciktirir.',
        'Randevuyu <strong>kaçırmayın</strong>: Kaçırılan bir randevu, oturumunuzla ilgili sorun çıkarabilir.',
      ],
      abschnitte: [
        {
          h2: 'Mektup neden geldi?',
          html: `<p>Sık görülen sebepler:</p>
    <ul>
      <li>Oturum izniniz (örneğin [[Aufenthaltserlaubnis]], yani süreli oturum izni) <strong>yakında bitiyor</strong> ve uzatılması gerekiyor.</li>
      <li>Dairenin karar vermek için ihtiyaç duyduğu <strong>belgeler eksik</strong>.</li>
      <li><strong>Şahsen gelmeniz</strong> gerekiyor ([[Vorsprache]]): örneğin parmak izi vermek veya imza atmak için.</li>
    </ul>
    <p>Mektupta [[Termin]], [[Vorsprache]] veya [[Ladung]] kelimeleri varsa, bu şu demektir: Daireye gelmeniz isteniyor.</p>`,
        },
        {
          h2: 'Randevuya ne götürmeliyim?',
          html: `<p><strong>Tam liste mektubunuzda yazılıdır</strong> — bu listeye tam olarak uyun. Sık istenen belgeler:</p>
    <ul>
      <li>Pasaport ([[Reisepass]]) ve şimdiki oturum izniniz ([[Aufenthaltstitel]])</li>
      <li>Yeni biyometrik vesikalık fotoğraflar ([[biometrische Passfotos]])</li>
      <li>Sağlık sigortası belgesi ([[Krankenversicherung]])</li>
      <li>Gelir belgesi ([[Einkommen]]): örneğin maaş bordroları veya iş sözleşmesi</li>
      <li>Güncel ikametgâh (adres kayıt) belgesi ([[Meldebescheinigung]], halk arasında „Anmeldung“ denir), çoğu zaman kira sözleşmesi ([[Mietvertrag]]) de</li>
    </ul>
    <p>İpucu: Her şeyi bir gün önceden, akşamdan hazırlayın. Mektubun kendisini de yanınıza alın.</p>`,
        },
        {
          h2: 'Oturum uzatma: [[Fiktionsbescheinigung]] nedir?',
          html: `<p>Bazen oturum izniniz biter, ama daire uzatma hakkında <strong>henüz</strong> karar vermemiştir. Uzatma başvurusunu oturum izninizin süresi <strong>dolmadan</strong> yaptıysanız, <strong>genellikle</strong> bir [[Fiktionsbescheinigung]] alırsınız. Bu, geçici bir belgedir.</p>
    <p>Bu belge şunu gösterir: Karar verilene kadar Almanya’da kalmanıza <strong>şimdilik</strong> izin vardır. Bu yüzden uzatma başvurusunu her zaman erken yapın.</p>`,
        },
        {
          h2: 'Randevuya gidemiyorum',
          html: `<p><strong>Gidemiyorsanız, mutlaka haber verin.</strong> Randevuyu mümkün olduğunca erken iptal edin ve yeni bir randevu isteyin — telefonla veya yazılı olarak. Her zaman dosya numaranızı ([[Aktenzeichen]]) belirtin. Kaçırılan randevular işlemleri geciktirebilir.</p>`,
        },
        {
          h2: 'Ücretsiz yardımı nerede bulurum?',
          html: `<ul>
      <li><strong>[[Migrationsberatung für Erwachsene (MBE)]]</strong> (yetişkin göçmenler için) ve <strong>[[Jugendmigrationsdienst (JMD)]]</strong> (genç göçmenler için) ücretsiz danışmanlık verir, çoğu zaman birçok dilde.</li>
      <li>[[Caritas]], [[Diakonie]] ve [[AWO]] de oturum konularında danışmanlık yapar.</li>
    </ul>`,
        },
      ],
      faq: [
        {
          f: 'Yabancılar Dairesi ([[Ausländerbehörde]]) randevusuna ne götürmeliyim?',
          a: 'Tam liste mektubunuzda yazılıdır. Çoğu zaman şunlar istenir: pasaport ([[Reisepass]]) ve şimdiki oturum izniniz ([[Aufenthaltstitel]]), yeni biyometrik fotoğraflar, sağlık sigortası belgesi, gelir belgesi, güncel ikametgâh (adres kayıt) belgesi ([[Meldebescheinigung]]) ve çoğu zaman kira sözleşmesi. Bütün belgelerin aslını götürün.',
        },
        {
          f: 'Oturum iznim, başvurum incelenirken biterse ne olur?',
          a: 'Uzatma başvurusunu oturum izninizin süresi dolmadan yaptıysanız, daire genellikle bir [[Fiktionsbescheinigung]] verir. Bu belge, karar verilene kadar Almanya’da geçici olarak kalabileceğinizi gösterir.',
        },
        {
          f: 'Randevuya gidemiyorum, ne yapmalıyım?',
          a: 'Randevuyu mümkün olduğunca erken iptal edin ve yeni bir randevu isteyin — telefonla veya yazılı olarak, dosya numaranızla ([[Aktenzeichen]]). Haber vermeden randevuya gitmezseniz, işlemler gecikebilir.',
        },
        {
          f: '[[Fiktionsbescheinigung]] nedir?',
          a: '[[Ausländerbehörde]]’nin verdiği geçici bir belgedir. Daire uzatma başvurunuz hakkında karar verene kadar Almanya’da şimdilik kalabileceğinizi gösterir. Uzatma başvurusunu oturum izninizin süresi dolmadan yaptıysanız, genellikle bu belgeyi alırsınız.',
        },
      ],
      hinweis: 'Bu metin genel bilgi verir ve hukuki danışmanlık yerine geçmez. Oturum konularında çok şey kişisel durumunuza bağlıdır. Bir danışma merkezine veya göç hukuku alanında çalışan bir avukata başvurun.',
      ctaTitel: 'Mektubu kendi dilinizde anlayın',
      ctaText: 'Mektubun fotoğrafını veya PDF dosyasını BehördenKlar’a yükleyin. Basit Türkçe ile görürsünüz: randevunun tarihi ve saati, hangi belgeleri götürmeniz gerektiği ve ne yapmanız gerektiği — liste hâlinde. Daireyi aramanız gerekirse, telefon görüşmesi için Almanca cümleleri Türkçe anlamlarıyla birlikte de görürsünüz. 2 mektup ücretsiz, hesap açmadan.',
    },
  },
};
