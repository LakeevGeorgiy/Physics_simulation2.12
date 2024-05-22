let N_text = document.getElementById("N_id");
let b_text = document.getElementById("b_id");
let d_text = document.getElementById("d_id");
let wave_length_text = document.getElementById("wave_length_id");
let canvas = document.getElementById("canvas_id");
let button = document.getElementById("button_id");

let N = N_text.value;
let b = b_text.value;
let d = d_text.value;
let wave_length = wave_length_text.value;
let I_0 = 1;
let ctx = canvas.getContext('2d');

function convertToRadian(x) {
    return x * Math.PI / 180;
}

function calculateIntensity(phi){
    let u = Math.PI * b / wave_length * Math.sin(phi);
    u = convertToRadian(u);

    let delta = Math.PI * d / wave_length * Math.sin(phi);
    delta = convertToRadian(delta);

    let first_part = (Math.sin(u) / u) ** 2;
    let second_part = (Math.sin(N * delta) / Math.sin(delta)) ** 2;
    return I_0 * first_part * second_part;
}

function plot() {

    let x_coordinates = [];
    let intensity_coordinates = [];

    let t = 0;
    let start = -Math.PI / 6;
    let end = Math.PI / 6;
    let step = (end - start) / 1000;

    console.log(start, end, step);
    for (let i = start; i <= end; i += step) {
        console.log(i);
        let phi = i;
        x_coordinates[t] = phi;
        intensity_coordinates[t] = calculateIntensity(phi);
        ++t;
    }

    let intensity_trace = {
        x: x_coordinates,
        y: intensity_coordinates,
        mode: 'line'
    };

    let layout = {
        title: 'График интенсивности',
		autosize: true,
		xaxis: {
			title: 'sin (phi)',
		},
		yaxis: {
			title: 'I, Bт/м^2',
		},
	};

    for (let i = 0; i < intensity_coordinates.length; ++i){
        let currentIntensity = intensity_coordinates[i];
        let currentColor = 255 * currentIntensity / (N ** 2);
        let color=`rgba(${currentColor},${currentColor},${currentColor}, 1)`;

        ctx.fillStyle = color;
        ctx.fillRect(i, 0, 1, 600);
    }

	Plotly.react('tester2', [intensity_trace], layout);
}

button.addEventListener("click", function(e){

    N = parseFloat(N_text.value);
    if (N <= 0){
        alert("Число щелей должно быть больше 0!");
        return;
    }

    b = parseFloat(b_text.value);
	if (b <= 0) {
		alert("Ширина щелей должен быть больше 0!");
		return;
	}
    
    d = parseFloat(d_text.value);
	if (d <= 0) {
		alert("Период решетки должен быть больше 0!");
		return;
	}
    

	wave_length = parseFloat(wave_length_text.value);
    wave_length /= (10 ** 9);
	if (wave_length <= 0) {
		alert("Длина волны должна быть больше 0!");
		return;
	}

    plot();

});