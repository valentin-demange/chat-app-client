const chatGilbert = [
  { author: "Gilbert", text: "Bonjour, jeune éphèbe" },
  { author: "Tintin", text: "Coucou Gilbert" },
];

// interface message {
//   author: string;
//   text: string;
// }

intro = "Intro\n\n"
const body = chatGilbert.map((msg) => {
    let str = "";
    if (msg.author === "Gilbert") return "Gilbert:" + msg.text;
    else return "Human:" + msg.text;
    // console.log(msg.author)
    // return msg.author
}).join('\n')
outro = "\nGilbert:"

// debugger
console.log(intro + body + outro)

