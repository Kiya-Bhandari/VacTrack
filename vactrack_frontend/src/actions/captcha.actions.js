import { captchaConstants } from "../constants";
import captchaImg from "../assets/images/captcha.jpg";

export const captchaActions = {
  getCaptchaImage,
  getCaptchaCode,
  generateCaptcha,
};

const randomChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

var canvasBgImage = new Image(); // Creates image object
canvasBgImage.src = captchaImg;

const xText = 24,
  yText = 30,
  xImage = 0,
  yImage = 0,
  widthImage = 150,
  heightImage = 36;

function getCaptchaImage(image) {
  return {
    type: captchaConstants.GETCAPTCHA_IMAGE,
    payload: image,
  };
}

function getCaptchaCode(captchaCode) {
  return { type: captchaConstants.GETCAPTCHA_CODE, payload: captchaCode };
}

function generateCaptcha(canvasId, length = 6) {
  return (dispatch) => {
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    dispatch(getCaptchaCode(result));

    var c = document.getElementById(canvasId);
    var ctx = c.getContext("2d");

    canvasBgImage.onload = function () {
      ctx.drawImage(canvasBgImage, xImage, yImage, widthImage, heightImage);
      ctx.font = "30px Arial";
      ctx.fillText(result, xText, yText);
    };

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(canvasBgImage, xImage, yImage, widthImage, heightImage);
    ctx.font = "30px Arial";
    ctx.fillText(result, xText, yText);

    dispatch(getCaptchaImage(ctx.canvas.toDataURL()));
  };
}
