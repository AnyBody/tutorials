/*
 * searchtools.js_t
 * ~~~~~~~~~~~~~~~~
 *
 * Sphinx JavaScript utilities for the full-text search.
 *
 * :copyright: Copyright 2007-2018 by the Sphinx team, see AUTHORS.
 * :license: BSD, see LICENSE for details.
 *
 */


/* Non-minified version JS is _stemmer.js if file is provided */ 
var JSX={};(function(g){function j(b,e){var a=function(){};a.prototype=e.prototype;var c=new a;for(var d in b){b[d].prototype=c}}function I(c,b){for(var a in b.prototype)if(b.prototype.hasOwnProperty(a))c.prototype[a]=b.prototype[a]}function i(a,b,d){function c(a,b,c){delete a[b];a[b]=c;return c}Object.defineProperty(a,b,{get:function(){return c(a,b,d())},set:function(d){c(a,b,d)},enumerable:true,configurable:true})}function J(a,b,c){return a[b]=a[b]/c|0}var E=parseInt;var D=parseFloat;function K(a){return a!==a}var A=isFinite;var z=encodeURIComponent;var y=decodeURIComponent;var x=encodeURI;var w=decodeURI;var u=Object.prototype.toString;var C=Object.prototype.hasOwnProperty;function f(){}g.require=function(b){var a=p[b];return a!==undefined?a:null};g.profilerIsRunning=function(){return f.getResults!=null};g.getProfileResults=function(){return(f.getResults||function(){return{}})()};g.postProfileResults=function(a,b){if(f.postResults==null)throw new Error('profiler has not been turned on');return f.postResults(a,b)};g.resetProfileResults=function(){if(f.resetResults==null)throw new Error('profiler has not been turned on');return f.resetResults()};g.DEBUG=false;function t(){};j([t],Error);function b(a,b,c){this.G=a.length;this.S=a;this.V=b;this.J=c;this.I=null;this.W=null};j([b],Object);function l(){};j([l],Object);function d(){var a;var b;var c;this.F={};a=this.D='';b=this._=0;c=this.A=a.length;this.B=0;this.C=b;this.E=c};j([d],l);function v(a,b){a.D=b.D;a._=b._;a.A=b.A;a.B=b.B;a.C=b.C;a.E=b.E};function n(b,d,c,e){var a;if(b._>=b.A){return false}a=b.D.charCodeAt(b._);if(a>e||a<c){return false}a-=c;if((d[a>>>3]&1<<(a&7))===0){return false}b._++;return true};function m(b,d,c,e){var a;if(b._<=b.B){return false}a=b.D.charCodeAt(b._-1);if(a>e||a<c){return false}a-=c;if((d[a>>>3]&1<<(a&7))===0){return false}b._--;return true};function r(a,d,c,e){var b;if(a._>=a.A){return false}b=a.D.charCodeAt(a._);if(b>e||b<c){a._++;return true}b-=c;if((d[b>>>3]&1<<(b&7))===0){a._++;return true}return false};function q(a,d,c,e){var b;if(a._<=a.B){return false}b=a.D.charCodeAt(a._-1);if(b>e||b<c){a._--;return true}b-=c;if((d[b>>>3]&1<<(b&7))===0){a._--;return true}return false};function h(a,b,d){var c;if(a._-a.B<b){return false}if(a.D.slice((c=a._)-b,c)!==d){return false}a._-=b;return true};function e(d,m,p){var b;var g;var e;var n;var f;var k;var l;var i;var h;var c;var a;var j;var o;b=0;g=p;e=d._;n=d.B;f=0;k=0;l=false;while(true){i=b+(g-b>>1);h=0;c=f<k?f:k;a=m[i];for(j=a.G-1-c;j>=0;j--){if(e-c===n){h=-1;break}h=d.D.charCodeAt(e-1-c)-a.S.charCodeAt(j);if(h!==0){break}c++}if(h<0){g=i;k=c}else{b=i;f=c}if(g-b<=1){if(b>0){break}if(g===b){break}if(l){break}l=true}}while(true){a=m[b];if(f>=a.G){d._=e-a.G|0;if(a.I==null){return a.J}o=a.I(d);d._=e-a.G|0;if(o){return a.J}}b=a.V;if(b<0){return 0}}return-1};function s(a,b,d,e){var c;c=e.length-(d-b);a.D=a.D.slice(0,b)+e+a.D.slice(d);a.A+=c|0;if(a._>=d){a._+=c|0}else if(a._>b){a._=b}return c|0};function c(a,f){var b;var c;var d;var e;b=false;if((c=a.C)<0||c>(d=a.E)||d>(e=a.A)||e>a.D.length?false:true){s(a,a.C,a.E,f);b=true}return b};function o(a,f){var b;var c;var d;var e;b='';if((c=a.C)<0||c>(d=a.E)||d>(e=a.A)||e>a.D.length?false:true){b=a.D.slice(a.C,a.E)}return b};d.prototype.H=function(){return false};d.prototype.T=function(b){var a;var c;var d;var e;a=this.F['.'+b];if(a==null){c=this.D=b;d=this._=0;e=this.A=c.length;this.B=0;this.C=d;this.E=e;this.H();a=this.D;this.F['.'+b]=a}return a};d.prototype.stemWord=d.prototype.T;d.prototype.U=function(e){var d;var b;var c;var a;var f;var g;var h;d=[];for(b=0;b<e.length;b++){c=e[b];a=this.F['.'+c];if(a==null){f=this.D=c;g=this._=0;h=this.A=f.length;this.B=0;this.C=g;this.E=h;this.H();a=this.D;this.F['.'+c]=a}d.push(a)}return d};d.prototype.stemWords=d.prototype.U;function a(){d.call(this);this.I_x=0;this.I_p1=0;this.S_ch=''};j([a],d);a.prototype.K=function(a){this.I_x=a.I_x;this.I_p1=a.I_p1;this.S_ch=a.S_ch;v(this,a)};a.prototype.copy_from=a.prototype.K;a.prototype.P=function(){var g;var d;var b;var e;var c;var f;var i;var j;var k;var h;this.I_p1=j=this.A;g=i=this._;b=i+3|0;if(0>b||b>j){return false}h=this._=b;this.I_x=h;this._=g;a:while(true){d=this._;e=true;b:while(e===true){e=false;if(!n(this,a.g_v,97,248)){break b}this._=d;break a}k=this._=d;if(k>=this.A){return false}this._++}a:while(true){c=true;b:while(c===true){c=false;if(!r(this,a.g_v,97,248)){break b}break a}if(this._>=this.A){return false}this._++}this.I_p1=this._;f=true;a:while(f===true){f=false;if(!(this.I_p1<this.I_x)){break a}this.I_p1=this.I_x}return true};a.prototype.r_mark_regions=a.prototype.P;function G(b){var h;var e;var c;var f;var d;var g;var j;var k;var l;var i;b.I_p1=k=b.A;h=j=b._;c=j+3|0;if(0>c||c>k){return false}i=b._=c;b.I_x=i;b._=h;a:while(true){e=b._;f=true;b:while(f===true){f=false;if(!n(b,a.g_v,97,248)){break b}b._=e;break a}l=b._=e;if(l>=b.A){return false}b._++}a:while(true){d=true;b:while(d===true){d=false;if(!r(b,a.g_v,97,248)){break b}break a}if(b._>=b.A){return false}b._++}b.I_p1=b._;g=true;a:while(g===true){g=false;if(!(b.I_p1<b.I_x)){break a}b.I_p1=b.I_x}return true};a.prototype.O=function(){var b;var f;var d;var g;var h;var i;f=this.A-(g=this._);if(g<this.I_p1){return false}h=this._=this.I_p1;d=this.B;this.B=h;i=this._=this.A-f;this.E=i;b=e(this,a.a_0,32);if(b===0){this.B=d;return false}this.C=this._;this.B=d;switch(b){case 0:return false;case 1:if(!c(this,'')){return false}break;case 2:if(!m(this,a.g_s_ending,97,229)){return false}if(!c(this,'')){return false}break}return true};a.prototype.r_main_suffix=a.prototype.O;function H(b){var d;var g;var f;var h;var i;var j;g=b.A-(h=b._);if(h<b.I_p1){return false}i=b._=b.I_p1;f=b.B;b.B=i;j=b._=b.A-g;b.E=j;d=e(b,a.a_0,32);if(d===0){b.B=f;return false}b.C=b._;b.B=f;switch(d){case 0:return false;case 1:if(!c(b,'')){return false}break;case 2:if(!m(b,a.g_s_ending,97,229)){return false}if(!c(b,'')){return false}break}return true};a.prototype.N=function(){var f;var g;var b;var h;var d;var i;var j;var k;var l;f=(h=this.A)-(d=this._);g=h-d;if(d<this.I_p1){return false}i=this._=this.I_p1;b=this.B;this.B=i;j=this._=this.A-g;this.E=j;if(e(this,a.a_1,4)===0){this.B=b;return false}this.C=this._;l=this.B=b;k=this._=this.A-f;if(k<=l){return false}this._--;this.C=this._;return!c(this,'')?false:true};a.prototype.r_consonant_pair=a.prototype.N;function k(b){var i;var j;var d;var g;var f;var k;var l;var m;var h;i=(g=b.A)-(f=b._);j=g-f;if(f<b.I_p1){return false}k=b._=b.I_p1;d=b.B;b.B=k;l=b._=b.A-j;b.E=l;if(e(b,a.a_1,4)===0){b.B=d;return false}b.C=b._;h=b.B=d;m=b._=b.A-i;if(m<=h){return false}b._--;b.C=b._;return!c(b,'')?false:true};a.prototype.Q=function(){var f;var l;var m;var d;var j;var b;var g;var n;var i;var p;var o;l=this.A-this._;b=true;a:while(b===true){b=false;this.E=this._;if(!h(this,2,'st')){break a}this.C=this._;if(!h(this,2,'ig')){break a}if(!c(this,'')){return false}}i=this._=(n=this.A)-l;m=n-i;if(i<this.I_p1){return false}p=this._=this.I_p1;d=this.B;this.B=p;o=this._=this.A-m;this.E=o;f=e(this,a.a_2,5);if(f===0){this.B=d;return false}this.C=this._;this.B=d;switch(f){case 0:return false;case 1:if(!c(this,'')){return false}j=this.A-this._;g=true;a:while(g===true){g=false;if(!k(this)){break a}}this._=this.A-j;break;case 2:if(!c(this,'løs')){return false}break}return true};a.prototype.r_other_suffix=a.prototype.Q;function F(b){var d;var p;var m;var f;var l;var g;var i;var o;var j;var q;var n;p=b.A-b._;g=true;a:while(g===true){g=false;b.E=b._;if(!h(b,2,'st')){break a}b.C=b._;if(!h(b,2,'ig')){break a}if(!c(b,'')){return false}}j=b._=(o=b.A)-p;m=o-j;if(j<b.I_p1){return false}q=b._=b.I_p1;f=b.B;b.B=q;n=b._=b.A-m;b.E=n;d=e(b,a.a_2,5);if(d===0){b.B=f;return false}b.C=b._;b.B=f;switch(d){case 0:return false;case 1:if(!c(b,'')){return false}l=b.A-b._;i=true;a:while(i===true){i=false;if(!k(b)){break a}}b._=b.A-l;break;case 2:if(!c(b,'løs')){return false}break}return true};a.prototype.R=function(){var e;var b;var d;var f;var g;var i;var j;e=this.A-(f=this._);if(f<this.I_p1){return false}g=this._=this.I_p1;b=this.B;this.B=g;i=this._=this.A-e;this.E=i;if(!q(this,a.g_v,97,248)){this.B=b;return false}this.C=this._;j=this.S_ch=o(this,this.S_ch);if(j===''){return false}this.B=b;return!(d=this.S_ch,h(this,d.length,d))?false:!c(this,'')?false:true};a.prototype.r_undouble=a.prototype.R;function B(b){var f;var d;var e;var g;var i;var j;var k;f=b.A-(g=b._);if(g<b.I_p1){return false}i=b._=b.I_p1;d=b.B;b.B=i;j=b._=b.A-f;b.E=j;if(!q(b,a.g_v,97,248)){b.B=d;return false}b.C=b._;k=b.S_ch=o(b,b.S_ch);if(k===''){return false}b.B=d;return!(e=b.S_ch,h(b,e.length,e))?false:!c(b,'')?false:true};a.prototype.H=function(){var i;var g;var h;var j;var b;var c;var d;var a;var e;var l;var m;var n;var o;var p;var q;var f;i=this._;b=true;a:while(b===true){b=false;if(!G(this)){break a}}l=this._=i;this.B=l;n=this._=m=this.A;g=m-n;c=true;a:while(c===true){c=false;if(!H(this)){break a}}p=this._=(o=this.A)-g;h=o-p;d=true;a:while(d===true){d=false;if(!k(this)){break a}}f=this._=(q=this.A)-h;j=q-f;a=true;a:while(a===true){a=false;if(!F(this)){break a}}this._=this.A-j;e=true;a:while(e===true){e=false;if(!B(this)){break a}}this._=this.B;return true};a.prototype.stem=a.prototype.H;a.prototype.L=function(b){return b instanceof a};a.prototype.equals=a.prototype.L;a.prototype.M=function(){var c;var a;var b;var d;c='DanishStemmer';a=0;for(b=0;b<c.length;b++){d=c.charCodeAt(b);a=(a<<5)-a+d;a=a&a}return a|0};a.prototype.hashCode=a.prototype.M;a.serialVersionUID=1;i(a,'methodObject',function(){return new a});i(a,'a_0',function(){return[new b('hed',-1,1),new b('ethed',0,1),new b('ered',-1,1),new b('e',-1,1),new b('erede',3,1),new b('ende',3,1),new b('erende',5,1),new b('ene',3,1),new b('erne',3,1),new b('ere',3,1),new b('en',-1,1),new b('heden',10,1),new b('eren',10,1),new b('er',-1,1),new b('heder',13,1),new b('erer',13,1),new b('s',-1,2),new b('heds',16,1),new b('es',16,1),new b('endes',18,1),new b('erendes',19,1),new b('enes',18,1),new b('ernes',18,1),new b('eres',18,1),new b('ens',16,1),new b('hedens',24,1),new b('erens',24,1),new b('ers',16,1),new b('ets',16,1),new b('erets',28,1),new b('et',-1,1),new b('eret',30,1)]});i(a,'a_1',function(){return[new b('gd',-1,-1),new b('dt',-1,-1),new b('gt',-1,-1),new b('kt',-1,-1)]});i(a,'a_2',function(){return[new b('ig',-1,1),new b('lig',0,1),new b('elig',1,1),new b('els',-1,1),new b('løst',-1,2)]});i(a,'g_v',function(){return[17,65,16,1,0,0,0,0,0,0,0,0,0,0,0,0,48,0,128]});i(a,'g_s_ending',function(){return[239,254,42,3,0,0,0,0,0,0,0,0,0,0,0,0,16]});var p={'src/stemmer.jsx':{Stemmer:l},'src/danish-stemmer.jsx':{DanishStemmer:a}}}(JSX))
var Stemmer = JSX.require("src/danish-stemmer.jsx").DanishStemmer;



/**
 * Simple result scoring code.
 */
var Scorer = {
  // Implement the following function to further tweak the score for each result
  // The function takes a result array [filename, title, anchor, descr, score]
  // and returns the new score.
  /*
  score: function(result) {
    return result[4];
  },
  */

  // query matches the full name of an object
  objNameMatch: 11,
  // or matches in the last dotted part of the object name
  objPartialMatch: 6,
  // Additive scores depending on the priority of the object
  objPrio: {0:  15,   // used to be importantResults
            1:  5,   // used to be objectResults
            2: -5},  // used to be unimportantResults
  //  Used when the priority is not in the mapping.
  objPrioDefault: 0,

  // query found in title
  title: 15,
  // query found in terms
  term: 5
};





var splitChars = (function() {
    var result = {};
    var singles = [96, 180, 187, 191, 215, 247, 749, 885, 903, 907, 909, 930, 1014, 1648,
         1748, 1809, 2416, 2473, 2481, 2526, 2601, 2609, 2612, 2615, 2653, 2702,
         2706, 2729, 2737, 2740, 2857, 2865, 2868, 2910, 2928, 2948, 2961, 2971,
         2973, 3085, 3089, 3113, 3124, 3213, 3217, 3241, 3252, 3295, 3341, 3345,
         3369, 3506, 3516, 3633, 3715, 3721, 3736, 3744, 3748, 3750, 3756, 3761,
         3781, 3912, 4239, 4347, 4681, 4695, 4697, 4745, 4785, 4799, 4801, 4823,
         4881, 5760, 5901, 5997, 6313, 7405, 8024, 8026, 8028, 8030, 8117, 8125,
         8133, 8181, 8468, 8485, 8487, 8489, 8494, 8527, 11311, 11359, 11687, 11695,
         11703, 11711, 11719, 11727, 11735, 12448, 12539, 43010, 43014, 43019, 43587,
         43696, 43713, 64286, 64297, 64311, 64317, 64319, 64322, 64325, 65141];
    var i, j, start, end;
    for (i = 0; i < singles.length; i++) {
        result[singles[i]] = true;
    }
    var ranges = [[0, 47], [58, 64], [91, 94], [123, 169], [171, 177], [182, 184], [706, 709],
         [722, 735], [741, 747], [751, 879], [888, 889], [894, 901], [1154, 1161],
         [1318, 1328], [1367, 1368], [1370, 1376], [1416, 1487], [1515, 1519], [1523, 1568],
         [1611, 1631], [1642, 1645], [1750, 1764], [1767, 1773], [1789, 1790], [1792, 1807],
         [1840, 1868], [1958, 1968], [1970, 1983], [2027, 2035], [2038, 2041], [2043, 2047],
         [2070, 2073], [2075, 2083], [2085, 2087], [2089, 2307], [2362, 2364], [2366, 2383],
         [2385, 2391], [2402, 2405], [2419, 2424], [2432, 2436], [2445, 2446], [2449, 2450],
         [2483, 2485], [2490, 2492], [2494, 2509], [2511, 2523], [2530, 2533], [2546, 2547],
         [2554, 2564], [2571, 2574], [2577, 2578], [2618, 2648], [2655, 2661], [2672, 2673],
         [2677, 2692], [2746, 2748], [2750, 2767], [2769, 2783], [2786, 2789], [2800, 2820],
         [2829, 2830], [2833, 2834], [2874, 2876], [2878, 2907], [2914, 2917], [2930, 2946],
         [2955, 2957], [2966, 2968], [2976, 2978], [2981, 2983], [2987, 2989], [3002, 3023],
         [3025, 3045], [3059, 3076], [3130, 3132], [3134, 3159], [3162, 3167], [3170, 3173],
         [3184, 3191], [3199, 3204], [3258, 3260], [3262, 3293], [3298, 3301], [3312, 3332],
         [3386, 3388], [3390, 3423], [3426, 3429], [3446, 3449], [3456, 3460], [3479, 3481],
         [3518, 3519], [3527, 3584], [3636, 3647], [3655, 3663], [3674, 3712], [3717, 3718],
         [3723, 3724], [3726, 3731], [3752, 3753], [3764, 3772], [3774, 3775], [3783, 3791],
         [3802, 3803], [3806, 3839], [3841, 3871], [3892, 3903], [3949, 3975], [3980, 4095],
         [4139, 4158], [4170, 4175], [4182, 4185], [4190, 4192], [4194, 4196], [4199, 4205],
         [4209, 4212], [4226, 4237], [4250, 4255], [4294, 4303], [4349, 4351], [4686, 4687],
         [4702, 4703], [4750, 4751], [4790, 4791], [4806, 4807], [4886, 4887], [4955, 4968],
         [4989, 4991], [5008, 5023], [5109, 5120], [5741, 5742], [5787, 5791], [5867, 5869],
         [5873, 5887], [5906, 5919], [5938, 5951], [5970, 5983], [6001, 6015], [6068, 6102],
         [6104, 6107], [6109, 6111], [6122, 6127], [6138, 6159], [6170, 6175], [6264, 6271],
         [6315, 6319], [6390, 6399], [6429, 6469], [6510, 6511], [6517, 6527], [6572, 6592],
         [6600, 6607], [6619, 6655], [6679, 6687], [6741, 6783], [6794, 6799], [6810, 6822],
         [6824, 6916], [6964, 6980], [6988, 6991], [7002, 7042], [7073, 7085], [7098, 7167],
         [7204, 7231], [7242, 7244], [7294, 7400], [7410, 7423], [7616, 7679], [7958, 7959],
         [7966, 7967], [8006, 8007], [8014, 8015], [8062, 8063], [8127, 8129], [8141, 8143],
         [8148, 8149], [8156, 8159], [8173, 8177], [8189, 8303], [8306, 8307], [8314, 8318],
         [8330, 8335], [8341, 8449], [8451, 8454], [8456, 8457], [8470, 8472], [8478, 8483],
         [8506, 8507], [8512, 8516], [8522, 8525], [8586, 9311], [9372, 9449], [9472, 10101],
         [10132, 11263], [11493, 11498], [11503, 11516], [11518, 11519], [11558, 11567],
         [11622, 11630], [11632, 11647], [11671, 11679], [11743, 11822], [11824, 12292],
         [12296, 12320], [12330, 12336], [12342, 12343], [12349, 12352], [12439, 12444],
         [12544, 12548], [12590, 12592], [12687, 12689], [12694, 12703], [12728, 12783],
         [12800, 12831], [12842, 12880], [12896, 12927], [12938, 12976], [12992, 13311],
         [19894, 19967], [40908, 40959], [42125, 42191], [42238, 42239], [42509, 42511],
         [42540, 42559], [42592, 42593], [42607, 42622], [42648, 42655], [42736, 42774],
         [42784, 42785], [42889, 42890], [42893, 43002], [43043, 43055], [43062, 43071],
         [43124, 43137], [43188, 43215], [43226, 43249], [43256, 43258], [43260, 43263],
         [43302, 43311], [43335, 43359], [43389, 43395], [43443, 43470], [43482, 43519],
         [43561, 43583], [43596, 43599], [43610, 43615], [43639, 43641], [43643, 43647],
         [43698, 43700], [43703, 43704], [43710, 43711], [43715, 43738], [43742, 43967],
         [44003, 44015], [44026, 44031], [55204, 55215], [55239, 55242], [55292, 55295],
         [57344, 63743], [64046, 64047], [64110, 64111], [64218, 64255], [64263, 64274],
         [64280, 64284], [64434, 64466], [64830, 64847], [64912, 64913], [64968, 65007],
         [65020, 65135], [65277, 65295], [65306, 65312], [65339, 65344], [65371, 65381],
         [65471, 65473], [65480, 65481], [65488, 65489], [65496, 65497]];
    for (i = 0; i < ranges.length; i++) {
        start = ranges[i][0];
        end = ranges[i][1];
        for (j = start; j <= end; j++) {
            result[j] = true;
        }
    }
    return result;
})();

function splitQuery(query) {
    var result = [];
    var start = -1;
    for (var i = 0; i < query.length; i++) {
        if (splitChars[query.charCodeAt(i)]) {
            if (start !== -1) {
                result.push(query.slice(start, i));
                start = -1;
            }
        } else if (start === -1) {
            start = i;
        }
    }
    if (start !== -1) {
        result.push(query.slice(start));
    }
    return result;
}




/**
 * Search Module
 */
var Search = {

  _index : null,
  _queued_query : null,
  _pulse_status : -1,

  init : function() {
      var params = $.getQueryParameters();
      if (params.q) {
          var query = params.q[0];
          $('input[name="q"]')[0].value = query;
          this.performSearch(query);
      }
  },

  loadIndex : function(url) {
    $.ajax({type: "GET", url: url, data: null,
            dataType: "script", cache: true,
            complete: function(jqxhr, textstatus) {
              if (textstatus != "success") {
                document.getElementById("searchindexloader").src = url;
              }
            }});
  },

  setIndex : function(index) {
    var q;
    this._index = index;
    if ((q = this._queued_query) !== null) {
      this._queued_query = null;
      Search.query(q);
    }
  },

  hasIndex : function() {
      return this._index !== null;
  },

  deferQuery : function(query) {
      this._queued_query = query;
  },

  stopPulse : function() {
      this._pulse_status = 0;
  },

  startPulse : function() {
    if (this._pulse_status >= 0)
        return;
    function pulse() {
      var i;
      Search._pulse_status = (Search._pulse_status + 1) % 4;
      var dotString = '';
      for (i = 0; i < Search._pulse_status; i++)
        dotString += '.';
      Search.dots.text(dotString);
      if (Search._pulse_status > -1)
        window.setTimeout(pulse, 500);
    }
    pulse();
  },

  /**
   * perform a search for something (or wait until index is loaded)
   */
  performSearch : function(query) {
    // create the required interface elements
    this.out = $('#search-results');
    this.title = $('<h2>' + _('Searching') + '</h2>').appendTo(this.out);
    this.dots = $('<span></span>').appendTo(this.title);
    this.status = $('<p style="display: none"></p>').appendTo(this.out);
    this.output = $('<ul class="search"/>').appendTo(this.out);

    $('#search-progress').text(_('Preparing search...'));
    this.startPulse();

    // index already loaded, the browser was quick!
    if (this.hasIndex())
      this.query(query);
    else
      this.deferQuery(query);
  },

  /**
   * execute search (requires search index to be loaded)
   */
  query : function(query) {
    var i;
    var stopwords = ["ad","af","alle","alt","anden","at","blev","blive","bliver","da","de","dem","den","denne","der","deres","det","dette","dig","din","disse","dog","du","efter","eller","en","end","er","et","for","fra","ham","han","hans","har","havde","have","hende","hendes","her","hos","hun","hvad","hvis","hvor","i","ikke","ind","jeg","jer","jo","kunne","man","mange","med","meget","men","mig","min","mine","mit","mod","ned","noget","nogle","nu","n\u00e5r","og","ogs\u00e5","om","op","os","over","p\u00e5","selv","sig","sin","sine","sit","skal","skulle","som","s\u00e5dan","thi","til","ud","under","var","vi","vil","ville","vor","v\u00e6re","v\u00e6ret"];

    // stem the searchterms and add them to the correct list
    var stemmer = new Stemmer();
    var searchterms = [];
    var excluded = [];
    var hlterms = [];
    var tmp = splitQuery(query);
    var objectterms = [];
    for (i = 0; i < tmp.length; i++) {
      if (tmp[i] !== "") {
          objectterms.push(tmp[i].toLowerCase());
      }

      if ($u.indexOf(stopwords, tmp[i].toLowerCase()) != -1 || tmp[i].match(/^\d+$/) ||
          tmp[i] === "") {
        // skip this "word"
        continue;
      }
      // stem the word
      var word = stemmer.stemWord(tmp[i].toLowerCase());
      // prevent stemmer from cutting word smaller than two chars
      if(word.length < 3 && tmp[i].length >= 3) {
        word = tmp[i];
      }
      var toAppend;
      // select the correct list
      if (word[0] == '-') {
        toAppend = excluded;
        word = word.substr(1);
      }
      else {
        toAppend = searchterms;
        hlterms.push(tmp[i].toLowerCase());
      }
      // only add if not already in the list
      if (!$u.contains(toAppend, word))
        toAppend.push(word);
    }
    var highlightstring = '?highlight=' + $.urlencode(hlterms.join(" "));

    // console.debug('SEARCH: searching for:');
    // console.info('required: ', searchterms);
    // console.info('excluded: ', excluded);

    // prepare search
    var terms = this._index.terms;
    var titleterms = this._index.titleterms;

    // array of [filename, title, anchor, descr, score]
    var results = [];
    $('#search-progress').empty();

    // lookup as object
    for (i = 0; i < objectterms.length; i++) {
      var others = [].concat(objectterms.slice(0, i),
                             objectterms.slice(i+1, objectterms.length));
      results = results.concat(this.performObjectSearch(objectterms[i], others));
    }

    // lookup as search terms in fulltext
    results = results.concat(this.performTermsSearch(searchterms, excluded, terms, titleterms));

    // let the scorer override scores with a custom scoring function
    if (Scorer.score) {
      for (i = 0; i < results.length; i++)
        results[i][4] = Scorer.score(results[i]);
    }

    // now sort the results by score (in opposite order of appearance, since the
    // display function below uses pop() to retrieve items) and then
    // alphabetically
    results.sort(function(a, b) {
      var left = a[4];
      var right = b[4];
      if (left > right) {
        return 1;
      } else if (left < right) {
        return -1;
      } else {
        // same score: sort alphabetically
        left = a[1].toLowerCase();
        right = b[1].toLowerCase();
        return (left > right) ? -1 : ((left < right) ? 1 : 0);
      }
    });

    // for debugging
    //Search.lastresults = results.slice();  // a copy
    //console.info('search results:', Search.lastresults);

    // print the results
    var resultCount = results.length;
    function displayNextItem() {
      // results left, load the summary and display it
      if (results.length) {
        var item = results.pop();
        var listItem = $('<li style="display:none"></li>');
        if (DOCUMENTATION_OPTIONS.FILE_SUFFIX === '') {
          // dirhtml builder
          var dirname = item[0] + '/';
          if (dirname.match(/\/index\/$/)) {
            dirname = dirname.substring(0, dirname.length-6);
          } else if (dirname == 'index/') {
            dirname = '';
          }
          listItem.append($('<a/>').attr('href',
            DOCUMENTATION_OPTIONS.URL_ROOT + dirname +
            highlightstring + item[2]).html(item[1]));
        } else {
          // normal html builders
          listItem.append($('<a/>').attr('href',
            item[0] + DOCUMENTATION_OPTIONS.FILE_SUFFIX +
            highlightstring + item[2]).html(item[1]));
        }
        if (item[3]) {
          listItem.append($('<span> (' + item[3] + ')</span>'));
          Search.output.append(listItem);
          listItem.slideDown(5, function() {
            displayNextItem();
          });
        } else if (DOCUMENTATION_OPTIONS.HAS_SOURCE) {
          var suffix = DOCUMENTATION_OPTIONS.SOURCELINK_SUFFIX;
          if (suffix === undefined) {
            suffix = '.txt';
          }
          $.ajax({url: DOCUMENTATION_OPTIONS.URL_ROOT + '_sources/' + item[5] + (item[5].slice(-suffix.length) === suffix ? '' : suffix),
                  dataType: "text",
                  complete: function(jqxhr, textstatus) {
                    var data = jqxhr.responseText;
                    if (data !== '' && data !== undefined) {
                      listItem.append(Search.makeSearchSummary(data, searchterms, hlterms));
                    }
                    Search.output.append(listItem);
                    listItem.slideDown(5, function() {
                      displayNextItem();
                    });
                  }});
        } else {
          // no source available, just display title
          Search.output.append(listItem);
          listItem.slideDown(5, function() {
            displayNextItem();
          });
        }
      }
      // search finished, update title and status message
      else {
        Search.stopPulse();
        Search.title.text(_('Search Results'));
        if (!resultCount)
          Search.status.text(_('Your search did not match any documents. Please make sure that all words are spelled correctly and that you\'ve selected enough categories.'));
        else
            Search.status.text(_('Search finished, found %s page(s) matching the search query.').replace('%s', resultCount));
        Search.status.fadeIn(500);
      }
    }
    displayNextItem();
  },

  /**
   * search for object names
   */
  performObjectSearch : function(object, otherterms) {
    var filenames = this._index.filenames;
    var docnames = this._index.docnames;
    var objects = this._index.objects;
    var objnames = this._index.objnames;
    var titles = this._index.titles;

    var i;
    var results = [];

    for (var prefix in objects) {
      for (var name in objects[prefix]) {
        var fullname = (prefix ? prefix + '.' : '') + name;
        if (fullname.toLowerCase().indexOf(object) > -1) {
          var score = 0;
          var parts = fullname.split('.');
          // check for different match types: exact matches of full name or
          // "last name" (i.e. last dotted part)
          if (fullname == object || parts[parts.length - 1] == object) {
            score += Scorer.objNameMatch;
          // matches in last name
          } else if (parts[parts.length - 1].indexOf(object) > -1) {
            score += Scorer.objPartialMatch;
          }
          var match = objects[prefix][name];
          var objname = objnames[match[1]][2];
          var title = titles[match[0]];
          // If more than one term searched for, we require other words to be
          // found in the name/title/description
          if (otherterms.length > 0) {
            var haystack = (prefix + ' ' + name + ' ' +
                            objname + ' ' + title).toLowerCase();
            var allfound = true;
            for (i = 0; i < otherterms.length; i++) {
              if (haystack.indexOf(otherterms[i]) == -1) {
                allfound = false;
                break;
              }
            }
            if (!allfound) {
              continue;
            }
          }
          var descr = objname + _(', in ') + title;

          var anchor = match[3];
          if (anchor === '')
            anchor = fullname;
          else if (anchor == '-')
            anchor = objnames[match[1]][1] + '-' + fullname;
          // add custom score for some objects according to scorer
          if (Scorer.objPrio.hasOwnProperty(match[2])) {
            score += Scorer.objPrio[match[2]];
          } else {
            score += Scorer.objPrioDefault;
          }
          results.push([docnames[match[0]], fullname, '#'+anchor, descr, score, filenames[match[0]]]);
        }
      }
    }

    return results;
  },

  /**
   * search for full-text terms in the index
   */
  performTermsSearch : function(searchterms, excluded, terms, titleterms) {
    var docnames = this._index.docnames;
    var filenames = this._index.filenames;
    var titles = this._index.titles;

    var i, j, file;
    var fileMap = {};
    var scoreMap = {};
    var results = [];

    // perform the search on the required terms
    for (i = 0; i < searchterms.length; i++) {
      var word = searchterms[i];
      var files = [];
      var _o = [
        {files: terms[word], score: Scorer.term},
        {files: titleterms[word], score: Scorer.title}
      ];

      // no match but word was a required one
      if ($u.every(_o, function(o){return o.files === undefined;})) {
        break;
      }
      // found search word in contents
      $u.each(_o, function(o) {
        var _files = o.files;
        if (_files === undefined)
          return

        if (_files.length === undefined)
          _files = [_files];
        files = files.concat(_files);

        // set score for the word in each file to Scorer.term
        for (j = 0; j < _files.length; j++) {
          file = _files[j];
          if (!(file in scoreMap))
            scoreMap[file] = {}
          scoreMap[file][word] = o.score;
        }
      });

      // create the mapping
      for (j = 0; j < files.length; j++) {
        file = files[j];
        if (file in fileMap)
          fileMap[file].push(word);
        else
          fileMap[file] = [word];
      }
    }

    // now check if the files don't contain excluded terms
    for (file in fileMap) {
      var valid = true;

      // check if all requirements are matched
      if (fileMap[file].length != searchterms.length)
          continue;

      // ensure that none of the excluded terms is in the search result
      for (i = 0; i < excluded.length; i++) {
        if (terms[excluded[i]] == file ||
            titleterms[excluded[i]] == file ||
            $u.contains(terms[excluded[i]] || [], file) ||
            $u.contains(titleterms[excluded[i]] || [], file)) {
          valid = false;
          break;
        }
      }

      // if we have still a valid result we can add it to the result list
      if (valid) {
        // select one (max) score for the file.
        // for better ranking, we should calculate ranking by using words statistics like basic tf-idf...
        var score = $u.max($u.map(fileMap[file], function(w){return scoreMap[file][w]}));
        results.push([docnames[file], titles[file], '', null, score, filenames[file]]);
      }
    }
    return results;
  },

  /**
   * helper function to return a node containing the
   * search summary for a given text. keywords is a list
   * of stemmed words, hlwords is the list of normal, unstemmed
   * words. the first one is used to find the occurrence, the
   * latter for highlighting it.
   */
  makeSearchSummary : function(text, keywords, hlwords) {
    var textLower = text.toLowerCase();
    var start = 0;
    $.each(keywords, function() {
      var i = textLower.indexOf(this.toLowerCase());
      if (i > -1)
        start = i;
    });
    start = Math.max(start - 120, 0);
    var excerpt = ((start > 0) ? '...' : '') +
      $.trim(text.substr(start, 240)) +
      ((start + 240 - text.length) ? '...' : '');
    var rv = $('<div class="context"></div>').text(excerpt);
    $.each(hlwords, function() {
      rv = rv.highlightText(this, 'highlighted');
    });
    return rv;
  }
};

$(document).ready(function() {
  Search.init();
});