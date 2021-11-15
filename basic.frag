#ifdef GL_ES
precision highp float;
#endif
#define TWO_PI 6.28318530718
#define LAMBDA 9.e-2
#define PI 3.14159
const int SIZE3 = 3,SIZE8 = 8, SIZE14 = 14, SIZE16 = 28,SIZE36 = 36, SIZE42 = 42;
uniform vec2 resolution;uniform int nShape, nShade,flip,subtype;uniform float zoom;uniform float disc;
uniform int nMap;
uniform float rings_pos [SIZE36]; uniform float rings_largo [SIZE36];uniform vec2 rings_shades [SIZE16];
uniform float rings_pos2 [SIZE36];uniform float rings_largo2 [SIZE36];uniform vec2 rings_shades2 [SIZE36];
uniform float rings_pos3 [SIZE36];uniform float rings_largo3 [SIZE36];uniform vec2 rings_shades3 [SIZE36];
uniform int capsule_nucleos[SIZE3];
uniform float capsule_NucleoSize[SIZE3];
uniform int blend;
uniform float random_factor_stroke;
uniform float random_factor_stroke_nucleo;


uniform float shades_u1,shades_u2,shades_u3,shades_u4,shades_u5;
uniform float background_u1,background_u2,background_u3;

uniform float u1,u2,u3,u4,u5;
uniform float freq; uniform float array_freq[SIZE8];
uniform float frequency[SIZE36];
uniform float frequency_2[SIZE36];
uniform float frequency_3[SIZE36];
uniform float random_factor[SIZE36];

uniform int color_index_map[SIZE36];

uniform float nucleoSize; uniform int outsideStrokeNucleo;uniform int outsideStrokeType;uniform float outsideStrokeRadius; uniform int nucleo;
uniform int nucleo1, nucleo2, nucleo3;
uniform float nucleo2Size,nucleo3Size;
uniform float nucleo2_ring,nucleo3_ring;

uniform int nucleoShades[SIZE8];

uniform float fake_value1[SIZE8];
uniform float fake_value2[SIZE8];

uniform int pixela;

uniform int light_stroke_01,light_stroke_02;
uniform float light_stroke_01factor,light_stroke_02factor;

uniform float nucleo_stroke[SIZE16];
uniform int outSideStroke;
vec4 final;
uniform int fullInterference;

uniform float randomFactor, randomFactor1,randomFactor2;
uniform float pointsDivisionBody[SIZE16];uniform float pointsDivisionBody2[SIZE16];uniform float pointsDivisionBody3[SIZE16];
uniform int pointsDivisionBodySize;
uniform int pointsDivisionBodySize2;
uniform int pointsDivisionBodySize3;

uniform int rings_num[SIZE8];

// LIGHTS
uniform float noise;
uniform float lightAmt; uniform float lightAmt1; uniform float lightCoord; uniform float lightCoord1; uniform float lightRot;uniform float lightSize; uniform int lights;


// STROKE

uniform int stroke_choice;uniform int stroke_choice2;
uniform int stroke_choice3;uniform int stroke_choice4;

uniform int angle_choice;

uniform float stroke_Amt,stroke_Amt1;uniform float stroke_Amt2,stroke_Amt12,stroke_Amt3,stroke_Amt13;
uniform int stroke_var;

/// COLORS

uniform int color_map_temp_up,color_map_temp_center,color_map_temp_down;

uniform int nCol;
uniform vec3 fullGamma[SIZE14];
uniform vec3 metallicColors[SIZE3];


/// background

uniform int background;

//// MATRIX

uniform int rotate;
uniform float rotateAmt;

vec2 scale(vec2 st, vec2 s) {return (st-.5)*s+.5;}
mat2 rotate2d(float _angle){return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));}


float shape(vec2 st, int N){
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);
  return cos(floor(.5+a/r)*r-a)*length(st*1.0);}
float box(in vec2 _st, in vec2 _size){_size = vec2(0.5) - _size*0.5;vec2 uv = smoothstep(_size, _size+vec2(0.001),_st);uv *= smoothstep(_size,_size+vec2(0.001),vec2(1.0)-_st);return uv.x*uv.y;}
vec2 tile(vec2 _st, float _zoom){_st *= _zoom;return fract(_st);}
vec3 grid(vec2 uv, float size, float stroke){  vec3 f;vec2 grid = tile(uv, size);f = vec3( box( (grid), vec2(stroke) ));return f;}


float sdRoundBox( in vec2 p, in vec2 b, in vec4 r ){
    if(u4 == float(1)){
      if(p.y < -u3){
        p.x-=u2;
      }
      if(p.y > u3){
        p.x+=u2;
      }
    }else if(u4 == float(2)){
       // p.x/=cos(p.y);
    }
    r.xy = (p.x>0.0)?r.xy : r.zw;
    r.x  = (p.y>0.0)?r.x  : r.y;

    vec2 q = abs(p)-b+r.x;

    return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
}
float circle(in vec2 _st, in float _radius){vec2 dist = _st-vec2(0.5, 0.5);return 1.-smoothstep(_radius-(_radius), _radius+(_radius),dot(dist,dist)*1.0);}
float hash( float n ){return fract(sin(n)*43758.5453123);} float random(vec2 n, float offset ){return .5 - fract(sin(dot(n.xy + vec2( offset, 0.0 ), vec2(12.9898, 78.233)))* 43758.5453);}
float noise2( in vec2 x ){
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*157.0;
    return mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
               mix( hash(n+157.0), hash(n+158.0),f.x),f.y);
}


vec3 arc(vec2 uv, vec2 pos,float aperture,float radius1, float radius2, float angle, vec3 color,vec3 color2, float F) {
    vec2 b = (pos  - uv );float angdist = mod(atan(b.y, b.x) - angle, 2.0*PI);if(F >= radius1 && F <= radius2){if(angdist < radians(aperture)){return color;}else{return color2;}}
}
//// COLOR

vec3 blendDifference(vec3 base, vec3 blend) {return abs(base-blend);}
vec3 blendDifference(vec3 base, vec3 blend, float opacity) {return (blendDifference(base, blend) * opacity + base * (1.0 - opacity));}
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}
vec3 i2f(vec3 f){
   vec3 a = vec3(float(f.r)/255.0, float(f.g)/255.0, float(f.b)/255.0);
   return a;
 }

vec3 blendColor(vec3 a, vec3 a1, vec3 a2, vec3 a3){vec3 b;if(blend == int(0.0)){a = blendDifference(a,a1);}else if(blend == int(1.0)){a = blendDifference(a, a2);}else if(blend == int(2.0)){a = blendDifference(a, a3);}else if(blend == int(3.0)){a = blendDifference(a, vec3(0.,0.,0.));}b = a;return b;}
///////////

vec3 generate_noise(vec3 a){
  return a.rgb += vec3( 0.1 * random( gl_FragCoord.xy/100.0, 200.0 * 1.0  )); //1.4
}

vec3 pulseOsc(float _freq, float speed,float coord){vec3 osc;float freq = _freq ;float rampX = fract(coord*freq+speed);float rampY = fract(coord*freq+speed);float rampZ = fract(coord*freq+speed);float pulseX = 1.0 - smoothstep(0.49, 0.50001, rampX);float pulseY = 1.0 - smoothstep(0.49, 0.50001, rampY);float pulseZ = 1.0 - smoothstep(0.49, 0.50001, rampZ);osc = vec3(pulseX, pulseY, pulseZ);return osc;}

//// SHAPES


float intf(vec2 pos, int choice, float a, float newU3){
  float f1;
  float x, y;


  if(choice == 0){if(subtype == 0 || subtype == 5){
    if(u1 == 1.0){
      if(pos.y > newU3){
        x += u2;
      }
    }else{
      if(pos.y > newU3){
        x += u2;
      }
    }

    if(u1 != 1.0){
      if(pos.y < -newU3){x -= u2;}}}else if(subtype >= 1) {x = floor(pos.y*u3+0.5)*u2;}

  return f1 = distance(pos, vec2(vec2(x, 0)));
  }else if(choice == 2){
    // if(rotateNucleo==int(1.0)){pos*=rotate2d(PI/2.0);}
    float a = sdRoundBox(pos, vec2(0.5,2.5),vec4(u5));
    // a = min(a,sdRoundBox(pos+vec2(-(zoom/8.0),0.), vec2(0.05,3.5),vec4(0.5)));
    return f1 = a;
  }else if(choice == 3){

    }else if(choice == 4){
    // x = atan(pos.y,0.1)*newU3/2.;
    // return f1 = distance(pos, vec2(vec2(x, 0)));
    // pos*=rotate2d(sin(pos.x/2.0+randomFactor1));
    // return f1 = distance(pos, vec2(vec2(atan(pos.y*1.0+randomFactor1), 0.)));
    pos = abs(pos);
    x = floor(pos.y*u3)*-u2;


    // return f1 = distance(pos, vec2(vec2(pos.y/1.5, 0.)));
    return f1 = distance(pos, vec2(vec2(x, 0.)));

  }else if(choice == 5){
    if(pos.y > u3){
      x += u2;
    }
    return f1 = distance(pos, vec2(vec2(x, 0)));
  }
}

////// SHADES


vec3 addStroke(float F, vec3 a, vec2 uv, float _freq, float coord, int choice,float stroke_1, float stroke_2, float _factor){

  float value = 1.0;
  float aa = atan(uv.y,uv.x)*TWO_PI;

  if(choice == int(0.0)){
  value = value * smoothstep(stroke_1,0.9, fract(F*_freq));

  if(stroke_var == 1){
    value*=abs(sin(aa*2.+randomFactor1));
    a+=value;

  }else{
    a+=value;
  }


  } else if (choice == int(1.0)){
    value = value / smoothstep(1.0,stroke_2, fract(F*_freq));
    a/=value;
  }



  return a;
}

vec3 light(vec3 a,vec2 uv, float F){

    uv+=vec2(1.5);
    uv*=rotate2d(lightRot*3.0);

    if(lights==int(1.0)){
    //
    if(nMap==int(1.0)){
      a *= mix(1.0,abs(cos(sin(uv.y*0.3)*2.0)),0.4);
      a *= mix(1.0,cos(-uv.x*1.+0.2),0.4);
    }else{
        a *= mix(1.0,abs(cos(sin(uv.y*0.3)*2.0)),0.2);
        a *= mix(1.0,cos(-uv.x*1.+0.2),0.2);
    }


    vec3 sum;

    sum +=circle(uv+cos(uv.x*2.0+0.5)*lightCoord, lightSize)*lightAmt;
    sum +=circle(uv+sin(uv.y*5.0+0.4)*lightCoord, lightSize)*lightAmt/3.0;
    // // sum*= i2f((fullGamma[5]));
    sum -=circle(uv+cos(uv.x*2.0+0.5)*lightCoord, lightSize)*lightAmt1;

    a += sum;
  }

  return a;
  }

vec3 shade(float F, vec2 uv, float coord,int choice,float freq,float freq_01,float freq_02,int color_index,float rr, float p1, float p2){

    vec3 a; int c12;

    if(choice == int(0.0)){
      a = pulseOsc(F, 0.,freq);
    }else if(choice == int(1.0)){c12 = int(mod(F*freq_01,float(nCol)));for(int i = 0; i <14; i++){if(c12 == i){a = i2f((fullGamma[i]));}} a = addStroke(1.0-(F),a,uv, freq_01, coord,stroke_choice,stroke_Amt,stroke_Amt1,0.);
    }else if(choice == int(2.0)){c12 = int(mod(F*freq,3.0));for(int i = 0; i< 3; i++){if(c12 == i){a = i2f((metallicColors[i]));}}
     a = addStroke(1.0-(F),a,uv, freq, coord,stroke_choice,stroke_Amt,stroke_Amt1,0.);
    }else if(choice == int(3.0)){
      vec2 newCoord;if(uv.y > sin(radians(u3)*disc)){newCoord = vec2(uv.x -u2, uv.y);}else if(uv.y < sin(radians(-u3)*disc)){newCoord = vec2(uv.x +u2, uv.y);if(u1 != 0.0){newCoord = vec2(uv.x , uv.y);}else{newCoord = vec2(uv.x +u2, uv.y);}}else{newCoord = vec2(uv.x, uv.y);}
      // newCoord = vec2(uv.x, uv.y);
      float cc = atan(newCoord.x, newCoord.y)/TWO_PI;
      a = pulseOsc(cc, randomFactor,freq_02);
      if(F < 0.2){
        a = pulseOsc(cc, randomFactor,freq/2.0);
      }
      if(F < 0.05){
        a = pulseOsc(cc, randomFactor,0.);
      }
      if(F > 0.4 && F < 0.6){
        a = pulseOsc(cc, randomFactor,freq_02/2.0);
      }
      if(F > 0.99){
        a = pulseOsc(cc, randomFactor,freq);
      }
      a = addStroke(1.0-(F),a,uv,3.,coord,stroke_choice2,stroke_Amt2,stroke_Amt12,rr);
    }else if(choice == int(4.0)){
              if(F > 0.97){
                a = grid(uv, shades_u3/2.0,0.3);
              }else{
                a = grid(uv, shades_u3,0.2);
              }
        }else if(choice == int(5.0)){
            a = 1.0-grid(uv, shades_u3,0.2);
            if(F > 0.99){
              a = vec3(0.);
            }
        }else if(choice == int(6.0)){
            a = pulseOsc(uv.y,0.0,freq*1.5);
        }else if(choice == int(7.0)){ // CIRCLES
          uv*=rotate2d(sin(F*2.+randomFactor1)*shades_u1);
          uv*=rotate2d(sin(uv.y*2.+randomFactor1)*shades_u1*randomFactor1);
          a = floor(vec3(circle(fract(uv*freq),0.09))+0.5);
          if(F > 0.99){
            a = vec3(0.);
          }
          int c12 = color_index;
          vec3 bb;
          if(int(shades_u2)==0){
            a = 1.0-a;
          }else{
            c12 = color_index;for(int i = 0; i <14; i++){if(c12 == i){bb = i2f((fullGamma[i]));}}

            a+=bb;
          }
        }else if(choice == int(9.0)){
            float hue = floor(F*freq)/1.0;
            if(pixela != int(1.0)){
              a = hsb2rgb(vec3(abs(hue*randomFactor),1.0,1.0));
              a = blendColor(a, vec3(1.0,1.0,0.),vec3(0.0,0.9,0.8),vec3(0.0,.8,0.1));

            }else{
              a = hsb2rgb(vec3(abs(F*0.4),1.0,1.0));
              a = blendColor(a, vec3(0.8,0.1,0.),vec3(1.0,1.0,1.0),vec3(0.0,.8,0.1));
            }
            if(nMap==1){
              a = addStroke(1.0-(F),a,uv, freq, coord,stroke_choice2,stroke_Amt2,stroke_Amt12,rr);
            }else{
              a = addStroke(1.0-(F),a,uv, freq, coord,stroke_choice,stroke_Amt,stroke_Amt1,rr);
            }
        }else if(choice == int(10.)){
          c12 = color_index;for(int i = 0; i <14; i++){if(c12 == i){a = i2f((fullGamma[i]));}}
          a = addStroke(1.0-(F),a,uv, freq,coord,stroke_choice,stroke_Amt,stroke_Amt1,rr);
          // a = addStroke(1.0-(F),a,uv, array_freq[1], coord);
        }else if(choice == int(11)){
          a = vec3(0.0);
        }else if(choice == int(12)){
          a = vec3(1.0);
          if(F > 0.989){
            a = vec3(0.);
          }
        }else if(choice == int(13)){
          c12 = color_index;
          for(int i = 0; i <14; i++){
            if(c12 == i){
                a = mix(i2f((fullGamma[i])),i2f((fullGamma[i+2])),smoothstep(p1, p2, F));
              }
            }
        }else if(choice == 14){
          a = pulseOsc(uv.x+uv.y,rr,freq);if(F > 0.98){a = pulseOsc(F, 0.55,freq);}
          // a = addStroke(1.0-(F),a,uv, freq,coord,stroke_choice2,stroke_Amt2,stroke_Amt12,rr);
        } else if(choice == int(15.0)){
                a = pulseOsc(F, 0.5,freq/2.);
                if(nMap==1){a = addStroke(1.0-(F),a,uv, freq,coord,stroke_choice2,stroke_Amt2,stroke_Amt12,rr);}else{a = addStroke(1.0-(F),a,uv, freq,coord,stroke_choice,stroke_Amt,stroke_Amt1,rr);}
          }else if(choice == int(16.0)){
            vec2 newCoord;if(uv.y > sin(radians(u3)*disc)){newCoord = vec2(uv.x -u2, uv.y);}else if(uv.y < sin(radians(-u3)*disc)){newCoord = vec2(uv.x +u2, uv.y);if(u1 != 0.0){newCoord = vec2(uv.x , uv.y);}else{newCoord = vec2(uv.x +u2, uv.y);}}else{newCoord = vec2(uv.x, uv.y);}float cc = atan(newCoord.x, newCoord.y)/TWO_PI;c12 = int(mod(cc*freq_01*4.,float(nCol)));for(int i = 0; i <14; i++){if(c12 == i){a = i2f((fullGamma[i]));}}
            a = addStroke(1.0-(F),a,uv, 3.,coord,stroke_choice3,stroke_Amt3,stroke_Amt13,0.);
            a = addStroke(1.0-(cc),a,uv, freq_01*4., coord,stroke_choice,stroke_Amt,0.89,0.);
          }else if(choice == 17){float coord;if(int(shades_u2)==0){coord = uv.x;}else if(int(shades_u2)==1){coord = uv.y;}else{coord = uv.x+uv.y;}
          c12 = int(mod(coord*freq_01,float(nCol)));for(int i = 0; i <14; i++){if(c12 == i){a = i2f((fullGamma[i]));}} a = addStroke(1.0-(coord),a,uv, freq_01, coord,stroke_choice,stroke_Amt,stroke_Amt1,rr);
          }else if(choice == 18){
            vec3 b;
              c12 = color_index;
              for(int i = 0; i <14; i++){
                if(c12 == i){
                  a = i2f((fullGamma[i]));
                  if(int(shades_u2) == int(0.)){
                  }else{
                    b = i2f((fullGamma[i+2]));
                  }
              }
            }
              a = mix(a,b,abs(sin(F*shades_u1+randomFactor)));
              // a = addStroke(1.0-(uv.y),a,uv, freq_01, coord,stroke_choice,stroke_Amt,stroke_Amt1);

          }else if(choice == int(19)){
            a = pulseOsc(uv.x,rr,freq);
          }else if(choice == int(20)){
            a = pulseOsc(F, 0.55,freq);
            a.rgb*= vec3(circle(fract(uv*100.), 0.03));
            a.rgb += step(vec3(.8),a.rgb);
          }else if(choice == int(21)){
            c12 = color_index;
            for(int i = 0; i <14; i++){
              if(c12 == i){
                  a = mix(vec3(1.0),vec3(.0),smoothstep(0., nucleoSize*1.3, F));
                }
              }
          }else if(choice == int(22)){
            c12 = color_index;
            for(int i = 0; i <14; i++){
              if(c12 == i){
                  a = mix(i2f((fullGamma[i])),i2f((fullGamma[i+8])),smoothstep(0., nucleoSize, F));
                }
              }
          }

          float cc = atan(uv.x, uv.y)/TWO_PI;



        return a;
}

vec3 generateNucleo(vec3 a, float F, vec2 uv){

  if(F < nucleoSize){
    // if(uv.y > 0.1){
    //   a = shade(F,uv,0.,int(nucleoShades[1]),0.,10.,0.,color_index_map[0],0.);
    // }else{
    //   a = shade(F,uv,0.,int(nucleoShades[0]),0.,10.,0.,color_index_map[0],0.);
    // }
    a = shade(F,uv,0.,int(nucleoShades[0]),0.,10.,0.,color_index_map[0],0.,0.0,.0);

  }

  if(F > nucleoSize && F < nucleoSize+nucleo_stroke[0]){
      float r = atan(uv.y,uv.x);
      if(outsideStrokeNucleo == 0){
      a = vec3(sin(r*random_factor_stroke_nucleo+randomFactor1))+i2f(fullGamma[0]);
    }else if(outsideStrokeNucleo==1){
      a = vec3(sin(r*random_factor_stroke_nucleo+randomFactor1));
    }else if(outsideStrokeNucleo==2){
      a = vec3(0.);
    }else if(outsideStrokeNucleo==3){
      a = vec3(1.);
    }
  }

  if(nucleo2 == int(1.0)){
    if(F < nucleo2Size && F > nucleo2_ring+nucleo_stroke[0]){
      a = shade(F,uv,0.,int(nucleoShades[1]),0.,10.,0.,color_index_map[1],0.,0.0,0.0);
    }
  }

  if(nucleo3 == int(1.0)){
    if(F < nucleo3Size && F > nucleo3_ring){
      a = shade(F,uv,0.,int(nucleoShades[2]),0.,10.,0.,color_index_map[2],0.,0.0,0.0);
    }
  }

  return a;
}


vec3 generateNucleo_capsule(float F,vec2 uv,vec3 a){

  float xx = 0.0;if(u4 == 1.0){xx = u2;}else{xx = 0.0;}
  float cc;
  // if(rotateNucleo==int(1.0)){uv*=rotate2d(PI/2.0);}

  if(capsule_nucleos[0] == 1){
    cc = shape(uv+vec2(-xx,2.0), 100);
    if(distance(cc,0.0) < capsule_NucleoSize[0]){
      a = shade(cc,uv,0.,1,array_freq[1],array_freq[1],0.,1,0.,0.0,0.0);

    }
  }
  if(capsule_nucleos[1] == 1){
     cc = shape(uv+vec2(xx,-2.),100);
     if(distance(cc,0.0) < capsule_NucleoSize[1]){
       a = shade(cc,uv,0.,1,array_freq[1],array_freq[1],0.,1,0.,0.0,0.0);


     }
  }
  if(capsule_nucleos[2] == 1){
    cc = shape(uv+vec2(0.,0.0),100);
    if(distance(cc,0.0) < capsule_NucleoSize[2]){
      a = shade(cc,uv,0.,1,array_freq[1],array_freq[1],0.,1,0.,0.0,.0);

    }
  }
    return a;
}

vec3 generate_map(float F, vec2 uv, float _angle){
  vec3 a;
  float angle;

  for(int i = 0; i < 30; i++){
    int shade1 =int(rings_shades3[i].x);
    int shade2 =int(rings_shades3[i].y);

    angle = atan(uv.x, uv.y)/TWO_PI;
    if(i < pointsDivisionBodySize3){
      float angle3 = rings_largo3[i];
      int shade1 =int(rings_shades3[i].x);
      int shade2 =int(rings_shades3[i].y);

      float p1 = pointsDivisionBody3[i]; float p2 = pointsDivisionBody3[i+1];
      if( F > p1 && F < p2){

          a = arc(uv,vec2(0., 0.),angle3,p1,p2,radians(rings_pos3[i]),shade(F,uv,angle,shade1,frequency[i],frequency_2[i],frequency_3[i],color_map_temp_center,random_factor[i],p1,p2),shade(F,uv,angle,shade2,frequency[i+1],frequency_2[i+1],frequency_3[i+1],color_map_temp_center,random_factor[i+1],p1,p2),F);
          // if(light_stroke_01==1){
          //   float p = shape(uv,100);
          //   a = addStroke(1.0-p,a,uv,light_stroke_01factor,p,stroke_choice2,0.6,0.9,randomFactor1);
          // }

          if(F > 0.2){
            if(light_stroke_02==1){
              a = addStroke(1.0-(angle),a,uv,light_stroke_02factor,angle,stroke_choice2,0.6,0.97,random_factor[i]);
            }
          }

          // a = addStroke(1.0-(angle),a,uv,2.,angle,stroke_choice2,0.6,0.9,random_factor[5]);
        }
    }
  }

    if(uv.y > sin(radians(u3)*disc)){
    angle = atan(uv.x-u2, uv.y-u3)/TWO_PI;
    for(int i = 0; i <30; i++){
      if(i < pointsDivisionBodySize){
          float p1 = pointsDivisionBody[i]; float p2 = pointsDivisionBody[i+1];
          float angle1 = rings_largo[i];
          int shade1 =int(rings_shades[i].x);
          int shade2 =int(rings_shades[i].y);
            a = arc(uv,vec2(u2, 0.),angle1,p1,p2,radians(rings_pos[i]+(180.-u3*disc)),shade(F,uv,angle,shade1,frequency[i],frequency_2[i],frequency_3[i],color_map_temp_up,random_factor[i],p1,p2),shade(F,uv,angle,shade2,frequency[i+1],frequency_2[i+1],frequency_3[i+1],color_map_temp_up,random_factor[i+1],p1,p2),F);
}
  }
  }

  if(u1 != 1.){
    if(uv.y < sin(radians(-u3)*disc)){
       if(u1 != 1.0){
         angle = atan(uv.x, uv.y)/TWO_PI;
       }else{angle = atan(uv.x+u2, uv.y+u3)/TWO_PI;}
       for(int i = 0; i <28; i++){
         if(i < pointsDivisionBodySize2){
           int shade1 =int(rings_shades2[i].x);
           int shade2 =int(rings_shades2[i].y);
           float angle1 = rings_largo2[i];
           float p1 = pointsDivisionBody2[i]; float p2 = pointsDivisionBody2[i+1];
            a = arc(uv,vec2(-u2, 0.),angle1,p1,p2,radians(rings_pos2[i]+u3*disc),shade(F,uv,angle,shade1,frequency[i],frequency_2[i],frequency_3[i],color_map_temp_down,random_factor[i],p1,p2),shade(F,uv,angle,shade2,frequency[i+1],frequency_2[i+1],frequency_3[i+1],color_map_temp_down,random_factor[i+1],p1,p2),F);
     }
       }
     }
  }

  return a;
}

vec3 generate_capsule_map(float F,vec2 uv, float angle){
  vec3 a;
  for(int i = 0; i < 28; i++){
  if(i < pointsDivisionBodySize){
  float p1 = pointsDivisionBody[i]; float p2 = pointsDivisionBody[i+1];
  int shade1 =int(rings_shades3[i].x);

  if(F > p1 && F < p2){
    // a = shade(F,uv,angle,shade1,frequency[i]/4.,frequency_2[i]/4.,color_index_map[i]);
  }
}

}

  return a;
}

void main() {
  vec2 coord = gl_FragCoord.xy; vec2 uv2 = gl_FragCoord.xy/resolution.xy;uv2-=vec2(0.5);

  vec2 uv  = zoom * vec2((coord.x - resolution.x / 2.0 )/resolution.x,(coord.y - resolution.y /2.0 )/resolution.y);
  vec2 uv3  = 3.5 * vec2((coord.x - resolution.x / 2.0 )/resolution.x,(coord.y - resolution.y /2.0 )/resolution.y);
  float fix = resolution.x/resolution.y;uv.x *= resolution.x / resolution.y;vec2 toCenter = vec2(.0*fix,.0)+uv;float radius = length(((toCenter)));float angle = atan(uv.x, uv.y);
  if(flip == int(1.0)){uv+=0.5;if(u1 == 1.0){uv=scale(uv, vec2(-1.0,-1.0));}else{uv=scale(uv, vec2(-1.0,1.0));}uv-=0.5;}else{uv = uv;}
  // if(flip == int(1.0)){uv2+=0.5;if(u1 == 1.0){uv2=scale(uv2, vec2(-1.0,-1.0));}else{uv2=scale(uv, vec2(-1.0,1.0));}uv2-=0.5;}else{uv2 = uv2;}
//

  if(rotate == int(1.0)){uv*=rotate2d(radians(rotateAmt));}

  float newU3 = sin(radians(u3)*disc);

  if(pixela == int(1.0)){uv = floor(uv*2.0+0.5);}else{uv = uv;}
  uv *= rotate2d(radians(rotateAmt));

  float F = intf(uv, nShape, angle,newU3);

    if(nMap==int(1.0)){
      if(nShape == 0){
        final.rgb = generate_map(F,uv,angle);
      }else if(nShape == 2){
        final.rgb = generate_map(F,uv,angle);
      }
    }else{
      final.rgb = shade(F,uv,angle,nShade,array_freq[0],array_freq[1],0.,1,0.,0.0,0.0);
    }

    if(nShape == 2){
      if(nucleo==int(1.0)){
        final.rgb = generateNucleo_capsule(F,uv, final.rgb);
      }
    }

    if(nShape == 0){
      if(nucleo==int(1.)){final.rgb = generateNucleo(final.rgb, F,uv);}
    }

  uv2=scale(uv2,vec2(3.0));
  final.rgb = light(final.rgb,uv2, F);


  vec3 back;
  if(background==int(0.0)){
    back = vec3(1.0);
  }else if(background==int(1.0)){
    back = vec3(.0);
  }else if(background==int(2.0)){
    back = grid(uv2, 24.0,0.1);
  }else if(background==int(3.0)){
    back = 1.0-grid(uv2, 24.0,0.1);
  }else if(background==int(4.0)){
    back = grid(uv2, background_u1,0.97);
  }else if(background==int(5.0)){
    back = 1.0-grid(uv2, 2.0,0.97); //2 / 12 / 24;
  }else if(background==int(6.0)){
    back = i2f((fullGamma[0]));
  }else if(background==int(7.0)){
    uv2*=rotate2d(sin(uv2.x*.5)*sin(uv2.y*2.0));
    back = 1.0-floor(vec3(circle(fract(uv2*20.0), 0.05*sin(uv.x*0.01)))+0.5);
  }else if(background==int(8.0)){
    back = 1.0-shade(F,uv,angle,13,freq,10.,0.,1,0.,0.0,0.0);
  }


  if(outSideStroke == int(1.0)){
    if(F < disc && F > disc-outsideStrokeRadius){
      if(outsideStrokeType==0){
        final.rgb = vec3(0.0);
      }else if(outsideStrokeType == 1){
        final.rgb = vec3(sin(angle*5.0));
      }else if(outsideStrokeType==2){
          final.rgb = vec3(0.0);
      }
    }
  }





  if(F > disc){final.rgb = back; }

  final.rgb = generate_noise(final.rgb);

  gl_FragColor = vec4(final.rgb, 1.0);

}
