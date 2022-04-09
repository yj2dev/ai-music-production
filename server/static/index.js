
console.log("Input voice!!");
console.log("Input voice!!");
console.log("Input voice!!");


const resultCreatedSong = document.getElementById("result-song");
const btnStartRecording = document.getElementById("start-recording");
const stateRecording = document.getElementById("state-recording");
const audio = document.querySelector("audio")

let isRecording = false;
let mediaArray = [];
const audioArray = [];

btnStartRecording.addEventListener("click", async () => {

    // 녹음 시작
    if(!isRecording) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio:true })

        mediaRecorder = new MediaRecorder(mediaStream)

        mediaRecorder.ondataavailable = (e) => {
            audioArray.push(e.data)
        }

        mediaRecorder.onstop = (e) => {
            const blob = new Blob(audioArray, { "type": "audio/ogg codecs=opus" })

            audioArray.splice(0)

            const blobURL = window.URL.createObjectURL(blob)

            audio.src = blobURL
            audio.play()
        }

        mediaRecorder.start()
        isRecording = true;
        stateRecording.innerText = "녹음중"
    } else {
        mediaRecorder.stop()
        isRecording = false;
        stateRecording.innerText = "녹음 종료"
    }


    console.log("Click ... !");
})




     const onSubmitVoice = () => {
    console.log("onSubmitVoice");

    axios.get("/test")
        .then((res) => {
            console.log("res >> ", res);
            console.log("res.datas >> ", res.data);
            resultCreatedSong.innerHTML= "<h1>ㅠ_ㅠ</h1>"
        })
        .catch((err) => {
            console.error(err);
        });

    }



