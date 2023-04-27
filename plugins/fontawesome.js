import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faShare, faBars, faXmark } from "@fortawesome/pro-regular-svg-icons";
import {
  faTiktok,
  faInstagram,
  faTwitter,
  faFacebook,
  faYoutube,
  faTelegram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faShare,
  faBars,
  faXmark,
  faTiktok,
  faInstagram,
  faFacebook,
  faTwitter,
  faYoutube,
  faWhatsapp,
  faTelegram
);
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon, {});
});
