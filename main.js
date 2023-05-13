img = "";
object = [];
status = "";

function preload() {

}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(500, 500);
    video.hide();
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;

}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Person";
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        object = result;
    }
}

function draw() {
    image(video, 0, 0, 500, 500);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            if (object.label == person) {
                document.getElementById("status").innerHTML = "Status: Someone found!";
                //document.getElementById("number-of-objects").innerHTML = "There were " + object.length + " objects detected.";
                fill(r, g, b);
                percent = floor(object[i].confidence * 100);
                text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
                noFill();
                stroke(r, g, b);
                rect(object[i].x, object[i].y, object[i].width, object[i].height);
            } else {
                document.getElementById("number-of-objects").innerHTML = "No person found"
            }

        }
    }
}