async function translate(payload) {
  //console.log(payload);
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "3d90589c1emsh662c521e33cc14bp1f2d2ajsn1ba0f12c17f7",
      "X-RapidAPI-Host": "translate-plus.p.rapidapi.com",
    },

    // body: '{"text":"Hello , How are you","source":"en","target":"nl"}',
    //長這樣的咚咚就是json
    // const x={x:[1,2,3],y : "I am good", z:{a:"123"}}
    //JSON.stringify(x)
    //y = JSON.stringify(x)
    //解碼JSON
    //JSON.parse(y)
    body: JSON.stringify(payload),
  };
  const response = await fetch(
    "https://translate-plus.p.rapidapi.com/translate",
    options
  );
  const result = await response.json();
  return result 
}
// fetch('https://translate-plus.p.rapidapi.com/translate', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
export default translate;
