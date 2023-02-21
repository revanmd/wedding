if (window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (window.innerWidth < 500) {
        $('.dmode').css('color','#707070');
        $('.dmodeg').css('color','#A6A066');
    }
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
var atd = getUrlVars()["to"];
var adt = []
if (atd!=undefined) {
    adt = atd.replace('dan','&');
}
$('#atd').text(adt);



$('#bodymsg').hide();
function play_audio() {
	var audio = document.getElementById('audio');
	audio.play();
	console.log('audio played');
	}

document.getElementById('btnmain').onclick = function(){
	play_audio();
	gsap.to("#headermsg", {duration: 0.6, opacity:0,ease: Sine.easeOut, autoRound: false, delay:0.6});
	gsap.to("#headermsg", {duration: 0.6, display:'none',ease: Sine.easeOut, autoRound: false, delay:0.6});
	gsap.to("#bodymsg", {duration: 1.2, display:'block',ease: Sine.easeOut, autoRound: false, delay:0.4});
	gsap.to("#bodymsg", {duration: 2, opacity:1,ease: Sine.easeOut, autoRound: false, delay:0.4});
	
}

gsap.to("#nila", {duration: 1, opacity:1,ease: Sine.easeOut, autoRound: false, delay:0.6});
gsap.to("#user", {duration: 1.5, opacity:1,ease: Sine.easeOut, autoRound: false});
gsap.to("#layer",{duration:1,opacity:0,ease: Sine.easeOut})
gsap.to("#layer",{duration:1,display:'none'})

var target_date = new Date();		
target_date.setDate(8);
target_date.setMonth(7);
target_date.setHours(9);
var days, hours, minutes, seconds; // variables for time units

var countdown = document.getElementById("tiles"); // get tag element

getCountdown();

setInterval(function () { getCountdown(); }, 1000);

function getCountdown(){

	// find the amount of "seconds" between now and target
	var current_date = new Date().getTime();
	var seconds_left = (target_date - current_date) / 1000;

	days = pad( parseInt(seconds_left / 86400) );
	seconds_left = seconds_left % 86400;
		 
	hours = pad( parseInt(seconds_left / 3600) );
	seconds_left = seconds_left % 3600;
		  
	minutes = pad( parseInt(seconds_left / 60) );

	$('#day').text(days);
	$('#hour').text(hours);
	$('#minute').text(minutes);
}

function pad(n) {
	return (n < 10 ? '0' : '') + n;
}

var config = {
	apiKey: "AIzaSyD1YS84fQ1xsmvg4bryJKI1ZVKLohpdAbM",
	authDomain: "wed1-9f127.firebaseapp.com",
	projectId : "wed1-9f127",
	databaseURL: "https://wed1-9f127.firebaseio.com"
};
firebase.initializeApp(config);
var db = firebase.firestore();
db.collection("usr").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    	$('#chat').append("<li class=you><div class=entete><span class='status'>"+doc.data().nama+"</span><h2>&nbsp;</h2><h3>"+doc.data().waktu+"</h3></div><div></div><div class=message>"+doc.data().pesan+"</div></li>")
    });

});

var nama ="";
var isi ="";
$("#button-f").click(function(){
    nama = $("#nama").val();
    isi = $("#ucapan").val();
    if (nama == "") {
                $("#darinama").text("Siapakah nama anda ?");
    }
    else{
        $("#darinama").text("Dari : "+nama);
    }

    if (isi == "") {
        $("#dariisi").text("Apakah anda tidak ingin mengungkapkan ucapan anda  :(");
    }
    else{
        $("#dariisi").text(isi);
    }
});
$("#konfirmasi").click(function(){
    if (nama == "" || isi =="") {

        $("#myModal").modal("hide");

        new Noty({
            text: 'Pesan anda belum dikirim :)',
            type: 'warning',
            layout: 'topRight',
            theme: 'sunset',
             animation: {
                open: function (promise) {
                    var n = this;
                    new Bounce()
                        .translate({
                            from     : {x: 450, y: 0}, to: {x: 0, y: 0},
                            easing   : "bounce",
                            duration : 1000,
                            bounces  : 4,
                            stiffness: 3
                        })
                        .scale({
                            from     : {x: 1.2, y: 1}, to: {x: 1, y: 1},
                            easing   : "bounce",
                            duration : 1000,
                            delay    : 100,
                            bounces  : 4,
                            stiffness: 1
                        })
                        .scale({
                            from     : {x: 1, y: 1.2}, to: {x: 1, y: 1},
                            easing   : "bounce",
                            duration : 1000,
                            delay    : 100,
                            bounces  : 6,
                            stiffness: 1
                        })
                        .applyTo(n.barDom, {
                            onComplete: function () {
                                promise(function(resolve) {
                                    resolve();
                                })
                            }
                        });
                },
                close: function (promise) {
                    var n = this;
                    new Bounce()
                        .translate({
                            from     : {x: 0, y: 0}, to: {x: 450, y: 0},
                            easing   : "bounce",
                            duration : 500,
                            bounces  : 4,
                            stiffness: 1
                        })
                        .applyTo(n.barDom, {
                            onComplete: function () {
                                promise(function(resolve) {
                                    resolve();
                                })
                            }
                        });
                }
            }
        }).show();
    }
    else{
    	var d = new Date();
    	var months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    	var time = ""+d.getDate()+"&nbsp"+months[d.getMonth()]+", "+d.getHours()+":"+d.getMinutes();
        db.collection("usr").add({
        nama: nama,
        pesan: isi,
        waktu: time
        });
        $("#chat").append("<li class=you><div class=entete><span class='status'>"+nama+"</span><h2>&nbsp;</h2><h3>"+time+"</h3></div><div></div><div class=message>"+isi+"</div></li>");


        $("#myModal").modal("hide");
        new Noty({
            text: 'Pesan anda berhasil dikirim :)',
            type: 'success',
            layout: 'topRight',
            theme: 'sunset',
             animation: {
                open: function (promise) {
                    var n = this;
                    new Bounce()
                        .translate({
                            from     : {x: 450, y: 0}, to: {x: 0, y: 0},
                            easing   : "bounce",
                            duration : 1000,
                            bounces  : 4,
                            stiffness: 3
                        })
                        .scale({
                            from     : {x: 1.2, y: 1}, to: {x: 1, y: 1},
                            easing   : "bounce",
                            duration : 1000,
                            delay    : 100,
                            bounces  : 4,
                            stiffness: 1
                        })
                        .scale({
                            from     : {x: 1, y: 1.2}, to: {x: 1, y: 1},
                            easing   : "bounce",
                            duration : 1000,
                            delay    : 100,
                            bounces  : 6,
                            stiffness: 1
                        })
                        .applyTo(n.barDom, {
                            onComplete: function () {
                                promise(function(resolve) {
                                    resolve();
                                })
                            }
                        });
                },
                close: function (promise) {
                    var n = this;
                    new Bounce()
                        .translate({
                            from     : {x: 0, y: 0}, to: {x: 450, y: 0},
                            easing   : "bounce",
                            duration : 500,
                            bounces  : 4,
                            stiffness: 1
                        })
                        .applyTo(n.barDom, {
                            onComplete: function () {
                                promise(function(resolve) {
                                    resolve();
                                })
                            }
                        });
                }
            }
        }).show();

        $("#myModal").modal("hide");
    }
	    });