import * as fs from 'fs';

const path = process.argv[2] ?? (() => { throw new Error("入力パスを `node gen.js rounded 乾湿搾窄` のような形で指定して実行してください。") })()
const zi = process.argv[3] ?? (() => { throw new Error("入力パスを `node gen.js rounded 乾湿搾窄` のような形で指定して実行してください。") })()

for (const z of zi) {
	fs.writeFileSync(`${path}/${z}.svg`, `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   width="1000"
   height="1000"
   viewBox="0 0 264.58333 264.58333"
   version="1.1"
   id="svg5"
   inkscape:version="1.2.1 (9c6d41e410, 2022-07-14)"
   sodipodi:docname="font_template.svg"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview7"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm"
     showgrid="false"
     inkscape:zoom="0.5946522"
     inkscape:cx="771.87976"
     inkscape:cy="510.38237"
     inkscape:window-width="1920"
     inkscape:window-height="1191"
     inkscape:window-x="-9"
     inkscape:window-y="-9"
     inkscape:window-maximized="1"
     inkscape:current-layer="layer1"
     showguides="true">
    <sodipodi:guide
       position="0,251.35416"
       orientation="0,1"
       id="guide740"
       inkscape:locked="false"
       inkscape:label=""
       inkscape:color="rgb(0,134,229)" />
    <sodipodi:guide
       position="0,13.229161"
       orientation="0,-1"
       id="guide956"
       inkscape:locked="false" />
    <sodipodi:guide
       position="13.229172,264.58333"
       orientation="1,0"
       id="guide958"
       inkscape:locked="false" />
    <sodipodi:guide
       position="251.35417,264.58333"
       orientation="1,0"
       id="guide960"
       inkscape:locked="false" />
    <sodipodi:guide
       position="132.29167,264.58333"
       orientation="1,0"
       id="guide962"
       inkscape:locked="false" />
    <sodipodi:guide
       position="0,132.29166"
       orientation="0,-1"
       id="guide964"
       inkscape:locked="false" />
  </sodipodi:namedview>
  <defs
     id="defs2" />
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1" />
</svg>
`);	
}