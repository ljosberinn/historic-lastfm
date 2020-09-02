import withGA from 'next-ga';
import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import {
  attachRoutingContext,
  ErrorBoundary as TopLevelErrorBoundary,
} from '../src/utils/sentry';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps, router }: AppProps) {
  if (router) {
    attachRoutingContext(router, Component.name);
  }

  return (
    <TopLevelErrorBoundary showDialog>
      <div id="fauxHeaderContainer" className="clearit">
        <div id="fauxHeader" />
      </div>

      <div id="page">
        <div className="fiflufi">
          <TopLevelErrorBoundary>
            <Header />
          </TopLevelErrorBoundary>
          <div
            id="LastAd_leaderboard"
            className="LastAd ad-leaderboard inactive"
          >
            <span />
          </div>
          <div id="content">
            <TopLevelErrorBoundary showDialog>
              <Component {...pageProps} />
            </TopLevelErrorBoundary>
          </div>
        </div>
      </div>

      <TopLevelErrorBoundary>
        <Footer />
      </TopLevelErrorBoundary>
      <style jsx global>
        {`
          /* ==========================================================================
          Reset
          ========================================================================== */

          body,
          div,
          dl,
          dt,
          dd,
          ul,
          ol,
          li,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          pre,
          form,
          fieldset,
          input,
          textarea,
          p,
          blockquote,
          th,
          td {
            margin: 0;
            padding: 0;
            vertical-align: top;
          }

          /* Normalise display of HTML5 elements across browsers */
          article,
          aside,
          figcaption,
          figure,
          footer,
          header,
          hgroup,
          nav,
          section {
            display: block;
          }

          input,
          select {
            vertical-align: baseline;
          }

          input[type='text'],
          input[type='password'],
          textarea {
            font-size: 12px;
            background: #fff;
            color: #000;
            border: 1px solid #bbb;
            padding: 3px;
          }

          table {
            font-size: 100%;
            border-collapse: collapse;
            border-spacing: 0;
          }

          fieldset,
          img {
            border: 0;
          }

          img {
            -ms-interpolation-mode: bicubic;
          }

          ol,
          ul {
            list-style: none;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-size: 100%;
            font-weight: normal;
          }

          strong,
          .strong,
          b,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-weight: bold;
          }

          button {
            cursor: pointer;
            overflow: visible;
          }

          input.submit {
            cursor: pointer;
          }

          /* Tools */

          .clearit:after,
          #content:after,
          .clearitItems li:after {
            content: '.';
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
          }

          .clearit,
          .clearitItems li,
          #content,
          #page {
            zoom: 1;
          }

          /* Image replacement, hide text, show a background image, keep text for screen readers
          http://nicolasgallagher.com/another-css-image-replacement-technique/ */
          .ir {
            font: 0/0 a;
            text-shadow: none;

            /* Forcefully hide text. !important is necessary for Opera which has a minimum font size setting */
            color: transparent !important;
          }

          /* Body styles */

          body {
            color: #1b1b1b;
            font-family: 'Lucida Grande', Arial, Helvetica, Verdana, sans-serif;
            font-size: 13px;
            background: #e3e3e3;

            /* defense against rogue clickable skins */
            cursor: default !important;
          }

          #page {
            font-size: 12px;
            line-height: 1.5;
            clear: both;
            position: relative;
          }

          /* Headers */
          h1,
          .h1 {
            font-size: 18px;
            color: #000;
            font-weight: bold;
            line-height: 1.2em;
          }

          h2,
          .h2 {
            font-size: 14px;
            color: #d51007;
            font-weight: bold;
            line-height: 1.5em;
          }

          /* links */

          a {
            color: #0187c5;
            text-decoration: none;
          }

          a:hover {
            color: #0187c5;
            text-decoration: underline;
          }

          .shoutCount {
            color: #666;
          }

          small {
            font-size: 10px;
          }

          /* Message  */

          .memo {
            padding: 1em;
            background: #eef5fc;
            border-radius: 5px;
            font-size: 12px;
            line-height: 1.5em;
          }

          /* Media object. See https://github.com/stubbornella/oocss/tree/master/core/media
          ========================================================================== */

          /*
        * Example HTML:
        *
        * <div class="media [media--modifier]">
        *    <a href="#" class="media-pull-[left|right]">…</a>
        *    <div class="media-body"></div>
        * </div>
        */

          .media {
            display: block;
            margin-bottom: 18px;

            /* Clear container */
            overflow: hidden;
          }

          .media-pull-right {
            float: right;
            margin-left: 20px;
          }

          /* Clear body */
          .media-body {
            overflow: hidden;
          }

          .search-progress {
            width: 16px;
            height: 16px;
            display: none;
            z-index: 1;
            position: absolute;
          }

          /* Structure */

          html {
            width: 100%;
          }

          body {
            width: 100%;
          }

          /* ==========================================================================
          Responsive grid : 960 pixels fixed, 12 columns
          ========================================================================== */

          /*
        * Example HTML:
        *
        * <div class="r [r--modifier]">
        *     <section class="g4 [g--modifier]"></section>
        *     <ul class="g8 g--padded"></ul>
        * </div>
        *
        * Apply cell styles without a defined width:
        * <div class="g"></div>
        */

          /* Standard grid widths */
          .g3 {
            width: 220px;
          }
          .g6 {
            width: 460px;
          }

          /* Grid elements
        * Use .g as an arbitrary width grid element */
          .g,
          .g1,
          .g2,
          .g3,
          .g4,
          .g5,
          .g6,
          .g7,
          .g8,
          .g9,
          .g10,
          .g11,
          .g12 {
            margin-left: 10px;
            margin-right: 10px;
            float: left;
            max-width: 100%;
          }

          /* Row class clears floats and accounts for extra left and right margins. Rows are optional. */
          .r {
            margin-left: -10px;
            margin-right: -10px;
          }

          /* Use the clearfix clearing method to clear.
          Overflow:hidden creates too many problems. We want overflow visible by default. */
          .r:after,
          .g:after,
          .g1:after,
          .g2:after,
          .g3:after,
          .g4:after,
          .g5:after,
          .g6:after,
          .g7:after,
          .g8:after,
          .g9:after,
          .g10:after,
          .g11:after,
          .g12:after {
            content: '.';
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
          }

          /* ==========================================================================
          Vertical layout
          ========================================================================== */

          .add-vertical-margins,
          .add-bottom-margin {
            margin-bottom: 18px !important;
          }

          .add-vertical-margins,
          .add-top-margin {
            margin-top: 18px !important;
          }

          /* ==========================================================================
          Legacy page layouts
          Below here be monsters.
          ========================================================================== */

          body #page,
          .cookie-law-bar-innerwrap,
          .not-responsive .site-footer .responsive-container {
            margin: 0 auto;
            width: 980px;
            position: relative;
          }

          #content {
            position: relative;
            clear: both;
            margin-top: -1px;
            min-height: 500px;
            background: #fff;
            overflow: visible;
            border: 1px solid #ccc;

            /* defense against rogue clickable skins */
            cursor: default !important;
          }

          /* ==========================================================================
          Ads
          ========================================================================== */

          #LastAd_leaderboard {
            margin: 0 auto 9px;
            position: relative;
            zoom: 1;
            z-index: 1;
            width: 970px;
          }

          /* Ads should be able to appear over page content, but not active UI popups */
          .LastAd {
            z-index: 40;
            position: relative;
            text-align: center;
          }

          .LastAd > span,
          .LastAd .centerShim {
            display: inline-block;

            /* Stop absolutely positioned elements within the ad causing 
              horizontal scrolling in combination with the overflow rules 
              on #LastAd_leaderboard (WEB-18919) */
            position: relative;
          }

          .LastAd,
          .LastAd * {
            line-height: 0px;
            font-size: 1px;
            vertical-align: baseline;
          }

          /* ==========================================================================
          Two columns and classic columns
          ========================================================================== */

          .twoCols {
            overflow: hidden;
          }

          div.sic #content .leftColumn,
          .twoCols .leftColumn {
            float: left;
            display: inline;
            overflow: hidden;
            width: 50%;
          }

          div.sic #content .leftColumn .wrapper,
          .twoCols .leftColumn .wrapper {
            margin: 0 7px 15px 0;
            zoom: 1;
          }

          /* ==========================================================================
          Fiflufi – Fixed-Fluid-Fixed
          As of WEB-16450 this is all fixed.
          ========================================================================== */

          .fiflufi #content {
            background: url(https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/grids/fiflufi_right.5.png)
              right top repeat-y #fff;
          }

          .fiflufi .leftCol {
            float: left;
            display: inline;
            margin-right: -330px;
            width: 100%;
            overflow: hidden;
          }

          .fiflufi .leftColWrapper {
            margin-right: 330px;
            padding: 0 15px 15px;
            overflow: hidden;
          }

          .fiflufi .rightCol {
            float: right;
            display: inline;
            position: relative;
            padding: 0 15px 15px;
            width: 300px;
            font-size: 11px;
            line-height: 1.181818em;
          }

          /* ==========================================================================
          Default styles, with many convoluted page type dependent selectors. Eww.
          ========================================================================== */

          #page h2.heading {
            clear: both;
            margin: 10px -15px 2px;
            padding: 0;
            color: #d51007;
            font-size: 18px;
            line-height: 13px;
            border-top: 1px dotted #ccc;
          }

          .h2Wrapper {
            display: block;
            padding: 15px;
          }

          .h2Wrapper a {
            text-decoration: none;
            color: #d51007;
          }

          #page .h2Wrapper a:hover {
            text-decoration: underline;
          }

          #page .rightCol h2.heading {
            margin: 24px 0 12px;
            padding: 0;
            font-size: 14px;
            line-height: 18px;
            border-top: none;
          }

          #page .rightCol > h2.first,
          #page .rightCol > h2.heading:first-child,
          .mpuTop #LastAd_mpu.inactive + h2.heading {
            margin-top: 0;
          }

          .rightCol .h2Wrapper {
            padding: 0;
          }

          .moduleOptions {
            clear: both;
            display: block;
            text-align: right;
            color: #0187c5;
          }

          #page .moduleOptions {
            display: block;
            height: 15px;
            font-weight: bold;
            font-size: 11px;
            line-height: 14px;
          }
          #page .moduleOptions a,
          #page a .moduleOptions {
            float: right;
            display: block;
            font-size: 11px;
            line-height: 14px;
            padding-right: 18px;
            margin-left: 9px;
            background-image: url('https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/icons/see_more_arrow_blue_13x13_2.png');
            background-repeat: no-repeat;
            background-position: right top;
          }

          #header {
            position: relative;
            display: block;
            height: 70px;
            margin: 0 0 8px;
          }

          #headerWrapper {
            position: relative;
            height: 68px;
            margin: 0 -15px;
          }

          #fauxHeaderContainer {
            position: relative;
            float: left;
            display: block;
            width: 100%;
            min-width: 930px;
          }

          #fauxHeader {
            position: absolute;
            display: block;
            width: 100%;
            height: 70px;
            top: 0;
            background-position: 0 0;
            background-repeat: repeat-x;
          }

          /** Logo */

          #lastfmLogo {
            position: absolute;
            z-index: 1;
            top: 1px;
            left: 2px;
            display: block;
            width: 110px;
            height: 44px;
            background-position: 0 -160px;
            background-repeat: no-repeat;
            text-indent: -9999px;
          }

          #lastfmLogo:hover {
            background-position: -110px -160px;
          }

          /** Navigation */

          #primaryNav {
            position: absolute;
            top: 1px;
            left: 129px;
            z-index: 1;
            zoom: 1;
          }

          #primaryNav .navItem {
            float: left;
            display: block;
            margin-right: 2px;
          }

          #primaryNav .nav-link {
            display: block;
            float: left;
            padding: 15px 9px 7px 9px;
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            font-weight: bold;
            text-decoration: none;
            color: #fff;
            text-shadow: #870802 0 1px 0;
          }

          #primaryNav .nav-link:hover {
            background-position: 0 -260px;
            background-repeat: repeat-x;
          }

          /* Profile Links */

          #profileLinks {
            position: absolute;
            right: 15px;
            top: 10px;
            color: #f77a74;
            z-index: 0;
          }

          #profileLinks ul {
            float: right;
            display: block;
            zoom: 1;
          }

          #profileLinks .profileItem {
            float: right;
            display: inline-block;
            overflow: hidden;
          }

          #profileLinks .profile-link {
            display: inline-block;
            height: 15px;
            line-height: 15px;
            padding: 3px 7px 5px 5px;
            font-size: 11px;
            color: #eee;
            text-decoration: none;
            font-weight: normal;
          }

          #profileLinks .profile-link:hover {
            color: #fff;
            text-decoration: none;
          }

          #loginLink .profile-link {
            height: 23px;
            display: inline-block;
            padding: 0 3px 0 0;
            background-position: right -360px;
            background-repeat: no-repeat;
            color: #eee;
            font-size: 11px;
            font-weight: bold;
            text-decoration: none;
            text-align: right;
            vertical-align: middle;
            cursor: pointer;
            text-shadow: #870802 0 1px 0;
            overflow: hidden;
          }

          #loginLink .profile-link strong {
            height: 19px;
            padding: 1px 5px 3px 8px;
            background-position: left -360px;
            background-repeat: no-repeat;
            display: inline-block;
            line-height: 19px;
            vertical-align: top;
          }

          #siteSearch {
            position: absolute;
            top: 46px;
            right: 15px;
          }

          #siteSearchProgress {
            display: block;
            top: 3px;
            right: 5px;
            background: url(https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/spinners/spinner_ffffff_870802.gif)
              no-repeat;
          }

          #siteSearchBox {
            display: block;
            float: left;
            width: 180px;
            height: 15px;
            line-height: 15px;
            padding: 4px 5px 3px 5px;
            margin: 0;
            border: 0;
            font-size: 11px;
            background-position: 0 -450px;
            background-repeat: no-repeat;
            outline: none;
          }

          #siteSearchSubmit {
            display: block;
            float: left;
            width: 21px;
            height: 22px;
            padding: 0;
            margin: 0;
            border: 0;
            background-position: -42px -420px;
            background-repeat: no-repeat;
            cursor: pointer;
          }

          /** Header Promo */

          #headerPromo {
            position: absolute;
            top: 45px;
            left: 15px;
            font-size: 11px;
            line-height: 23px;
            color: #ddd;
            font-weight: bold;
          }

          #headerPromo a {
            color: #ddd;
          }

          #headerPromo a:hover {
            color: #fff;
          }

          /** Header Links */

          #headerLinks {
            position: absolute;
            top: 45px;
            right: 240px;
            height: 15px;
            line-height: 15px;
            padding: 4px 5px 4px 5px;
            color: #ddd;
            font-size: 11px;
          }

          #headerLinks a {
            color: #ddd;
          }

          #headerLinks a:hover {
            color: #fff;
            text-decoration: underline;
          }

          /** Language selector */

          /** Background sprite */

          #fauxHeader,
          #lastfmLogo,
          #primaryNav .nav-link:hover,
          #profileLinks .divider a,
          #loginLink .profile-link,
          #loginLink .profile-link strong,
          #idBadgerUser,
          #idBadgerDropper,
          #siteSearchBox,
          #siteSearchSubmit,
          #headerLangToggle img.globe_icon {
            background-image: url(https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/header/headersprite.1.png);
          }

          span.userImage {
            position: relative;
          }

          img.groupImage,
          span.groupImage img,
          span.userImage img {
            padding: 1px;
            border: 1px solid #ccc;
          }

          a:hover img.groupImage,
          a:hover span.userImage img {
            padding: 1px;
            border-color: #0187c5;
          }

          a.lfmBigButton,
          a.lfmSmallButton,
          .indicator,
          .dismissbutton,
          .mockAddButton {
            height: 18px;
            display: inline-block;
            padding: 0 3px 0 0;
            background: transparent
              url(https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/buttons/8/grey_right.png)
              no-repeat right top;
            color: #fff;
            font-size: 11px;
            text-decoration: none;
            text-align: right;
            vertical-align: middle;
            cursor: pointer;
            text-shadow: #163551 0 -1px 1px;
            overflow: hidden;
          }

          a.lfmBigButton strong,
          a.lfmBigButton span,
          a.lfmSmallButton strong,
          a.lfmSmallButton span,
          .indicator span,
          .indicator strong,
          .dismissbutton span,
          .dismissbutton strong,
          .mockAddButton span,
          .mockAddButton strong {
            height: 14px;
            padding: 2px 5px 2px 25px;
            background: transparent
              url(https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/buttons/8/add_left.png)
              no-repeat left top;
            display: inline-block;
            line-height: 14px;
            vertical-align: top;
          }

          a.lfmBigButton:hover,
          a.lfmSmallButton:hover {
            background-position: right bottom;
            color: #fff;
          }

          a.lfmBigButton:hover span,
          a.lfmBigButton:hover strong,
          a.lfmSmallButton:hover span,
          a.lfmSmallButton:hover strong {
            background-position: left bottom;
          }

          a.lfmSmallButton {
            height: 15px;
            font-size: 9px;
          }
          a.lfmSmallButton strong,
          a.lfmSmallButton span {
            height: 13px;
            padding: 2px 5px 0 20px;
            line-height: 11px;
          }

          /* Befriend */
          a.lfmBefriendButton {
            background: #163551
              url(https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/buttons/6/add_right.png)
              no-repeat right top;
            text-shadow: #163551 0 -1px 1px;
          }
          a.lfmBefriendButton strong {
            background: #163551
              url(https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/buttons/6/add_left.png)
              no-repeat left top;
          }

          a.lfmSmallMultiButton {
            width: 26px;
            padding: 0;
            background: transparent
              url(https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/buttons/6/small_multi.png)
              no-repeat right top;
          }

          a.lfmSmallMultiButton span {
            width: 26px;
            padding: 0;
            background: transparent;
          }

          .site-footer {
            background: url('https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/responsive/footer/bg.jpg');
            padding: 36px 0;
            margin-top: 12px;
            box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.2);
          }

          .site-footer h2 {
            font-size: 14px;
            color: #fff;
            margin: 0;
          }

          .site-footer-nav {
            text-shadow: 0 -1px 1px #000;
          }

          .site-footer-nav a,
          .site-footer-nav a:hover {
            color: #999;
          }

          .site-footer .call-to-action {
            position: relative;
            color: #999;
            padding-left: 50px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          .site-footer .call-to-action:before {
            content: '';
            position: absolute;
            top: 4px;
            left: 0px;
            width: 30px;
            height: 30px;
            background-repeat: no-repeat;
            background-image: url('https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/responsive/footer/icons.png');
          }

          .site-footer .call-to-action--upload:before {
            background-position: 0 0;
          }

          .site-footer .call-to-action--download:before {
            background-position: 0 -40px;
          }

          .site-footer .call-to-action:hover,
          .site-footer .call-to-action:focus {
            color: #999;
            text-decoration: none;
          }

          .site-footer .call-to-action:hover h2,
          .site-footer .call-to-action:focus h2 {
            text-decoration: underline;
          }

          .site-footer .separator {
            margin: 0 0 18px;
            border-width: 1px 0;
            border-color: #1a1a1a #3a3a3a #3a3a3a;
            border-style: solid;
          }

          .site-footer-legalese {
            font-size: 12px;
            color: #666;
          }

          .site-footer-legalese-strapline {
            font-style: italic;
            color: #999;
          }

          .site-footer-legalese a {
            color: inherit;
            text-decoration: underline;
          }

          #cbsi_f {
            background: transparent
              url('https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/responsive/footer/cbs_interactive.png')
              0 0 no-repeat;
            margin-top: 18px;
            padding: 2px 0 0 145px;
            min-height: 24px;
          }

          .rb_visit_txt {
            border: 0;
            clip: rect(0, 0, 0, 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
            z-index: -1;
          }

          a.icon:hover {
            text-decoration: none !important;
          }
          a.icon:hover span,
          a.icon:hover strong {
            text-decoration: underline !important;
          }

          img.comment_icon {
            margin: 0 3px -2px 0;
          }
          img.play_icon {
            margin: 0 4px -4px 0;
          }
          img.feed_small_icon {
            margin: 0 4px -1px 0;
          }

          img.loved_indicator_icon {
            margin: 0 4px 0 0;
          }

          img.icon {
            background-image: url('https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/sprites/21/icons.png');
          }

          .feed_small_icon {
            background-position: 0 -1000px;
          }
          .loved_indicator_icon {
            background-position: 0 -1060px;
          }
          .play_icon {
            background-position: 0 -1080px;
          }
          .comment_icon {
            background-position: 0 -1220px;
          }
          .addtofriends_icon {
            background-position: 0 -1280px;
          }
          .mailuser_icon {
            background-position: 0 -1320px;
          }

          .act_loved_icon {
            background-position: 0 -1700px;
          }

          ul.minifeedSmall li {
            padding: 3px 0 3px 25px;
            border-bottom: 1px solid #ddd;
            font-size: 11px;
          }

          ul.minifeedSmall li img.icon {
            display: inline;
            float: left;
            margin: 0 0 0 -25px;
          }

          ul.minifeedSmall li.last {
            border: none;
          }

          ul.minifeedSmall li a {
            color: #0187c5;
            text-decoration: none;
          }

          ul.minifeedSmall li a:hover {
            text-decoration: underline;
          }

          ul.minifeedSmall li span.date {
            color: #999;
          }

          .page-head {
            padding: 18px 0;
            background: #fff;
            position: relative;
          }

          .fiflufi .page-head,
          .fixed .page-head,
          .sic .page-head.separated {
            padding-left: 15px;
            padding-right: 15px;
          }

          .page-head.separated {
            padding-bottom: 18px;
            margin-bottom: 15px;
            border-bottom: 1px dotted #ccc;
          }

          .page-head h1 {
            font-size: 20px;
            line-height: 30px;
          }

          .secondary-nav {
            text-align: right;
            width: 50%;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          .secondary-nav .more {
            display: none;
          }

          .secondary-nav ul {
            overflow: hidden;
            height: 18px;
            margin-bottom: 0;
          }

          .secondary-nav li {
            display: inline;
            margin-left: 1em;
            white-space: nowrap;
          }

          .secondary-nav .drop-down-menu {
            position: absolute;
            top: 0;
            right: 0;
          }

          .page-head.without-crumbtrail {
            display: table;
          }

          .page-head.without-crumbtrail h1 {
            width: 50%;
          }

          .page-head.without-crumbtrail h1,
          .page-head.without-crumbtrail.with-image .crumb-image,
          .page-head.without-crumbtrail .secondary-nav {
            display: table-cell;
            vertical-align: middle;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          .page-head.without-crumbtrail .secondary-nav {
            left: 3px; /* line-up table-cell with abs positioned version */
          }

          .fiflufi .page-head.without-crumbtrail .drop-down-menu {
            right: 15px;
          }

          .page-head.without-crumbtrail .drop-down-menu {
            top: 50%;
            margin-top: -9px;
          }

          /* shoutboxList */
          .shouts {
            margin: 15px 0;
            width: 100%;
          }

          .shouts .message {
            clear: both;
            position: relative;
            margin: 0 0 12px 0;
            padding: 0 0 6px 80px;
          }

          .shouts h3 {
            border-bottom: 1px solid #ccc;
            padding-bottom: 2px;
            margin: 0 0 3px;
            font-size: 12px;
            line-height: 18px;
          }

          .shouts h3 a,
          .shouts h3 a:hover {
            color: #0187c5;
          }

          /* break long links */
          .shouts .message a {
            word-wrap: break-word;
          }

          .shouts .message .author span.userImage {
            display: inline;
            float: left;
            position: relative;
            margin-left: -80px;
          }

          .shouts .message p {
            padding: 0;
            font-size: 13px;
            line-height: 18px;
            color: #333;
            word-wrap: break-word;
          }

          .shouts .meta {
            margin: 6px 0 0;
            font-size: 11px;
            color: #999;
          }

          .shouts .meta a {
            color: #999;
          }

          .shoutbox-reply {
            display: none;
          }

          .user-shoutbox .shoutbox-reply {
            display: inline;
          }

          .shouts .date {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 16px;
          }

          /* medium */

          .stationbuttonMedium {
            clear: both;
            display: block;
            position: relative;
            height: 25px;
            background: url(https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/buttons/stationbutton/8/stationbutton-medium.png)
              left top no-repeat;
            margin: 0 10px 10px 0;
            padding-left: 30px;
            color: #fff;
            font-weight: bold;
            font-size: 11px;
            line-height: 25px;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
          }

          .stationbuttonMedium span.stationButtonWrapper {
            position: relative;
            display: block;
            padding: 0 10px 0 2px;
            background: url(https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/buttons/stationbutton/8/stationbutton-medium.png)
              right top no-repeat;
            height: 25px;
          }

          .stationbuttonMediumRight {
            clear: none;
            float: right;
            margin: 0 0 10px 10px;
            max-width: auto;
          }

          .tasteometer {
            font-size: 11px;
            line-height: 1.181818em;
          }

          .tasteometer .bar {
            display: block;
            position: relative;
            margin: 5px 0;
            height: 8px;
            overflow: hidden;
            border-radius: 3px;
            background: #ccc;
          }

          .tasteometer .reading {
            text-transform: uppercase;
          }

          .tasteometer .bar span {
            display: block;
            height: 8px;
            border-radius: 3px;
          }

          .userTasteometer .moduleOptions {
            background: transparent;
          }

          .horizontalOptions {
            display: block;
            margin: 0 0 15px 0;
            border-bottom: 1px solid #ccc;
            font-size: 10px;
            line-height: normal;
          }

          .horizontalOptions ul {
            overflow: hidden;
            margin-bottom: -1px;
          }

          .horizontalOptions ul li {
            float: left;
            margin: 0 5px 0 0;
            list-style: none;
          }

          .horizontalOptions ul li a,
          .horizontalOptions ul li span,
          .horizontalOptions ul li strong {
            float: left;
            height: 20px;
            line-height: 20px;
            margin: 0 3px 0 0;
            padding: 0 2px 0 5px;
          }
          .horizontalOptions ul li a,
          .horizontalOptions ul li span {
            color: #0187c5;
            text-decoration: none;
            cursor: pointer;
          }

          .horizontalOptions ul li.current {
            border: 1px solid #ccc;
            border-bottom-color: #fff;

            -moz-border-radius: 3px 3px 0 0;
            border-radius: 3px 3px 0 0;
          }

          table.chart {
            width: 100%;
            font-size: 11px;
            margin-bottom: 10px;
          }

          table.chart td {
            vertical-align: top;
            line-height: 16px;
            padding: 3px 5px;
          }

          table.chart tr.odd td {
            background-color: #ebebeb;
          }

          table.chart td.positionCell {
            width: 20px;
            color: #666;
            text-align: right;
          }

          table.chart td.playbuttonCell {
            width: 17px;
            padding-bottom: 0;
            padding-top: 1px;
          }

          table.chart td.playbuttonCell a.playbutton {
            display: block;
            padding-top: 3px;
          }

          table.chart td.playbuttonCell img {
            margin: 0;
          }

          table.chart td.subjectCell div {
            width: 100%;
            height: 16px;
            overflow: hidden;
          }

          table.chart td.subjectCell a {
            color: #1b1b1b;
          }

          table.chart td.subjectCell a:hover {
            color: #0187c5;
          }

          table.chart td.lovedCell {
            padding: 3px 5px 0 0;
            width: 11px;
          }

          table.chart td.multibuttonCell {
            width: 26px;
            padding: 3px 5px 0 3px;
            line-height: 0;
          }

          table.chart td.chartbarCell {
            width: 33%;
            padding: 0;
          }

          table.chart tr.odd td.chartbarCell,
          table.chart tr:hover td.chartbarCell {
            background-color: transparent;
          }

          table.chart a.lfmButton {
            position: relative;
            left: -9999px;
          }

          table.chart tbody tr:hover td,
          table.chart tbody tr.open td {
            background: #d0e4f0;
          }

          table.chart a.lfmFreeDownloadButton,
          table.chart tr:hover a.lfmButton,
          table.chart tr.open a.lfmButton {
            left: 0;
          }

          /* the chartbars */

          div.chartbar {
            overflow: hidden;
          }

          div.chartbar span {
            display: block;
            height: 17px;
            padding: 3px 0.5em 0 0.5em;
            background: #71b7e6;
            color: #fff;
            overflow: hidden;
            -moz-border-radius: 0 3px 3px 0;
            border-radius: 0 3px 3px 0;
          }

          div.chartbar a span:hover {
            background: #48779a;
          }

          div.chartbar a {
            padding: 0;
            margin: 0;
            color: #fff;
          }

          div.chartbar a:hover {
            text-decoration: none;
            cursor: pointer;
          }

          table.tracklist {
            clear: both;
            width: 100%;
            color: #666;
            font-size: 11px;
            line-height: 1.5em;
          }

          table.tracklist tbody tr:hover,
          table.tracklist tbody tr.open {
            background: #bfdff4;
          }

          table.tracklist th,
          table.tracklist td {
            padding: 5px 10px;
            border-bottom: 1px solid #ccc;
            color: #000;
          }

          table.tracklist td.imageSmall {
            width: 34px;
            padding: 5px;
          }

          table.tracklist td.playbutton,
          table.tracklist td.playbuttonCell {
            width: 17px;
            padding: 3px 0 0 3px;
          }

          table.tracklist td.lovedCell {
            padding: 5px 5px 0 0;
            width: 11px;
          }

          table.tracklist .loved_indicator_icon {
            margin-top: 2px;
          }

          table.tracklist td.subjectCell {
            color: #000;
            width: 100%;
          }

          table.tracklist .smallmultibuttonCell {
            padding: 3px 5px 0 0;
            width: 26px;
          }

          table.tracklist a.lfmButton,
          table.tracklist a.delete,
          table.tracklist .dismiss {
            position: relative;
            left: -9999px;
          }

          table.tracklist a.lfmFreeDownloadButton,
          table.tracklist tr:hover a.lfmButton,
          table.tracklist tr.open a.lfmButton,
          table.tracklist tr:hover a.delete,
          table.tracklist tr:hover .dismiss {
            left: 0;
          }

          table.tracklist a {
            color: #000;
          }

          table.tracklist a:hover {
            color: #0187c5;
          }

          table.tracklist td.imageCell {
            padding: 0;
          }

          table.tracklist td.imageCell img {
            display: block;
            float: left;
          }

          table.tracklist td.dateCell {
            padding-right: 5px;
            padding-left: 5px;
            text-align: right;
            color: #999;
            white-space: nowrap;
            font-size: 10px;
          }

          ul.artistsLarge {
            display: block;
            overflow: hidden;
            font-size: 11px;
            line-height: 1.181818em;
            margin-right: -15px;
          }

          ul.artistsLarge li {
            position: relative;
            float: left;
            display: inline;
            width: 132px;
            height: 155px;
            margin: 0 9px 0 0;
            overflow: hidden;
          }

          .pictureFrame {
            position: relative;
            display: block;
            width: 132px;
            height: 109px;
            overflow: hidden;
            cursor: pointer;
          }

          .pictureFrame .image {
            position: absolute;
            top: 2px;
            left: 3px;
            display: block;
            width: 126px;
            height: 100px;
            overflow: hidden;
          }

          .pictureFrame .overlay {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 132px;
            height: 109px;
            background: url(https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/picture_frame.png)
              left top transparent;
          }

          ul.artistsLarge a {
            color: #000;
          }

          ul.artistsLarge a.plays {
            color: #0187c5;
            font-size: 10px;
            white-space: nowrap;
          }

          ul.artistsLarge a:hover {
            color: #0187c5;
          }

          ul.artistsLarge a.playbutton {
            position: absolute;
            left: 105px;
            top: 81px;
          }

          ul.groupsSmall li.last {
            border-bottom: 0;
          }

          ul.groupsSmall a,
          ul.groupsSmall a:hover {
            text-decoration: none;
            display: block;
          }

          ul.groupsSmall li strong {
            display: block;
            font-size: 11px;
          }

          ul.groupsSmall li a strong img.groupImage {
            float: left;
            margin-left: -49px;
          }

          ul.groupsSmall li {
            display: block;
            padding: 5px 5px 5px 49px;
            border-top: 1px solid #fff;
            border-bottom: 1px solid #ccc;
            font-size: 11px;
          }

          ul.groupsSmall li span.info {
            display: block;
            margin: 2px 0 0 0;
            font-size: 10px;
            color: #666;
          }

          ul.groupsSmall a strong {
            color: #000;
          }

          ul.groupsSmall a:hover strong {
            color: #0187c5;
          }

          ul.usersSmall li {
            float: left;
            display: inline;
            width: 49%;
            margin: 0 0 7px 0;
          }

          ul.usersSmall li div {
            padding: 0 0 0 48px;
            font-size: 11px;
            line-height: 1.181818em;
            color: #666;
          }

          ul.usersSmall li.odd {
            clear: both;
          }

          ul.usersSmall li.odd div {
            margin-right: 10px;
          }

          ul.usersSmall li strong a {
            color: #1b1b1b;
            font-weight: bold;
            text-decoration: none;
            cursor: pointer; /* explicit for IE */
          }

          ul.usersSmall li strong a:hover {
            color: #0187c5;
          }

          ul.usersSmall span.userImage {
            float: left;
            display: inline;
            margin: 0 0 0 -48px;
          }

          .module {
            position: relative;
          }

          .fiflufi .leftCol .module {
            margin-top: 30px;
          }

          #page div.fiflufi div.leftCol div.module h2.heading {
            margin-top: 0;
          }

          .module .moduleDropDown {
            position: absolute;
            top: -2px;
            right: 0;
          }
          .module .moduleButtons {
            position: absolute;
            top: -2px;
            right: 0;
            font-size: 11px;
          }

          #page .module .moduleButtons {
            top: 15px;
          }

          .module .moduleButtons a {
            color: #666;
          }

          #siteSearch {
            position: absolute;
            top: 46px;
            right: 15px;
          }

          #siteSearchProgress {
            display: block;
            top: 3px;
            right: 5px;
            background: url(https://web.archive.org/web/20130605124003im_/http://cdn.lst.fm/flatness/spinners/spinner_ffffff_870802.gif)
              no-repeat;
          }

          #siteSearchBox {
            width: 180px;
            height: 15px;
            line-height: 15px;
            padding: 4px 5px 3px;
            font-size: 11px;
            background-position: 0 -450px;
            outline: none;
          }

          #siteSearchBox,
          #siteSearchSubmit {
            display: block;
            float: left;
            margin: 0;
            border: 0;
            background-repeat: no-repeat;
          }

          #siteSearchSubmit {
            width: 21px;
            height: 22px;
            padding: 0;
            background-position: -42px -420px;
            cursor: pointer;
          }

          #headerPromo {
            position: absolute;
            top: 45px;
            left: 15px;
            font-size: 11px;
            line-height: 23px;
            color: #ddd;
            font-weight: 700;
          }

          #headerPromo a {
            color: #ddd;
          }

          #headerPromo a:hover {
            color: #fff;
          }

          #headerLinks {
            position: absolute;
            top: 45px;
            right: 240px;
            height: 15px;
            line-height: 15px;
            padding: 4px 5px;
            color: #ddd;
            font-size: 11px;
          }

          #headerLinks a {
            color: #ddd;
          }

          #headerLinks a:hover {
            color: #fff;
            text-decoration: underline;
          }
        `}
      </style>
      <style jsx global>
        {`
          #userBadge {
            display: block;
            padding: 0 0 15px 130px;
          }

          #userBadge .badgeAvatar {
            display: inline;
            float: left;
            margin-left: -130px;
          }

          #userBadge .badgeAvatar .userImage {
            display: block;
          }

          #userBadge .badgeAvatar .userImage img {
            display: block; /* override */
            float: left;
          }

          #userBadge .badgeInfo {
            margin: 10px 0 0 15px;
            font-size: 11px;
            line-height: 1.181818em;
          }

          #userBadge .badgeInfo p.userInfo {
            margin: 0 0 10px 0;
          }

          #userBadge .badgeInfo p.userInfo .url {
            font-size: 11px;
          }

          #userBadge .badgeInfo .userPlays {
            display: block;
            margin: 0 0 4px 0;
            line-height: 13px;
          }

          #userBadge .badgeInfo .userPlays span.flip {
            display: block;
            float: left;
            width: 10px;
            height: 13px;
            font-size: 11px;
            margin-right: 1px;
            background: url(https://web.archive.org/web/20130605124012im_/http://cdn.lst.fm/flatness/scrobbleflip.png)
              no-repeat;
            color: #fff;
            text-align: center;
            line-height: 13px;
            vertical-align: middle;
          }

          #userBadge .badgeInfo .userPlays small {
            font-size: 10px;
            color: #999;
          }

          #userBadge .badgeInfo p.userActivity {
            color: #0187c5;
          }

          #userBadge .badgeInfo p.userActivity .shoutCount img {
            display: none;
          }

          #userBadge .badgeInfo small.userLastseen {
            display: block;
            font-size: 10px;
            color: #999;
          }

          .profileOptions {
            display: block;
            border-top: 1px solid #eee;
            padding: 10px 0 0 145px;
          }

          .profileOptions .options {
            float: left;
            display: inline;
            margin-left: -145px;
          }

          .profileOptions ul.buttons li {
            clear: both;
            line-height: 12px;
            margin: 0 0 4px 0;
            width: 130px;
          }

          /* hackx-overwrite-hackx */
          #page .profileOptions ul.buttons .lfmBefriendButton {
            height: auto;
            padding: 0;
            margin: 0;
            background: none;
            color: #0187c5;
            font-size: 11px;
            text-decoration: none;
            text-align: left;
            vertical-align: middle;
            cursor: pointer;
            font-weight: normal;
            text-shadow: none;
            overflow: visible;
          }

          #page .profileOptions ul.buttons .lfmBefriendButton strong {
            height: auto;
            padding: 0;
            background: none;
            display: -moz-inline-box;
            display: inline-block;
            line-height: 12px;
            vertical-align: top;
            font-weight: normal;
          }

          #page .profileOptions ul.buttons .lfmBefriendButton span {
            padding: 0;
            background: none;
            font-size: 11px;
            line-height: 12px;
            font-weight: normal;
            text-decoration: none;
            display: inline;
          }

          #page .profileOptions ul.buttons .lfmBefriendButton:hover span {
            color: #0187c5;
            text-decoration: underline !important;
          }

          #page .profileOptions ul.buttons .lfmMailButton,
          #page .profileOptions ul.buttons .lfmMailButton span {
            margin: 0;
            padding: 0;
            font-size: 11px;
            line-height: 1.181818em;
            font-weight: normal;
          }

          #page
            .profileOptions
            ul.buttons
            .lfmBefriendButton
            .addtofriends_icon,
          #page .profileOptions ul.buttons .lfmBefriendButton .isfriend_icon {
            float: left;
            margin: -6px 5px 0 -4px;
          }

          #page .profileOptions ul.buttons .lfmMailButton .mailuser_icon {
            /*    margin: 0 5px -4px 0;*/
            margin: 0 5px 0 0;
          }

          .profileOptions ul.buttons .lfmShoutboxButton {
            margin: 0;
            font-size: 11px;
            line-height: 1.181818em;
            font-weight: normal;
          }

          .profileOptions ul.buttons .lfmShoutboxButton .comment_icon {
            /*    margin: 0 5px -4px 0;*/
            margin: 0 5px 0 0;
          }

          #recentTracks table {
            margin-bottom: 15px;
          }

          div#aboutMe {
            font-size: 11px;
            margin: 1em 0;
            width: 100%;
            height: 1%;
            overflow: hidden;
          }

          /* tastasticular taste! */

          #taste {
            margin-bottom: 30px;
          }

          #taste p.libraryInfo {
            font-size: 11px;
            line-height: 14px;
            float: left;
            margin-bottom: 6px;
          }

          #taste .libraryInfo a.total {
            font-weight: bold;
            font-size: 12px;
            color: #000;
          }

          #taste .libraryInfo span.rangetype {
            color: #666;
          }

          #taste ul.libraryItems {
            overflow: hidden;
            position: relative;
            height: 310px;
            clear: both;
            padding-top: 10px;
          }

          #tasteCocktail {
            max-width: 550px; /* max width of the artist list above it */
            margin: 10px 0 15px 0;
            font-size: 11px;
            line-height: 1.181818em;
          }

          #tasteCocktail .wrapper {
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            border: 1px solid #ccc;
            background: #f5f5f5;
            padding: 5px 5px 10px 5px;
          }

          #page #tasteCocktail h3 {
            font-size: 11px;
            line-height: 1.181818em;
            font-weight: normal;
            margin: 0 0 5px 0;
          }

          html:not([lang*='']) #taste .stationbutton .stationButtonWrapper {
            float: none;
          }
        `}
      </style>
      <style jsx global>
        {`
          /* Make clicks pass-through */
          #nprogress {
            pointer-events: none;
          }

          #nprogress .bar {
            background: #29d;

            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;

            width: 100%;
            height: 2px;
          }

          /* Fancy blur effect */
          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px #29d, 0 0 5px #29d;
            opacity: 1;

            -webkit-transform: rotate(3deg) translate(0px, -4px);
            -ms-transform: rotate(3deg) translate(0px, -4px);
            transform: rotate(3deg) translate(0px, -4px);
          }

          /* Remove these to get rid of the spinner */
          #nprogress .spinner {
            display: block;
            position: fixed;
            z-index: 1031;
            top: 15px;
            right: 15px;
          }

          #nprogress .spinner-icon {
            width: 18px;
            height: 18px;
            box-sizing: border-box;

            border: solid 2px transparent;
            border-top-color: #29d;
            border-left-color: #29d;
            border-radius: 50%;

            -webkit-animation: nprogress-spinner 400ms linear infinite;
            animation: nprogress-spinner 400ms linear infinite;
          }

          .nprogress-custom-parent {
            overflow: hidden;
            position: relative;
          }

          .nprogress-custom-parent #nprogress .spinner,
          .nprogress-custom-parent #nprogress .bar {
            position: absolute;
          }

          @-webkit-keyframes nprogress-spinner {
            0% {
              -webkit-transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
            }
          }
          @keyframes nprogress-spinner {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </TopLevelErrorBoundary>
  );
}
export default withGA('UA-171750977-1', Router)(App);
