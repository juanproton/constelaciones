
let theShader;
let pg, pgSize = 2500;
let play = true;
let values;
let subType = 2;
/// UNIFORMS
let u1,u2,u3,u4,u5;
let freq; let nShade, nShape;
let flip;
let nucleoSize = 0.;let nucleo = 5; let nucleoShades;
let nucleo1, nucleo2, nucleo3;
let nucleo2Size,nucleo3Size;
let nucleo2_ring, nucleo3_ring;
let outsideStrokeNucleo;
let random_factor_stroke_nucleo;
let outsideStroke;
let frequency;
let frequency_2;
let frequency_3;
let frequency_4;

let color_index_map;

let nucleoDivisions;
let fullInterference;
let randomFactor,randomFactor1,randomFactor2;

let pointsDivisionBody;
let pointsDivisionBody2;
let pointsDivisionBody3;
let pointsDivisionBodySize;
let pointsDivisionBodySize2;
let pointsDivisionBodySize3;

let pointsDivisions_fake;

let stroke_choice;
let stroke_Amt,stroke_Amt1;

let stroke_choice2;
let stroke_Amt2,stroke_Amt12;
let stroke_choice3;
let stroke_Amt3,stroke_Amt13;

let blend;

let cap_nucleo0,cap_nucleo1,cap_nucleo2;

let lightAmt;
let lightAmt1;
let lights;

let lightSize;
let lightSize2;

let lightCoord;
let lightCoord1;
let lightRot;
let background;
let background_u1,background_u2,background_u3;

let rotate;
let rotateAmt;
let borde_largo_serial;
let borde_1;

let nMap;
let rings_pos,rings_pos2,rings_pos3;
let rings_largo,rings_largo2,rings_largo3;
let rings_shades,rings_shades2,rings_shades3;
let rings_num;
let nSub,nSub1,nSub2;
let stroke_var;
let light_stroke_01,light_stroke_02;
let light_stroke_01factor,light_stroke_02factor;

let shades_u1, shades_u2,shades_u3,shades_u4;

var fullGamma = [
        [255, 0, 0],
        [255,51,0],
        [255,102,0],
        [255,153,0],
        [255,204,0],
        [255, 255, 0],
        [85, 208, 66],
        [68,152,98],
        [51,95,133],
        [34, 39, 168],
        [78,31,134],
        [122,23,101],
        [167,16,67],
        [211,8,34],

];

var gray_scale = [];

var fullGammaUniforms = [];
var colors_temp = [];

let nCol;

var metallicColors = [];


let nRings;
let nSubdivisionsRings;
let zoom, disc;
let array_freq;
let colorize;

let nucleo_stroke;
let nucleo_subRings;
let nucleo_subRings_pos;
let rotateNucleo;

let capsule_nucleos;
let capsule_NucleoSize;

let pixela;
let random_factor;


let color_rules;

let num_subdivision_center;
let regular_center;
let regular_sub_center;

let num_subdivision_up;
let regular_up;
let regular_sub_up ;

let num_subdivision_down;
let regular_down;
let regular_sub_down;

let random_u3;
let random_u3_01;

let shades = [];
let ff = [3.5,7,14,21,28,35,42,49,56,63];
let ff2 = [14,21,28,35,42,49,56,63,70,77];
let ff3 = [100,150,200,250,300];

let shades_choice = 0;
let temp_freq_01;
let temp_shade_01;
let temp_shade_02;

let angles_choice = [45,90,90+45,180];

let isOn_up, isOn_down,isOn_center;
let color_map_temp_up,color_map_temp_down,color_map_temp_center;
let color_map_temp = 0;
let outsideStrokeType, outsideStrokeRadius;

let angle_combination = 1;
let fixedAngle = 0;
let simmetry = 0;

let random_2;

function preload(){
  theShader = loadShader('vertex.vert', 'basic.frag');
}

function setup() {
  random_2 = new Random();
  array_freq = [];
	generator(0,0);
	passUniforms();
  pixelDensity(2.0);
	createCanvas(windowWidth, windowHeight, WEBGL);
	pg = createGraphics(pgSize, pgSize, WEBGL);
}

function new_interference(){
  let type;
  let subType;

  // generator(type,subtype);
}

function generate_map_interference(){

  isOn_up = [0,1];
  isOn_down = [0,1];
  isOn_center =[0,1];
  color_map_temp = 1;

     rings_pos = [];
     rings_largo = [];
     rings_shades = [];

     rings_pos2 = [];
     rings_largo2 = [];
     rings_shades2 = [];

     rings_pos3 = [];
     rings_largo3 = [];
     rings_shades3 = [];
     color_index_map = [];

     frequency = [];
     frequency_2 = [];
     frequency_3 = [];
     frequency_4 = [];
     random_factor = [];
     let colors = [];

     background = rand_b([0,0,0,0,0,0,0,3]);

     light_stroke_01 = rand_b([0,0,1]);
     light_stroke_01factor = rand_b([2,3,4,5]);
     light_stroke_02 = rand_b([0,1]);
     light_stroke_02factor = rand_b([1,2,3,4]);
   u4 = (180-(u3*2));

   // shades_choice = rand_b([0,0,1,2,3,3,3,4,5,5,5,5,6,6,6,6,6,7,8,9,9,9,9,9,10,11,12]);
   shades_choice = rand_b([0,0,0,5,5,5,6,6,6,9,9,9,11,12]);

   if(shades_choice == 0){
     generateColorSet(1);

     // angle_combination = rand_b([0,1]);
     let cc = true;
     generate_sub_choices(cc,cc,cc,rand_b([4,2,1]),rand_b([4,2,1]),rand_b([4,2,1]),8,8,8);

     shades = [10,0,3];
     shades.push(rand_b([4,5,14,0,10,20]));

     ff = [7,14,21,56,63];
     ff2 = [14,21,28,35,42,49];

     temp_freq_01 = rand_b([ff[int(random(ff.length))]]);
     temp_shade_01 = 3;
     temp_shade_02 = 3;
     stroke_choice = rand_b([0,1,2,2,2,2]);
     stroke_Amt = 0.88;
     stroke_Amt1 = 0.88;

     shades_u3 = random(25,60);
     shades_u1 = random(1);
     shades_u2 = 0;

   }else if(shades_choice ==1){
     angle_combination = rand_b([5]);

     generateColorSet(rand_b([3,4]));

     shades = [16,1,10];

     stroke_choice = rand_b([0]);
     stroke_Amt = rand_b([0.88]);
     shades_u2 = rand_b([0,1,2]);

     stroke_var = rand_b([0,1]);
     random_factor_stroke = 5;


   }else if(shades_choice==2){

     angle_combination = rand_b([0,1,3,5]);

      ff = [7,7,14,21,28,42,49,56,63];
      ff3 = [50,100,200,250];

     shades = [0,2,3];
     shades.push(rand_b([0,2,3]));
     generate3Colors(rand_b([0,1]));
     stroke_choice = rand_b([0,1,2]);
     stroke_Amt = rand_b([0.88]);
     stroke_Amt1 = rand_b([0.9]);

     stroke_var = rand_b([0,1]);
     random_factor_stroke = int(random(50));

   }else if(shades_choice==3){
     generateColorSet(rand_b([1,2]));

     light_stroke_01 =0;
     light_stroke_01factor = 1;

     shades = [1,0];

     let cc = rand_b([0,1]);
     generate_sub_choices(cc,cc,cc,rand_b([6,4,8]),rand_b([6,4,8]),rand_b([6,4,8]),8,8,8);

     ff = [7,14,21,28,35];
     ff2 = ff;

     stroke_choice = rand_b([0,1,2]);
     stroke_Amt = rand_b([0.88]);
     stroke_Amt1 = rand_b([0.9]);
     nucleoSize = rand_b([0,nucleoSize]);

   }else if(shades_choice==4){
     angle_combination = rand_b([3]);

     light_stroke_01 =0;
     light_stroke_01factor = 1;

     generateColorSet(rand_b([4]));
     shades = [1,0];

     num_subdivision_center =  rand_b([2,3,4,5,6,7,14]);

     regular_sub_down = rand_b([8,12]);
     regular_sub_up = rand_b([8,12]);
     regular_sub_center = rand_b([8,12]);

     regular_center = rand_b([0,1]);
     regular_up = rand_b([0,1]);
     regular_down = rand_b([0,1]);

     ff = [7,14,21,56];
     ff2 = ff;

     stroke_choice = rand_b([0,1,2]);
     stroke_Amt = rand_b([0.88]);
     stroke_Amt1 = rand_b([0.9]);
     nucleoSize = rand_b([0,nucleoSize]);

   }else if(shades_choice==5){
     light_stroke_01 = 0;light_stroke_02 = 0;
     angle_combination = rand_b([0,1,2,3]);

      shades_u3 = random(12,60);
      ff = [7,14,21,63,70];
     shades = [0,12,11,4,5];
     shades.push(rand_b([14,6,0,4,5,10,7]));
     background = rand_b([0,0,0,0,2,3,3,3,3]);
     lights = 0;
     outsideStrokeType = 0;
     outSideStroke = 1.;
     nucleoSize = rand_b([0,nucleoSize,nucleoSize]);
   }else if(shades_choice==6){
     angle_combination = rand_b([0,0,0,1,3]);
     generateColorSet(1);

     background = rand_b([0,0,0,6]);
     light_stroke_01 = rand_b([0,0,1]);light_stroke_02 = rand_b([0,1]);

     shades = [0,7,1,10,3,4,5,16];
     shades_u2 = rand_b([0,1]);
     shades_u1 = random(1);
     shades_u3 = random(12,60);
     nucleoSize = rand_b([0,nucleoSize,nucleoSize,nucleoSize]);
     stroke_choice = rand_b([0,2,0]);
     strokeAmt = 0.89;
     stroke_var = rand_b([0,1]);
     random_factor_stroke = int(random(50));

   }else if(shades_choice==7){
     background = rand_b([0,0,0,3]);
     light_stroke_01 = rand_b([0,0,1]);light_stroke_02 = rand_b([0,0,1]);
     angle_combination = rand_b([0,0,0,0,1,2,3]);
     ff = [7,14,21];
     generateColorSet(rand_b([1,3]));
     shades = [1,16];
     shades.push(rand_b([0,4,5]))
     shades_u2 = rand_b([0,1]);
     shades_u1 = random(1);
     shades_u3 = random(12,60);
     stroke_choice = rand_b([0,1,2]);
     stroke_Amt = 0.9;
     strokeAmt1 = 0.98;

     stroke_var = rand_b([0,1]);
     random_factor_stroke = int(random(50));

   }else if(shades_choice==8){
     generateColorSet(1);
     light_stroke_01 = rand_b([0]);light_stroke_02 = rand_b([0]);
     angle_combination=4;
     shades = [10];

     background = rand_b([0,6]);
     isOn_up = [0];isOn_down = [0];isOn_center =[0];lights = 0;
     color_map_temp = 0;
     outSideStroke = rand_b([1]);
     outsideStrokeType = rand_b([0,2]);
     outsideStrokeNucleo = rand_b([2,3]);
     stroke_choice = 2;
     lights = 1;
   }else if(shades_choice==9){
     light_stroke_01 = rand_b([0]);
     light_stroke_02 = rand_b([0]);

     shades = [0,1,2,3];
     ff = [7,14,21,56,63];

     generateColorSet(rand_b([1]));
     generate3Colors(rand_b([0,1]));
     angle_combination = rand_b([1,3]);
     fixedAngle  = 0;

     stroke_choice = rand_b([0,1,2]);
     stroke_Amt = rand_b([0.88]);
     stroke_Amt1 = rand_b([0.88]);

     stroke_var = 1;
     random_factor_stroke = random(50);

     nucleoSize = rand_b([0.,nucleoSize,nucleoSize]);


   }else if(shades_choice==10){
     light_stroke_01 = rand_b([0]);
     light_stroke_02 = rand_b([0]);

     shades = [0,1,2,11,12];
     ff = [7,14,21,56,63];

     generateColorSet(rand_b([1]));
     generate3Colors(rand_b([0,1]));
     angle_combination = rand_b([2,3]);
     fixedAngle  = 0;

     stroke_choice = rand_b([0,1,2]);
     stroke_Amt = rand_b([0.88]);
     stroke_Amt1 = rand_b([0.88]);

     stroke_var = 1;
     random_factor_stroke = random(50);

     nucleoSize = rand_b([0.,nucleoSize]);
   }else if(shades_choice==11){
     generateColorSet(rand_b([8]));

     light_stroke_01 = rand_b([0]);
     light_stroke_02 = rand_b([0]);
     isOn_up = [0];
     isOn_down = [0];
     isOn_center =[0];
     shades = [13];
     ff = [1,2,,3,7,14,21,56,63];
     lights = 0;
     angle_combination = rand_b([5]);
     fixedAngle  = 0;
     color_map_temp = 1;
     nucleoSize = 0;
     nucleo = 0;
     outSideStroke = 0;
     stroke_choice = 2;
   }else if(shades_choice==12){
      ff = [4,6,12,24,48,72];
      light_stroke_02 = rand_b([0]);
      u2 = random(0.5,0.6);
     nucleo = 1;
     generateColorSet(1);
     angle_combination = 10;
     let cc = rand_b([0,1]);
     generate_sub_choices(cc,cc,cc,rand_b([8,6]),rand_b([8,6]),rand_b([8,6]),8,8,8);
     fixedAngle  = 0;
     shades = [0];
   }

   if(angle_combination == 0){

     regular_sub_down = rand_b([1,2,2,4,8]);
     regular_sub_up = rand_b([1,2,2,4,8]);
     regular_sub_center = rand_b([1,1,2,2,4,6]);

     regular_center = true;
     regular_up = true;
     regular_down = true;
   }else if(angle_combination== 1){
     regular_sub_down = rand_b([1,1,1,2,2,4,6,8]);
     regular_sub_up = regular_sub_down;
     regular_sub_center = regular_sub_down;

     regular_center = true;
     regular_up = true;
     regular_down = true;

     simmetry = rand_b([0,1]);
   }else if(angle_combination==2){
     regular_sub_down = rand_b([4,6,8]);
     regular_sub_up = rand_b([4,6,8]);
     regular_sub_center = rand_b([2,3,4,6]);

     regular_center = true;
     regular_up = true;
     regular_down = true;
   }else if(angle_combination==3){
     regular_center = false;
     regular_up = false;
     regular_down = false;
     num_subdivision_center =  rand_b([4,5,6,7,8]);
     num_subdivision_up =   rand_b([4,5,6,7,8]);
     num_subdivision_down =   rand_b([4,5,6,7,8]);

   }else if(angle_combination==4){
     regular_sub_down = rand_b([24]);
     regular_sub_up = rand_b([24]);
     regular_sub_center = rand_b([24]);
     regular_center = true
     regular_up = true;
     regular_down = true;
}else if(angle_combination==5){
  regular_sub_down = rand_b([1,2,2,4,6,8]);
  regular_sub_up = regular_sub_down;
  regular_sub_center = regular_sub_down;

  regular_center = true;
  regular_up = true;
  regular_down = true;

  simmetry = rand_b([1]);
}

if(nucleoSize == 0){
  nucleo = 0;
}


   stroke_Amt12 = rand_b([0.8,0.7]);
   stroke_Amt2 = rand_b([0.9]);
   stroke_choice2 = rand_b([1]);
   stroke_Amt13 = rand_b([0.8,0.7]);
   stroke_choice3 = rand_b([1]);

}

function add_different(a,b,array){
  if(a == b){
    b = array[int(random(array.length))].x;
    return add_different(a,b);
  }else{
    return b;
  }
}

function add_different_02(a,b,array){
  if(a == b){
    b = array[int(random(array.length))];
    return add_different(a,b,array);
  }else{
    return b;
  }
}

function generate_sub_choices(center,up,down,center_sub,up_sub,down_sub,num_center,num_up, num_down){
  regular_center = center;
  regular_up = up;
  regular_down = down;

  regular_sub_down = down_sub;
  regular_sub_up = up_sub;
  regular_sub_center = center_sub;

  num_subdivision_center =  num_center;
  num_subdivision_up =  num_up;
  num_subdivision_down =   num_down;
}

function generateSubdivisionsNucleo(_nucleoSize){
  nucleo_stroke = [];
  generateNucleoShades();
  nucleo_stroke[0] = rand_b([0.0005,0.005]);

  outsideStrokeNucleo = rand_b([0,1,1,1,2,3,3]);
  random_factor_stroke_nucleo = int(random(2,4));
  nucleoSize = _nucleoSize;

  nucleo2 = rand_b([0,0,0,1]);
  nucleo2Size = nucleoSize/rand_b([random(1.2,3)]);
  if(u3 > 60){
    nucleo2Size = nucleoSize/rand_b([random(1.2,3),random(1.2,2.0)]);
  }
  nucleo2_ring = rand_b([nucleo2Size-0.01,0,0,0]);

  if(nucleo2==1){
    nucleo3 = rand_b([0,0,0,1]);
    if(nucleo3 == 1){
      nucleo3Size = nucleo2Size/rand_b([1.2,1.5,2,3]);
      nucleo3_ring = rand_b([nucleo3Size-0.01,0,0,0]);
    }
  }

}

function generateNucleoShades(){
  shades_u2 = 0;
  shades_u1 = 2;
  let choices = [0,10,11,12,22];
  nucleoShades = [];

  nucleoShades.push(rand_b([10,11,12]));

  console.log(nucleoShades[0]);
  let b = rand_b([choices[int(random(choices.length))]]);
  b = add_different_02(nucleoShades[0],b,choices);
  nucleoShades.push(b);
  let c = rand_b([choices[int(random(choices.length))]]);
  c = add_different_02(nucleoShades[1],c,choices);
  nucleoShades.push(c);

}

function generate_rings_angles(){

  if(u3 == 5){
    isOn_center = [];
    isOn_center = [0]
  }


for(let i = 0; i < pointsDivisionBodySize; i++){
  let rr = random(100);
  random_factor.push(rr);
  let isOn = isOn_up[int(random(isOn_up.length))];
  if(isOn == 1){
    // rings_pos.push(random(10,u4-10));
    rings_pos.push(0);
    rings_largo.push(angles_choice[int(random(angles_choice.length))]);
  }else{
    rings_pos.push(0);
    rings_largo.push(0);
  }
  let a = shades[int(random(shades.length))];
  let b = shades[int(random(shades.length))];

  b = add_different(a,b,shades);

  rings_shades.push(a,shades[int(random(shades.length))]);
  frequency.push(ff[int(random(ff.length))]);
  frequency_2.push(ff2[int(random(ff2.length))]);
  frequency_3.push(ff3[int(random(ff3.length))]);

  if(color_map_temp == 1){
    color_map_temp_up = 1;
  }else{
    color_map_temp_up = (int(random(14)));
  }

}

for(let i = 0; i < pointsDivisionBodySize2; i++){
  let rr = random(1);
  random_factor.push(rr);
  let isOn = isOn_down[int(random(isOn_down.length))];
  if(isOn == 1){
    // rings_pos2.push(random(10,u4-10));
    rings_pos2.push(angles_choice[int(random(angles_choice.length))]);

    // rings_largo2.push(random(u4-rings_pos2[i]));
    rings_largo2.push(angles_choice[int(random(angles_choice.length))]);

    // rings_pos2.push(0);
    // rings_largo2.push(90);
  }else{
    rings_pos2.push(0);
    rings_largo2.push(0);
  }

  let ss = 1;
  if(ss == 1){

  }else{

  }
  rings_shades2.push(shades[int(random(shades.length))],shades[int(random(shades.length))]);
  // rings_shades2.push(temp_shade_01,temp_shade_02);

  frequency.push(ff[int(random(ff.length))]);
  frequency_2.push(ff2[int(random(ff2.length))]);
  frequency_3.push(ff3[int(random(ff3.length))]);

  if(color_map_temp == 1){
    color_map_temp_down = (1);
  }else{
    color_map_temp_down = (int(random(14)));
  }
}

let xx = int(random(shades.length));

for(let i = 0; i < pointsDivisionBodySize3; i++){
  let rr = random(100);
  random_factor.push(rr);
  let isOn = isOn_center[int(random(isOn_center.length))];
  if(isOn == 1){
    if(fixedAngle==0){
      rings_pos3.push(angles_choice[int(random(angles_choice.length))]);
    }else if(fixedAngle==1){
      rings_pos3.push(random(360));
    }
    rings_largo3.push(angles_choice[int(random(angles_choice.length))]);

  }else{
    rings_pos3.push(0);
    rings_largo3.push(0);
  }


  rings_shades3.push(shades[int(random(shades.length))],shades[int(random(shades.length))]);
  // rings_shades3.push(temp_shade_01,temp_shade_02);

  frequency.push(ff[int(random(ff.length))]);
  frequency_2.push(ff2[int(random(ff2.length))]);
  frequency_3.push(ff3[int(random(ff3.length))]);

  if(color_map_temp == 1){
    color_map_temp_center= (1);
  }else{
    color_map_temp_center= (int(random(14)));
  }

}

if(simmetry == 1){
  rings_shades2 = rings_shades;
  rings_shades3 = rings_shades2;
}


}

function generateSubdivisionsBody(){
  let nn = 24;
  let temp_points = [];
  let temp_points_2 = [];

  pointsDivisionBody = [];pointsDivisionBody2 = [];pointsDivisionBody3 = [];


  if(fullInterference==1){
    nucleo = 0;
    nucleoSize=0;
    temp_points = add_subdivision(sin(radians(u3)*disc),temp_points,48,0);
    temp_points_2 = add_subdivision_2(disc,nucleoSize,temp_points_2,48,0);
  }else{
    temp_points = add_subdivision(sin(radians(u3)*disc),temp_points,nn,0);
    temp_points_2 = add_subdivision_2(disc,nucleoSize,temp_points_2,24,0);
  }

  if(u3 >= 45){
    regular_up = true; regular_down = true;
    regular_sub_down = rand_b([8,12,24]);regular_sub_up = rand_b([8,12,14]);
  }

  let index_center;
  if(regular_center == false){index_center = num_subdivision_center;}else{index_center = temp_points_2.length;}

  let index_up;
  if(regular_up == false){index_up = num_subdivision_up;}else{index_up = temp_points.length;}

  let index_down;
  if(regular_up == false){index_down = num_subdivision_down;}else{index_down = temp_points.length;}


//// CENTER
    let points = [];
    points = add_irregularSubdivision(points,24,num_subdivision_center,0,0);
    pointsDivisionBody3.push(nucleoSize);
  for(let i = 0; i< index_center; i++){
      if(regular_center == true){
      if(i%regular_sub_center==0){
        pointsDivisionBody3.push(temp_points_2[i]);
      }
      }else{
        pointsDivisionBody3.push(temp_points_2[points[i]]);
      }
  }
  pointsDivisionBody3.push(disc);

//// UP
    points = [];
    points = add_irregularSubdivision(points,24,num_subdivision_up,0,0);
    pointsDivisionBody.push(0.);
  for(let i = 0; i< index_up; i++){
      if(regular_up == true){
        if(i%regular_sub_up==0){
        pointsDivisionBody.push(temp_points[i]);
      }
      }else{
        pointsDivisionBody.push(temp_points[points[i]]);
      }
  }
  pointsDivisionBody.push(disc);

  //// DOWN
      points = [];
      points = add_irregularSubdivision(points,24,num_subdivision_down,0,0);
      pointsDivisionBody2.push(0.);
    for(let i = 0; i< index_down; i++){
      if(regular_down == true){
        if(i%regular_sub_down==0){
          pointsDivisionBody2.push(temp_points[i]);
        }
      }else{
        pointsDivisionBody2.push(temp_points[points[i]]);
      }
    }
    pointsDivisionBody2.push(disc);


  pointsDivisionBodySize3= pointsDivisionBody3.length;
  pointsDivisionBodySize= pointsDivisionBody.length;
  pointsDivisionBodySize2=pointsDivisionBody2.length ;



  generate_rings_angles();


}

function add_irregularSubdivision(array,n,sub,prev,index){
  let value = int(random(prev+1,(n-sub)+index));
  // let value = (n-sub) + index;
  if(index < sub){
    array.push(value);
    index+=1;
    return add_irregularSubdivision(array,n,sub,value,index);
  }else{
    return array;
  }
}

function add_subdivisionPoint(array,points,a,choice,num,p1){

  let index;
  if(choice == 0){
     index = int(random(a,p1));
  }else if(choice == 1){
     index = a+=num;
  }

  array.push(points[index]);

  if(index < p1){
    if(choice == 0){
        let r = random(1);
        if(r > 0.2){
        return add_subdivisionPoint(array,points,index,choice,num,p1);
      }
    }else{
      return add_subdivisionPoint(array,points,index,choice,num,p1);
    }
  }
  return array;

}

function add_subdivisionPoint_2(array,points,a,choice,num,p1){

  let index;
  if(choice == 0){
     index = int(random(a,p1));
  }else if(choice == 1){
     index = a+=num;
  }

  array.push(points[index]);

  if(index < p1){
    if(choice == 0){
        let r = random(1);
        if(r > 0.2){
        return add_subdivisionPoint(array,points,index,choice,num,p1);
      }
    }else{
      return add_subdivisionPoint(array,points,index,choice,num,p1);
    }
  }
  return array;

}

function add_subdivision(prev,array,num,a){
    let r = (disc-sin(radians(u3)*disc)) / num;
    if(a < num){
      array.push(prev);
      a+=1;
      let newPrev = prev + r ;
      return add_subdivision(newPrev, array, num, a);
    }else{
      array.push(disc);
      return array;
    }
}

function add_subdivision_2(init,prev,array,num,a){
  let r;
  if(nucleo == 0){
     r = (init-nucleoSize) / num;
  }else{
     r = (init) / num;
  }

    if(a < num){
      array.push(prev);
      a+=1;
      let newPrev = prev + r ;
      return add_subdivision_2(init,newPrev, array, num, a);
    }else{
      return array;
    }
}

function add_subdivision_3(init,prev,array,num,a){
    let r = (init) / num;
    if(a < num){
      array.push(prev);
      a+=1;
      let newPrev = prev + r ;
      return add_subdivision_3(init,newPrev, array, num, a);
    }else{
      return array;
    }
}

function generate_rot(){
  rotate = 1;
  let p = [0.,45,-45,0];
  rotateAmt = p[int(random(p.length))];
}



function add_number(number,array){
  if(!array.includes(number)){
    return true;
  }else{
    return false;
  }
}

function generateColorSet(_rules){

  for(let i = 0; i < 255; i+=18.21){let pp = [i,i,i];gray_scale.push(pp);}

  let temp_color;
  fullGammaUniforms = [];
  colors_temp = [];
  let shade_scale = [];

  let rules = _rules;

    let cc; let cc2 = [];
    let yplus = rand_b([2,3,4,5,6])
    let mod = rand_b([2]);
    let y,x,xy,z;
    let ss;
    let rrr2 = random(1);

    if(mod == 2){ss = 7;}

 if(rules==1){
    colors_temp = fullGamma;
    y = int(random(14));
    nCol = 14;

  }else if(rules == 2){
      colors_temp = fullGamma;
       y = int(random(14));
        xy = int(random(14));
        x = int(random(xy,xy+ss));
       if(x > 14){x = x-14;}
       nCol =14;

      if(subType > 0){
        mod = 2;
        if(mod == 2){
          nCol = rand_b([4,6,8,10,12,14,14,14]);
        }
    }

}else if(rules == 3 || rules ==4){
      nCol = 14;
      y = rand_b([0,13]);z = rand_b([0,13,2,12,11]);x = int(random(14));xy =int(random(14));
  }else if(rules == 5|| rules == 6){
    colors_temp = fullGamma;y = int(random(14));let pepe = int(random(14));xy = add_1(y,pepe);nCol = 14;
  }else if(rules == 7||rules==8){
    y = int(random(14));
    xy = int(random(14));
    x = int(random(xy,xy+ss));
    nCol = rand_b([14,14,14,7]);
    let sss = int(random(14));
    temp_color = fullGamma[sss];
    var max = Math.max(Math.max(temp_color[0], Math.max(temp_color[1], temp_color[2])), 1);
    var step = 255 / (max * 14);
    for(let i = 0; i < 14; i++){
      let f = step *i;
      let tt = [temp_color[0] * f, temp_color[1] * f, temp_color[2] * f];
      // let tt = [temp_color[0] + (255-temp_color[0])*f, temp_color[1] + (255-temp_color[1])*f, temp_color[2] + (255-temp_color[2])*f];
      shade_scale.push(tt);
    }
    if(random(1)>0.5){
      reverse(shade_scale);
    }

  }

let random_rules3 = random(1);
let random_rules32 = random(1);

  for(let i = 0; i < nCol;i+=1){
    let a = i%mod;
    if(rules == 0){x+=1;if(x >= 14){x = 0;} cc2.push(x);

  }else if(rules == 1){
    y += 1;if(y >= 14){y = 0;}
    cc2.push(y);
    }else if(rules == 2){
    if(a == 0){cc2.push(xy);}else{x += 1;if(x >= 14){x = 0;}cc2.push(x);}
    }else if(rules == 3){
      let a = i%mod;
      x+=1;if(x >= 14){x = 0;}
      if(a == 0){
        colors_temp.push(gray_scale[z]);
      }else{
        colors_temp.push(fullGamma[x]);
     }
     cc2.push(i);
  }else if(rules ==4){
    let a = i%mod;
    x+=1;if(x >= 14){x = 0;}
    if(a == 0){
      let c;
      if(random_rules3 < 0.7){
        c = y;
      }else{
        c = x;
      }
      colors_temp.push(gray_scale[c]);
  }else{
      colors_temp.push(fullGamma[xy]);
  }
  cc2.push(i);

  }else if(rules == 5){
      let a = i%2;
      if(a == 0){y += 1;if(y >= 14){y = 0;}
       cc2.push(y);
      }else{
        xy += 1;if(xy >= 14){xy = 0;}
       cc2.push(xy);
     }
   }else if(rules == 6){
     let a = i%2;
     if(a == 0){y += yplus;if(y >= 14){y = 0;}cc2.push(y);
     }else{y += 1;if(y >= 14){y = 0;}cc2.push(y);}

  }else if(rules == 7){
      if(a == 0){if(0. > 0.5){y += 1;if(y >= 14){y = 0;}
         colors_temp.push(shade_scale[xy]);
       }else{
         colors_temp.push(shade_scale[xy]);
       }
     }else{
       y += 1;if(y >= 14){y = 0;}
       colors_temp.push(shade_scale[y]);
     }
   cc2.push(i);

 }else if(rules == 8){
   let a = i%2;
   y += 1;
   x+=1;
  if(y >= 14){
    y = 0;
  }
  if(x >= 14){
    x = 0;
  }
   if(a == 0){
       colors_temp.push(shade_scale[x]);
   }else{
       colors_temp.push(fullGamma[y]);
  }
  cc2.push(i);

 }

    fullGammaUniforms.push(colors_temp[cc2[i]][0]);
    fullGammaUniforms.push(colors_temp[cc2[i]][1]);
    fullGammaUniforms.push(colors_temp[cc2[i]][2]);
}

console.log("/////COLORS");
console.log("rules",rules);
console.log("nCol",nCol);

}

function add_1(a,b){
  if(a == b || b == a+1 || b == a-1){
    b = int(random(14));
    return add_1(a,b);
  }else{
    return b;
  }

  return b;
}

function generate3Colors(_choice){

let color = fullGamma[int(random(14))];
let color2 = fullGamma[int(random(14))];
let color3 = fullGamma[int(random(14))];

if(_choice == 0){

  metallicColors = [];
  metallicColors = [0,0,0,
                    color[0],color[1],color[2],
                    255,255,255];

}else if(_choice == 1){
  let r = rand_b([random(1,25),random(225,255)]);
  metallicColors = [0,0,0,
                    r,r,r,
                    255,255,255];
stroke_Amt = random(0.8,0.88);
stroke_Amt1 = random(0.88,0.88);

}else if(_choice == 2){
  let color = fullGamma[int(random(14))];
  let factor = random(25,150);
  metallicColors = [color[0]-factor,color[1]-factor,color[2]-factor,
                    color[0],color[1],color[2],
                    255,255,255];
}else if(_choice == 3){

  metallicColors = [color[0],color[1],color[2],
                    255,255,255,
                    color2[0],color2[1],color2[2]];
}else if(_choice == 4){

  metallicColors = [color[0],color[1],color[2],
                    color3[0],color3[1],color3[2],
                    color2[0],color2[1],color2[2]];
}else if(_choice == 5){

  metallicColors = [color[0],color[1],color[2],
                    0.0,0.0,0.0,
                    color2[0],color2[1],color2[2]];
}

}

function generate_capsule(){
  capsule_NucleoSize = [];
  capsule_nucleos = [];
  nucleo = 1;
  // u2 = 0;
  u4 = 1.0;
  zoom = 7.5;disc = 1;
  nShape = 2;
  rotateNucleo = int(random(1));
  let r = []; let r2= [];
  for(let i = 1.5/freq; i < 1.5; i+=1.5/freq){r.push(i);r2.push(i);}
  shuffle(r,true);

  let size_choice =random(1);
  // r[0] = disc;

  if(size_choice > 0.0 && size_choice < 0.3){
    capsule_NucleoSize = [r[0],r[1],r[2]];
  }else if(size_choice > 0.3 && size_choice < 0.5){
    capsule_NucleoSize = [r[0],r[0]/2.0,r[2]];
  }else if(size_choice > 0.5){
    capsule_NucleoSize = [r[0],r[0],r[1]];
  }

  let nucleo_choice = random(1);
  if(nucleo_choice > 0. && nucleo_choice < 0.5){
    capsule_nucleos = [1,1,0];
  }else if(nucleo_choice > 0.5 && nucleo_choice < 0.8){
    capsule_nucleos = [1,0,0];
  }else if(nucleo_choice>0.8 && nucleo_choice < 0.95){
    capsule_nucleos = [0,0,1];
  }else{
    capsule_nucleos = [1,1,0];
    let cccc = random(1);
    if(cccc >= 0.5){
      let as = int(random(1,r2.length));
      capsule_NucleoSize = [r2[as],r2[as],r2[0]];
    }else{
      let as = int(random(1,r2.length-1));
      capsule_NucleoSize = [r2[0],r2[0],r2[as]];
      console.log(r2[5]);
    }
  }
}

function generate_capsule_map(){
  pointsDivisionBody = [];
  pointsDivisionBody.push(-0.5);
  pointsDivisionBodySize = 9;
  for(let i = 0; i< pointsDivisionBodySize; i++){
    if(i > 0){
      pointsDivisionBody.push(pointsDivisionBody[i-1]+(2.0/pointsDivisionBodySize));
    }
}
  pointsDivisionBody.push(disc);
}

function generate_map_u1(){
  nucleo = 1;
  rotate = 0;
}

function newInterference(choice,_subtype){
  let cc = random(1);
  rotateAmt = 0;
    if(choice == 0){ // GENESIS
      nShape = 0;
      initUniforms(0,_subtype);

      if(u2 >= 0.6 && u3 <= 25){zoom = 3.45;}else{zoom = 3.3;}

        if(pixela == 1){
          u3 = 3.0;
          zoom = 40;
          disc = 10;
          nShade = 9;
          freq = random(5);
          u2=0.8*10;
        }

        if(subType == 1 || subType == 2 || subType == 3 || subType == 4 ){
          nucleo = 0;nMap =0;nShade = rand_b([1,1,1,1,2]);
          outSideStroke = rand_b([0]);
          background_u1 = rand_b([2,12,24]);
          lights = 0;

          if(nShade == 1){
            color_rules = rand_b([1,2,2,2,3,4,5,5,5,5,7,8,8,8]);
            let ffull = random_2.random_dec(1);
            if(ffull >=2.0){
              color_rules = rand_b([2,2,2,2,3,5,5,5,8,8,8]);
              u3 = rand_b([int(random(2,15))]);
              disc = 10;
              if(stroke_choice==0){
                stroke_var = rand_b([0,1]);
                stroke_Amt= 0.88;
                if(stroke_var == 1){
                  lights = 1.;
                }
              }
              random_factor_stroke = rand_b([2,4]);
            }
            generateColorSet(color_rules);
            array_freq[1] = rand_b([28,35,42,49,56,63,70,77,84,91,98]);
            background = rand_b([0]);
          }else if(nShade ==2){
            let choice = rand_b([0,1,2,3,4,5]);
            generate3Colors(choice);
            array_freq[0] = rand_b([42,49,56,63,70,77,84]);
            background = rand_b([0,0,3]);
            lights = 1;
          }

          if(array_freq[0] || array_freq[1]>= 56){
            stroke_choice = rand_b([2]);
          }else{
            stroke_choice = rand_b([1,0,0]);
            stroke_Amt1 = 0.88;
            stroke_Amt = 0.88;
          }

        }else if (subType ==0){
          nucleo = 1;
          let cc_set = rand_b([1,2,2,3,4,5,5,2,8,8,8,7,2,5,5]);
          generateColorSet(cc_set);
          generate_map_interference();
          generateSubdivisionsBody();
          generateSubdivisionsNucleo(random(0.05,sin(radians(u3))-nucleo_stroke[0]));

          let mm = random_2.random_dec();
          if(mm < 0.9){
            let cc = rand_b([1,2,2,3,4,5,5,2,8,8,8,7]);
            generateColorSet(cc);
            lights = 1;
            outSideStroke = rand_b([0,1]);
            outsideStrokeType = rand_b([0,1]);
            outsideStrokeRadius = rand_b([0.005]);
            generate_map_interference();
            generateSubdivisionsBody();
            nMap = 1;
          }else{
            initUniforms(0,_subtype);

            nMap = 0;
            nShade = rand_b([1,2]);
            background = rand_b([0,0,0,0,3]);

            if(nShade == 1){
              nucleo = rand_b([0,0,1]);
              outSideStroke = rand_b([0,1]);
              lights = rand_b([0,0,1]);
              array_freq[1] = rand_b([7,14,28,35,35,42,42,49,56,63]);
              if(array_freq[1] >= 56){
                stroke_choice = 2;
              }else{
                stroke_choice = rand_b([1,0,0,2,2,2,2,2,2]);
                stroke_Amt1 = rand_b([0.8,0.8,0.8,0.5]);
                stroke_Amt = 0.8;
                if(cc == 7){
                  stroke_choice = rand_b([0]);
                  stroke_Amt = 0.88;
                }
              }
              if(array_freq[1] <= 14){
                stroke_choice = 0;
                stroke_Amt = rand_b([0.2,0.2,0.5,0.88]);
              }

            }else if(nShade == 9){
                nucleo = rand_b([0,0,0,1]);
                lights = 1;
                blend = rand_b([0,1,2]);
                array_freq[0] = rand_b([7,14,21,28,35,42,49,56,63]);
                stroke_choice = rand_b([0,1,2]);
                stroke_Amt=0.89;stroke_Amt1= 0.89;
                randomFactor=rand_b([0.1,0.2,0.3,0.4,0.44,random(0.1,0.3)]);
            }else if(nShade ==2){
              let choice = rand_b([0,1,2,3,4,5]);
              generate3Colors(choice);
              array_freq[0] = rand_b([28,42,49,56,63,70,77,84]);
              background = rand_b([0,3]);
              lights = 1;
              strokeAmt = 0.88;
              if(array_freq[0] >= 56){
                stroke_choice = 2;
              }
            }
          }
        }else if(subType == 5){
            u2 = rand_b([u2,-u2]);
            generateSubdivisionsNucleo(random(0.05,sin(radians(u3))));
            generateColorSet(rand_b([1,2,3,4,5,6,2,3,4,5,6,7,8]));
            // generate_rot();
            nMap = rand_b([0,0,1]);
            if(nMap == 0){
              nucleo = 0;
              nShade = 1;
              array_freq[1] = 28;
            }else{
              generate_map_interference();
              generateSubdivisionsBody();
              generate_map_u1();
            }
        }


        if(fullInterference == 1){
          u2 = rand_b([1,1.5,2.,2.5]);
          u3 = rand_b([0,1,2,5]);
          lights = 1;
          pixela = 0;
          u1 = 0;
          nMap = 1;
          disc = 5;
          generate_map_interference();
          generateSubdivisionsBody();
          nucleo = 1;

        }

    }else if(choice ==2){ // CAPSULE
      generateColorSet(rand_b([1,2,3,4,5]));
      rotate = 0;
      nShape = 2;
      initUniforms(1,_subtype);
      nMap = 0;
      generate_capsule();
      if(nMap == 1){
        generate_capsule_map();
        generate_map_interference();
        generateSubdivisionsBody();
        background = rand_b([0,3]);
        nucleo = 1;
      }else{
        nShade = rand_b([1])
        background = rand_b([0,6]);

        array_freq[1] = rand_b([14,28,35,35,42,42,49,56,63]);
        array_freq[1] = rand_b([1,3,5,7]);
        if(array_freq == 1){
          strokeAmt = 0;
          stroke_Amt = 0.2;
        }else{
          strokeAmt = rand_b([0,1,2]);
          stroke_Amt = 0.9;
          stroke_Amt1 = 0.9;
        }
      }

      if(fullInterference == 1){
        u2 = 0;
        zoom = 2;
      }
      background = rand_b([0]);
      outSideStroke = 1;

    }

}

function initUniforms(_nShape, _subType){
  stroke_var = 0;
	flip = int(random(2));
  outSideStroke = int(random(2));
  subType = _subType;
	u1 = values[_nShape].v1[subType][0];u2 = values[_nShape].v1[subType][1];u3 = values[_nShape].v1[subType][2];u4 = values[_nShape].v1[subType][3]; u5 = values[_nShape].v1[subType][4];
  randomFactor = int(random(25));
  random_factor_stroke = int(random(25));
  randomFactor1 = random(1);
  randomFactor2 = random(-1,1);

  // shades_u1 = random(1);
  // shades_u2 = rand_b([0,1]);
  // shades_u3 = random(12,50);

}

function gen_lights(){
        lightAmt = random(0.5,0.6);
        lightAmt1 = random(0.,0.6);
        lightRot = random(-6.28,6.28);
        lightSize = random(0.01,0.02);
        lightCoord = random(0.0,1);
}

function generator(_choice, _subtype){
  generate_capsule();
  gen_lights();

  generateValues();
  generateSubdivisionsNucleo(random(0.05,sin(radians(u3))));

  newInterference(_choice,_subtype);

}


function draw() {
	if(play){
    pg.background(255);
    pg.shader(theShader);
  	passUniforms();
    pg.rectMode(CENTER);
     pg.rect(0,0, 5000, 5000);
     rectMode(CENTER);
     scale(0.25);
     scale(-1, 1)
    texture(pg);
    rect(0,0,5000,5000);
    play = false;
  }else{
    // noLoop();
  }
}

function passUniforms(){
theShader.setUniform('resolution',[5000,5000]);
theShader.setUniform('nShape',nShape);theShader.setUniform('subtype',subType);theShader.setUniform('nShade',nShade);theShader.setUniform('nMap',nMap);
theShader.setUniform('u1',u1);theShader.setUniform('u2',u2);theShader.setUniform('u3',u3);theShader.setUniform('u4',u4);theShader.setUniform('u5',u5);
theShader.setUniform('freq',freq);
theShader.setUniform('shades_u1',shades_u1);
theShader.setUniform('shades_u2',shades_u2);
theShader.setUniform('shades_u3',shades_u3);
theShader.setUniform('shades_u4',shades_u4);

theShader.setUniform('background',background);theShader.setUniform('background_u1',background_u1);theShader.setUniform('background_u2',background_u2);theShader.setUniform('background_u3',background_u3);

theShader.setUniform('zoom',zoom);theShader.setUniform('disc',disc);
theShader.setUniform('nucleo2',nucleo2);theShader.setUniform('nucleo3',nucleo3);

theShader.setUniform('nucleo2Size',nucleo2Size);theShader.setUniform('nucleo3Size',nucleo3Size);
theShader.setUniform('nucleo2_ring',nucleo2_ring);theShader.setUniform('nucleo3_ring',nucleo3_ring);

theShader.setUniform('pointsDivisionBody',pointsDivisionBody);theShader.setUniform('pointsDivisionBody2',pointsDivisionBody2);theShader.setUniform('pointsDivisionBody3',pointsDivisionBody3);

theShader.setUniform('nucleoSize',nucleoSize);theShader.setUniform('nucleo',nucleo);

theShader.setUniform('outsideStrokeNucleo',outsideStrokeNucleo);theShader.setUniform('outSideStroke',outSideStroke);theShader.setUniform('outsideStrokeType',outsideStrokeType);theShader.setUniform('outsideStrokeRadius',outsideStrokeRadius);
theShader.setUniform('rotateNucleo',rotateNucleo);

theShader.setUniform('nucleoShades',nucleoShades);
theShader.setUniform('nucleoDivisions',nucleoDivisions);
theShader.setUniform('nucleo_stroke',nucleo_stroke);
theShader.setUniform('nucleo_subRings',nucleo_subRings);
theShader.setUniform('nucleo_subRings_pos',nucleo_subRings_pos);
theShader.setUniform('random_factor',random_factor);
theShader.setUniform('randomFactor',randomFactor);theShader.setUniform('randomFactor1',randomFactor1);theShader.setUniform('randomFactor2',randomFactor2);
theShader.setUniform('random_factor_stroke',random_factor_stroke);
theShader.setUniform('noise',noise);
theShader.setUniform('frequency',frequency);
theShader.setUniform('frequency_2',frequency_2);
theShader.setUniform('frequency_3',frequency_3);
theShader.setUniform('frequency_4',frequency_4);

theShader.setUniform('color_map_temp_up',color_map_temp_up);
theShader.setUniform('color_map_temp_down',color_map_temp_down);
theShader.setUniform('color_map_temp_center',color_map_temp_center);

theShader.setUniform('color_index_map',color_index_map);

theShader.setUniform('flip',flip);theShader.setUniform('rotate',rotate);theShader.setUniform('rotateAmt',rotateAmt);

theShader.setUniform('stroke_choice',stroke_choice);theShader.setUniform('stroke_Amt',stroke_Amt);theShader.setUniform('stroke_Amt1',stroke_Amt1);
theShader.setUniform('stroke_choice2',stroke_choice2);theShader.setUniform('stroke_Amt2',stroke_Amt2);theShader.setUniform('stroke_Amt12',stroke_Amt12);
theShader.setUniform('stroke_var',stroke_var);
theShader.setUniform('stroke_choice3',stroke_choice3);theShader.setUniform('stroke_Amt3',stroke_Amt3);theShader.setUniform('stroke_Amt13',stroke_Amt13);

theShader.setUniform('lights',lights);
theShader.setUniform('lightAmt',lightAmt);
theShader.setUniform('lightAmt1',lightAmt1);
theShader.setUniform('lightSize',lightSize);
theShader.setUniform('lightCoord',lightCoord);
theShader.setUniform('lightRot',lightRot);
theShader.setUniform('light_stroke_01',light_stroke_01);theShader.setUniform('light_stroke_02',light_stroke_02);
theShader.setUniform('light_stroke_01factor',light_stroke_01factor);theShader.setUniform('light_stroke_02factor',light_stroke_02factor);


theShader.setUniform('fullInterference',fullInterference);
theShader.setUniform('random_factor_stroke_nucleo',random_factor_stroke_nucleo);


theShader.setUniform('fullGamma',fullGammaUniforms);
theShader.setUniform('nCol',nCol);
theShader.setUniform('blend',blend);
theShader.setUniform('metallicColors',metallicColors);


theShader.setUniform('rings_pos',rings_pos);theShader.setUniform('rings_largo',rings_largo);theShader.setUniform('rings_shades',rings_shades);
theShader.setUniform('rings_pos2',rings_pos2);theShader.setUniform('rings_largo2',rings_largo2);theShader.setUniform('rings_shades2',rings_shades2);
theShader.setUniform('rings_pos3',rings_pos3);theShader.setUniform('rings_largo3',rings_largo3);theShader.setUniform('rings_shades3',rings_shades3);
theShader.setUniform('rings_num',rings_num);

theShader.setUniform('array_freq',array_freq);

theShader.setUniform('capsule_nucleos',capsule_nucleos);
theShader.setUniform('capsule_NucleoSize',capsule_NucleoSize);

theShader.setUniform('pointsDivisionBodySize',pointsDivisionBodySize);
theShader.setUniform('pointsDivisionBodySize2',pointsDivisionBodySize2);
theShader.setUniform('pointsDivisionBodySize3',pointsDivisionBodySize3);



theShader.setUniform('pixela',pixela);

}

function debug(){
  // console.log("////////////MATRIX");
  console.log("zoom: " + zoom);  console.log("flip: " + flip);

  console.log("////////////SHAPE");
  console.log("nShape: " + nShape);
  console.log("subType: " + subType);

	console.log("////////////SHADE");
  console.log("nShade: " + nShade);

	console.log("//////////// UNIFORMS");
	console.log("u1: " + u1);
	console.log("u2: " + u2);
	console.log("u3: " + u3);
	console.log("u4: " + u4);
  console.log("color_rules: " + color_rules);

  console.log("lightAmt: " + lightAmt);
  console.log("lightSize: " + lightSize);

  console.log("nucleo: " + nucleo);
  console.log("nucleoSize: " + nucleoSize);
  console.log("shades_choice"+shades_choice);

  console.log("array_freq[1]", array_freq[1]);

}

function keyPressed(){
  let _subType;
  let n;
  console.log(key);
  if(key == '0'){
    fullInterference = 0;
    pixela = 0;
    generator(0, rand_b([0,0,0,0,0,0,0,0,1,2,3,5]));
    play = true;
  }else if(key == '1'){
    fullInterference = 0;

    pixela = 0;
    _subType = 1;
    generator(1, _subType);
    play = true;
  }else if(key == '2'){
    fullInterference = 0;

    pixela = 0;
    _subType = 0;
    generator(2, _subType);
    play = true;
  }else if(key == '3'){
    pixela = 0;
    _subType = 0;
    generator(3, _subType);
    play = true;
  }else if(key == '4'){
    pixela = 0;
    generator(4, 0);
    play = true;
  }else if(key == '6'){
    fullInterference = 0;
    pixela = 0;
    // generator(0, rand_b([0,1,2,3]));
    generator(0, rand_b([1,2,3]));
    play = true;
  }else if(key == '7'){
    fullInterference = 1.0;
    generator(0,0);
    play = true;
  }else if(key == '8'){
    generator(0,5);
    play = true;
  }else if(key == '9'){
    save(pg, 'png');
    pixela = 0;
    fullInterference = 0;
    generator(0, rand_b([0]));
    play = true;

  }else if(key == 'P'){
    pixela = 1;
    generator(0,0);
    play = true;
  }else if(key == 'O'){

  }else if(key == 'T'){
    _subType = 0;
    generator(6, 6);
    nShape = 4;
    play = true;
  }else if(key == 'G'){
    pixela = 0;
    fullInterference = 0;
    generator(0, rand_b([0]));
    play = true;
  }
    debug();
}

function generateValues(){
   values = [
    interference_00 = {
      type : 0,
      v1 : [
      [0, rand_b([0.25,0.3,0.4,0.5,0.5,0.6,0.6,0.6,0.65]),rand_b([5,5,5,10,10,15,20,25,30,35,35,40,40,45,45,50,50,55,60,65,70]),0,0],
      [0, rand_b([0.1,0.15,0.2,0.25,0.05, random(0.1,0.25)]),rand_b([random(3,3.5),2.5]),0,0],
      [0, rand_b([0.1,0.15,0.05,0.2, random(0.1,0.2)]),random(4,4.5),0,0],
      [0, rand_b([0.05,0.1,0.15, random(0.05,0.15)]),random(5,5.5),0,0],
      [0, rand_b([0]),rand_b([0]),0,0],
      [1, rand_b([0.25/2,0.25,0.3,0.4,0.5,0.6,0.65]),rand_b([40,45,50,55,60,65,70]),0,0],
      [1, rand_b([1.2]),rand_b([2]),0,0]

  ]
},
interference_02 = {
  type : 2,
  v1 : [
  [random(2,2.5),rand_b([0,0.75,1.0,1.25,1.5]),rand_b([0.,0.25/2,0.25,0.5,1.0,1.5,2.0]),0,0.5],
  [random(2,2.5),rand_b([0,0.75,1.0,1.25,1.5]),random(0),0,rand_b([-1])]
]
}
]
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function rand_b(values){
  let select = random_2.random_choice(values);
  return select;
}

function genTokenData(projectNum) {
  let data = {};
  let hash = "0x";
  for (var i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }
  data.hash = hash;
  data.tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();
  return data;
}
let tokenData = genTokenData(123);

class Random {
  constructor() {
    this.useA = false;
    let sfc32 = function (uint128Hex) {
      let a = parseInt(uint128Hex.substr(0, 8, 16));
      let b = parseInt(uint128Hex.substr(8, 8, 16));
      let c = parseInt(uint128Hex.substr(16, 8, 16));
      let d = parseInt(uint128Hex.substr(24, 8, 16));
      return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    // seed prngA with first half of tokenData.hash
    this.prngA = new sfc32(tokenData.hash.substr(2, 32));
    // seed prngB with second half of tokenData.hash
    this.prngB = new sfc32(tokenData.hash.substr(34, 32));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  // random number between 0 (inclusive) and 1 (exclusive)
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
  // random number between a (inclusive) and b (exclusive)
  random_num(a, b) {
    return a + (b - a) * this.random_dec();
  }
  // random integer between a (inclusive) and b (inclusive)
  // requires a < b for proper probability distribution
  random_int(a, b) {
    return Math.floor(this.random_num(a, b + 1));
  }
  // random boolean with p as percent liklihood of true
  random_bool(p) {
    return this.random_dec() < p;
  }
  // random value in an array of items
  random_choice(list) {
    return list[this.random_int(0, list.length - 1)];
  }
}
