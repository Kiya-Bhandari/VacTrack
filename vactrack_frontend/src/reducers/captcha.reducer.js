import { captchaConstants } from "../constants";

export function captcha(state = {}, action) {
  switch (action.type) {
    case captchaConstants.GETCAPTCHA_IMAGE:
      return {
        ...state,
        captchaImage: action.payload,
      };
    case captchaConstants.GETCAPTCHA_CODE:
      return {
        ...state,
        captchaCode: action.payload,
      };

    default:
      return state;
  }
}
