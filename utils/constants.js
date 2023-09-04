const dummyResponse = `
<body lang=ES-MX link=blue vlink=purple style='tab-interval:36.0pt'>

<div class=WordSection1>
<div style='mso-element:para-border-div;border:solid windowtext 1.0pt;
mso-border-alt:solid windowtext .5pt;padding:1.0pt 4.0pt 1.0pt 4.0pt'>

  <p class=MsoNormal align=center style='text-align:center;tab-stops:21.4pt 61.4pt;
border:none;mso-border-alt:solid windowtext .5pt;padding:0cm;mso-padding-alt:
1.0pt 4.0pt 1.0pt 4.0pt'><b style='mso-bidi-font-weight:normal'><span lang=ES-TRAD
        style='font-size:7.0pt;font-family:"Arial","sans-serif"'>JUZGADO SEPTIMO CIVIL DE TIJUANA, B.C. 06 DE JULIO DE 2023<o:p></o:p></span></b></p>

</div>

<p class=MsoNormal style='tab-stops:21.4pt 61.4pt'><b style='mso-bidi-font-weight:
normal'><span lang=ES-TRAD style='font-size:7.0pt;font-family:"Arial","sans-serif"'>SEGUNDA SECRETARIA<span style='mso-tab-count:2'>                            </span>
<o:p></o:p>
</span></b>
</p>

<p class=MsoNormal style='tab-stops:21.4pt 61.4pt'><b style='mso-bidi-font-weight:
normal'><i style='mso-bidi-font-style:normal'><span lang=ES-TRAD
        style='font-size:7.0pt;font-family:"Arial","sans-serif"'>Acuerdos<span style='mso-tab-count:2'>                
        </span>
        <o:p></o:p>
      </span></i></b></p>

<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 width=732
  style='width:549.25pt;border-collapse:collapse;mso-padding-alt:0cm 3.5pt 0cm 3.5pt'>
  <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
    <td width=29 valign=top style='width:21.4pt;padding:0cm 3.5pt 0cm 3.5pt'>
      <p class=MsoNormal><span lang=ES-TRAD style='font-size:7.0pt;font-family:
"Arial","sans-serif"'>1<o:p></o:p></span></p>
    </td>
    <td width=61 valign=top style='width:45.9pt;padding:0cm 3.5pt 0cm 3.5pt'>
      <p class=MsoNormal><span lang=ES-TRAD style='font-size:7.0pt;font-family:
"Arial","sans-serif"'>00840/2012<o:p></o:p></span></p>
    </td>
    <td width=643 valign=top style='width:17.0cm;padding:0cm 3.5pt 0cm 3.5pt'>
      <p class=MsoNormal><span lang=ES-TRAD style='font-size:7.0pt;font-family:
"Arial","sans-serif"'>-- CI BANCO SOCIEDAD ANONIMA, INSTITUCION DE BANCA MULTIPLE -- VS SECRETO. SUMARIO HIPOTECARIO<o:p></o:p></span></p>
    </td>
  </tr>
  <tr style='mso-yfti-irow:1'>
    <td width=29 valign=top style='width:21.4pt;padding:0cm 3.5pt 0cm 3.5pt'>
      <p class=MsoNormal><span lang=ES-TRAD style='font-size:7.0pt;font-family:
"Arial","sans-serif"'>2<o:p></o:p></span></p>
    </td>
    <td width=61 valign=top style='width:45.9pt;padding:0cm 3.5pt 0cm 3.5pt'>
      <p class=MsoNormal><span lang=ES-TRAD style='font-size:7.0pt;font-family:
"Arial","sans-serif"'>00852/2013<o:p></o:p></span></p>
    </td>
    <td width=643 valign=top style='width:17.0cm;padding:0cm 3.5pt 0cm 3.5pt'>
      <p class=MsoNormal><span lang=ES-TRAD style='font-size:7.0pt;font-family:
"Arial","sans-serif"'>HIPOTECARIA NACIONAL, SOCIEDAD ANONIMA DE CAPITAL VARIABLE, SOCIEDAD FINANCIERA DE OBJETO MÚLTIPLE, ENTIDAD REGULADA, GRUPO FINANCIERO BBVA BANCOMER VS SECRETO. SUMARIO HIPOTECARIO<o:p></o:p></span></p>
    </td>
  </tr>
</table>
</div>
</body>
`;

const MY_JUZGADO_MAP = {
  '1civil': 'JUZGADO PRIMERO CIVIL',
  '2civil': 'JUZGADO SEGUNDO CIVIL',
  '3civil': 'JUZGADO TERCERO CIVIL',
  '4civil': 'JUZGADO CUARTO CIVIL',
  '5civil': 'JUZGADO QUINTO CIVIL',
  '6civil': 'JUZGADO SEXTO CIVIL',
  '7civil': 'JUZGADO SEPTIMO CIVIL',
  '8civil': 'JUZGADO OCTAVO CIVIL',
  '9civil': 'JUZGADO NOVENO CIVIL',
  '10civil': 'JUZGADO DECIMO CIVIL',
  '11civil': 'JUZGADO DECIMO PRIMERO CIVIL',
  '1familiar': 'JUZGADO PRIMERO DE LO FAMILIAR',
  '2familiar': 'JUZGADO SEGUNDO DE LO FAMILIAR',
  '3familiar': 'JUZGADO TERCERO DE LO FAMILIAR',
  '4familiar': 'JUZGADO CUARTO DE LO FAMILIAR',
  '5familiar': 'JUZGADO QUINTO DE LO FAMILIAR',
  '6familiar': 'JUZGADO SEXTO DE LO FAMILIAR',
  '7familiar': 'JUZGADO SEPTIMO DE LO FAMILIAR',
  '8familiar': 'JUZGADO OCTAVO DE LO FAMILIAR',
  '9familiar': 'JUZGADO NOVENO DE LO FAMILIAR',
  '10familiar': 'JUZGADO DECIMO DE LO FAMILIAR',
  '11familiar': 'JUZGADO DECIMO PRIMERO DE LO FAMILIAR',
}

const MUNICIPALITIES = {
  'Tijuana': 'ti',
  'Mexicali': 'me',
  'Ensenada': 'en',
  'Tecate': 'te',
}

module.exports = {
  dummyResponse,
  MY_JUZGADO_MAP,
  MUNICIPALITIES,
};