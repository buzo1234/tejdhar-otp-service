const { json } = require('express');
const fetch = require('node-fetch');

module.exports.sendMail = async (params) => {
  try {
    await fetch('https://49.50.67.32/smsapi/jsonapi.jsp', {
      method: 'POST',
      body: JSON.stringify({
        username: 'tejdhar',
        password: 'tejdhar',
        from: 'TJDHAR',
        pe_id: '1501500230000050563',
        template_id: '1507166114958882058',
        to: [params.to],
        text: `Your OTP details are ${params.OTP} for TEJ DHAR`,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      // Parse JSON data
      .then((response) => response.json())

      // Showing response
      .then((json) => {
        console.log(json);
        return json;
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
  } catch (error) {
    console.log(error);
    return { err: error };
  }
};
