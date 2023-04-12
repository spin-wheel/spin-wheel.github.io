const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCofNKXGLmDBwxCSzyfjPQQf0sUtcaMy_0",
  authDomain: "spin-wheelz.firebaseapp.com",
  projectId: "spin-wheelz",
  storageBucket: "spin-wheelz.appspot.com",
  messagingSenderId: "118466041762",
  appId: "1:118466041762:web:9717138830c4112e6f44fb",
});
const db = firebaseApp.firestore();

let aca_names = [
  "Bagha",
  "Bakarwal",
  "Balbehra",
  "Bangi Nihal Singh",
  "Basarke",
  "Basti Basava Singh",
  "Behak Fattu",
  "Benra",
  "Bhadaur",
  "Bharana",
  "Bhunsla",
  "Bilga",
  "Chahal Kalan",
  "Chak Bhai Ke",
  "Chak Desraj",
  "Cheema Sahib (English medium)",
  "Cheema Sahib (Punjabi medium)",
  "Chogawan",
  "Chunni Kalan",
  "Dadehar Sahib",
  "Dakra Sahib",
  "Damdama Sahib",
  "Daula",
  "Dhaliwal Bait",
  "Dhamot",
  "Dhanal Kalan",
  "Dharamgarh Channa",
  "Dhudial",
  "Dhugga Kalan",
  "Dialpur Mirza",
  "Fatehgarh Channa",
  "Fatehgarh Ganduan",
  "Ghugh",
  "Holi Barara",
  "Jagaram Tirath",
  "Jand Sahib",
  "Jandiali",
  "Jawaharke",
  "Jhandiana",
  "Kakra Kalan",
  "Kaleke",
  "Kalloh",
  "Kamalpur",
  "Kauriwara",
  "Khamanno",
  "Khichipur",
  "Kili Nihal Singh",
  "Kollianwali",
  "Kusla",
  "Madhopur",
  "Majri",
  "Makhangarh",
  "Manal",
  "Manawan",
  "Mander",
  "Mander Dona",
  "Mehal Kalan",
  "Moonak",
  "Muktsar",
  "Mullianwal",
  "Pawein",
  "Phaphre Bhai Ke",
  "Puranewala",
  "Rachhin",
  "Raipur Peer Baksh Wala",
  "Rajia",
  "Rampur Narotampur",
  "Rampur Sunra",
  "Ranno",
  "Rasulpur Bait",
  "Rattian",
  "Ratolan",
  "Ratta Khera",
  "Reeth Kheri",
  "Rori",
  "Seona",
  "Sheron Bagha",
  "Sukhanwala",
  "Teja Singh Wala",
  "Tibber",
  "Ubhia",
  "Uddat Saidewala",
  "Vachoa",
];

let temp = [];
let simple = [];
const read_keys = () => {
  for (let i = 0; i < aca_names.length; i++) {
    db.collection(aca_names[i])
      .get()
      .then((data) => {
        //console.log(data.docs);
        temp = data.docs.map((item) => {
          return {
            time: item.data().Time,
            date: item.data().Date,
            aca: item.data().Academy_Name,
            t_name: item.data().Teacher_Name,
            t_code: item.data().Teacher_code,
            row: item.data().Selected_row,
            stu_name: item.data().Student_Name,
            stu_id: item.data().Student_id,
            money: item.data().Award_Money,
          };
        });
        // console.log(data.docs.map((item) => {
        //   return{...item.data(),aca:item.data().Academy_Name};
        // }))
        // DownloadJSON2CSV(keys);
        //console.log(i);
        simple = simple.concat(temp);
        //console.log(simple);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
read_keys();
setTimeout(function () {
  DownloadJSON2CSV(simple);
}, 5000);

//var json3 = { "d": "[{\"Id\":1,\"UserName\":\"Sam Smith\"},{\"Id\":2,\"UserName\":\"Fred Frankly\"},{\"Id\":1,\"UserName\":\"Zachary Zupers\"}]" }

function DownloadJSON2CSV(objArray) {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;

  var str = ("Time" , "Date","Academy","Teacher_Name","Teacher_code","Row_Selected","Student_Name","Student_id","Award_Money")

  for (var i = 0; i < array.length; i++) {
    var line = "";

    // for (var index in array[i]) {
    //     line += array[i][index] + ',';
    // }

    // Here is an example where you would wrap the values in double quotes
    for (var index in array[i]) {
      line += '"' + array[i][index] + '",';
    }

    line.slice(0, line.Length - 1);

    str += line + "\r\n";
    console.log(str);
  }
  window.open("data:text/csv;charset=utf-8," + escape(str));
}
