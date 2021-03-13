const nodemailer = require("./nodemailer/lib/nodemailer");

/**
 * QQ的发送邮件函数
 *
 * @param {String} user 自己的邮箱
 * @param {String} pass qq邮箱授权码
 * @param {Object} content 发送的内容
 * @param {String} content.from 发件人 昵称及邮箱，格式：昵称<邮箱>
 * @param {String} content.to 收件人邮箱 可多个（用英文逗号分隔）
 * @param {String} content.subject 主题、标题
 * @param {String} content.text 正文 纯文本内容
 * @param {String} content.html 正文 html[可选]
 * @return {Promise} 邮件发送结果
 */
function sendMail (user, pass, content) {
  // 使用默认的SMTP传输创建可重用的传输对象
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false,
    auth: {
      user: user, // 用户账号
      pass: pass, // 授权码,通过QQ获取
    },
  });
  // 使用定义的传输对象发送邮件，并返回邮件发送结果<Promise>
  return transporter.sendMail(content);
}


module.exports = function (subject, text) {
  if (!process.env["MAIL"]) return;
  let inf = JSON.parse(process.env["MAIL"])
  let user = inf["user"];
  let pass = inf["pass"];
  let to = inf["to"];
  console.log(to);
  if(user && pass && to && subject && text){
    sendMail(user, pass,
      {
        from: `Daka<${user}>`,
        to: to,
        subject: subject,
        text: text
      }).then(() => {
        console.log('邮件发送成功');
      }).catch(() => {
        console.log('邮件发送失败');
      })
  }
}
