var prediction_1 = ""
var prediction_2 = ""

Webcam.set({
     height: 300 ,   
     width:  350 ,
     image_format: "png" ,
     png_quality: 100
}) ;
Webcam.attach('#camera1')  

function takesnapshot() {
     Webcam.snap(function(data_uri){
          console.log("Snapshot Taken")
          document.getElementById("result").innerHTML = "<img src = '  "+data_uri+"  ' id='captured_image' />"
     });
}
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/GpfTSwXzt/model.json',modelloaded)

function modelloaded() {
     console.log("Teachable Machine model is loaded")
}

function speak() {
     var synth = window.speechSynthesis
     speak_data1 = "My first prediction is "+prediction_1
     speak_data2 = "And the second prediction is "+prediction_2
     var utter_this = new SpeechSynthesisUtterance(speak_data1+speak_data2)
     synth.speak(utter_this)
}

function predictimage() {
   var img=document.getElementById("captured_image")
   classifier.classify(img,gotresult)
}

function gotresult(error,result) {
     if (error) {
          console.log(error)
     } else {
          console.log(result)
          document.getElementById("result_emoji_name_1").innerHTML = result[0].label
          document.getElementById("result_emoji_name_2").innerHTML = result[1].label
          prediction_1 = result[0].label
          prediction_2 = result[1].label
          speak()
          if (result[0].label=="Happy") {
               document.getElementById("update_emoji_1").innerHTML = "&#128514;" 
          } 
          if (result[0].label=="Angry") {
               document.getElementById("update_emoji_1").innerHTML = "&#x1f620;" 
          } 
          if (result[0].label=="Hungry") {
               document.getElementById("update_emoji_1").innerHTML = "&#x1f924;" 
          } 
          if (result[1].label=="Happy") {
               document.getElementById("update_emoji_2").innerHTML = "&#128514;" 
          } 
          if (result[1].label=="Angry") {
               document.getElementById("update_emoji_2").innerHTML = "&#x1f620;" 
          } 
          if (result[1].label=="Hungry") {
               document.getElementById("update_emoji_2").innerHTML = "&#x1f924;" 
          } 
     }
}

         
        
