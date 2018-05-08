<template>
  <div id="app" :class="period">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      date: new Date
    }
  },
  computed: {
    year(){
      return this.date.getFullYear();
    },
    period(){
      let hour = this.date.getHours();
      return (hour > 5 && hour < 18)? 'app--day': 'app--night';
    }
  }
}
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}


#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  font-size: 20px;
  width:100%;
  height:100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

#app.app--day{
  background: rgb(246,230,180) fixed;
  background: -moz-linear-gradient(top, rgba(246,230,180,0.8) 0%, rgba(237,144,23,0.85) 100%) fixed;
  background: -webkit-linear-gradient(top, rgba(246,230,180,0.8) 0%,rgba(237,144,23,0.85) 100%) fixed;
  background: linear-gradient(to bottom, rgba(246,230,180,0.8) 0%,rgba(237,144,23,0.85) 100%) fixed;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f6e6b4', endColorstr='#ed9017',GradientType=0 );
}

#app.app--night {
  background: rgb(114,94,127);
  background: -moz-linear-gradient(top, rgba(114,94,127,0.8) 0%, rgba(13,40,137,0.85) 100%) fixed;
  background: -webkit-linear-gradient(top, rgba(114,94,127,0.8) 0%,rgba(13,40,137,0.85) 100%) fixed;
  background: linear-gradient(to bottom, rgba(114,94,127,0.8) 0%,rgba(13,40,137,0.85) 100%) fixed;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#725e7f', endColorstr='#0d2889',GradientType=0 );
}

p{
  margin-top:0px;
}
</style>
