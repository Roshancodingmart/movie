const conn = require("../db");

const checkLink = (req, res) => {
  var { url } = req.body;
  conn.client.query(`DELETE FROM public.temp`);
  conn.client.query(
    `SELECT * FROM public.mail WHERE key=$1`,
    [url],
    (er, re) => {
      if (re.rowCount > 0) {
        conn.client.query(
          `INSERT INTO public.temp
          SELECT email,key
          FROM public.mail`,
          (error, resp) => {
            if (resp.rowCount > 0) {
              conn.client.query(`DELETE FROM public.mail WHERE key=$1`, [url]);
            }
          }
        );
        res.send("successful");
      } else {
        res.send("unsuccessful");
      }
    }
  );
};
module.exports = {
  checkLink
};
