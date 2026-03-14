import React from 'react';
import '../styles/Legal.css';

export const Legal: React.FC = () => {
  return (
    <div className="legal-container">
      <div className="legal-content">
        <h1>Tietosuoja ja Ehdot</h1>
        <p className="last-updated">Viimeksi päivitetty: 14.3.2026</p>

        {/* Privacy Policy / Tietosuojaseloste */}
        <section className="legal-section">
          <h2>🔒 Tietosuojaseloste (GDPR)</h2>

          <h3>1. Rekisterinpitäjä</h3>
          <p>
            Tämän palvelun rekisterinpitäjä vastaa henkilötietojesi käsittelystä GDPR:n (EU 2016/679) mukaisesti.
          </p>

          <h3>2. Kerättävät tiedot</h3>
          <p>Keräämme ja käsittelemme seuraavia tietoja:</p>
          <ul>
            <li><strong>Käyttäjätiedot:</strong> Sähköpostiosoite, etunimi, sukunimi</li>
            <li><strong>Valokuvat:</strong> Lataamasi kuvat ja niihin liittyvät metatiedot (otsikko, kuvaus, latausaika)</li>
            <li><strong>Äänestystiedot:</strong> Äänesi valokuvakilpailussa (äänestämäsi kuva ja äänestysajankohta)</li>
            <li><strong>Tekninen data:</strong> Istuntotiedot, IP-osoite, selaintyyppi (lokitiedoissa)</li>
          </ul>

          <h3>3. Tietojen käyttötarkoitus</h3>
          <p>Käytämme tietojasi seuraaviin tarkoituksiin:</p>
          <ul>
            <li>Käyttäjätilin luominen ja hallinta</li>
            <li>Valokuvakilpailun järjestäminen ja äänestyksen toteuttaminen</li>
            <li>Kuukausittaisten voittajien laskeminen ja julkaiseminen</li>
            <li>Palvelun tekninen ylläpito ja tietoturva</li>
            <li>Lakisääteisten velvoitteiden täyttäminen</li>
          </ul>

          <h3>4. Tietojen säilytys ja sijainti</h3>
          <div className="highlight-box">
            <p><strong>🇪🇺 Euroopan unionin alueella</strong></p>
            <p>
              Kaikki henkilötietosi ja valokuvasi säilytetään Amazon Web Services (AWS) -palveluissa
              <strong> EU:n alueella (eu-north-1, Tukholma, Ruotsi)</strong>.
            </p>
            <ul>
              <li><strong>Käyttäjätiedot:</strong> AWS DynamoDB (EU-North-1)</li>
              <li><strong>Valokuvat:</strong> AWS S3 (EU-North-1)</li>
              <li><strong>Tunnistautuminen:</strong> AWS Cognito (EU-North-1)</li>
            </ul>
            <p>
              Tietojasi ei siirretä Euroopan unionin tai Euroopan talousalueen ulkopuolelle.
              AWS on sitoutunut GDPR:ään ja tarjoaa DPA-sopimuksen (Data Processing Agreement).
            </p>
          </div>

          <h3>5. Tietojen säilytysaika</h3>
          <ul>
            <li><strong>Käyttäjätili:</strong> Säilytetään kunnes pyydät tilin poistamista</li>
            <li><strong>Valokuvat:</strong> Säilytetään kunnes poistat ne tai pyydät tilin poistamista</li>
            <li><strong>Äänestystiedot:</strong> Säilytetään kilpailuhistorian ja tulosten säilyttämiseksi</li>
            <li><strong>Lokitiedot:</strong> 90 päivää (AWS CloudWatch)</li>
          </ul>

          <h3>6. Tietojen jakaminen</h3>
          <p>Emme jaa henkilötietojasi kolmansille osapuolille, paitsi:</p>
          <ul>
            <li><strong>AWS:</strong> Tekninen palveluntarjoaja, joka käsittelee tietoja puolestamme EU:n alueella</li>
            <li><strong>Lakisääteinen velvoite:</strong> Jos laki sitä vaatii</li>
          </ul>
          <p>Valokuvasi ovat julkisesti nähtävissä kaikille palvelun käyttäjille osana kilpailua.</p>

          <h3>7. Oikeutesi (GDPR)</h3>
          <p>Sinulla on seuraavat oikeudet henkilötietoihisi:</p>
          <ul>
            <li><strong>Tarkastusoikeus:</strong> Oikeus saada kopio tiedoistasi</li>
            <li><strong>Oikeus tietojen oikaisemiseen:</strong> Oikeus korjata virheelliset tiedot</li>
            <li><strong>Oikeus tietojen poistamiseen:</strong> Oikeus pyytää tietojesi poistamista ("oikeus tulla unohdetuksi")</li>
            <li><strong>Oikeus käsittelyn rajoittamiseen:</strong> Oikeus pyytää käsittelyn rajoittamista</li>
            <li><strong>Oikeus siirtää tiedot järjestelmästä toiseen:</strong> Oikeus saada tietosi koneluettavassa muodossa</li>
            <li><strong>Oikeus vastustaa käsittelyä:</strong> Oikeus vastustaa tietojesi käsittelyä</li>
            <li><strong>Oikeus tehdä valitus:</strong> Oikeus tehdä valitus tietosuojavaltuutetulle</li>
          </ul>

          <h3>8. Tietoturva</h3>
          <p>Suojaamme tietojasi seuraavilla toimenpiteillä:</p>
          <ul>
            <li>🔐 <strong>Salasanojen suojaus:</strong> Käytämme AWS Cognito -palvelua, joka käyttää bcrypt-hajautusta</li>
            <li>🔒 <strong>HTTPS-yhteys:</strong> Kaikki tietoliikenne salataan TLS 1.2+ -protokollalla</li>
            <li>🛡️ <strong>Pääsynhallinta:</strong> Vain tunnistautuneet käyttäjät voivat ladata kuvia ja äänestää</li>
            <li>☁️ <strong>AWS-tietoturva:</strong> Hyödynnämme AWS:n SOC 2, ISO 27001 -sertifioitua infrastruktuuria</li>
            <li>📊 <strong>Lokitus:</strong> Kaikki toiminnot lokitetaan tietoturvavalvontaa varten</li>
            <li>🔄 <strong>Varmuuskopiointi:</strong> DynamoDB-tietokannat varmuuskopioidaan automaattisesti</li>
          </ul>

          <h3>9. Evästeet (Cookies)</h3>
          <p>
            Palvelu käyttää selaimen paikallista tallennustilaa (localStorage) istunnon hallintaan.
            Tallennamme JWT-tunnistetunnuksen (token) kirjautumisen yhteydessä. Nämä eivät ole evästeitä,
            vaan selaimeen tallennettuja merkkijonoja, jotka poistetaan kirjautuessa ulos.
          </p>

          <h3>10. Yhteydenotto tietosuoja-asioissa</h3>
          <p>
            Jos haluat käyttää GDPR-oikeuksiasi tai sinulla on kysyttävää tietosuojasta,
            ota yhteyttä sähköpostitse. Vastaamme pyyntöihisi 30 päivän kuluessa.
          </p>
        </section>

        {/* Terms of Service / Käyttöehdot */}
        <section className="legal-section">
          <h2>📋 Käyttöehdot</h2>

          <h3>1. Palvelun kuvaus</h3>
          <p>
            Valokuvakilpailu on kuukausittainen kilpailu, jossa käyttäjät voivat ladata valokuvia
            ja äänestää suosikkejaan. Jokainen käyttäjä voi ladata yhden kuvan kuukaudessa ja
            äänestää yhtä kuvaa kerrallaan. Ääntä voi vaihtaa toiseen kuvaan milloin tahansa
            kuukauden aikana.
          </p>

          <h3>2. Käyttäjän vastuut</h3>
          <p>Sitoudut seuraavaan:</p>
          <ul>
            <li>Lataamasi kuvat ovat itse ottamiasi tai sinulla on oikeus julkaista ne</li>
            <li>Kuvat eivät riko tekijänoikeuksia, tavaramerkkejä tai muita immateriaalioikeuksia</li>
            <li>Kuvat eivät sisällä loukkaavaa, väkivaltaista, pornografista tai laitonta sisältöä</li>
            <li>Et käytä palvelua roskapostin lähettämiseen tai häirintään</li>
            <li>Et yritä manipuloida äänestystuloksia tai murtautua järjestelmään</li>
            <li>Annat oikeat ja ajantasaiset tiedot rekisteröityessäsi</li>
          </ul>

          <h3>3. Kielletty sisältö</h3>
          <p>Seuraavat sisältötyypit ovat kiellettyjä:</p>
          <ul>
            <li>❌ Väkivaltainen, uhkaava tai vihamielinen sisältö</li>
            <li>❌ Pornografinen tai seksuaalisesti epäsopiva sisältö</li>
            <li>❌ Rasistinen, syrjivä tai vihapuhetta sisältävä sisältö</li>
            <li>❌ Lapsiin kohdistuva sopimaton sisältö</li>
            <li>❌ Tekijänoikeuksia tai muita oikeuksia rikkova sisältö</li>
            <li>❌ Harhaanjohtava tai petollinen sisältö</li>
            <li>❌ Henkilötietoja (osoitteita, puhelinnumeroita jne.) sisältävä sisältö</li>
          </ul>

          <h3>4. Kuvien käyttöoikeudet</h3>
          <p>
            <strong>Säilytät kaikki oikeudet lataamiisi kuviin.</strong> Lataamalla kuvan palveluun
            myönnät meille rajallisen, ei-yksinomaisen lisenssin:
          </p>
          <ul>
            <li>Tallentaa ja näyttää kuvasi palvelussa</li>
            <li>Optimoida kuvan kokoa ja muotoa teknistä esitystä varten (thumbnailit, web-versiot)</li>
            <li>Näyttää kuvasi julkisesti osana kilpailua</li>
            <li>Näyttää voittaneet kuvat tulossivulla</li>
          </ul>
          <p>
            <strong>Emme myy, lisensoi tai jaa kuviasi kaupallisiin tarkoituksiin.</strong>
            Voit poistaa kuvasi milloin tahansa, jolloin ne poistetaan myös palvelusta.
          </p>

          <h3>5. Äänestyssäännöt</h3>
          <ul>
            <li>✅ Voit äänestää yhtä kuvaa kerrallaan per kuukausi</li>
            <li>✅ Voit vaihtaa ääntäsi toiseen kuvaan milloin tahansa kuukauden aikana</li>
            <li>❌ Et voi äänestää omaa kuvaasi</li>
            <li>❌ Et voi äänestää samaa kuvaa useita kertoja samanaikaisesti</li>
            <li>✅ Äänestää voi vain kuluvalla kuukaudella ladattuja kuvia</li>
          </ul>

          <h3>6. Voittajien valinta</h3>
          <p>
            Kuukauden voittaja valitaan automaattisesti eniten ääniä saaneen kuvan perusteella.
            Voittaja lasketaan ja julkaistaan kuukauden vaihteessa (1. päivä klo 00:00 UTC). Tasatilanteessa
            aikaisemmin ladattu kuva voittaa.
          </p>

          <h3>7. Sisällön moderointi</h3>
          <p>
            Pidätämme oikeuden poistaa sisältöä, joka rikkoo näitä ehtoja. Vakavissa
            rikkomuksissa käyttäjätili voidaan sulkea. Saat ilmoituksen, jos sisältösi
            poistetaan.
          </p>

          <h3>8. Palvelun saatavuus</h3>
          <p>
            Pyrimme tarjoamaan palvelun katkeamatta, mutta emme takaa 100% käytettävyyttä.
            Palvelussa voi olla huoltokatoksia tai teknisiä häiriöitä. Ilmoitamme suuremmista
            huolloista etukäteen.
          </p>

          <h3>9. Vastuunrajoitus</h3>
          <p>
            Palvelu tarjotaan "sellaisena kuin se on" ilman takuita. Emme ole vastuussa:
          </p>
          <ul>
            <li>Palvelun käytöstä aiheutuvista välillisistä tai epäsuorista vahingoista</li>
            <li>Muiden käyttäjien toiminnasta tai lataamista sisällöistä</li>
            <li>Tiedonsiirto-ongelmista tai teknisistä vioista</li>
            <li>Kolmansien osapuolten palveluista (AWS)</li>
          </ul>

          <h3>10. Muutokset ehtoihin</h3>
          <p>
            Voimme päivittää näitä ehtoja. Merkittävistä muutoksista ilmoitetaan palvelussa.
            Jatkamalla palvelun käyttöä hyväksyt päivitetyt ehdot.
          </p>
        </section>

        {/* Technical Information / Tekniset tiedot */}
        <section className="legal-section">
          <h2>☁️ Tekninen toteutus ja tietoturva</h2>

          <h3>1. Käytetyt AWS-palvelut (EU-North-1)</h3>
          <div className="tech-grid">
            <div className="tech-card">
              <h4>🗄️ DynamoDB</h4>
              <p><strong>Käyttötarkoitus:</strong> Käyttäjätiedot, valokuvatiedot, äänestystiedot, voittajatiedot</p>
              <p><strong>Sijainti:</strong> EU-North-1 (Tukholma)</p>
              <p><strong>Tietoturva:</strong> Salaus levossa (encryption at rest), automaattiset varmuuskopiot</p>
            </div>

            <div className="tech-card">
              <h4>📦 S3 + CloudFront</h4>
              <p><strong>Käyttötarkoitus:</strong> Valokuvien tallennus ja jakelu</p>
              <p><strong>Sijainti:</strong> S3 bucket EU-North-1, CloudFront edge locations maailmanlaajuisesti</p>
              <p><strong>Tietoturva:</strong> Salaus levossa (AES-256), HTTPS-yhteydet, pääsynhallinta IAM:lla</p>
            </div>

            <div className="tech-card">
              <h4>🔐 Cognito</h4>
              <p><strong>Käyttötarkoitus:</strong> Käyttäjien rekisteröinti, kirjautuminen, tunnistautuminen</p>
              <p><strong>Sijainti:</strong> EU-North-1 (Tukholma)</p>
              <p><strong>Tietoturva:</strong> Bcrypt-salasanan hajautus, JWT-tunnisteet, MFA-tuki</p>
            </div>

            <div className="tech-card">
              <h4>⚡ Lambda + API Gateway</h4>
              <p><strong>Käyttötarkoitus:</strong> Palvelun sovelluslogiikka ja API-rajapinta</p>
              <p><strong>Sijainti:</strong> EU-North-1 (Tukholma)</p>
              <p><strong>Tietoturva:</strong> JWT-autorisointi, HTTPS, pääsynhallinta, lokitus CloudWatchiin</p>
            </div>
          </div>

          <h3>2. Tietojen salaus</h3>
          <ul>
            <li><strong>Siirto:</strong> TLS 1.2+ (HTTPS) kaikessa tietoliikenteessä</li>
            <li><strong>Lepo:</strong> AES-256 salaus S3:ssa ja DynamoDB:ssä</li>
            <li><strong>Salasanat:</strong> Bcrypt-hajautus, ei koskaan tallenneta selkotekstinä</li>
            <li><strong>JWT-tunnisteet:</strong> RS256-allekirjoitus, lyhyt voimassaoloaika</li>
          </ul>

          <h3>3. Lokitus ja valvonta</h3>
          <p>
            AWS CloudWatch kerää lokitietoja palvelun toiminnasta ja mahdollisista virheistä.
            Lokitiedot sisältävät:
          </p>
          <ul>
            <li>API-kutsujen aikaleimoja ja statuskoodeja</li>
            <li>Virhetapausten teknisiä tietoja</li>
            <li>IP-osoitteita (anonymisoitu 90 päivän jälkeen)</li>
          </ul>
          <p>
            Lokitietoja käytetään vain tekniseen vianmääritykseen ja tietoturvatapahtumien
            tutkimiseen. Ne eivät sisällä henkilökohtaisia viestejä tai kuvasisältöä.
          </p>

          <h3>4. Varmuuskopiointi</h3>
          <ul>
            <li><strong>DynamoDB:</strong> Point-in-time recovery (PITR) 35 päivää</li>
            <li><strong>S3:</strong> Versiointi käytössä, ei automaattista poistoa</li>
            <li><strong>Lambda-koodi:</strong> Versioitu GitHubissa</li>
          </ul>
        </section>

        {/* Data Subject Rights / Rekisteröidyn oikeudet */}
        <section className="legal-section">
          <h2>👤 Rekisteröidyn oikeudet</h2>

          <h3>Tietojen tarkastus ja lataaminen</h3>
          <p>
            Voit pyytää kopion kaikista sinusta tallennetuista tiedoista. Toimitamme tiedot
            JSON-muodossa 30 päivän kuluessa pyynnöstä.
          </p>

          <h3>Tietojen oikaisu</h3>
          <p>
            Voit päivittää nimeäsi tai sähköpostiosoitettasi ottamalla yhteyttä asiakastukeen.
            Kuvatietoja (otsikko, kuvaus) voi muokata poistamalla ja lataamalla kuvan uudelleen.
          </p>

          <h3>Tietojen poisto</h3>
          <p>
            Voit pyytää tietojesi ja tilisi poistamista. Poistamme:
          </p>
          <ul>
            <li>✅ Käyttäjätilisi AWS Cognitosta</li>
            <li>✅ Henkilötietosi DynamoDB:stä</li>
            <li>✅ Valokuvasi S3:sta ja CDN-välimuistista</li>
            <li>⚠️ Äänestyshistoria säilyy anonymisoituna (ilman yhteyttä sinuun) tilastollista analyysiä varten</li>
          </ul>

          <h3>Tietojen siirrettävyys</h3>
          <p>
            Voit pyytää tietojasi strukturoidussa, yleisesti käytetyssä ja koneluettavassa
            muodossa (JSON). Voimme toimittaa seuraavat tiedot:
          </p>
          <ul>
            <li>Käyttäjätietosi (nimi, sähköposti, rekisteröitymispäivä)</li>
            <li>Ladatut kuvat metatietoineen</li>
            <li>Äänestyshistoriasi</li>
          </ul>
        </section>

        {/* Image Rights and Licenses / Kuvien käyttöoikeudet */}
        <section className="legal-section">
          <h2>📸 Kuvien käyttöoikeudet ja lisenssit</h2>

          <h3>Sinun oikeutesi</h3>
          <p>
            <strong>Omistat edelleen kaikki oikeudet kuviisi.</strong> Lataamalla kuvan et luovu
            tekijänoikeuksista. Voit:
          </p>
          <ul>
            <li>✅ Käyttää kuvaasi muissa palveluissa</li>
            <li>✅ Myydä tai lisensoida kuvasi kolmansille osapuolille</li>
            <li>✅ Poistaa kuvasi palvelusta milloin tahansa</li>
          </ul>

          <h3>Palvelun oikeudet</h3>
          <p>
            Myönnät meille rajallisen, ei-yksinomaisen, maailmanlaajuisen, rojaltivapaan
            lisenssin:
          </p>
          <ul>
            <li>Tallentaa kuvasi AWS S3:een (EU-North-1)</li>
            <li>Näyttää kuvasi palvelussa muille käyttäjille</li>
            <li>Luoda optimoituja versioita (thumbnailit, web-versiot) teknistä esitystä varten</li>
            <li>Jakaa kuvasi CloudFront CDN:n kautta nopeampaa latausta varten</li>
            <li>Näyttää voittaneet kuvat julkisesti tulossivulla</li>
          </ul>
          <p>
            <strong>Emme käytä kuviasi:</strong>
          </p>
          <ul>
            <li>❌ Kaupallisissa mainoksissa</li>
            <li>❌ Kolmansien osapuolten palveluissa</li>
            <li>❌ Tekoälyn kouluttamiseen ilman suostumustasi</li>
            <li>❌ Muissa kuin tässä kuvatuissa tarkoituksissa</li>
          </ul>

          <h3>Kuvien poistaminen</h3>
          <p>
            Kun poistat kuvan:
          </p>
          <ul>
            <li>✅ Kuva poistetaan S3-bucketista</li>
            <li>✅ Metatiedot poistetaan DynamoDB:stä</li>
            <li>✅ CDN-välimuisti tyhjennetään (voi kestää 24h)</li>
            <li>⚠️ Jos kuva on voittanut kuukauden kilpailun, voittajatieto säilyy (kuva + metatiedot)</li>
          </ul>
        </section>

        {/* AWS and GDPR / AWS ja GDPR */}
        <section className="legal-section">
          <h2>🇪🇺 AWS ja GDPR-yhteensopivuus</h2>

          <h3>AWS:n GDPR-sitoutumukset</h3>
          <p>Amazon Web Services (AWS) on sitoutunut GDPR:ään seuraavilla tavoilla:</p>
          <ul>
            <li>✅ <strong>DPA-sopimus:</strong> AWS tarjoaa Data Processing Agreement (DPA) -sopimuksen</li>
            <li>✅ <strong>EU-tietosuojalausekkeet:</strong> AWS noudattaa EU:n standardisopimuslausekkeita</li>
            <li>✅ <strong>Sertifikaatit:</strong> ISO 27001, ISO 27017, ISO 27018, SOC 1/2/3</li>
            <li>✅ <strong>GDPR-työkalut:</strong> AWS tarjoaa työkaluja GDPR-vaatimusten täyttämiseen</li>
          </ul>

          <h3>Tietojen sijainti ja käsittely</h3>
          <div className="highlight-box">
            <p><strong>🌍 Kaikki tietosi säilyvät EU:n alueella</strong></p>
            <p>
              Olemme konfiguroineet palvelun siten, että kaikki henkilötietosi ja valokuvasi
              säilyvät AWS:n EU-North-1 -alueella (Tukholma, Ruotsi). Tietoja ei kopioida
              tai siirretä muille alueille.
            </p>
            <p>
              <strong>Huom:</strong> CloudFront CDN käyttää edge-sijainteja ympäri maailmaa
              nopeamman latauksen takaamiseksi, mutta varsinainen data säilyy S3:ssa EU:ssa.
              CDN-välimuisti ei ole pysyvää tallennusta.
            </p>
          </div>

          <h3>AWS:n rooli tietojenkäsittelijänä</h3>
          <p>
            AWS toimii tietojenkäsittelijänä (data processor) GDPR:n terminologian mukaan.
            AWS:
          </p>
          <ul>
            <li>Käsittelee tietoja vain meidän ohjeistuksemme mukaan</li>
            <li>Ei käytä tietoja omiin tarkoituksiinsa</li>
            <li>Toteuttaa asianmukaiset tekniset ja organisatoriset turvatoimet</li>
            <li>Auttaa meitä vastaamaan rekisteröityjen oikeuksien pyyntöihin</li>
            <li>Poistaa tai palauttaa tiedot sopimuksen päättyessä</li>
          </ul>

          <h3>Tietoturvaloukkauksien hallinta</h3>
          <p>
            Mahdollisen tietoturvaloukkauksen sattuessa:
          </p>
          <ul>
            <li>📢 Ilmoitamme viranomaisille 72 tunnin kuluessa (GDPR:n vaatimus)</li>
            <li>📧 Ilmoitamme käyttäjille, jos heidän tietojaan on vaarantunut</li>
            <li>🔍 Tutkimme tapahtuman ja toteutamme korjaavat toimenpiteet</li>
            <li>📊 Dokumentoimme tapauksen ja teemme tarvittavat muutokset</li>
          </ul>
        </section>

        {/* Contact and Complaints / Yhteydenotto */}
        <section className="legal-section">
          <h2>📬 Yhteydenotto</h2>

          <h3>Tietosuoja-asiat</h3>
          <p>
            Jos haluat käyttää GDPR-oikeuksiasi tai sinulla on kysyttävää tietosuojasta:
          </p>
          <div className="contact-box">
            <p><strong>Sähköposti:</strong> artur.gajewski@hotmail.com</p>
            <p><strong>Vastausaika:</strong> 30 päivää GDPR:n mukaisesti</p>
          </div>

        </section>

        {/* Acceptance / Hyväksyntä */}
        <section className="legal-section acceptance-section">
          <h2>✅ Ehtojen hyväksyminen</h2>
          <p>
            Käyttämällä tätä palvelua hyväksyt nämä käyttöehdot ja tietosuojaselosteen.
            Jos et hyväksy ehtoja, älä käytä palvelua.
          </p>
          <p>
            <strong>Rekisteröityessäsi</strong> vahvistat, että:
          </p>
          <ul>
            <li>✅ Olet lukenut ja ymmärtänyt nämä ehdot</li>
            <li>✅ Hyväksyt henkilötietojesi käsittelyn kuvatulla tavalla</li>
            <li>✅ Olet vähintään 16-vuotias tai sinulla on huoltajan suostumus</li>
            <li>✅ Lataamasi kuvat eivät riko tekijänoikeuksia tai muita oikeuksia</li>
          </ul>
        </section>

        {/* Footer */}
        <div className="legal-footer">
          <p>
            Viimeksi päivitetty: 14. maaliskuuta 2026<br />
            Versio: 1.0
          </p>
        </div>
      </div>
    </div>
  );
};

