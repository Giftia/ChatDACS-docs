/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "75c8929294dd7db04966cf892508ff3f"
  },
  {
    "url": "assets/css/0.styles.6440c008.css",
    "revision": "80d73cdd50db3be5bbedc476a9563e45"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.b770174b.js",
    "revision": "80aacdbde412836c3f8c7361bb17cbba"
  },
  {
    "url": "assets/js/11.ccdee7ba.js",
    "revision": "7b8fdc4d049a2f034afdd81f3e603817"
  },
  {
    "url": "assets/js/12.db6e7a98.js",
    "revision": "146641d974d48ad8e3fbe70e5acb2680"
  },
  {
    "url": "assets/js/13.214d79d0.js",
    "revision": "a10f20bb4afdf77499327e7e194ada34"
  },
  {
    "url": "assets/js/14.879a0956.js",
    "revision": "d97ccae068dcc6cef122cb1179a4975f"
  },
  {
    "url": "assets/js/15.21c258d9.js",
    "revision": "456e4172957a4b5759cc44f343e4bde5"
  },
  {
    "url": "assets/js/16.ed3e8088.js",
    "revision": "d4a0de72eacb8e9d8a2bd59a1b360ffd"
  },
  {
    "url": "assets/js/17.40f5aa9b.js",
    "revision": "399390c198201b498b52222781ed3be8"
  },
  {
    "url": "assets/js/2.20dc188e.js",
    "revision": "094d1ef410346de36bfc3db4dd47daa2"
  },
  {
    "url": "assets/js/3.1a8f7b58.js",
    "revision": "169f018a532e413abc773da05a56a74f"
  },
  {
    "url": "assets/js/4.28009f6b.js",
    "revision": "06aee4eb63d895b6c9c3f76962bc104e"
  },
  {
    "url": "assets/js/5.aa8a4117.js",
    "revision": "430afdb37d0bd12a67e04045df2c38dd"
  },
  {
    "url": "assets/js/6.937da696.js",
    "revision": "a30e716cf5d0ed4e3560fbd82fac8745"
  },
  {
    "url": "assets/js/7.4098c9e2.js",
    "revision": "ff8299f817578b219214dfd60296a618"
  },
  {
    "url": "assets/js/8.e762ecaa.js",
    "revision": "e565edcd04720b6caffa114f74776300"
  },
  {
    "url": "assets/js/9.96ecb601.js",
    "revision": "46c97d40b0e416440b2b7685288de6ab"
  },
  {
    "url": "assets/js/app.5056e77f.js",
    "revision": "09bbb35d4ca7b3a73084bf79c558635b"
  },
  {
    "url": "bilibili/index.html",
    "revision": "c69ac98b2f771bc71563404fada97351"
  },
  {
    "url": "deploy/index.html",
    "revision": "87bc3d57397fb72534188b238f262eee"
  },
  {
    "url": "guide/index.html",
    "revision": "02e093b3ed78528f4e2ec1c099c25851"
  },
  {
    "url": "index.html",
    "revision": "9afe9225c2c51ea350d9fa5b8f60fe2a"
  },
  {
    "url": "plugins/index.html",
    "revision": "aae812f9fc0d2792056bd5cdc2d55277"
  },
  {
    "url": "qqGuild/index.html",
    "revision": "a965b61a90f8f5ed41c5ba12db3c5451"
  },
  {
    "url": "static/about_guild_bot_and_guild_user.jpg",
    "revision": "2da03ca69a42901d60fdd0f47a78dd1b"
  },
  {
    "url": "static/avgPainter.jpg",
    "revision": "428e89f99b4e037bf715bcfacc980cc9"
  },
  {
    "url": "static/boom.jpg",
    "revision": "4965370b4d6df5db79a149f6be21a40c"
  },
  {
    "url": "static/chatPush.jpg",
    "revision": "ee045b5c32244200875db591401f8f3b"
  },
  {
    "url": "static/chatTeach.jpg",
    "revision": "624012e5112a68c92c65a1a83dd6140b"
  },
  {
    "url": "static/cos.jpg",
    "revision": "857219d63dfe62c0501f1cd442a49e67"
  },
  {
    "url": "static/cp.jpg",
    "revision": "e492e33a424582f69073eeb3cbe42b26"
  },
  {
    "url": "static/crazyThursday.jpg",
    "revision": "b99ce039604e0664335f4966fa8685f8"
  },
  {
    "url": "static/cyberPedia.jpg",
    "revision": "5752a1823c60389d1d6ab86df1bc217f"
  },
  {
    "url": "static/danceCube1.jpg",
    "revision": "a18c12b321d297cd2e9acd7f659d35ca"
  },
  {
    "url": "static/danceCube2.jpg",
    "revision": "d38dad29b61b5e05f51101b449d4d669"
  },
  {
    "url": "static/dialogue.jpg",
    "revision": "299fba3909ed001d7aab254e55a6b254"
  },
  {
    "url": "static/feedback1.jpg",
    "revision": "0a21fcb65ba3ea485f1ec6f3c9fa1620"
  },
  {
    "url": "static/feedback2.jpg",
    "revision": "4cb8d73d5d09de8d7a072e2c0114f07b"
  },
  {
    "url": "static/flowerOfHope.jpg",
    "revision": "2a4a92ac622d6150849de59c487bc634"
  },
  {
    "url": "static/getNewestFeed.jpg",
    "revision": "cde9012227f40b5472551f95ced5b2a7"
  },
  {
    "url": "static/grassPictureGenerate.jpg",
    "revision": "554ca079f8b535522b41dc2e27a7c0f3"
  },
  {
    "url": "static/handGrenade.jpg",
    "revision": "33bf6a1d83637d1e6cef418be49f7b55"
  },
  {
    "url": "static/help.jpg",
    "revision": "2cce1bd0abc38b1011e1d7aa8c57d327"
  },
  {
    "url": "static/heroImage.jpg",
    "revision": "08ab4e9840c95772c66b41839405a38d"
  },
  {
    "url": "static/hollyHandGrenade.jpg",
    "revision": "67a0ce899100373f8ab93bd00ddd8245"
  },
  {
    "url": "static/lifeRestart.jpg",
    "revision": "8b9e8657a6708076dfb695a6a7e9cfa9"
  },
  {
    "url": "static/noCondom.jpg",
    "revision": "315f68929212c5e6ebc2c833da86ebb2"
  },
  {
    "url": "static/nyaTranslate.jpg",
    "revision": "cf2a6afa2d70cbd127b9f08de2fe9a3c"
  },
  {
    "url": "static/perfunctoryTeach.jpg",
    "revision": "d8abffee0c0bb54be224e86a2bad7af4"
  },
  {
    "url": "static/ping.jpg",
    "revision": "cdd46a8ea2016013acd03d09d7b344e4"
  },
  {
    "url": "static/poHaiGenerate.jpg",
    "revision": "c32e080828d38c18632da6e0994c44b2"
  },
  {
    "url": "static/poke.jpg",
    "revision": "ea1cb9208a12bc43478dd21990e42506"
  },
  {
    "url": "static/prpr.jpg",
    "revision": "efa8297c108047243282c51c2d8cf6cc"
  },
  {
    "url": "static/qr.jpg",
    "revision": "30c9962c3ba0aaacf041df641440d2bf"
  },
  {
    "url": "static/repeat.jpg",
    "revision": "6cfa299b35d1695f62d6ad013b485b37"
  },
  {
    "url": "static/roll.jpg",
    "revision": "46ff12d82bd67e3f7633de21a341130f"
  },
  {
    "url": "static/run-step1.jpg",
    "revision": "afe332d1d64e738102962b39c47e7b0b"
  },
  {
    "url": "static/run-step2.jpg",
    "revision": "8a53d04e7cddef9a38ad3ab568286ec1"
  },
  {
    "url": "static/run-step3.jpg",
    "revision": "a372b59e240caa4f1c9d5837651e04cc"
  },
  {
    "url": "static/schedule.jpg",
    "revision": "9ea3a5819007d2d7352e26830c2fa493"
  },
  {
    "url": "static/serviceSwitch.jpg",
    "revision": "0185110cf4a7f58d94aaea88dc5d5c93"
  },
  {
    "url": "static/setMine.jpg",
    "revision": "2f12f5513400ec32e4823b300c94638a"
  },
  {
    "url": "static/status.jpg",
    "revision": "c3ef5015ed43c6083f7983b13e2088db"
  },
  {
    "url": "static/stepOnAMine.jpg",
    "revision": "88e35037cbbde448c97f21e6c8541bf4"
  },
  {
    "url": "static/tray.jpg",
    "revision": "2b7611ca1bf140825d03ba52ead1e254"
  },
  {
    "url": "static/tts.jpg",
    "revision": "268f7ef791b8cf19e5a7ef79289185c9"
  },
  {
    "url": "static/waifuToday.jpg",
    "revision": "048bc8e7ba8df60029b81f2430391d26"
  },
  {
    "url": "static/xiaoye/xiaoye.4096/texture_00.png",
    "revision": "2624175fa101603c3365d588bdc6489e"
  },
  {
    "url": "telegram/index.html",
    "revision": "dc5a8f077458d1ea06d015b44d65b780"
  },
  {
    "url": "thanks/index.html",
    "revision": "7b5be151fedd9ea54151b9278fe2568f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
